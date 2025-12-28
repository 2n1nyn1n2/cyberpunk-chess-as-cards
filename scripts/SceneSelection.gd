extends Node

@onready var background = $Background
@onready var scenes = $Scenes
@onready var possessions = $Possessions
@onready var select_scene_button = $SelectSceneContainer/SelectScene
@onready var back_button = $BackButton

@export var load_starting_possessions = true

const SCENE_X_INITIALOFFSET: int = 512
const SCENE_X_OFFSET: int = 128
const SCENE_Y_OFFSET: int = 128
const SCENE_X_MAX: int = 8

const POSSESSION_X_OFFSET: int = 192
const POSSESSION_Y_OFFSET: int = 256
const POSSESSION_X_MAX: int = 5

var deck_possessions: Array = []
var deck_scenes: Array = []
var selected_scene: Node
var possessions_data: Dictionary
var challenges_data: Dictionary
var background_data: Dictionary


func _ready():
	## for debugging
	#ChessLogic.make_move_notation("a2", "a4")
	#ChessLogic.make_move_notation("b7", "b5")

	load_background_from_json("res://data/scenes.json")
	select_scene_button.pressed.connect(_on_select_scene_pressed)
	back_button.pressed.connect(_on_back_button_pressed)
	load_scene()
	load_possessions()


func load_scene():
	load_challenges_from_json("res://data/characters.json")
	load_scenes_from_json("res://data/scenes.json")
	draw_scenes()
	set_back_button_visible(false)


func load_possessions():
	load_possessions_from_json("res://data/possessions.json")
	draw_possessions()


func commit_to_transfer():
	pass


func _on_scene_toggled(state_owner: Node, state: bool):
	#print(
	#"_on_scene_toggled: state_owner:",
	#state_owner,
	#" is_toggled:",
	#state,
	#" deck_scenes.size():",
	#deck_scenes.size()
	#)

	selected_scene = null
	select_scene_button.disabled = true

	var chess_moves: Array[String] = ChessLogic.get_legal_moves_by_name(state_owner.scene_name)

	for i in range(deck_scenes.size()):
		var scene = deck_scenes[i]
		#print("_on_scene_toggled: character:", character, " is_toggled:", character.is_toggled)
		if state && state_owner == scene:
			scene.set_toggled_state(true)
			selected_scene = scene
			scene.set_blocked_state(chess_moves.size() == 0)
		else:
			scene.set_toggled_state(false)
			scene.set_blocked_state(false)
			scene.set_defender_state(state && chess_moves.has(scene.scene_name))

	#print(
	#"_on_scene_toggled: state_owner.scene_name:",
	#state_owner.scene_name,
	#" chess_moves:",
	#chess_moves
	#)

	if selected_scene == null:
		select_scene_button.disabled = true
		#print("_on_scene_toggled: selected_scene:", selected_scene)
	else:
		#print(
		#"_on_scene_toggled: selected_scene:",
		#selected_scene,
		#" scene_name:",
		#selected_scene.scene_name
		#)
		select_scene_button.disabled = false


func load_background_from_json(path: String):
	var data = ActiveRecords.get_active_dictionary_records(path, "scene_selection")
	if typeof(data) == TYPE_ARRAY and data.size() > 0:
		background_data = data.pick_random()
		background.background_name = background_data.get("name", "Unknown")
		background.background_description = background_data.get("description", "Unknown")
		background.background_image.texture = load(background_data.get("texture", ""))
		background.update_ui()


