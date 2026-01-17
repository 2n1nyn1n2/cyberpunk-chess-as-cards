extends Node

@onready var ui_container: MarginContainer = %GreetingOverlayUI

@export_file("*.json") var scene_greeting_file: String = "res://data/greetings/default.json"
@export var greeting_subtype: String = ""

var greeting_subtype_name: String = ""
var greetings_entry: Dictionary


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	# Connect to the window resize signal
	get_tree().root.size_changed.connect(_on_window_resized)
	_on_window_resized()


func load_greeting_data():
	var greetings_data: Dictionary = load_greeting_data_from_json(scene_greeting_file)
	setup_greeting(greetings_data)


func load_greeting_data_from_json(path: String) -> Dictionary:
	# 1. Check if the file even exists before trying to open it
	if not FileAccess.file_exists(path):
		push_error("GREETING_LOAD_ERROR: File not found at path: " + path)
		return {}

	var file = FileAccess.open(path, FileAccess.READ)

	# 2. Check if the file opened correctly (permissions/corruption)
	if file == null:
		push_error(
			(
				"GREETING_LOAD_ERROR: Could not open file. Error code: "
				+ str(FileAccess.get_open_error())
			)
		)
		return {}

	var json = JSON.new()
	var error = json.parse(file.get_as_text())

	# 3. Handle JSON syntax errors
	if error == OK:
		var data = json.data
		if typeof(data) == TYPE_DICTIONARY:
			return data
		else:
			push_error("GREETING_LOAD_ERROR: JSON is valid but root is not a Dictionary.")
			return {}
	else:
		# This gives you the exact line number where your JSON is broken
		push_error(
			(
				"GREETING_LOAD_ERROR: JSON Parse Error: "
				+ json.get_error_message()
				+ " at line "
				+ str(json.get_error_line())
			)
		)

	return {}


func setup_greeting(greetings_data: Dictionary):
	var greeting_overlay = %GreetingOverlay
	greeting_overlay.visible = true
	if greetings_data.has("greetings") and greetings_data["greetings"] is Array:
		var greetings_list = greetings_data["greetings"]
		if GlobalState.greetings_style == "":
			greetings_entry = greetings_list.pick_random()
			GlobalState.greetings_style = greetings_entry.style
		else:
			for greetings_list_entry in greetings_list:
				if GlobalState.greetings_style == greetings_list_entry.get("style"):
					greetings_entry = greetings_list_entry

		#print(
		#"setup_greeting ",
		#"GlobalState.greetings_style, " + GlobalState.greetings_style,
		#" greetings_entry, " + str(greetings_entry)
		#)
		if not greeting_subtype.is_empty() and greeting_subtype_name.is_empty():
			greeting_overlay.visible = false
			return

		if not greeting_subtype.is_empty() and not greeting_subtype_name.is_empty():
			#print("setup_greeting ",
			#" greeting_subtype, " + greeting_subtype,
			#" greeting_subtype_name, " + greeting_subtype_name
			#)
			greetings_entry = greetings_entry.get(greeting_subtype)
			#print("setup_greeting ",
			#"random_entry(1), " + str(random_entry)
			#)
			if !greetings_entry.has(greeting_subtype_name):
				push_error(
					"Failed to find '" + greeting_subtype_name + "' in " + str(greetings_entry)
				)
			greetings_entry = greetings_entry.get(greeting_subtype_name)
			#print("setup_greeting ",
			#"random_entry(2), " + str(random_entry)
			#)

		var greeting_title = %GreetingTitle
		var greeting_label = %GreetingLabel
		var greeting_close_button = %GreetingCloseButton
		greeting_title.add_theme_color_override("font_color", Color.BLACK)
		greeting_title.add_theme_font_size_override("font_size", 128)
		greeting_label.add_theme_color_override("font_color", Color.BLACK)
		greeting_label.add_theme_font_size_override("font_size", 96)
		greeting_close_button.add_theme_color_override("font_color", Color.BLACK)
		greeting_close_button.add_theme_font_size_override("font_size", 96)
		setup_button_style(greeting_close_button, "normal", Color.LIGHT_GREEN)
		setup_button_style(greeting_close_button, "hover", Color.BLACK)

		greeting_title.text = GlobalState.greetings_style
		var main_text = "\n".join(greetings_entry["text"])
		var request_text = "\n".join(greetings_entry["request"])
		greeting_label.text = main_text + "\n\n" + request_text

		greeting_close_button.text = greetings_entry["button_text"]

		if not greeting_close_button.pressed.is_connected(_on_continue_button_pressed):
			greeting_close_button.pressed.connect(_on_continue_button_pressed)
	else:
		push_error("Failed to find 'greetings' array in JSON data.")


func setup_button_style(button: Button, state_name: String, color: Color):
	var style = button.get_theme_stylebox(state_name).duplicate()
	style.bg_color = color
	button.add_theme_stylebox_override(state_name, style)


func _on_continue_button_pressed():
	GlobalState.has_seen_greeting = true
	var greeting_overlay = %GreetingOverlay
	greeting_overlay.visible = false


func set_greeting_overlay_visible(flag: bool):
	var greeting_overlay = %GreetingOverlay
	greeting_overlay.visible = flag


func _on_window_resized() -> void:
	# Get the actual visible area of the game window
	var viewport_size = get_viewport().get_visible_rect().size
	var screen_width = viewport_size.x

	# Calculate 10% for each side to leave 80% in the middle
	var margin_value = screen_width * 0.05

	# Apply the margins to the MarginContainer
	ui_container.add_theme_constant_override("margin_left", margin_value)
	ui_container.add_theme_constant_override("margin_right", margin_value)
