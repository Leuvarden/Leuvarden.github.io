var game = new Phaser.Game(800, 600, Phaser.CANVAS,'sliding', { preload: preload, create: create });

var PIECE_WIDTH = 200,
    PIECE_HEIGHT = 200;

function preload() {
  game.load.spritesheet("background", "assets/bl.jpg", PIECE_WIDTH, PIECE_HEIGHT);
}

function create() {
  var BOARD_COLS = Math.floor(game.world.width / PIECE_WIDTH);
    BOARD_ROWS = Math.floor(game.world.height / PIECE_HEIGHT);

    piecesAmount = BOARD_COLS * BOARD_ROWS;

    shuffledIndexArray = createShuffledIndexArray();

function createShuffledIndexArray() {
  var i,
      indexArray = [];

  for (i = 0; i < piecesAmount; i++) {
    indexArray.push(i);
  }

  return shuffle(indexArray);
}

function shuffle(array) {
  var counter = array.length,
      temp,
      index;

  while (counter > 0) {
    index = Math.floor(Math.random() * counter);

    counter--;

    temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
}

function update() {
}
