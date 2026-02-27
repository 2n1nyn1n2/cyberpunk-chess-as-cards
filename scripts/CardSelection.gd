extends Node

@onready var select_card_button = %SelectCard
@onready var scroll_hand_left_button = %ScrollHandLeft
@onready var scroll_hand_right_button = %ScrollHandRight
@onready var hand_control = %Hand

const HAND_SIZE: int = 4
const HAND_PER_CARD_X_OFFSET: int = 512
const HAND_X_OFFSET: int = 0

var hand_ix: int = 0

var deck_card: Array = []
var hand_card: Array = []
var selected_card: Node


func _ready():
	select_card_button.pressed.connect(_on_select_card_pressed)
	scroll_hand_left_button.pressed.connect(_on_scroll_hand_left_pressed)
	scroll_hand_right_button.pressed.connect(_on_scroll_hand_right_pressed)
	var select_card_button_style = select_card_button.get_theme_stylebox("normal").duplicate()
	select_card_button_style.bg_color = Color.LIGHT_GREEN
	select_card_button.add_theme_stylebox_override("normal", select_card_button_style)
	select_card_button.add_theme_color_override("font_color", Color.BLACK)
	pass


func draw_hand():
	var active_deck_card: Array = []
	for ix in range(deck_card.size()):
		var card = deck_card[ix]
		active_deck_card.append(card)

	#print(
	#"CardSelection:",
	#"draw_hand:",
	#" HAND_SIZE:",
	#HAND_SIZE,
	#" hand_card.size():",
	#hand_card.size(),
	#" deck_card.size():",
	#deck_card.size(),
	#" active_deck_card.size():",
	#active_deck_card.size()
	#)
	remove_all_hand_children()
	var hand_size = min(HAND_SIZE, active_deck_card.size())
	for ix in range(hand_size):
		if deck_card.is_empty():
			break

		var deck_array_ix: int = (ix + hand_ix + active_deck_card.size()) % active_deck_card.size()
		var card = active_deck_card[deck_array_ix]
		#print(
		#"CardSelection:",
		#"draw_hand:",
		#" ix:",
		#ix,
		#" hand_ix:",
		#hand_ix,
		#" deck_array_ix:",
		#deck_array_ix,
		#" card.card_name:",
		#card.card_name,
		#" card.is_toggled:",
		#card.is_toggled
		#)

		hand_control.add_child(card)
		hand_card.append(card)

	for ix in range(hand_card.size()):
		var card = hand_card[ix]
		var pos = card.position
		pos.x = HAND_X_OFFSET + (HAND_PER_CARD_X_OFFSET * ix)
		card.position = pos

	scroll_hand_left_button.disabled = hand_ix == 0
	scroll_hand_right_button.disabled = (hand_ix == (active_deck_card.size() - hand_size))


func remove_all_hand_children():
	var children = hand_control.get_children()

	for child in children:
		if is_instance_valid(child):
			hand_control.remove_child(child)
	hand_card.clear()


func _on_card_toggled(state_owner: Node, state: bool):
	#print(
	#"_on_card_toggled: state_owner:",
	#state_owner,
	#" is_toggled:",
	#state,
	#" deck_scenes.size():",
	#deck_scenes.size()
	#)

	var card_name = state_owner.card_name
	set_selected_card(card_name, state)


func set_selected_card(card_name: String, state: bool):
	selected_card = null
	select_card_button.disabled = true

	var chess_moves: Array[String] = ChessLogic.get_legal_moves_by_name(card_name)

	for ix in range(deck_card.size()):
		var card = deck_card[ix]
		#print("_on_scene_toggled: character:", character, " is_toggled:", character.is_toggled)
		if state && (card_name == card.card_name):
			selected_card = card
			card.set_toggled_state(true)
			card.set_blocked_state(chess_moves.size() == 0)
			card.set_defender_state(false)
		else:
			card.set_toggled_state(false)
			card.set_blocked_state(false)
			card.set_defender_state(state && chess_moves.has(card.card_name))

	#for ix in range(hand_card.size()):
	#var card = hand_card[ix]
	#if state && (card_name == card.card_name):
	#hand_ix = ix

	#draw_hand()

	#print(
	#"_on_scene_toggled: state_owner.scene_name:",
	#state_owner.scene_name,
	#" chess_moves:",
	#chess_moves
	#)

	if selected_card == null:
		select_card_button.disabled = true
		#print("_on_scene_toggled: selected_scene:", selected_scene)
	else:
		#print(
		#"_on_scene_toggled: selected_scene:",
		#selected_scene,
		#" scene_name:",
		#selected_scene.scene_name
		#)
		select_card_button.disabled = false


