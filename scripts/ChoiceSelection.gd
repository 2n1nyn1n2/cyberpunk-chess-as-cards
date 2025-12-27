extends Node

@onready var background = $Background
@onready var hand = $Hand
@onready var possessions = $Possessions
@onready var challenge = $Challenge
@onready var character = $Character
@onready var select_choice_button = $SelectChoiceContainer/SelectChoice
@onready var scroll_hand_left_button = $ScrollHandLeftContainer/ScrollHandLeft
@onready var scroll_hand_right_button = $ScrollHandRightContainer/ScrollHandRight
@onready var back_button = $BackButton

@export var load_starting_possessions = true

const HAND_SIZE: int = 3
const PLAYER_HAND_PER_CARD_X_OFFSET: int = 640
const PLAYER_HAND_X_OFFSET: int = 96

const POSSESSION_X_OFFSET: int = 192
const POSSESSION_Y_OFFSET: int = 256
const POSSESSION_X_MAX: int = 5

var deck_choices: Array = []
var deck_possessions: Array = []
var discarded_choices: Array = []
var hand_choices: Array = []
var challenge_data: Dictionary
var background_data: Dictionary
var character_data: Dictionary
var possessions_data: Dictionary
var hand_ix: int = 0
var selected_choice: Node


func _ready():
	load_characters()
	select_choice_button.pressed.connect(_on_select_choice_pressed)
	back_button.pressed.connect(_on_back_button_pressed)


func load_scene():
	load_background_from_json("res://data/scenes.json")
	set_back_button_visible(true)


func load_characters():
	load_characters_from_json("res://data/characters.json")


func load_possessions():
	load_possessions_from_json("res://data/possessions.json")


func load_challenges():
	load_challenges_from_json("res://data/challenges.json")


func commit_to_transfer():
	load_choices_from_json("res://data/choices.json")
	draw_hand()
	draw_possessions()
	update_ui()


func load_choices_from_json(path: String):
	var preselected_character = $Character
	#print("load_choices_from_json background:", background.background_name)
	#print("load_choices_from_json preselected_character:", preselected_character.character_name)
	var chess_piece = ChessLogic.get_piece_at_notation(background.background_name)
	#print("load_choices_from_json chess_piece:", chess_piece)

	var choices_data = ActiveRecords.get_active_dictionary_records(path, "choices")
	if typeof(choices_data) == TYPE_ARRAY and choices_data.size() > 0:
		for choice_data in choices_data:
			var characterName = choice_data.get("character", "Unknown")
			#print("load_choices_from_json choice_data.character:", characterName)
			if characterName == preselected_character.character_name:
				var choiceName = choice_data.get("name", "Unknown")
				var choiceDir = "res://assets/choices/" + choiceName
				#print("load_choices_from_json choice_data.name:", choiceName)
				var png_resources: Array[Resource] = ActiveRecords.get_all_png_resources_from_dir(
					choiceDir
				)
				#print(
				#"load_choices_from_json choiceDir:",
				#choiceDir,
				#" png_resources.size():",
				#png_resources.size()
				#)

				for png_resource in png_resources:
					var choice = preload("res://tscns/Choice.tscn").instantiate()
					choice.is_selectable = true
					#choice.choice_icon = choice_data.get("icon", "?")
					choice.choice_name = choice_data.get("name", "Unknown")
					#choice.choice_icon = choice_data.get("icon", "?")
					choice.choice_description = choice_data.get("description", "Unknown")
					choice.choice_image_texture = png_resource
					choice.update_ui()
					choice.toggled.connect(_on_choice_toggled)
					deck_choices.append(choice)

	#print("load_choices_from_json deck_choices.length:", deck_choices.size())


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
		background.background_image.texture = load(background_data.get("texture", ""))
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
				preselected_character.character_icon = c.get("icon", "?")
				preselected_character.character_description = c.get("description", "Unknown")
				preselected_character.character_image_texture = png_resource
				preselected_character.update_ui()


func load_possessions_from_json(path: String):
	var starting_possessions = character_data.get("starting_possessions")
	var data = ActiveRecords.get_active_array_records(path)
	if typeof(data) == TYPE_ARRAY:
		for c in data:
			var possession_name = c.get("name", "Unknown")
			var possession_image_texture_name = c.get("texture", "")
			var possession_image_texture = load(possession_image_texture_name)
			var possession = preload("res://tscns/Possession.tscn").instantiate()
			possession.possession_name = possession_name
			possession.possession_image_texture = possession_image_texture
			var possession_name_child = possession.find_child("PossessionName", true, true)
			possession_name_child.text = possession.possession_name

			if load_starting_possessions:
				possession.possession_count = starting_possessions.get(possession_name, 0)
				possessions_data.set(possession.possession_name, possession.possession_count)
			else:
				possession.possession_count = possessions_data.get(possession.possession_name, 0)

			#if possession.possession_count > 0:
			deck_possessions.append(possession)


