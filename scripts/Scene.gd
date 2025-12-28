extends Control

signal toggled(scene_node)

@export var scene_name: String = "Scene"
@export var scene_tile: String = "Tile"
@export var scene_description: String = "Scene Description"
@export var scene_image_texture: Resource
@export var scene_challenge_name: String = ""
@export var scene_challenge_icon: String = ""
@export var scene_challenge_image_texture: Resource
@export var is_selectable = false

var is_toggled = false
var is_hovering = false
var is_defender = false
var is_blocked = false

const COLOR_OFF = Color.DARK_GRAY
const COLOR_ON = Color.LIGHT_GREEN
const COLOR_HOVER = Color.LIGHT_GRAY
const COLOR_DEFENDER = Color.BLUE
const COLOR_BLOCKED = Color.HOT_PINK


func _ready():
	var scene_background_rect = $Background
	scene_background_rect.color = COLOR_OFF

	var chess_font = load("res://fonts/OpenChessFont.ttf")
	var scene_challenge_icon_label = $SceneChallengeIcon
	if chess_font:
		scene_challenge_icon_label.add_theme_font_override("font", chess_font)
	else:
		print("Error: Could not find font file at res://fonts/OpenChessFont.ttf")


func update_ui():
	var scene_image = $SceneImage
	var scene_name_label = $SceneName
	var scene_description_label = $SceneDescription
	var scene_background_rect = $Background
	var scene_challenge_image = $SceneChallengeImage
	var scene_challenge_icon_label = $SceneChallengeIcon
	var scene_challenge_background_rect = $SceneChallengeIconBackground

	scene_challenge_background_rect.visible = false

	if scene_tile == "black_tile":
		scene_background_rect.color = Color.BLACK
		scene_challenge_background_rect.color = Color.BLACK
		scene_challenge_background_rect.visible = true
		scene_name_label.add_theme_color_override("font_color", Color.WHITE)
		scene_challenge_icon_label.add_theme_color_override("font_color", Color.WHITE)
	if scene_tile == "white_tile":
		scene_background_rect.color = Color.WHITE
		scene_challenge_background_rect.color = Color.WHITE
		scene_challenge_background_rect.visible = true
		scene_name_label.add_theme_color_override("font_color", Color.BLACK)
		scene_challenge_icon_label.add_theme_color_override("font_color", Color.BLACK)

	#print("scene:", scene_image_texture, " scene_image:", scene_image)
	if scene_image_texture:
		scene_image.texture = scene_image_texture

	if scene_challenge_image_texture:
		scene_challenge_image.texture = scene_challenge_image_texture

	if scene_name:
		scene_name_label.text = "%s" % [scene_name]

	if scene_description:
		scene_description_label.text = "%s" % [scene_description]

	if scene_challenge_icon:
		scene_challenge_icon_label.text = "%s" % [scene_challenge_icon]

		if scene_challenge_icon == " ":
			scene_challenge_background_rect.visible = false
		else:
			scene_challenge_background_rect.visible = true


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


func set_blocked_state(state: bool):
	is_blocked = state
	update_visuals()


func toggle():
	is_toggled = !is_toggled
	print("Scene Toggle State: ", is_toggled)
	emit_signal("toggled", self, is_toggled)


func update_visuals():
	var scene_background_rect = $Background
	if is_blocked:
		scene_background_rect.color = COLOR_BLOCKED
	elif is_toggled:
		scene_background_rect.color = COLOR_ON
	elif is_hovering:
		scene_background_rect.color = COLOR_HOVER
	elif is_defender:
		scene_background_rect.color = COLOR_DEFENDER
	else:
		scene_background_rect.color = COLOR_OFF
		if scene_tile == "black_tile":
			scene_background_rect.color = Color.BLACK
		if scene_tile == "white_tile":
			scene_background_rect.color = Color.WHITE


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
