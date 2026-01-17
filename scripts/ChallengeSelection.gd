extends Node

@onready var background = $Background
@onready var select_challenge_button = $CardSelection/%SelectCard
@onready var selected_character = $Character
@onready var back_button = $Background/BackButton
@onready var card_selection = $CardSelection

var background_data: Dictionary
var possessions_data: Dictionary
var scenes: Array = []


func _ready():
	select_challenge_button.text = "Select Challenge"
	select_challenge_button.pressed.connect(_on_select_challenge_pressed)
	back_button.pressed.connect(_on_back_button_pressed)


func load_scene():
	load_background_from_json("res://data/scenes.json")
	load_challenges_from_json("res://data/challenges.json")
	card_selection.draw_hand()
	set_back_button_visible(true)
	update_ui()


func load_possessions():
	pass


func load_characters():
	load_characters_from_json("res://data/characters.json")
	pass


func commit_to_transfer():
	var greeting_overlay = %GreetingOverlay
	var parts = selected_character.character_name.split("_")
	var piece_name = parts[1].capitalize()
	greeting_overlay.greeting_subtype_name = piece_name
	greeting_overlay.load_greeting_data()
	pass


func load_background_from_json(path: String):
	var data = ActiveRecords.get_active_dictionary_records(path, "scenes")
	scenes = data
	if typeof(data) == TYPE_ARRAY and data.size() > 0:
		background_data = data.pick_random()
		# if challenge was already selected, use it
		for background_element in data:
			if background.background_name == background_element.get("name", "Unknown"):
				background_data = background_element

		var background_name = background_data.get("name", "Unknown")

		background.background_name = background_name
		background.background_description = background_data.get("description", "Unknown")

		var textureDir = "res://assets/scenes/" + background_name
		background.background_image.texture = (ActiveRecords.get_random_png_resource_from_dir(
			textureDir
		))
		background.update_ui()


func load_challenges_from_json(path: String):
	var chess_moves: Array[String] = ChessLogic.get_legal_moves_by_name(background.background_name)
	#print(
	#"load_challenges_from_json: background.background_name:",
	#background.background_name,
	#" chess_moves:",
	#chess_moves
	#)
	var chess_move_scenes = []
	for scene in scenes:
		var scene_name = scene.get("name", "Unknown")
		var tile = scene.get("tile", "Unknown")
		if chess_moves.has(scene_name):
			var chess_piece = ChessLogic.get_piece_at_notation(scene_name)
			if !chess_piece.is_empty():
				#var challenge_name = chess_piece.color + "_" + chess_piece.type + "_on_a_" + tile
				chess_move_scenes.append(scene)
			else:
				#print(
				#"load_challenges_from_json: background.background_name:",
				#background.background_name,
				#" chess_moves:",
				#chess_moves,
				#" scene_name:",
				#scene_name
				#)
				var card = preload("res://tscns/Card.tscn").instantiate()
				card.is_selectable = true
				card.card_name = scene_name
				card.card_icon = "x"
				card.card_subtype = tile
				card.card_description = "empty_" + tile

				var textureDir = "res://assets/scenes/" + scene_name
				card.card_image_texture = (ActiveRecords.get_random_png_resource_from_dir(
					textureDir
				))
				card.update_ui()
				card.toggled.connect(card_selection._on_card_toggled)
				card_selection.deck_card.append(card)

	#print("load_challenges_from_json: chess_move_scenes:", chess_move_scenes)

	var challenge_array = ActiveRecords.get_active_dictionary_records(path, "challenges")
	if typeof(challenge_array) == TYPE_ARRAY and challenge_array.size() > 0:
		for chess_move_scene in chess_move_scenes:
			var scene_name = chess_move_scene.get("name", "Unknown")
			var tile = chess_move_scene.get("tile", "Unknown")
			var chess_piece = ChessLogic.get_piece_at_notation(scene_name)
			if !chess_piece.is_empty():
				var chess_piece_challenge_name = (
					chess_piece.color + "_" + chess_piece.type + "_on_a_" + tile
				)
				for challenge_data in challenge_array:
					var challenge_name = challenge_data.get("name", "Unknown")
					var challenge_icon = challenge_data.get("icon", "x")
					if chess_piece_challenge_name == challenge_name:
						#print(
						#"load_challenges_from_json: background.background_name:",
						#background.background_name,
						#" chess_moves:",
						#chess_moves,
						#" challenge_name:",
						#challenge_name,
						#" challenge_icon:",
						#challenge_icon
						#)
						var card = preload("res://tscns/Card.tscn").instantiate()
						card.is_selectable = true
						card.card_name = scene_name
						card.card_icon = challenge_icon
						card.card_subtype = tile
						#challenge.challenge_name = challenge_name
						card.card_description = challenge_data.get("description", "Unknown")
						var textureDir = "res://assets/challenges/" + challenge_name
						card.card_image_texture = (ActiveRecords.get_random_png_resource_from_dir(
							textureDir
						))
						card.update_ui()
						card.toggled.connect(card_selection._on_card_toggled)
						card_selection.deck_card.append(card)
	#print("load_challenges_from_json: card_selection.deck_card:", card_selection.deck_card)


func load_characters_from_json(path: String):
	var preselected_character = $Character
	preselected_character.is_selectable = false

	var characters = ActiveRecords.get_active_dictionary_records(path, "characters")
	if typeof(characters) == TYPE_ARRAY and characters.size() > 0:
		for character in characters:
			var characterName = character.get("name", "Unknown")
			if characterName == preselected_character.character_name:
				preselected_character.character_icon = character.get("icon", "?")
				preselected_character.character_description = character.get(
					"description", "Unknown"
				)

	var characterDir = "res://assets/characters/" + preselected_character.character_name
	preselected_character.character_image_texture = (ActiveRecords.get_random_png_resource_from_dir(
		characterDir
	))
	preselected_character.update_ui()


func _on_select_challenge_pressed():
	var selected_challenge = card_selection.selected_card
	TransferToScene.transfer_data(
		selected_character.character_name,
		background.background_name,
		selected_challenge.card_name,
		possessions_data,
		"res://tscns/ChoiceSelection.tscn"
	)


func update_ui():
	pass


func _on_back_button_pressed():
	var selected_challenge = card_selection.selected_card
	TransferToScene.transfer_data(
		selected_character.character_name if is_instance_valid(selected_character) else "",
		background.background_name,
		selected_challenge.card_name if is_instance_valid(selected_challenge) else "",
		possessions_data,
		"res://tscns/CharacterSelection.tscn"
	)


func set_back_button_visible(visibleFlag: bool):
	back_button.visible = visibleFlag