func load_challenges_from_json(path: String):
	var preselected_challenge = $Challenge
	print("load_challenges_from_json preselected_challenge:", preselected_challenge.challenge_name)
	var chess_piece = ChessLogic.get_piece_at_notation(preselected_challenge.challenge_name)
	print("load_challenges_from_json chess_piece:", chess_piece)
	if !chess_piece.is_empty():
		var challenge_name = (
			chess_piece.color
			+ "_"
			+ chess_piece.type
			+ "_on_a_"
			+ preselected_challenge.challenge_tile
		)
		print("load_challenges_from_json challenge_name:", challenge_name)
		var challenges_data = ActiveRecords.get_active_dictionary_records(path, "challenges")
		if typeof(challenges_data) == TYPE_ARRAY and challenges_data.size() > 0:
			for challenge_data in challenges_data:
				var challengeName = challenge_data.get("name", "Unknown")
				if challengeName == challenge_name:
					var challengeDir = "res://assets/challenges/" + challengeName
					var png_resource: Resource = ActiveRecords.get_random_png_resource_from_dir(
						challengeDir
					)
					preselected_challenge.is_selectable = true
					#preselected_challenge.challenge_name = challengeName
					#preselected_challenge.challenge_icon = challenge_data.get("icon", "?")
					preselected_challenge.challenge_description = challenge_data.get(
						"description", "Unknown"
					)
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


func draw_hand():
	#print(
	#"ChoiceSelection:",
	#"draw_hand:",
	#" HAND_SIZE:",
	#HAND_SIZE,
	#" hand_choices.size():",
	#hand_choices.size(),
	#" deck_choices.size():",
	#deck_choices.size()
	#)
	remove_all_hand_children()
	var max_hand_size = min(HAND_SIZE, deck_choices.size())
	for i in range(max_hand_size):
		if deck_choices.is_empty():
			break

		var deck_choices_ix: int = (i + hand_ix + deck_choices.size()) % deck_choices.size()
		#print(
		#"ChoiceSelection:",
		#"draw_hand:",
		#" i:",
		#i,
		#" hand_ix:",
		#hand_ix,
		#" deck_choices_ix:",
		#deck_choices_ix
		#)

		var choice = deck_choices[deck_choices_ix]
		hand.add_child(choice)
		hand_choices.append(choice)

		choice.update_ui()

	for i in range(hand_choices.size()):
		var choice = hand_choices[i]
		var pos = choice.position
		pos.x = PLAYER_HAND_X_OFFSET + (PLAYER_HAND_PER_CARD_X_OFFSET * i)
		choice.position = pos

	scroll_hand_left_button.disabled = hand_ix == 0
	scroll_hand_right_button.disabled = hand_ix == (deck_choices.size() - HAND_SIZE)


func remove_all_hand_children():
	var children = hand.get_children()

	for child in children:
		if is_instance_valid(child):
			hand.remove_child(child)
	hand_choices.clear()


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


func _on_select_choice_pressed():
	var choice = selected_choice
	print("_on_select_choice_pressed: choice:", choice, "possessions_data:", possessions_data)

	var preselected_challenge = $Challenge
	var move_successful = ChessLogic.make_move_notation(
		background.background_name, preselected_challenge.challenge_name
	)

	print(
		"_on_select_choice_pressed: make_move_notation: ",
		background.background_name,
		" => ",
		preselected_challenge.challenge_name,
		" move_successful:",
		move_successful
	)

	if move_successful:
		choice.update_costs(possessions_data)
		choice.update_rewards(possessions_data)
		for i in range(deck_possessions.size()):
			var possession = deck_possessions[i]
			possession.possession_count = possessions_data.get(possession.possession_name, 0)

	hand.remove_child(choice)
	hand_choices.erase(choice)
	discarded_choices.append(choice)
	update_ui()
	print(
		"_on_select_choice_pressed: choice:",
		choice,
		"possessions_data:",
		possessions_data,
		"transfer starting"
	)
	TransferToScene.transfer_data(
		character.character_name,
		background.background_name,
		challenge.challenge_name,
		possessions_data,
		"res://tscns/SceneSelection.tscn"
	)
	print(
		"_on_select_choice_pressed: choice:",
		choice,
		"possessions_data:",
		possessions_data,
		"transfer finished"
	)


func _on_choice_toggled(state_owner: Node, state: bool):
	print(
		"_on_choice_toggled: state_owner:",
		state_owner,
		" is_toggled:",
		state,
		" hand_choices.size():",
		hand_choices.size()
	)

	selected_choice = null
	select_choice_button.disabled = true

	for i in range(hand_choices.size()):
		var choice = hand_choices[i]
		#print("_on_choice_toggled: choice:", choice, " is_toggled:", choice.is_toggled)
		if state && state_owner == choice:
			choice.set_toggled_state(true)
			selected_choice = choice
		else:
			choice.set_toggled_state(false)

	if selected_choice == null:
		select_choice_button.disabled = true
		print("_on_choice_toggled: selected_choice:", selected_choice)
	else:
		print(
			"_on_choice_toggled: selected_choice:",
			selected_choice,
			" choice_name:",
			selected_choice.choice_name
		)
		select_choice_button.disabled = false


func _on_scroll_hand_left_pressed():
	hand_ix -= 1
	draw_hand()


func _on_scroll_hand_right_pressed():
	hand_ix += 1
	draw_hand()


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
