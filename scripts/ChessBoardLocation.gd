extends Control

signal toggled(board_location_node)

@export var board_location_name: String = "Board Location"
@export var board_location_tile: String = "Tile"
@export var board_location_description: String = "Board Location Description"
@export var board_location_image_texture: Resource
@export var board_location_challenge_name: String = ""
@export var board_location_challenge_icon: String = ""
@export var board_location_challenge_image_texture: Resource
@export var is_selectable = false

var is_toggled = false
var is_hovering = false
var is_defender = false
var is_attacker = false
var is_blocked = false

const COLOR_OFF = Color.DARK_GRAY
const COLOR_ON = Color.GREEN
const COLOR_HOVER = Color.LIGHT_GRAY
const COLOR_DEFENDER = Color.LIGHT_BLUE
const COLOR_ATTACKER = Color.LIGHT_GREEN
const COLOR_BLOCKED = Color.HOT_PINK

var board_location_name_label_stylebox_white = StyleBoxFlat.new()
var board_location_name_label_stylebox_black = StyleBoxFlat.new()


func _ready():
	var board_location_background_rect = $Background
	board_location_background_rect.color = COLOR_OFF

	board_location_name_label_stylebox_white.bg_color = Color.WHITE
	board_location_name_label_stylebox_black.bg_color = Color.BLACK

	var board_location_name_label = $BoardLocationName
	board_location_name_label.add_theme_stylebox_override(
		"normal", board_location_name_label_stylebox_white
	)

	#var chess_font = load("res://fonts/OpenChessFont.ttf")
	#var board_location_challenge_icon_label = $BoardLocationChallengeIcon
	#if chess_font:
	#board_location_challenge_icon_label.add_theme_font_override("font", chess_font)
	#else:
	#print("Error: Could not find font file at res://fonts/OpenChessFont.ttf")


func update_ui():
	var board_location_image = $BoardLocationImage
	var board_location_name_label = $BoardLocationName
	var board_location_description_label = $BoardLocationDescription
	var board_location_background_rect = $Background
	var board_location_challenge_image = $BoardLocationChallengeImage
	var board_location_challenge_icon_label = $BoardLocationChallengeIcon
	var board_location_challenge_background_rect = $BoardLocationChallengeIconBackground

	board_location_challenge_background_rect.visible = false

	board_location_challenge_icon_label.add_theme_color_override("font_color", Color.BLACK)
	board_location_challenge_background_rect.color = Color.WHITE
	board_location_challenge_background_rect.visible = true

	if board_location_tile == "black_tile":
		board_location_background_rect.color = Color.BLACK
		board_location_name_label.add_theme_color_override("font_color", Color.WHITE)
		board_location_name_label.add_theme_stylebox_override(
			"normal", board_location_name_label_stylebox_black
		)
	if board_location_tile == "white_tile":
		board_location_background_rect.color = Color.WHITE
		board_location_name_label.add_theme_color_override("font_color", Color.BLACK)
		board_location_name_label.add_theme_stylebox_override(
			"normal", board_location_name_label_stylebox_white
		)

	#print("scene:", board_location_image_texture, " board_location_image:", board_location_image)
	if board_location_image_texture:
		board_location_image.texture = board_location_image_texture

	if board_location_challenge_image_texture:
		board_location_challenge_image.texture = board_location_challenge_image_texture

	if board_location_name:
		board_location_name_label.text = "%s" % [board_location_name]

	if board_location_description:
		board_location_description_label.text = ("%s" % [board_location_description])

	if board_location_challenge_icon:
		board_location_challenge_icon_label.text = ("%s" % [board_location_challenge_icon])

		if (
			board_location_challenge_icon == " "
			|| board_location_challenge_icon == "x"
			|| board_location_challenge_icon == "z"
		):
			board_location_challenge_icon_label.visible = false
			board_location_challenge_background_rect.visible = false
		else:
			board_location_challenge_icon_label.visible = true
			board_location_challenge_background_rect.visible = true

	#print(
	#"board_location_name ",
	#board_location_name,
	#" ",
	#"board_location_challenge_icon ",
	#board_location_challenge_icon
	#)
	#board_location_challenge_icon_label.visible = false
	#board_location_challenge_background_rect.visible = false


func _gui_input(event):
	if !is_selectable:
		return
	if event is InputEventMouseButton:
		if event.button_index == MOUSE_BUTTON_LEFT and event.pressed:
			toggle()
			# Consumes the event so other nodes don't receive it
			get_viewport().set_input_as_handled()


func set_toggled_state(state: bool):
	is_toggled = state
	update_visuals()


func set_defender_state(state: bool):
	is_defender = state
	update_visuals()


func set_attacker_state(state: bool):
	is_attacker = state
	update_visuals()


func set_blocked_state(state: bool):
	is_blocked = state
	update_visuals()


func toggle():
	is_toggled = !is_toggled
	#print("BoardLocation Toggle State: ", is_toggled)
	emit_signal("toggled", self, is_toggled)


func update_visuals():
	var board_location_background_rect = $Background
	if is_blocked:
		board_location_background_rect.color = COLOR_BLOCKED
	elif is_toggled:
		board_location_background_rect.color = COLOR_ON
	elif is_hovering:
		board_location_background_rect.color = COLOR_HOVER
	elif is_attacker:
		board_location_background_rect.color = COLOR_ATTACKER
	elif is_defender:
		board_location_background_rect.color = COLOR_DEFENDER
	else:
		board_location_background_rect.color = COLOR_OFF
		if board_location_tile == "black_tile":
			board_location_background_rect.color = Color.BLACK
		if board_location_tile == "white_tile":
			board_location_background_rect.color = Color.WHITE


func _mouse_entered():
	if !is_selectable:
		return
	is_hovering = true
	update_visuals()


func _mouse_exited():
	if !is_selectable:
		return
	is_hovering = false
	update_visuals()
