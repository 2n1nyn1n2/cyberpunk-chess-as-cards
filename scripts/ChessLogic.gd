extends Node

# --- SIGNALS ---
signal ai_started_thinking
signal ai_finished_thinking(best_move, recommended_white_move)

# --- ENUMS & CONSTANTS ---
enum GameState { PLAYING, CHECKMATE, STALEMATE }

const PIECE_VALUES = {
	"pawn": 100, "knight": 320, "bishop": 330, "rook": 500, "queen": 900, "king": 20000
}

# --- STATE VARIABLES ---
var board: Dictionary = {}
var PST: Dictionary = {}
var current_turn: String = "white"
var ai_color: String = "black"
var ai_enabled: bool = true
var en_passant_target: Vector2 = Vector2(-1, -1)
var transposition_table: Dictionary = {}

# --- THREAD SAFETY ---
var is_ai_thinking: bool = false
var ai_lock: Mutex = Mutex.new()


func _ready() -> void:
	PST = load_pst_data("res://data/chess_pst.json")
	board = initialize_board()


# --- THREAD-SAFE GETTERS/SETTERS ---
func _set_ai_thinking(status: bool) -> void:
	ai_lock.lock()
	is_ai_thinking = status
	ai_lock.unlock()


func _get_is_ai_thinking() -> bool:
	ai_lock.lock()
	var status = is_ai_thinking
	ai_lock.unlock()
	return status


# --- SETTINGS ---
func set_ai_enabled(enabled: bool) -> void:
	ai_enabled = enabled
	print("AI Enabled: ", enabled, " | Current Turn: ", current_turn)
	# Trigger AI if it's the AI's turn and it's not already working
	if ai_enabled and current_turn == ai_color and not _get_is_ai_thinking():
		start_ai_thread()


# --- INITIALIZATION ---
func initialize_board() -> Dictionary:
	var new_board = {}
	var piece_order = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"]
	for i in range(8):
		new_board[Vector2(0, i)] = {"type": piece_order[i], "color": "white", "moved": false}
		new_board[Vector2(1, i)] = {"type": "pawn", "color": "white", "moved": false}
		new_board[Vector2(6, i)] = {"type": "pawn", "color": "black", "moved": false}
		new_board[Vector2(7, i)] = {"type": piece_order[i], "color": "black", "moved": false}
	return new_board


# --- PUBLIC API ---
func make_move(from: Vector2, to: Vector2) -> bool:
	if _get_is_ai_thinking():
		push_warning("Move attempted while AI is thinking.")
		return false

	var valid_moves = get_legal_moves(from)
	if to in valid_moves:
		_execute_move_on_board(board, from, to)
		_toggle_turn()

		var status = _check_game_over(current_turn)
		if status == GameState.PLAYING and ai_enabled and current_turn == ai_color:
			start_ai_thread()
		return true
	return false


func force_ai_move() -> void:
	if _get_is_ai_thinking():
		return

	# Safety check: only move if it's actually the AI's color's turn
	if current_turn == ai_color:
		start_ai_thread()
	else:
		push_warning("Attempted to force AI move, but it is " + current_turn + "'s turn.")


# --- AI ENGINE ---
func start_ai_thread() -> void:
	_set_ai_thinking(true)
	ai_started_thinking.emit()
	WorkerThreadPool.add_task(make_ai_move)


