extends Node

@onready var background = $Background
@onready var possessions = $ChessBoard/%Possessions
@onready var select_scene_button = $CardSelection/%SelectCard
@onready var back_button = $Background/BackButton
@onready var card_selection = $CardSelection
@onready var chess_board = $ChessBoard
@onready var thinking_overlay = $ThinkingOverlay
@onready var greeting_overlay = $GreetingOverlay

const POSSESSION_X_OFFSET: int = 192
const POSSESSION_Y_OFFSET: int = 256
const POSSESSION_X_MAX: int = 5

var deck_possessions: Array = []
var possessions_data: Dictionary
var background_data: Dictionary
var reccomendation = ""


func _ready():
	ChessLogic.ai_started_thinking.connect(_on_ai_started)
	ChessLogic.ai_finished_thinking.connect(_on_ai_finished)

	ChessLogic.set_ai_enabled(false)

	## comment out below for debugging
	GlobalState.do_test_moves = false
	## comment out above for debugging

	if GlobalState.do_test_moves:
		print("Performing test moves (should only happen once)")
		GlobalState.do_test_moves = false
		ChessLogic.make_move_notation("a2", "a4")
		ChessLogic.make_move_notation("b7", "b5")
		#ChessLogic.force_ai_move()
	ChessLogic.set_ai_enabled(true)

	var move_successful = GlobalState.make_selected_chess_move(thinking_overlay)
	print(
		(
			"Performing white move; %s=>%s move_successful:%s"
			% [GlobalState.move_from, GlobalState.move_to, move_successful]
		)
	)

	if GlobalState.has_seen_greeting:
		print("greeting_overlay.visible = false")
		greeting_overlay.set_greeting_overlay_visible(false)
	else:
		greeting_overlay.load_greeting_data()

	var font_file_name = "res://fonts/OpenChessFont.ttf"
	var chess_font = load(font_file_name)
	var chess_font_label = %ChessFontLabel
	if chess_font:
		chess_font_label.add_theme_font_override("font", chess_font)
	else:
		if OS.is_debug_build():
			push_error("Error: Could not find font file '%s'." % [font_file_name])
			#print("Error: Could not find font file.")
	#thinking_overlay.visible = true

	select_scene_button.text = "Select Scene"
	select_scene_button.pressed.connect(_on_select_scene_pressed)
	back_button.pressed.connect(_on_back_button_pressed)
	load_scene()
	load_possessions()


func load_scene():
	load_background_from_json("res://data/scenes.json")
	load_challenges_from_json("res://data/characters.json")
	load_scenes_from_json("res://data/scenes.json")
	draw_scenes()
	set_back_button_visible(false)


func load_possessions():
	load_possessions_from_json("res://data/possessions.json")
	draw_possessions()


func commit_to_transfer():
	pass


func load_background_from_json(path: String):
	var data = ActiveRecords.get_active_dictionary_records(path, "scene_selection")
	if typeof(data) == TYPE_ARRAY and data.size() > 0:
		background_data = data.pick_random()


func load_scenes_from_json(path: String):
	chess_board.load_board_locations_from_json(path)

	card_selection.load_from_json(
		path,
		preload("res://tscns/Card.tscn"),
		"scenes",
		chess_board.active_board_locations,
		"characters",
		chess_board.challenge_by_board_locations
	)


func load_challenges_from_json(path: String):
	chess_board.load_challenges_from_json(path)


func load_possessions_from_json(path: String):
	var data = ActiveRecords.get_active_array_records(path)
	if typeof(data) == TYPE_ARRAY:
		for c in data:
			var possession_name = c.get("name", "Unknown")
			var possession_image_texture_name = c.get("texture", "")
			var possession_image_texture = load(possession_image_texture_name)
			#print("Texture for:", str(c), possession_image_texture)
			if possession_image_texture == null:
				print("Missing Texture for:", possession_name)

			var possession = preload("res://tscns/Possession.tscn").instantiate()
			possession.possession_name = possession_name
			possession.possession_image_texture = possession_image_texture
			var possession_name_child = possession.find_child("PossessionName", true, true)
			possession_name_child.text = possession.possession_name

			possession.possession_count = possessions_data.get(possession.possession_name, 0)

			if possession.possession_count > 0:
				deck_possessions.append(possession)


