extends Node

@onready var background = $Background
@onready var challenge = $Challenge
@onready var character = $Character
@onready var select_choice_button = $CardSelection/%SelectCard
@onready var back_button = $Background/BackButton
@onready var card_selection = $CardSelection

var background_data: Dictionary
var possessions_data: Dictionary


func _ready():
	select_choice_button.text = "Select Choice"
	load_characters()
	select_choice_button.pressed.connect(_on_select_choice_pressed)
	back_button.pressed.connect(_on_back_button_pressed)


func load_scene():
	load_background_from_json("res://data/scenes.json")
	set_back_button_visible(true)


func load_characters():
	load_characters_from_json("res://data/characters.json")


func load_possessions():
	pass


func load_challenges():
	load_challenges_from_json("res://data/challenges.json")


func commit_to_transfer():
	load_choices_from_json("res://data/choices.json")
	card_selection.draw_hand()
	update_ui()
	var greeting_overlay = %GreetingOverlay
	var parts = character.character_name.split("_")
	var piece_name = parts[1].capitalize()
	greeting_overlay.greeting_subtype_name = piece_name
	greeting_overlay.load_greeting_data()


func load_choices_from_json(path: String):
	var preselected_character = $Character
	#print("load_choices_from_json background:", background.background_name)
	#print("load_choices_from_json preselected_character:", preselected_character.character_name)
	#var chess_piece = ChessLogic.get_piece_at_notation(background.background_name)
	#print("load_choices_from_json chess_piece:", chess_piece)

	var choices_data = ActiveRecords.get_active_dictionary_records(path, "choices")
	if typeof(choices_data) == TYPE_ARRAY and choices_data.size() > 0:
		for choice_data in choices_data:
			var characterName = choice_data.get("character", "Unknown")
			#print("load_choices_from_json choice_data.character:", characterName)
			if characterName == preselected_character.character_name:
				var choiceName = choice_data.get("name", "Unknown")
				#print("load_choices_from_json choice_data.name:", choiceName)

				var card = preload("res://tscns/Card.tscn").instantiate()
				card.is_selectable = true
				card.card_name = choiceName
				card.card_icon = choice_data.get("icon", "x")
				card.card_description = choice_data.get("description", "Unknown")

				var textureDir = "res://assets/choices/" + choiceName
				card.card_image_texture = (ActiveRecords.get_random_png_resource_from_dir(
					textureDir
				))
				card.update_ui()
				card.toggled.connect(card_selection._on_card_toggled)
				card_selection.deck_card.append(card)


func load_background_from_json(path: String):
	var data = ActiveRecords.get_active_dictionary_records(path, "scenes")
	#print("Background Data:", data)
	if typeof(data) == TYPE_ARRAY and data.size() > 0:
		background_data = data.pick_random()
		# if character was already selected, use it
		for background_element in data:
			if background.background_name == background_element.get("name", "Unknown"):
				background_data = background_element

		background.background_name = background_data.get("name", "Unknown")
		background.background_description = background_data.get("description", "Unknown")

		var textureDir = "res://assets/scenes/" + background.background_name
		background.background_image.texture = (ActiveRecords.get_random_png_resource_from_dir(
			textureDir
		))
		#print(
		#"Background Data:",
		#"background_databackground.background_image.texture",
		#background.background_image.texture
		#)

		background.update_ui()


func load_characters_from_json(path: String):
	var preselected_character = $Character

	var data = ActiveRecords.get_active_dictionary_records(path, "characters")
	if typeof(data) == TYPE_ARRAY and data.size() > 0:
		for c in data:
			var characterName = c.get("name", "Unknown")
			if characterName == preselected_character.character_name:
				var characterDir = "res://assets/characters/" + characterName
				var png_resource: Resource = ActiveRecords.get_random_png_resource_from_dir(
					characterDir
				)
				preselected_character.is_selectable = false
				preselected_character.character_name = c.get("name", "Unknown")
				preselected_character.character_icon = c.get("icon", "x")
				preselected_character.character_description = c.get("description", "Unknown")
				preselected_character.character_image_texture = png_resource
				preselected_character.update_ui()


func load_challenges_from_json(path: String):
	var preselected_challenge = $Challenge
	#print("load_challenges_from_json preselected_challenge:", preselected_challenge.challenge_name)
	var chess_piece = ChessLogic.get_piece_at_notation(preselected_challenge.challenge_name)
	#print("load_challenges_from_json chess_piece:", chess_piece)
	if !chess_piece.is_empty():
		var challenge_name = (
			chess_piece.color
			+ "_"
			+ chess_piece.type
			+ "_on_a_"
			+ preselected_challenge.challenge_tile
		)
		#print("load_challenges_from_json challenge_name:", challenge_name)
		var challenges_data = ActiveRecords.get_active_dictionary_records(path, "challenges")
		if typeof(challenges_data) == TYPE_ARRAY and challenges_data.size() > 0:
			for challenge_elt in challenges_data:
				var challengeName = challenge_elt.get("name", "Unknown")
				if challengeName == challenge_name:
					var challengeDir = "res://assets/challenges/" + challengeName
					var png_resource: Resource = ActiveRecords.get_random_png_resource_from_dir(
						challengeDir
					)
					preselected_challenge.is_selectable = false
					preselected_challenge.challenge_icon = challenge_elt.get("icon", "x")
					preselected_challenge.challenge_description = (challenge_elt.get(
						"description", "Unknown"
					))
					preselected_challenge.challenge_image_texture = png_resource
					preselected_challenge.update_ui()
	else:
		preselected_challenge.challenge_description = (
			"empty_" + preselected_challenge.challenge_tile
		)
		var textureDir = "res://assets/scenes/" + preselected_challenge.challenge_name
		preselected_challenge.challenge_image_texture = (
			ActiveRecords.get_random_png_resource_from_dir(textureDir)
		)
		preselected_challenge.update_ui()


func _on_select_choice_pressed():
	#var choice = card_selection.selected_card
	#print("_on_select_choice_pressed: choice:", choice, "possessions_data:", possessions_data)

	var preselected_challenge = $Challenge
	#var move_successful =	ChessLogic.make_move_notation(background.background_name, preselected_challenge.challenge_name)

	GlobalState.has_moved = false
	GlobalState.move_from = background.background_name
	GlobalState.move_to = preselected_challenge.challenge_name
	print(
		"_on_select_choice_pressed: make_move_notation: ",
		background.background_name,
		" => ",
		preselected_challenge.challenge_name
	)

	#update_ui()
	#print(
	#"_on_select_choice_pressed: choice:",
	#choice,
	#"possessions_data:",
	#possessions_data,
	#"transfer starting"
	#)
	TransferToScene.transfer_data(
		character.character_name,
		background.background_name,
		challenge.challenge_name,
		possessions_data,
		"res://tscns/SceneSelection.tscn"
	)
	#print(
	#"_on_select_choice_pressed: choice:",
	#choice,
	#"possessions_data:",
	#possessions_data,
	#"transfer finished"
	#)


func update_ui():
	pass


func _on_back_button_pressed():
	TransferToScene.transfer_data(
		character.character_name,
		background.background_name,
		challenge.challenge_name,
		possessions_data,
		"res://tscns/ChallengeSelection.tscn"
	)


func set_back_button_visible(visibleFlag: bool):
	back_button.visible = visibleFlag
