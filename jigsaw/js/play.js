Game.Play = function(game) {
  this.game = game;
};

Game.Play.prototype = {

  create: function() {
    this.game.world.setBounds(0, 0 ,Game.w ,Game.h);

    this.game.stage.backgroundColor = '#213D5E';
    this.game_won = false;

    this.square = 2;

    this.puzzle = new Puzzle(this.game, this.square);
		this.puzzle.scatter();

  },

  update: function() {
		if (this.puzzle.won === true) {
      this.game.input.onUp.add(this.nextLevel,this);
      this.win_text = this.game.add.bitmapText(Game.w/2, Game.h/2, 'minecraftia', 'GREAT JOB!\nClick to Play Again.', 24);
      this.win_text.anchor.setTo(0.5);
		}
  },
  nextLevel: function() {
    this.game.state.start('Play');
  },
};
