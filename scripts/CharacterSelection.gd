extends Node

@onready var background = $Background
@onready var select_character_button = $CardSelection/%SelectCard
@onready var back_button = $Background/BackButton
@onready var card_selection = $CardSelection

var background_data: Dictionary
var possessions_data: Dictionary


func _ready():
	select_character_button.text = "Select Character"
	select_character_button.pressed.connect(_on_select_character_pressed)
	back_button.pressed.connect(_on_back_button_pressed)


func load_scene():
	load_background_from_json("res://data/scenes.json")
	set_back_button_visible(true)


func load_characters():
	load_characters_from_json("res://data/characters.json")
	card_selection.draw_hand()


func load_possessions():
	pass


func commit_to_transfer():
	var greeting_overlay = %GreetingOverlay
	var preselected_character = $Character
	var parts = preselected_character.character_name.split("_")
	var piece_name = parts[1].capitalize()
	greeting_overlay.greeting_subtype_name = piece_name
	greeting_overlay.load_greeting_data()
	pass


func load_background_from_json(path: String):
	var data = ActiveRecords.get_active_dictionary_records(path, "scenes")
	if typeof(data) == TYPE_ARRAY and data.size() > 0:
		background_data = data.pick_random()

		# if character was already selected, use it
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


func load_characters_from_json(path: String):
	var preselected_character = $Character
	var preselected_character_names: Dictionary
	preselected_character_names.set(preselected_character.character_name, true)
	var preselected_character_choice_names: Dictionary
	card_selection.load_from_json(
		path,
		preload("res://tscns/Card.tscn"),
		"characters",
		preselected_character_names,
		"choices",
		preselected_character_choice_names
	)


func _on_select_character_pressed():
	var selected_character = card_selection.selected_card
	TransferToScene.transfer_data(
		selected_character.card_name,
		background.background_name,
		"",
		possessions_data,
		"res://tscns/ChallengeSelection.tscn"
	)


func update_ui():
	pass


func _on_back_button_pressed():
	var selected_character = card_selection.selected_card
	TransferToScene.transfer_data(
		selected_character.card_name if is_instance_valid(selected_character) else "",
		background.background_name,
		"",
		possessions_data,
		"res://tscns/SceneSelection.tscn"
	)


func set_back_button_visible(visibleFlag: bool):
	back_button.visible = visibleFlag
