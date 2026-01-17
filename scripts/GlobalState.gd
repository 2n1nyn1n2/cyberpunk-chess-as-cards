extends Node

var has_seen_greeting: bool = false
var greetings_style: String = ""
var do_test_moves = true

var move_from: String
var move_to: String
var has_moved: bool = true


func _ready() -> void:
	pass


func make_selected_chess_move(thinking_overlay: Node):
	thinking_overlay.visible = false
	if has_moved:
		return
	thinking_overlay.visible = true
	var move_successful = ChessLogic.make_move_notation(move_from, move_to)
	has_moved = true
	return move_successful