func make_ai_move() -> void:
	var best_move = null
	var recommended_white_move = null
	var sim_board = board.duplicate(true)
	var start_ep = en_passant_target

	# Determine who is moving RIGHT NOW
	var moving_color = current_turn
	var opponent_color = "white" if moving_color == "black" else "black"

	transposition_table.clear()

	var depth = 3
	var best_score = -1000000

	# Use moving_color instead of ai_color
	var moves = _get_all_moves_with_context(sim_board, moving_color, start_ep)
	_sort_moves(moves, sim_board)

	for m in moves:
		var temp_board = sim_board.duplicate(true)
		_execute_move_on_board(temp_board, m.from, m.to)
		# Negamax: Evaluate from opponent's view
		var score = -_minimax(temp_board, depth - 1, -1000000, 1000000, opponent_color, start_ep)

		if score > best_score:
			best_score = score
			best_move = m
	# 2. Calculate Recommendation for Player (White)
	if best_move:
		var white_sim_board = sim_board.duplicate(true)
		_execute_move_on_board(white_sim_board, best_move.from, best_move.to)

		var white_moves = _get_all_moves_with_context(white_sim_board, "white", start_ep)
		var best_white_score = -1000000
		for wm in white_moves:
			var temp_white = white_sim_board.duplicate(true)
			_execute_move_on_board(temp_white, wm.from, wm.to)
			# Evaluate how good this is for White
			var score = _evaluate_board(temp_white, "white")
			if score > best_white_score:
				best_white_score = score
				recommended_white_move = wm

	call_deferred("_finalize_ai_move", best_move, recommended_white_move)


func _minimax(
	sim_board: Dictionary, depth: int, alpha: float, beta: float, current_side: String, ep: Vector2
) -> float:
	var b_hash = hash(str(sim_board))
	if transposition_table.has(b_hash) and transposition_table[b_hash].depth >= depth:
		return transposition_table[b_hash].score

	if depth == 0:
		return _evaluate_board(sim_board, current_side)

	var moves = _get_all_moves_with_context(sim_board, current_side, ep)
	if moves.is_empty():
		return -999999 if _is_king_in_check(current_side, sim_board) else 0

	_sort_moves(moves, sim_board)
	var next_side = "black" if current_side == "white" else "white"
	var max_eval = -1000000

	for m in moves:
		var temp = sim_board.duplicate(true)
		_execute_move_on_board(temp, m.from, m.to)
		var eval = -_minimax(temp, depth - 1, -beta, -alpha, next_side, ep)
		max_eval = max(max_eval, eval)
		alpha = max(alpha, eval)
		if alpha >= beta:
			break

	transposition_table[b_hash] = {"score": max_eval, "depth": depth}
	return max_eval


func _evaluate_board(b: Dictionary, perspective_color: String) -> int:
	var total_eval = 0
	for pos in b:
		var p = b[pos]
		var val = PIECE_VALUES[p.type]
		if PST.has(p.type):
			var idx = int(pos.x) * 8 + int(pos.y)
			if p.color == "black":
				idx = (7 - int(pos.x)) * 8 + int(pos.y)
			val += PST[p.type][idx]

		if p.color == perspective_color:
			total_eval += val
		else:
			total_eval -= val
	return total_eval


# --- BOARD LOGIC ---


func _execute_move_on_board(b: Dictionary, from: Vector2, to: Vector2) -> void:
	if not b.has(from):
		return
	var piece = b[from]
	var next_ep = Vector2(-1, -1)

	if piece.type == "pawn":
		if to == en_passant_target:
			b.erase(Vector2(from.x, to.y))
		if abs(from.x - to.x) == 2:
			next_ep = Vector2((from.x + to.x) / 2, from.y)
		if to.x == 0 or to.x == 7:
			piece.type = "queen"

	if piece.type == "king" and abs(from.y - to.y) == 2:
		var r_from = Vector2(from.x, 7 if to.y > from.y else 0)
		var r_to = Vector2(from.x, from.y + (1 if to.y > from.y else -1))
		if b.has(r_from):
			b[r_to] = b[r_from]
			b[r_to].moved = true
			b.erase(r_from)

	b[to] = piece
	b[to].moved = true
	b.erase(from)
	if b == board:
		en_passant_target = next_ep


func _finalize_ai_move(m, recommended_move):
	_set_ai_thinking(false)
	if m:
		_execute_move_on_board(board, m.from, m.to)
		_toggle_turn()
	ai_finished_thinking.emit(m, recommended_move)


