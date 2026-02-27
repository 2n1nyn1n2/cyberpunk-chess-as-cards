extends Control

signal toggled(card_node)

@export var card_name: String = "Name"
@export var card_type: String = "Type"
@export var card_subtype: String = "Subtype"
@export var card_icon: String = "Icon"
@export var card_description: String = "Description"
@export var card_image_texture: Resource
@export var card_subtype_image_texture: Resource
@export var is_selectable = false

var is_toggled = false
var is_hovering = false

const COLOR_OFF = Color.DARK_GRAY
const COLOR_ON = Color.LIGHT_GREEN
const COLOR_HOVER = Color.LIGHT_GRAY


func _ready():
	pass


func update_ui():
	var card_background_rect = $Background
	card_background_rect.color = COLOR_OFF

	var card_image = $Image
	var card_subtype_image = $SubtypeImage
	var card_name_label = $Name
	var card_type_label = $Type
	var card_subtype_label = $Subtype
	var card_icon_label = $Icon
	var card_description_label = $Description

	if card_image_texture:
		card_image.texture = card_image_texture

	if card_subtype_image_texture:
		card_subtype_image.texture = card_subtype_image_texture

	if card_name_label:
		card_name_label.text = "%s" % [card_name]

	if card_type_label:
		card_type_label.text = "%s" % [card_type]

	if card_subtype_label:
		card_subtype_label.text = "%s" % [card_subtype]

	if card_icon_label:
		card_icon_label.text = "%s" % [card_icon]

	if card_description_label:
		card_description_label.text = "%s" % [card_description]


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


func toggle():
	is_toggled = !is_toggled
	#print("Card ", card_type, " ", card_subtype, " Toggle State: ", is_toggled)
	emit_signal("toggled", self, is_toggled)


func update_visuals():
	var card_background_rect = $Background
	if is_toggled:
		card_background_rect.color = COLOR_ON
	elif is_hovering:
		card_background_rect.color = COLOR_HOVER
	else:
		card_background_rect.color = COLOR_OFF


func _mouse_entered():
	if !is_selectable:
		return
	is_hovering = true
	update_visuals()


# Called when the mouse pointer leaves the control node's area
func _mouse_exited():
	if !is_selectable:
		return
	is_hovering = false
	update_visuals()


func set_blocked_state(_state: bool):
	pass


func set_defender_state(_state: bool):
	pass