func load_scenes_from_json(path: String):
	deck_scenes.clear()
	var data = ActiveRecords.get_active_dictionary_records(path, "scenes")
	if typeof(data) == TYPE_ARRAY and data.size() > 0:
		for c in data:
			var scene = preload("res://tscns/Scene.tscn").instantiate()
			scene.is_selectable = true

			var tile = c.get("tile", "Unknown")
			scene.scene_tile = tile

			var scene_name = c.get("name", "Unknown")
			scene.scene_name = scene_name
			scene.scene_description = tile + " " + c.get("description", "Unknown")

			var textureDir = "res://assets/scenes/" + scene_name
			scene.scene_image_texture = ActiveRecords.get_random_png_resource_from_dir(textureDir)

			#var challengeArray = c.get("challenges", [])

			if tile == "black_tile":
				scene.scene_challenge_icon = "x"
			else:
				scene.scene_challenge_icon = "z"

			#if typeof(challengeArray) == TYPE_ARRAY and challengeArray.size() > 0:
			var chess_piece = ChessLogic.get_piece_at_notation(scene_name)

			#print("Scene scene_name:", scene_name, " chess_piece:", chess_piece)

			if !chess_piece.is_empty():
				var challengeName = chess_piece.color + "_" + chess_piece.type + "_on_a_" + tile
				scene.scene_challenge_name = challengeName
				var chalengeIcon = challenges_data.get(challengeName)
				if chalengeIcon:
					scene.scene_challenge_icon = chalengeIcon
				var challengeDir = "res://assets/characters/" + challengeName
				scene.scene_challenge_image_texture = (
					ActiveRecords.get_random_png_resource_from_dir(challengeDir)
				)
				#print(
				#"Scene challengeDir:",
				#scene_name,
				#" ",
				#challengeDir,
				#" ",
				#scene.scene_challenge_image_texture,
				#" icon:'",
				#scene.scene_challenge_icon,
				#"'"
				#)

			scene.update_ui()
			scene.toggled.connect(_on_scene_toggled)
			deck_scenes.append(scene)


func load_challenges_from_json(path: String):
	var data = ActiveRecords.get_active_dictionary_records(path, "characters")
	#print("load_challenges_from_json data ", data)
	if typeof(data) == TYPE_ARRAY:
		for c in data:
			#print("load_challenges_from_json ", c)
			var challenge_name = c.get("name", "Unknown")
			var challenge_icon = c.get("icon", "Unknown")
			challenges_data.set(challenge_name, challenge_icon)


func load_possessions_from_json(path: String):
	var data = ActiveRecords.get_active_array_records(path)
	if typeof(data) == TYPE_ARRAY:
		for c in data:
			var possession_name = c.get("name", "Unknown")
			var possession_image_texture_name = c.get("texture", "")
			var possession_image_texture = load(possession_image_texture_name)
			#print("Texture for:", str(c), possession_image_texture)
			if possession_image_texture == null:
				print("Missing Texture for:", possession_name)

			var possession = preload("res://tscns/Possession.tscn").instantiate()
			possession.possession_name = possession_name
			possession.possession_image_texture = possession_image_texture
			var possession_name_child = possession.find_child("PossessionName", true, true)
			possession_name_child.text = possession.possession_name

			possession.possession_count = possessions_data.get(possession.possession_name, 0)

			if possession.possession_count > 0:
				deck_possessions.append(possession)


func draw_scenes():
	for scene in scenes.get_children():
		remove_child(scene)

	for i in range(deck_scenes.size()):
		var scene = deck_scenes[i]
		scenes.add_child(scene)
		var pos = scene.position
		pos.x = (SCENE_X_OFFSET * (i % SCENE_X_MAX)) + SCENE_X_INITIALOFFSET
		@warning_ignore("integer_division")
		pos.y = SCENE_Y_OFFSET * (i / SCENE_X_MAX)
		scene.position = pos
		scene.update_ui()

	background.background_description = (
		background_data.get("description", "Unknown") + ", team " + ChessLogic.current_turn
	)
	background.update_ui()


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


func _on_select_scene_pressed():
	TransferToScene.transfer_data(
		selected_scene.scene_challenge_name,
		selected_scene.scene_name,
		"",
		possessions_data,
		"res://tscns/CharacterSelection.tscn"
	)


func update_ui():
	pass


func _on_back_button_pressed():
	TransferToScene.transfer_data(
		selected_scene.scene_challenge_name,
		selected_scene.scene_name,
		"",
		possessions_data,
		"res://tscns/SceneSelection.tscn"
	)


func set_back_button_visible(visibleFlag: bool):
	back_button.visible = visibleFlag
