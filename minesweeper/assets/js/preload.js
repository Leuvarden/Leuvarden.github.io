var preload = function(game) {};

preload.prototype = {
	preload: function() {
		// Setup loading bar
		var loadingBar = this.game.add.sprite(154, 588, 'loading');
		loadingBar.anchor.setTo(0, 0.5);

		this.game.load.setPreloadSprite(loadingBar);

		var loadingText = this.game.add.bitmapText(320, 525, 'ds_digital', 'loading', 72);
		loadingText.anchor.setTo(0.5, 0);
		//======================================================================

		// Load all game assets
		this.game.load.spritesheet('cells', 'assets/img/cells.png', 56, 56, 12);
		//======================================================================
	},

	create: function() {
		console.log('%cSTATE::PRELOAD', 'color: #fff; background: #0f0;');

		this.game.state.start('Game');
	}
};
