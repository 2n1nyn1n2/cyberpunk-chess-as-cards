# todo

## scenes

Each position on the chess board is a scene.

If the position has a piece on the board, then the challenge for that scene is "Defeat the piece".
Otherwise, then the challenge for that scene is "Move to empty square".

The initial challenges for the scene are the starting pieces.

## challenges

Each challenge should be: {piece} defeats {piece}.

Plus one more challenge: {piece} moves to empty square.

When a challenge is defeated, the challenge representing the winning piece is removed from the old square and moved to the new square.

## possessions

When you defeat a challenge containing a piece, you capture a possession. So the possession's art should be whatever piece you captured, in a box.
