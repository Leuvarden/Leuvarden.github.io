var boot = function(game) {};

boot.prototype = {
	preload: function() {
		this.game.load.image('loading', 'assets/img/loading_bar.png');
		this.game.load.bitmapFont('ds_digital', 'assets/font/ds_digital.png', 'assets/font/ds_digital.fnt');
	},

	create: function() {
		console.log('%cSTATE::BOOT', 'color: #fff; background: #f00;');

		// Setup game scale
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		//======================================================================

		this.game.state.start('Preload');
	}
};