func load_from_json(
	json_path: String,
	tscn: Resource,
	key: String,
	typeDictionary: Dictionary,
	subtype_key: String,
	subtypeDictionary: Dictionary
):
	var data_array = ActiveRecords.get_active_dictionary_records(json_path, key)
	if typeof(data_array) == TYPE_ARRAY and data_array.size() > 0:
		for data_elt in data_array:
			var cardName = data_elt.get("name", "Unknown")
			if typeDictionary.has(cardName):
				var cardDir = "res://assets/" + key + "/" + cardName
				var card_png_resource: Resource = ActiveRecords.get_random_png_resource_from_dir(
					cardDir
				)

				var card = tscn.instantiate()
				card.is_selectable = true
				card.card_type = key
				card.card_subtype = ""
				card.card_name = data_elt.get("name", "Unknown")
				card.card_icon = data_elt.get("icon", "x")
				card.card_description = data_elt.get("description", "Unknown")
				card.card_image_texture = card_png_resource

				if subtypeDictionary.has(cardName):
					var card_sub_type_data_elt = subtypeDictionary.get(cardName)
					var cardSubTypeName = card_sub_type_data_elt.get("name", "Unknown")
					var cardSubTypeIcon = card_sub_type_data_elt.get("icon", "?")
					var cardSubtypeDir = "res://assets/" + subtype_key + "/" + cardSubTypeName
					var card_subtype_png_resource: Resource = (
						ActiveRecords.get_random_png_resource_from_dir(cardSubtypeDir)
					)
					card.card_subtype = cardSubTypeName
					card.card_icon = cardSubTypeIcon
					card.card_subtype_image_texture = card_subtype_png_resource
					#print("CardSelection:load_from_json: cardName:", cardName, " cardSubTypeName:", cardSubTypeName, " subtype_key:", subtype_key, " card_subtype_png_resource:", card_subtype_png_resource, " data_elt:", data_elt)

				card.update_ui()
				card.toggled.connect(_on_card_toggled)
				deck_card.append(card)


func _on_select_card_pressed():
	pass


func _on_scroll_hand_left_pressed():
	hand_ix -= 1
	draw_hand()


func _on_scroll_hand_right_pressed():
	hand_ix += 1
	draw_hand()


func scroll_to_card(card_name: String):
	#print(
	#"CardSelection:",
	#"scroll_to_card:",
	#" card_name:",
	#card_name
	#)
	hand_ix = 0
	var card_in_hand: bool = false
	while (!card_in_hand) && (!scroll_hand_right_button.disabled):
		draw_hand()
		for ix in range(hand_card.size()):
			var card = hand_card[ix]

			#print(
			#"CardSelection:",
			#"scroll_to_card:",
			#" card.name:",
			#card.card_name
			#)
			if card.card_name == card_name:
				card_in_hand = true
				break
		if !card_in_hand:
			hand_ix += 1
			draw_hand()


func set_hand_visible(visible: bool):
	var children = hand_control.get_children()
	if visible:
		hand_control.mouse_filter = Control.MOUSE_FILTER_STOP
	else:
		hand_control.mouse_filter = Control.MOUSE_FILTER_IGNORE

	for child in children:
		child.visible = visible


func _gui_input(event):
	#print("CardSelection _gui_input ", event)
	if event is InputEventMouseButton:
		if event.button_index == MOUSE_BUTTON_LEFT and event.pressed:
			get_viewport().set_input_as_handled()