# --- UTILS (Keep your existing helpers) ---


func _get_all_moves_with_context(b: Dictionary, color: String, ep: Vector2) -> Array:
	var all = []
	for p in b.keys():
		if b[p].color == color:
			var moves = _get_pseudo_moves(b[p].type, p, color, b, ep)
			if b[p].type == "king":
				moves.append_array(_get_castling_moves(p, color, b))
			for m in moves:
				if not _will_be_in_check(p, m, color, b, ep):
					all.append({"from": p, "to": m})
	return all


func _get_pseudo_moves(
	type: String, pos: Vector2, color: String, b: Dictionary, ep: Vector2
) -> Array[Vector2]:
	var res: Array[Vector2] = []
	match type:
		"pawn":
			var dir = 1 if color == "white" else -1
			var f1 = pos + Vector2(dir, 0)
			if _is_on_board(f1) and not b.has(f1):
				res.append(f1)
				var f2 = pos + Vector2(dir * 2, 0)
				var start_row = 1 if color == "white" else 6
				if pos.x == start_row and not b.has(f2):
					res.append(f2)
			for y in [-1, 1]:
				var d = pos + Vector2(dir, y)
				if _is_on_board(d) and ((b.has(d) and b[d].color != color) or d == ep):
					res.append(d)
		"rook":
			res.append_array(
				_get_sliding(pos, [Vector2.UP, Vector2.DOWN, Vector2.LEFT, Vector2.RIGHT], color, b)
			)
		"bishop":
			res.append_array(
				_get_sliding(
					pos, [Vector2(1, 1), Vector2(1, -1), Vector2(-1, 1), Vector2(-1, -1)], color, b
				)
			)
		"queen":
			res.append_array(
				_get_sliding(
					pos,
					[
						Vector2.UP,
						Vector2.DOWN,
						Vector2.LEFT,
						Vector2.RIGHT,
						Vector2(1, 1),
						Vector2(1, -1),
						Vector2(-1, 1),
						Vector2(-1, -1)
					],
					color,
					b
				)
			)
		"knight":
			for j in [
				Vector2(1, 2),
				Vector2(1, -2),
				Vector2(-2, 1),
				Vector2(-2, -1),
				Vector2(2, 1),
				Vector2(2, -1),
				Vector2(-1, 2),
				Vector2(-1, -2)
			]:
				var t = pos + j
				if _is_on_board(t) and (not b.has(t) or b[t].color != color):
					res.append(t)
		"king":
			for s in [
				Vector2.UP,
				Vector2.DOWN,
				Vector2.LEFT,
				Vector2.RIGHT,
				Vector2(1, 1),
				Vector2(1, -1),
				Vector2(-1, 1),
				Vector2(-1, -1)
			]:
				var t = pos + s
				if _is_on_board(t) and (not b.has(t) or b[t].color != color):
					res.append(t)
	return res


func _get_sliding(start: Vector2, dirs: Array, color: String, b: Dictionary) -> Array[Vector2]:
	var res: Array[Vector2] = []
	for d in dirs:
		var n = start + d
		while _is_on_board(n):
			if not b.has(n):
				res.append(n)
			else:
				if b[n].color != color:
					res.append(n)
				break
			n += d
	return res


func _get_castling_moves(pos: Vector2, color: String, b: Dictionary) -> Array[Vector2]:
	var res: Array[Vector2] = []
	if b[pos].moved or _is_king_in_check(color, b):
		return res
	for y_t in [0, 7]:
		var r_pos = Vector2(pos.x, y_t)
		if b.has(r_pos) and b[r_pos].type == "rook" and not b[r_pos].moved:
			var step = 1 if y_t == 7 else -1
			var clear = true
			for i in range(1, abs(int(pos.y - y_t))):
				var c_p = Vector2(pos.x, pos.y + (i * step))
				if (
					b.has(c_p)
					or (i <= 2 and _will_be_in_check(pos, c_p, color, b, Vector2(-1, -1)))
				):
					clear = false
					break
			if clear:
				res.append(Vector2(pos.x, pos.y + (2 * step)))
	return res


