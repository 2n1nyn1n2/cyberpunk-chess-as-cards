extends Node

@onready var board_locations = %BoardLocations
@onready var possessions = %Possessions

const BOARD_LOCATION_X_INITIALOFFSET: int = 240
const BOARD_LOCATION_X_OFFSET: int = 196
const BOARD_LOCATION_Y_OFFSET: int = 196
const BOARD_LOCATION_X_MAX: int = 8

var deck_board_locations: Array = []
var challenges_data: Dictionary
var challenge_by_board_locations: Dictionary
var active_board_locations: Dictionary

var on_board_location_toggled_callback: Callable


func _ready():
	pass


func draw_board_locations():
	for child in board_locations.get_children():
		board_locations.remove_child(child)

	for i in range(deck_board_locations.size()):
		var board_location = deck_board_locations[i]

		var current_parent = board_location.get_parent()
		if current_parent != null:
			current_parent.remove_child(board_location)

		board_locations.add_child(board_location)

		var column = i % BOARD_LOCATION_X_MAX
		@warning_ignore("integer_division")
		var row = i / BOARD_LOCATION_X_MAX

		var new_pos = Vector2.ZERO
		new_pos.x = ((BOARD_LOCATION_X_OFFSET * column) + BOARD_LOCATION_X_INITIALOFFSET)
		new_pos.y = BOARD_LOCATION_Y_OFFSET * row

		board_location.position = new_pos
		board_location.update_ui()


func load_challenges_from_json(path: String):
	var challenge_data = ActiveRecords.get_active_dictionary_records(path, "characters")
	if typeof(challenge_data) == TYPE_ARRAY:
		for challenge in challenge_data:
			var challenge_name = challenge.get("name", "Unknown")
			var challenge_icon = challenge.get("icon", "Unknown")
			challenges_data.set(challenge_name, challenge_icon)


func load_board_locations_from_json(path: String):
	deck_board_locations.clear()
	challenge_by_board_locations.clear()
	active_board_locations.clear()
	var data_array = ActiveRecords.get_active_dictionary_records(path, "scenes")
	if typeof(data_array) == TYPE_ARRAY and data_array.size() > 0:
		for data_elt in data_array:
			var board_location = preload("res://tscns/ChessBoardLocation.tscn").instantiate()
			board_location.is_selectable = true

			var tile = data_elt.get("tile", "Unknown")
			board_location.board_location_tile = tile

			var board_location_name = data_elt.get("name", "Unknown")
			board_location.board_location_name = board_location_name
			board_location.board_location_description = (
				tile + " " + data_elt.get("description", "Unknown")
			)

			var textureDir = "res://assets/scenes/" + board_location_name
			board_location.board_location_image_texture = (
				ActiveRecords.get_random_png_resource_from_dir(textureDir)
			)

			if tile == "black_tile":
				board_location.board_location_challenge_icon = "x"
			else:
				board_location.board_location_challenge_icon = "z"

			var chess_piece = ChessLogic.get_piece_at_notation(board_location_name)

			#print("board_location board_location_name:", board_location_name, " chess_piece:", chess_piece)

			if !chess_piece.is_empty():
				var challengeName = chess_piece.color + "_" + chess_piece.type + "_on_a_" + tile
				board_location.board_location_challenge_name = challengeName
				var chalengeIcon = challenges_data.get(challengeName)
				if chalengeIcon:
					board_location.board_location_challenge_icon = chalengeIcon
				var challengeDir = "res://assets/characters/" + challengeName
				board_location.board_location_challenge_image_texture = (
					ActiveRecords.get_random_png_resource_from_dir(challengeDir)
				)
				(
					challenge_by_board_locations
					. set(
						board_location.board_location_name,
						{
							"name": challengeName,
							"icon": chalengeIcon,
						}
					)
				)

				var chess_move_array: Array[String] = ChessLogic.get_legal_moves_by_name(
					board_location.board_location_name
				)
				if chess_move_array.size() > 0:
					active_board_locations.set(board_location.board_location_name, true)

				#for chess_move_ix in range(chess_move_array.size()):
				#var chess_move = chess_move_array[chess_move_ix]
				#active_board_locations.set(chess_move, true)

				#print(
				#"board_location challengeDir:",
				#board_location_name,
				#" ",
				#challengeDir,
				#" ",
				#board_location.board_location_challenge_image_texture,
				#" icon:'",
				#board_location.board_location_challenge_icon,
				#"'"
				#)

			board_location.update_ui()
			board_location.toggled.connect(_on_board_location_toggled)
			deck_board_locations.append(board_location)


func _on_board_location_toggled(state_owner: Node, state: bool):
	var state_owner_chess_moves: Array[String] = ChessLogic.get_legal_moves_by_name(
		state_owner.board_location_name
	)

	var state_owner_is_blocked: bool = state_owner_chess_moves.size() == 0
	for i in range(deck_board_locations.size()):
		var board_location = deck_board_locations[i]
		if state && state_owner == board_location:
			board_location.set_toggled_state(true)
			board_location.set_blocked_state(state_owner_is_blocked)
		else:
			board_location.set_toggled_state(false)
			board_location.set_blocked_state(false)

	show_active_board_locations()
	if (!state_owner_is_blocked) || (!state):
		#if either
		# 1. the board location is active
		# or
		# 2. the board location is being deselected
		# synch the card state.
		on_board_location_toggled_callback.call(state, state_owner.board_location_name)
	else:
		# otherwise, hide the cards.
		on_board_location_toggled_callback.call(false, state_owner.board_location_name)


func show_active_board_locations():
	var defender_board_locations: Dictionary
	for i in range(deck_board_locations.size()):
		var board_location = deck_board_locations[i]
		var is_active = active_board_locations.has(board_location.board_location_name)
		board_location.set_attacker_state(is_active)

		var chess_piece = ChessLogic.get_piece_at_notation(board_location.board_location_name)

		board_location.is_selectable = !chess_piece.is_empty()

		if !chess_piece.is_empty():
			var chess_moves: Array[String] = ChessLogic.get_legal_moves_by_name(
				board_location.board_location_name
			)
			#board_location.set_blocked_state(chess_moves.size() == 0)
			for chess_move_ix in range(chess_moves.size()):
				var chess_move = chess_moves[chess_move_ix]
				defender_board_locations.set(chess_move, true)

	for i in range(deck_board_locations.size()):
		var board_location = deck_board_locations[i]
		var is_defender = defender_board_locations.has(board_location.board_location_name)
		board_location.set_defender_state(is_defender)


func clear_all_toggled():
	for i in range(deck_board_locations.size()):
		var board_location = deck_board_locations[i]
		board_location.set_toggled_state(false)
