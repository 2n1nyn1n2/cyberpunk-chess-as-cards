extends Node

@onready var background = $Background
@onready var hand = $Hand
@onready var select_character_button = $SelectCharacterContainer/SelectCharacter
@onready var scroll_hand_left_button = $ScrollHandLeftContainer/ScrollHandLeft
@onready var scroll_hand_right_button = $ScrollHandRightContainer/ScrollHandRight
@onready var back_button = $BackButton

@export var load_starting_possessions = true

const HAND_SIZE: int = 3
const PLAYER_HAND_PER_CARD_X_OFFSET: int = 640
const PLAYER_HAND_X_OFFSET: int = 96

var deck_characters: Array = []
var hand_characters: Array = []
var background_data: Dictionary
var selected_character: Node
var hand_ix: int = 0
var possessions_data: Dictionary


func _ready():
	select_character_button.pressed.connect(_on_select_character_pressed)
	scroll_hand_left_button.pressed.connect(_on_scroll_hand_left_pressed)
	scroll_hand_right_button.pressed.connect(_on_scroll_hand_right_pressed)
	back_button.pressed.connect(_on_back_button_pressed)


func load_scene():
	load_background_from_json("res://data/scenes.json")
	set_back_button_visible(true)


func load_characters():
	load_characters_from_json("res://data/characters.json")
	draw_hand()


func load_possessions():
	pass


func commit_to_transfer():
	pass


func _on_character_toggled(state_owner: Node, state: bool):
	print(
		"_on_character_toggled: state_owner:",
		state_owner,
		" is_toggled:",
		state,
		" deck_characters.size():",
		deck_characters.size()
	)

	selected_character = null
	select_character_button.disabled = true

	for i in range(deck_characters.size()):
		var character = deck_characters[i]
		#print("_on_character_toggled: character:", character, " is_toggled:", character.is_toggled)
		if state && state_owner == character:
			character.set_toggled_state(true)
			selected_character = character
		else:
			character.set_toggled_state(false)

	if selected_character == null:
		select_character_button.disabled = true
		print("_on_character_toggled: selected_character:", selected_character)
	else:
		print(
			"_on_character_toggled: selected_character:",
			selected_character,
			" character_name:",
			selected_character.character_name
		)
		select_character_button.disabled = false


func load_background_from_json(path: String):
	var data = ActiveRecords.get_active_dictionary_records(path, "scenes")
	if typeof(data) == TYPE_ARRAY and data.size() > 0:
		background_data = data.pick_random()

		# if character was already selected, use it
		for background_element in data:
			if background.background_name == background_element.get("name", "Unknown"):
				background_data = background_element

		var name = background_data.get("name", "Unknown")

		background.background_name = name
		background.background_description = background_data.get("description", "Unknown")

		var textureDir = "res://assets/scenes/" + name
		background.background_image.texture = ActiveRecords.get_random_png_resource_from_dir(
			textureDir
		)
		background.update_ui()


func load_characters_from_json(path: String):
	var preselected_character = $Character

	var data = ActiveRecords.get_active_dictionary_records(path, "characters")
	if typeof(data) == TYPE_ARRAY and data.size() > 0:
		for c in data:
			var characterName = c.get("name", "Unknown")
			if characterName == preselected_character.character_name:
				var characterDir = "res://assets/characters/" + characterName
				var png_resources: Array[Resource] = ActiveRecords.get_all_png_resources_from_dir(
					characterDir
				)
				for png_resource in png_resources:
					var character = preload("res://tscns/Character.tscn").instantiate()
					character.is_selectable = true
					character.character_name = c.get("name", "Unknown")
					character.character_icon = c.get("icon", "?")
					character.character_description = c.get("description", "Unknown")
					character.character_image_texture = png_resource
					character.update_ui()
					character.toggled.connect(_on_character_toggled)
					deck_characters.append(character)


func draw_hand():
	print(
		"CharacterSelection:",
		"draw_hand:",
		" HAND_SIZE:",
		HAND_SIZE,
		" hand_characters.size():",
		hand_characters.size(),
		" deck_characters.size():",
		deck_characters.size()
	)
	remove_all_hand_children()
	var max_hand_size = min(HAND_SIZE, deck_characters.size())
	for i in range(max_hand_size):
		if deck_characters.is_empty():
			break

		var deck_characters_ix: int = (
			(i + hand_ix + deck_characters.size()) % deck_characters.size()
		)
		print(
			"CharacterSelection:",
			"draw_hand:",
			" i:",
			i,
			" hand_ix:",
			hand_ix,
			" deck_characters_ix:",
			deck_characters_ix
		)

		var character = deck_characters[deck_characters_ix]
		hand.add_child(character)
		hand_characters.append(character)

		character.update_ui()

	for i in range(hand_characters.size()):
		var character = hand_characters[i]
		var pos = character.position
		pos.x = PLAYER_HAND_X_OFFSET + (PLAYER_HAND_PER_CARD_X_OFFSET * i)
		character.position = pos

	scroll_hand_left_button.disabled = hand_ix == 0
	scroll_hand_right_button.disabled = hand_ix == (deck_characters.size() - HAND_SIZE)


func _on_select_character_pressed():
	TransferToScene.transfer_data(
		selected_character.character_name,
		background.background_name,
		"",
		possessions_data,
		"res://tscns/ChallengeSelection.tscn"
	)


func _on_scroll_hand_left_pressed():
	hand_ix -= 1
	draw_hand()


func _on_scroll_hand_right_pressed():
	hand_ix += 1
	draw_hand()


func update_ui():
	pass


func remove_all_hand_children():
	var children = hand.get_children()

	for child in children:
		if is_instance_valid(child):
			hand.remove_child(child)
	hand_characters.clear()


func _on_back_button_pressed():
	TransferToScene.transfer_data(
		selected_character.character_name if is_instance_valid(selected_character) else "",
		background.background_name,
		"",
		possessions_data,
		"res://tscns/SceneSelection.tscn"
	)


func set_back_button_visible(visibleFlag: bool):
	back_button.visible = visibleFlag