func _sort_moves(moves: Array, b: Dictionary) -> void:
	moves.sort_custom(
		func(a, b_move):
			var val_a = PIECE_VALUES[b[a.to].type] if b.has(a.to) else 0
			var val_b = PIECE_VALUES[b[b_move.to].type] if b.has(b_move.to) else 0
			return val_a > val_b
	)


func _is_king_in_check(color: String, b: Dictionary) -> bool:
	var kp = Vector2(-1, -1)
	for p in b:
		if b[p].type == "king" and b[p].color == color:
			kp = p
			break
	if kp == Vector2(-1, -1):
		return true
	var enemy = "black" if color == "white" else "white"
	for p in b:
		if b[p].color == enemy and kp in _get_pseudo_moves(b[p].type, p, enemy, b, Vector2(-1, -1)):
			return true
	return false


func _will_be_in_check(
	from: Vector2, to: Vector2, color: String, b: Dictionary, _ep: Vector2
) -> bool:
	var sim = b.duplicate(true)
	_execute_move_on_board(sim, from, to)
	return _is_king_in_check(color, sim)


func _check_game_over(c):
	if _get_all_moves_with_context(board, c, en_passant_target).is_empty():
		return GameState.CHECKMATE if _is_king_in_check(c, board) else GameState.STALEMATE
	return GameState.PLAYING


func _toggle_turn():
	current_turn = "black" if current_turn == "white" else "white"


func _is_on_board(p: Vector2):
	return p.x >= 0 and p.x < 8 and p.y >= 0 and p.y < 8


func notation_to_coord(notation: String) -> Vector2:
	notation = notation.to_lower()
	if notation.length() < 2:
		return Vector2(-1, -1)
	var y = notation[0].unicode_at(0) - "a".unicode_at(0)
	var x = int(notation[1]) - 1
	return Vector2(x, y)


func coord_to_notation(pos: Vector2) -> String:
	return char(int(pos.y) + "a".unicode_at(0)) + str(int(pos.x) + 1)


func make_move_notation(from_str: String, to_str: String) -> bool:
	return make_move(notation_to_coord(from_str), notation_to_coord(to_str))


func load_pst_data(path: String) -> Dictionary:
	if not FileAccess.file_exists(path):
		return {}
	var file = FileAccess.open(path, FileAccess.READ)
	var json = JSON.new()
	if json.parse(file.get_as_text()) == OK:
		return json.data
	return {}


func get_legal_moves(
	pos: Vector2, b: Dictionary = board, ep: Vector2 = en_passant_target
) -> Array[Vector2]:
	if not b.has(pos) or b[pos].color != current_turn:
		return []
	var piece = b[pos]
	var moves = _get_pseudo_moves(piece.type, pos, piece.color, b, ep)
	if piece.type == "king":
		moves.append_array(_get_castling_moves(pos, piece.color, b))
	var legal: Array[Vector2] = []
	for m in moves:
		if not _will_be_in_check(pos, m, piece.color, b, ep):
			legal.append(m)
	return legal


func get_piece_at_notation(notation: String) -> Dictionary:
	var coord = notation_to_coord(notation)
	return board[coord] if board.has(coord) else {}


func get_legal_moves_by_name(notation: String) -> Array[String]:
	var coord = notation_to_coord(notation)
	# Use the existing get_legal_moves which handles turn/validity logic
	var moves = get_legal_moves(coord)
	var notation_moves: Array[String] = []
	for m in moves:
		notation_moves.append(coord_to_notation(m))
	return notation_moves


func get_is_ai_thinking() -> bool:
	return _get_is_ai_thinking()
