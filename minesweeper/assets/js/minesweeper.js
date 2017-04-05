var minesweeper = function(game) {};

minesweeper.prototype = {
	create: function() {
		console.log('%cSTATE::GAME', 'color: #fff; background: #f0f;');

		this.game.boardWidth = 9;
		this.game.boardHeight = 11;

		this.game.board = this.game.add.group();
		this.game.board.x = 72;
		this.game.board.y = 264;

		this.game.maxBombs = Math.round(this.game.boardWidth * this.game.boardHeight / 5);

		this.placeCells();
		this.placeBombs();
	},

	indexToX: function(i) {
		return i % this.game.boardWidth;
	},

	indexToY: function(i) {
		return Math.floor(i / this.game.boardWidth);
	},

	placeCells: function() {
		var len = this.game.boardWidth * this.game.boardHeight;

		var x = 0;
		var y = 0;

		var cell = null;

		for (var i = 0; i < len; i++) {
			x = i % this.game.boardWidth;
			y = Math.floor(i / this.game.boardWidth);

			cell = this.game.add.sprite(x * 56, y * 56, 'cells', 10);
			cell.posX = x;
			cell.posY = y;
			cell.isBomb = false;
			cell.numBombs = 0;
			cell.index = i;
			cell.isChecked = false;

			cell.inputEnabled = true;
			cell.events.onInputDown.add(this.onClick, this);

			this.game.board.add(cell);
			this.game.board.addToHash(cell);
		}
	},

	onClick: function(cell) {
		if (!cell.isBomb) {
			this.openCell(cell);
		}
	},

	openCell: function(cell) {
		var neighbours = [];
		var neighbour = null;

		if (cell.numBombs > 0 || cell.isChecked) {
			cell.frame = cell.numBombs - 1;

			return;
		}

		cell.isChecked = true;
		cell.frame = 11;

		neighbours = this.getNeighbours(cell);

		for (var i = 0; i < neighbours.length; i++) {
			neighbour = this.game.board.hash[neighbours[i]];

			if (!neighbour.isBomb) {
				neighbour.frame = neighbour.numBombs - 1;

				this.openCell(neighbour);
			}
		}
	},

	placeBombs: function() {
		var bombsToPlace = this.game.maxBombs;
		var cell = null;

		do {
			cell = this.game.board.getRandom();

			if (cell.isBomb === false) {
				cell.frame = 9;
				cell.isBomb = true;

				this.placeNumbers(cell);

				bombsToPlace--;
			}
		} while (bombsToPlace > 0);
	},

	getNeighbours: function(cell) {
		var i = cell.index;

		var u = i - this.game.boardWidth;
		var d = i + this.game.boardWidth;
		var l = i - 1;
		var r = i + 1;

		var ul = u - 1;
		var ur = u + 1;
		var dl = d - 1;
		var dr = d + 1;

		var indexArr = [];

		if (cell.posX > 0) {
			indexArr.push(l);

			if (cell.posY > 0) {
				indexArr.push(ul);
			}

			if (cell.posY < this.game.boardHeight - 1) {
				indexArr.push(dl);
			}
		}

		if (cell.posX < this.game.boardWidth - 1) {
			indexArr.push(r);

			if (cell.posY > 0) {
				indexArr.push(ur);
			}

			if (cell.posY < this.game.boardHeight - 1) {
				indexArr.push(dr);
			}
		}

		if (cell.posY > 0) {
			indexArr.push(u);
		}

		if (cell.posY < this.game.boardHeight - 1) {
			indexArr.push(d);
		}

		return indexArr;
	},

	placeNumbers: function(cell) {
		var neighbours = this.getNeighbours(cell);

		for (var i = 0; i < neighbours.length; i++) {
			this.addNumberToCell(neighbours[i]);
		}
	},

	addNumberToCell: function(i) {
		var cell = null;

		cell = this.game.board.hash[i];

		if (cell.isBomb === false) {
			cell.numBombs++;
		}
	}
};
