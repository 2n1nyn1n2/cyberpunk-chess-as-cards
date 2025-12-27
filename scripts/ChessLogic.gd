extends Node

# --- STATE VARIABLES ---
var board: Dictionary = {}
var current_turn: String = "white"


func _ready() -> void:
	board = initialize_board()


# --- INITIALIZATION ---


## Sets up the board: White on the left (cols 0,1), Black on the right (cols 6,7)
func initialize_board() -> Dictionary:
	var new_board = {}
	# Order for back ranks (top to bottom)
	var piece_order = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"]

	for i in range(8):
		# --- WHITE PIECES (Left) ---
		new_board[Vector2(0, i)] = {"type": piece_order[i], "color": "white"}
		new_board[Vector2(1, i)] = {"type": "pawn", "color": "white"}

		# --- BLACK PIECES (Right) ---
		new_board[Vector2(6, i)] = {"type": "pawn", "color": "black"}
		new_board[Vector2(7, i)] = {"type": piece_order[i], "color": "black"}

	return new_board


# --- PUBLIC API ---


## Call this when a user clicks a piece to see where it can go
func get_legal_moves(pos: Vector2) -> Array[Vector2]:
	if not board.has(pos) or board[pos].color != current_turn:
		#print("get_legal_moves: pos:", pos, " no_legal_moves:", true)
		return []

	var piece = board[pos]
	var pseudo_moves = _get_pseudo_moves(piece.type, pos, piece.color, board)
	var legal_moves: Array[Vector2] = []

	for move in pseudo_moves:
		if not _will_be_in_check(pos, move, piece.color, board):
			legal_moves.append(move)

	#print("get_legal_moves: pos:", pos, " legal_moves:", legal_moves)
	return legal_moves


## Moves a piece and toggles the turn
func make_move(from: Vector2, to: Vector2) -> bool:
	var valid_moves = get_legal_moves(from)
	if to in valid_moves:
		board[to] = board[from]
		board.erase(from)
		_toggle_turn()
		return true
	return false


# --- MOVE LOGIC ---


func _get_pseudo_moves(
	type: String, pos: Vector2, color: String, current_board: Dictionary
) -> Array[Vector2]:
	var moves: Array[Vector2] = []

	match type:
		"rook":
			moves.append_array(
				_get_sliding_moves(
					pos,
					[Vector2.UP, Vector2.DOWN, Vector2.LEFT, Vector2.RIGHT],
					color,
					current_board
				)
			)
		"bishop":
			moves.append_array(
				_get_sliding_moves(
					pos,
					[Vector2(1, 1), Vector2(1, -1), Vector2(-1, 1), Vector2(-1, -1)],
					color,
					current_board
				)
			)
		"queen":
			moves.append_array(
				_get_sliding_moves(
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
					current_board
				)
			)
		"knight":
			var jumps = [
				Vector2(1, 2),
				Vector2(1, -2),
				Vector2(-1, 2),
				Vector2(-1, -2),
				Vector2(2, 1),
				Vector2(2, -1),
				Vector2(-2, 1),
				Vector2(-2, -1)
			]
			for j in jumps:
				var target = pos + j
				if _is_on_board(target) and _can_occupy(target, color, current_board):
					moves.append(target)
		"king":
			var steps = [
				Vector2.UP,
				Vector2.DOWN,
				Vector2.LEFT,
				Vector2.RIGHT,
				Vector2(1, 1),
				Vector2(1, -1),
				Vector2(-1, 1),
				Vector2(-1, -1)
			]
			for s in steps:
				var target = pos + s
				if _is_on_board(target) and _can_occupy(target, color, current_board):
					moves.append(target)
		"pawn":
			moves.append_array(_get_pawn_moves(pos, color, current_board))

	return moves


func _get_sliding_moves(
	start: Vector2, dirs: Array, color: String, current_board: Dictionary
) -> Array[Vector2]:
	var possible: Array[Vector2] = []
	for dir in dirs:
		var next = start + dir
		while _is_on_board(next):
			if not current_board.has(next):
				possible.append(next)
			else:
				if current_board[next].color != color:
					possible.append(next)
				break
			next += dir
	return possible