func draw_scenes():
	chess_board.draw_board_locations()
	chess_board.show_active_board_locations()
	chess_board.on_board_location_toggled_callback = _on_board_location_toggled_callback
	card_selection.draw_hand()
	card_selection.set_hand_visible(false)
	background.background_name = (
		background_data.get("name", "Unknown") + " : " + GlobalState.greetings_style
	)
	background.background_description = (
		background_data.get("description", "Unknown")
		+ ", team "
		+ ChessLogic.current_turn
		+ "."
		+ reccomendation
	)
	background.background_image.texture = load(background_data.get("texture", ""))
	background.update_ui()


func draw_possessions():
	for i in range(deck_possessions.size()):
		var possession = deck_possessions[i]
		possessions.add_child(possession)
		var pos = possession.position
		pos.x = POSSESSION_X_OFFSET * (i % POSSESSION_X_MAX)
		@warning_ignore("integer_division")
		pos.y = POSSESSION_Y_OFFSET * (i / POSSESSION_X_MAX)
		possession.position = pos
		possession.update_ui()


func _on_select_scene_pressed():
	var selected_scene = card_selection.selected_card
	TransferToScene.transfer_data(
		selected_scene.card_subtype,
		selected_scene.card_name,
		"",
		possessions_data,
		"res://tscns/CharacterSelection.tscn"
	)


func update_ui():
	pass


func _on_back_button_pressed():
	var selected_scene = card_selection.selected_card
	TransferToScene.transfer_data(
		selected_scene.scene_challenge_name,
		selected_scene.scene_name,
		"",
		possessions_data,
		"res://tscns/SceneSelection.tscn"
	)


func set_back_button_visible(visibleFlag: bool):
	back_button.visible = visibleFlag


func draw_hand():
	card_selection.draw_hand()


func _on_board_location_toggled_callback(visibleFlag: bool, boardLocation: String):
	card_selection.set_selected_card(boardLocation, visibleFlag)
	card_selection.draw_hand()
	if visibleFlag:
		card_selection.scroll_to_card(boardLocation)
	card_selection.set_hand_visible(visibleFlag)
	pass


func _on_ai_started():
	thinking_overlay.visible = true


func _on_ai_finished(_best_move, _recommended_move):
	#var best_from = ChessLogic.coord_to_notation(_best_move.from)
	#var best_to = ChessLogic.coord_to_notation(_best_move.to)
	#var best_from_chess_piece = ChessLogic.get_piece_at_notation(best_from)
	#var best_to_chess_piece = ChessLogic.get_piece_at_notation(best_to)
	#print(
	#"_on_ai_finished: ",
	#"best_move",
	#_best_move,
	#" ",
	#best_from,
	#" ",
	#best_to,
	#" ",
	#best_from_chess_piece,
	#" ",
	#best_to_chess_piece
	#)
	var recommended_from = ChessLogic.coord_to_notation(_recommended_move.from)
	var recommended_to = ChessLogic.coord_to_notation(_recommended_move.to)
	var recommended_from_chess_piece = ChessLogic.get_piece_at_notation(recommended_from)
	#var recommended_to_chess_piece = ChessLogic.get_piece_at_notation(recommended_to)
	print(
		"_on_ai_finished: ",
		"recommended_move",
		_recommended_move,
		" ",
		recommended_from,
		" ",
		recommended_to,
		" ",
		recommended_from_chess_piece,
	)
	reccomendation = (
		" " + recommended_from_chess_piece.type + " " + recommended_from + " to " + recommended_to
	)
	#ChessLogic.coord_to_notation(_best_move)
	#ChessLogic.make_move_notation("b7", "b5")
	thinking_overlay.visible = false
	load_scene()


func _unhandled_input(event):
	#print("SceneSelection _unhandled_input ", event)
	if event is InputEventMouseButton:
		if event.button_index == MOUSE_BUTTON_LEFT and event.pressed:
			card_selection.set_hand_visible(false)
			chess_board.clear_all_toggled()
			get_viewport().set_input_as_handled()