func _get_pawn_moves(pos: Vector2, color: String, current_board: Dictionary) -> Array[Vector2]:
	var moves: Array[Vector2] = []
	var dir = 1 if color == "white" else -1

	# Forward
	var f1 = pos + Vector2(dir, 0)
	if _is_on_board(f1) and not current_board.has(f1):
		moves.append(f1)
		var start_col = 1 if color == "white" else 6
		var f2 = pos + Vector2(dir * 2, 0)
		if pos.x == start_col and not current_board.has(f2) and not current_board.has(f1):
			moves.append(f2)

	# Diagonal Captures
	for y_offset in [-1, 1]:
		var diag = pos + Vector2(dir, y_offset)
		if _is_on_board(diag) and current_board.has(diag) and current_board[diag].color != color:
			moves.append(diag)
	return moves


# --- CHECK VALIDATION ---


func _will_be_in_check(
	from: Vector2, to: Vector2, color: String, current_board: Dictionary
) -> bool:
	# 1. Simulate Move
	var sim_board = current_board.duplicate()
	sim_board[to] = sim_board[from]
	sim_board.erase(from)

	# 2. Find King
	var king_pos = Vector2(-1, -1)
	for p in sim_board:
		if sim_board[p].type == "king" and sim_board[p].color == color:
			king_pos = p
			break

	# 3. Can any enemy piece reach the king?
	var enemy_color = "black" if color == "white" else "white"
	for p in sim_board:
		if sim_board[p].color == enemy_color:
			var enemy_moves = _get_pseudo_moves(sim_board[p].type, p, enemy_color, sim_board)
			if king_pos in enemy_moves:
				return true
	return false


# --- HELPERS ---


func _is_on_board(pos: Vector2) -> bool:
	return pos.x >= 0 and pos.x <= 7 and pos.y >= 0 and pos.y <= 7


func _can_occupy(pos: Vector2, color: String, current_board: Dictionary) -> bool:
	if not current_board.has(pos):
		return true
	return current_board[pos].color != color


func _toggle_turn() -> void:
	current_turn = "black" if current_turn == "white" else "white"


## Converts "e4" to Vector2(3, 4)
func notation_to_coord(notation: String) -> Vector2:
	notation = notation.to_lower()
	if notation.length() < 2:
		return Vector2(-1, -1)

	var file_char = notation[0]  # 'a' through 'h'
	var rank_char = notation[1]  # '1' through '8'

	# Mapping: a=0, b=1, c=2...
	var y = file_char.unicode_at(0) - "a".unicode_at(0)
	# Mapping: 1=0, 2=1, 3=2... (relative to White on Left)
	var x = int(rank_char) - 1

	var pos = Vector2(x, y)
	return pos if _is_on_board(pos) else Vector2(-1, -1)


## Converts Vector2(3, 4) to "e4"
func coord_to_notation(pos: Vector2) -> String:
	if not _is_on_board(pos):
		return ""

	var file = char(int(pos.y) + "a".unicode_at(0))
	var rank = str(int(pos.x) + 1)

	return file + rank


## Convenience lookup: Get piece data by name like "e4"
func get_piece_at_notation(notation: String) -> Dictionary:
	var coord = notation_to_coord(notation)
	if board.has(coord):
		return board[coord]
	return {}


func get_legal_moves_by_name(notation: String) -> Array[String]:
	var coord = notation_to_coord(notation)
	var moves = get_legal_moves(coord)

	var notation_moves: Array[String] = []
	for m in moves:
		notation_moves.append(coord_to_notation(m))
	return notation_moves


func make_move_notation(from_str: String, to_str: String) -> bool:
	var from_coord = notation_to_coord(from_str)
	var to_coord = notation_to_coord(to_str)

	# Validate that the strings actually turned into valid board positions
	if from_coord == Vector2(-1, -1) or to_coord == Vector2(-1, -1):
		print("Invalid notation: ", from_str, " or ", to_str)
		return false

	return make_move(from_coord, to_coord)
