var game = new Phaser.Game(Game.w, Game.h, Phaser.CANVAS, 'game');

var Game = {
  w: 1024,
  h: 768
};

Game.Boot = function(game) {
  this.game = game;
};

Game.Boot.prototype = {
  preload: function() {
    // console.log('blah'+Game.w);
		this.game.stage.backgroundColor = '#FFF';
		this.game.load.image('loading', 'assets/images/loading.png');
		this.game.load.image('title', 'assets/images/title.png');
		this.game.load.image('instructions', 'assets/images/instructions.png');
    this.game.load.bitmapFont('minecraftia', 'assets/fonts/font.png', 'assets/fonts/font.xml'); //load default font


    //Scale Image to Fit Window
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.maxHeight = window.innerHeight;
    this.game.scale.maxWidth = window.innerHeight*(Game.w/Game.h);

  },
  create: function() {
   this.game.state.start('Load');
  }
};

Game.Load = function(game) {
  this.game = game;
};

Game.Load.prototype = {
  preload: function() {

    //Loading Screen Message/bar
    var loadingText = this.game.add.bitmapText(Game.w/2, Game.h/2, 'minecraftia', 'Loading...', 30).anchor.setTo(0.5);

  	var preloading = this.game.add.sprite(Game.w/2-64, Game.h/2+50, 'loading');
  	this.game.load.setPreloadSprite(preloading);

    //Load button for twitter
    this.game.load.image('twitter','assets/images/twitter.png');

    this.game.load.image('easy','assets/images/easy.png');
    this.game.load.image('normal','assets/images/normal.png');
    this.game.load.image('hard','assets/images/hard.png');
    this.game.load.atlasXML('startbtn', 'assets/images/startbtn.png','assets/atlas/startbtn.xml');


    for(var i = 1;i < 10;i++) {
      this.game.load.image(i.toString(), 'assets/images/'+i.toString()+'.png');
    }


  },
  create: function() {
    this.game.state.start('Menu');
  }
};

///////////////////////////////gallery

var level = 1;

Game.Gallery = function(game) {
  this.game = game;
};

Game.Gallery.prototype = {
  create:function() {
    this.game.stage.backgroundColor = '#dcdcdc';

		this.menu_button = this.game.add.button(0,0,this.makeBox(200,50), this.gotoMenu,this);
		this.menu_button.tint = 0xff00ff;
		this.game.add.bitmapText(50,10,'minecraftia','Menu',24);

		this.game.add.bitmapText(Game.w/2,40,'minecraftia',difficulty,36).anchor.setTo(0.5);;

		this.game.add.bitmapText(Game.w/2,Game.h - 24,'minecraftia','Photos by ping_01 on Instagram',24).anchor.setTo(0.5);;

    x = 220;
    y = 160;
    count = 0
    for(var i = 1;i < 10;i++) {
      count += 1;
      var b = this.game.add.button(x, y, i.toString(), this.loadLevel, this);
      b.anchor.setTo(0.5);
      b.scale.x = 0.3;
      b.scale.y = 0.3;
      x += 300;
      if (count === 3) {
        count = 0;
        y += 220;
        x = 220;
      }
    }
  },
  gotoMenu: function() {
    this.game.state.start('Menu');
  },
  makeBox: function(x,y) {
    var bmd = this.game.add.bitmapData(x, y);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, x, y);
    bmd.ctx.fillStyle = '#fff';
    bmd.ctx.fill();
    return bmd;
  },
  loadLevel: function() {
    level = arguments[0].key;
    this.game.state.start('Play');
  }

};
 //////////////////////////////////////////puzzle
 function rand (min, max) {
     return Math.floor(Math.random() * (max - min + 1)) + min;
 }

 var Puzzle = function(game, pic, square) {
   this.game = game;
   this.pic = pic;
   this.square = square;
 	this.won = false;

     //load source image to get image height/width properties
     this.src_image = this.game.add.image(Game.w/2, Game.h/2, pic);
 		this.src_image.anchor.setTo(0.5);
     this.src_image.visible = false;

     var w = this.src_image.width;
     var h = this.src_image.height;

     //User to center piece
     this.offsetX = (Game.w - w)/2;
     this.offsetY = (Game.h - h)/2;

     this.tile_width = Math.floor(w/this.square);
     this.tile_height = Math.floor(h/this.square);

     this.pieces = [];
 		this.slots = [];
     this.background = {};
 		this.piece_list = {};

     //Setup Background Game Board
     for (var i = 0; i < this.square;i++) {
       for (var j = 0; j < this.square;j++) {

 				var slot = this.game.add.sprite(this.offsetX+j*this.tile_width,this.offsetY+i*this.tile_height, this.makeBox(this.tile_width, this.tile_height));
 				slot.j = j;
 				slot.i = i;
 				this.background[j+'_'+i] = slot;
 				this.slots.push(slot);
 			}
 		}

     // Offset for puzzle sizes
     // 0 - flat
     // -1 - valley
     // 1 - hill
     var choice = [-1, 1];

     for (var i = 0; i < this.square;i++) {
       for (var j = 0; j < this.square;j++) {

         var sides = {ls: 0, bs: 0, rs: 0, ts: 0};

         //above - choose piece to fit the above piece
         if (this.piece_list[j+'_'+(i-1)] !== undefined) {
           sides.ts = this.piece_list[j+'_'+(i-1)].bottom_side * -1;
         }else {
           sides.ts = choice[rand(0,1)];
         }

         //left - choose piece to fit the left piece
         if (this.piece_list[(j-1)+'_'+i] !== undefined) {
           sides.ls = this.piece_list[(j-1)+'_'+i].right_side * -1;
         }else {
           sides.ls = choice[rand(0,1)];
         }

         //bottom
         sides.bs = choice[rand(0,1)];

         //right
         sides.rs = choice[rand(0,1)];

         if (j === (this.square -1)) { sides.rs = 0; }
         if (i === 0) { sides.ts = 0; }
         if (i === (this.square - 1)) { sides.bs = 0; }
         if (j === 0) { sides.ls = 0; }

         var piece = new PuzzlePiece(this.game, this.offsetX+j*this.tile_width, this.offsetY+i*this.tile_height, j, i, this.tile_width, this.tile_height,pic, sides);

 				piece.events.onDragStart.add(this.onDragStart, this);
 				piece.events.onDragStop.add(this.onDragStop, this);

         this.pieces.push(piece);
         this.piece_list[j+'_'+i] = piece;

       }
     }
 };

 Puzzle.prototype = Puzzle.prototype.constructor = Puzzle;

 Puzzle.prototype = {
 	onDragStart: function(sprite, pointer) {
     this.game.world.bringToTop(sprite);
 	},
 	onDragStop: function(piece, pointer) {

 		var slot = this.background[piece.j+'_'+piece.i];

 		if (Phaser.Rectangle.intersects(piece.getBounds(), slot.getBounds())) {
       //Disable and place piece
 			this.game.world.sendToBack(piece);
 			slot.visible = false;
 			piece.inputEnabled = false;
 			piece.input.enableDrag(false);
 			piece.x = piece.initialX;
 			piece.y = piece.initialY;
 			this.slots.forEach(function(slot) {
 				this.game.world.sendToBack(slot);
 			},this);

 			this.won = this.checkWin();
 		}

 	},
 	checkWin: function() {
 		var won = true;
 		for(var i=0; i< this.pieces.length;i++) {
 			if (this.pieces[i].x !== this.pieces[i].initialX && this.pieces[i].y !== this.pieces[i].initialY) {
 				won = false;
 				}
 		}
 		return won;
 	},
 	scatter: function() {
 		for (var s=0; s < this.pieces.length;s++) {
 			var piece = this.pieces[s];
 			piece.x = rand(0, Game.w-this.tile_width/2);
 			piece.y = rand(this.tile_height/2, Game.h-this.tile_height/2);

 		}
 	},
 	destroy: function() {
 		this.slots.forEach(function(slot) {
 			slot.destroy();
 		},this);
 		this.pieces.forEach(function(piece) {
 			piece.destroy();
 		},this);
 	},
 	preview_toggle: function() {
 		if (this.src_image.visible === false) {
 			this.src_image.visible = true;
 			this.game.world.bringToTop(this.src_image);
 			this.pieces.forEach(function(piece) {
 				piece.visible = false;
 			},this);
 		}else {
 			this.src_image.visible = false;
 			this.pieces.forEach(function(piece) {
 				piece.visible = true;
 			},this);
 		}
 	},
   makeBox: function(x,y) {
       var bmd = this.game.add.bitmapData(x, y);
       bmd.ctx.beginPath();
       bmd.ctx.rect(0, 0, x, y);
       bmd.ctx.fillStyle = '#202020';
 			bmd.ctx.lineStyle = 4;
       bmd.ctx.strokeStyle = '#ff00ff';
       bmd.ctx.fill();
       return bmd;
     },
 };

 ////////////////////////////puzzle_piece

 var PuzzlePiece = function(game, x, y, j, i, width, height, pic, sides) {

   this.game = game;


   this.left_side = sides.ls;
   this.bottom_side = sides.bs;
   this.right_side = sides.rs;
   this.top_side = sides.ts;


   this.i = i; //i height position
   this.j = j; //j width position


   var bmdwidth = Math.floor(width*1.30);
   var bmdheight = Math.floor(height*1.30);

   //Set Corners for puzzle piece
   var tl = {x: Math.floor(width*0.15), y: Math.floor(height*0.15)};
   var tr = {x: (width+Math.floor(width*0.15)), y: (Math.floor(height*0.15))};
   var bl = {x: Math.floor(width*0.15), y: (height+Math.floor(height*0.15))};
   var br = {x: (width+Math.floor(width*0.15)), y: (height+Math.floor(height*0.15))};


   //Draw Puzzle Piece
   this.piecebmd = this.game.add.bitmapData(bmdwidth,bmdheight);
   this.piecebmd.ctx.clearRect(0, 0, bmdwidth, bmdheight);
   this.piecebmd.ctx.strokeStyle = '#FFF';
   this.piecebmd.ctx.fillStyle = '#dcdcdc';
   this.piecebmd.ctx.lineWidth = 2;
   this.piecebmd.ctx.fill();
   this.piecebmd.ctx.beginPath();

   if (this.left_side === 0) {
     //left side flat
     this.piecebmd.ctx.moveTo(tl.x,tl.y);
     this.piecebmd.ctx.lineTo(bl.x,bl.y);
   }else if (this.left_side === -1){
     //left side cave
     this.piecebmd.ctx.moveTo(tl.x,tl.y);
     this.piecebmd.ctx.lineTo(tl.x,Math.floor(tl.y+height/3));
     this.piecebmd.ctx.lineTo(Math.floor(tl.x+width*0.10),Math.floor(tl.y+height/3));
     this.piecebmd.ctx.lineTo(Math.floor(tl.x+width*0.15),Math.floor(tl.y+height/3+height/6));
     this.piecebmd.ctx.lineTo(Math.floor(tl.x+width*0.10),Math.floor(tl.y+height/3+2*height/6));
     this.piecebmd.ctx.lineTo(tl.x,Math.floor(tl.y+height/3+2*height/6));
     this.piecebmd.ctx.lineTo(bl.x,bl.y);
   }else if (this.left_side === 1) {
     //left side mountain
     this.piecebmd.ctx.moveTo(tl.x,tl.y);
     this.piecebmd.ctx.lineTo(tl.x,Math.floor(tl.y+height/3));
     this.piecebmd.ctx.lineTo(Math.floor(tl.x-width*0.10),Math.floor(tl.y+height/3));
     this.piecebmd.ctx.lineTo(Math.floor(tl.x-width*0.15),Math.floor(tl.y+height/3+height/6));
     this.piecebmd.ctx.lineTo(Math.floor(tl.x-width*0.10),Math.floor(tl.y+height/3+2*height/6));
     this.piecebmd.ctx.lineTo(tl.x,Math.floor(tl.y+height/3+2*height/6));
     this.piecebmd.ctx.lineTo(bl.x,bl.y);
   }

   if (this.bottom_side === 0) {
     //bottom side flat
     this.piecebmd.ctx.lineTo(br.x, br.y);
   }else if (this.bottom_side === -1) {
     //bottom sidecave
     this.piecebmd.ctx.lineTo(Math.floor(bl.x+width/3), bl.y);
     this.piecebmd.ctx.lineTo(Math.floor(bl.x+width/3), Math.floor(bl.y-width*0.10));
     this.piecebmd.ctx.lineTo(Math.floor(bl.x+width/3+width/6), Math.floor(bl.y-width*0.15));
     this.piecebmd.ctx.lineTo(Math.floor(bl.x+width/3+2*width/6), Math.floor(bl.y-width*0.10));
     this.piecebmd.ctx.lineTo(Math.floor(bl.x+width/3+2*width/6), bl.y);
     this.piecebmd.ctx.lineTo(br.x, bl.y);
   }else if (this.bottom_side === 1) {
     //bottom side mountain
     this.piecebmd.ctx.lineTo(Math.floor(bl.x+width/3), bl.y);
     this.piecebmd.ctx.lineTo(Math.floor(bl.x+width/3), Math.floor(bl.y+width*0.10));
     this.piecebmd.ctx.lineTo(Math.floor(bl.x+width/3+width/6), Math.floor(bl.y+width*0.15));
     this.piecebmd.ctx.lineTo(Math.floor(bl.x+width/3+2*width/6), Math.floor(bl.y+width*0.10));
     this.piecebmd.ctx.lineTo(Math.floor(bl.x+width/3+2*width/6), bl.y);
     this.piecebmd.ctx.lineTo(br.x, br.y);

   }

   if (this.right_side === 0) {
     //right side flat
     this.piecebmd.ctx.lineTo(tr.x, tr.y);
   }else if (this.right_side === -1) {
     //right side cave
     this.piecebmd.ctx.lineTo(br.x,Math.floor(br.y-height/3));
     this.piecebmd.ctx.lineTo(Math.floor(br.x-width*0.10),Math.floor(br.y-height/3));
     this.piecebmd.ctx.lineTo(Math.floor(br.x-width*0.15),Math.floor(br.y-height/3-height/6));
     this.piecebmd.ctx.lineTo(Math.floor(br.x-width*0.10),Math.floor(br.y-height/3-2*height/6));
     this.piecebmd.ctx.lineTo(br.x,Math.floor(br.y-height/3-2*height/6));
     this.piecebmd.ctx.lineTo(tr.x,tr.y);
   }else if (this.right_side === 1) {
     //right side cave
     this.piecebmd.ctx.lineTo(br.x,Math.floor(br.y-height/3));
     this.piecebmd.ctx.lineTo(Math.floor(br.x+width*0.10),Math.floor(br.y-height/3));
     this.piecebmd.ctx.lineTo(Math.floor(br.x+width*0.15),Math.floor(br.y-height/3-height/6));
     this.piecebmd.ctx.lineTo(Math.floor(br.x+width*0.10),Math.floor(br.y-height/3-2*height/6));
     this.piecebmd.ctx.lineTo(br.x,Math.floor(br.y-height/3-2*height/6));
     this.piecebmd.ctx.lineTo(tr.x,tr.y);
   }

   if (this.top_side === 0) {
     //top side flat
     this.piecebmd.ctx.lineTo(tl.x, tl.y);
   }else if (this.top_side === -1) {
     //top side cave
     this.piecebmd.ctx.lineTo(Math.floor(tr.x-width/3), tr.y);
     this.piecebmd.ctx.lineTo(Math.floor(tr.x-width/3), Math.floor(tr.y+width*0.10));
     this.piecebmd.ctx.lineTo(Math.floor(tr.x-width/3-width/6), Math.floor(tr.y+width*0.15));
     this.piecebmd.ctx.lineTo(Math.floor(tr.x-width/3-2*width/6), Math.floor(tr.y+width*0.10));
     this.piecebmd.ctx.lineTo(Math.floor(tr.x-width/3-2*width/6), tr.y);
     this.piecebmd.ctx.lineTo(tl.x, tl.y);
   }else if (this.top_side === 1) {
     //top side mountain
     this.piecebmd.ctx.lineTo(Math.floor(tr.x-width/3), tr.y);
     this.piecebmd.ctx.lineTo(Math.floor(tr.x-width/3), Math.floor(tr.y-width*0.10));
     this.piecebmd.ctx.lineTo(Math.floor(tr.x-width/3-width/6), Math.floor(tr.y-width*0.15));
     this.piecebmd.ctx.lineTo(Math.floor(tr.x-width/3-2*width/6), Math.floor(tr.y-width*0.10));
     this.piecebmd.ctx.lineTo(Math.floor(tr.x-width/3-2*width/6), tr.y);
     this.piecebmd.ctx.lineTo(tl.x, tl.y);
   }

   this.piecebmd.ctx.fill();

   var src_image = this.game.add.image(Game.w/2, Game.h/2, pic);
   src_image.anchor.setTo(0.5);
   src_image.visible = false;

   var w = src_image.width;
   var h = src_image.height;

   var offsetX = Math.floor(width*0.15);
   var offsetY = Math.floor(height*0.15);

   var padX = Math.floor(width*0.15);
   var padY = Math.floor(height*0.15);

   if (this.top_side === 1) { padY = 0; }
   if (this.left_side === 1) { padX = 0; }

   var img = this.game.make.bitmapData(w, h);
   area = new Phaser.Rectangle(j*width-(Math.abs(padX- width*0.15)), i*height-(Math.abs(padY - height*0.15)), w, h);
   img.copyRect(pic, area, padX,padY);
   img.update();

   var mask = this.game.make.bitmapData(bmdwidth, bmdheight);
   mask.copyRect(this.piecebmd, area, bmdwidth, bmdheight);

   var bmd = this.game.make.bitmapData(bmdwidth, bmdheight);
   bmd.alphaMask(img, this.piecebmd);

   Phaser.Sprite.call(this, this.game, x-offsetX, y-offsetY, bmd);

   this.initialX = this.x;
   this.initialY = this.y;

   this.inputEnabled = true;
   this.input.enableDrag(true);

   this.game.add.existing(this);

 };

 PuzzlePiece.prototype = Object.create(Phaser.Sprite.prototype);
 PuzzlePiece.prototype.constructor = PuzzlePiece;

//////////////////////////////////////menu_button

/*global Game*/
var difficulty;

Game.Menu = function(game){
  this.game = game;
};

Game.Menu.prototype =  {
    create: function() {

        difficulty = 'normal';
        this.puzzle = new Puzzle(this.game, this.makeBox(500,500), 5);
        this.puzzle.scatter();

        this.puzzle.pieces.forEach(function(piece) {
          piece.inputEnabled = false;
          piece.input.enableDrag(false);
        });

        this.game.stage.backgroundColor = '#2d2d2d';
        this.titleText = this.game.add.bitmapText(Game.w/2, Game.h/2-100, 'minecraftia', "Jigsaw", 64 );
        this.titleText.anchor.setTo(0.5);
        this.titleText.tint = 0x00ff00;

        this.difficultyButtons = this.game.add.group();

        this.easyButton = this.game.add.button(Game.w/2, Game.h/2+75,'easy', this.difficultySelect, this);
        this.easyButton.anchor.setTo(0.5);
        this.difficultyButtons.add(this.easyButton);


        this.normalButton = this.game.add.button(Game.w/2, Game.h/2+110,'normal', this.difficultySelect, this);
        this.normalButton.anchor.setTo(0.5);
        this.normalButton.tint = 0xff00ff;
        this.difficultyButtons.add(this.normalButton);

        this.hardButton = this.game.add.button(Game.w/2, Game.h/2+155,'hard', this.difficultySelect, this);
        this.hardButton.anchor.setTo(0.5);

        this.difficultyButtons.add(this.hardButton);

        // Start Message
        this.startButton = this.game.add.button(Game.w/2, Game.h/2+220,'startbtn', this.begin, this,1);
        this.startButton.anchor.setTo(0.5);

        //Create Twitter button as invisible, show during win condition to post highscore
        this.twitterButton = this.game.add.button(this.game.world.centerX, Game.h-50,'twitter', this.twitter, this);
        this.twitterButton.anchor.set(0.5);
        this.twitterButton.visible = true;

    },
    begin: function() {
        // this.game.state.start('Play');
        this.game.state.start('Gallery');
    },
    difficultySelect: function(button) {
      this.difficultyButtons.forEach(function(btn) {
        btn.tint = 0xffffff;
      });
      button.tint = 0xff00ff;
      difficulty = button.key;
    },
    makeBox: function(x,y) {
      var bmd = this.game.add.bitmapData(x, y);
      bmd.ctx.beginPath();
      bmd.ctx.rect(0, 0, x, y);
      bmd.ctx.fillStyle = '#0000ff';
			bmd.ctx.lineStyle = 4;
      bmd.ctx.strokeStyle = '#ff00ff';
      bmd.ctx.fill();
      return bmd;
    },
    twitter: function() {
      //Popup twitter window to post highscore
      var game_url = 'http://www.divideby5.com/games/jigsaw/';
      var twitter_name = 'rantt_';
      var tags = [''];

      window.open('http://twitter.com/share?text=Relax+with+a+fun+Jigsaw+puzzle.+at&via='+twitter_name+'&url='+game_url+'&hashtags='+tags.join(','), '_blank');
    },
};


/////////////////////////////////////play

/*global Game*/

var wKey;
var aKey;
var sKey;
var dKey;
var score = 0;

Game.Play = function(game) {
  this.game = game;
};

Game.Play.prototype = {
	init: function() {
		this.physics.startSystem(Phaser.Physics.ARCADE);
	},
  create: function() {
    this.game.world.setBounds(0, 0 ,Game.w ,Game.h);

    this.game.stage.backgroundColor = '#213D5E';
    this.game_won = false;

    if (difficulty === 'easy') {
      this.square = 3;
    }else if (difficulty === 'normal') {
      this.square = 5;
    }else if (difficulty === 'hard') {
      this.square = 10;
    }


    this.puzzle = new Puzzle(this.game, level.toString(), this.square);
		this.puzzle.scatter();

		this.preview_button = this.game.add.button(Game.w-200,0,this.makeBox(200,50), this.puzzle.preview_toggle,this.puzzle);
		this.preview_button.tint = 0xff00ff;
		this.game.add.bitmapText(Game.w-170,10,'minecraftia','Preview',24);

		this.menu_button = this.game.add.button(0,0,this.makeBox(200,50), this.gotoMenu,this);
		this.menu_button.tint = 0xff00ff;
		this.game.add.bitmapText(50,10,'minecraftia','Menu',24);

    //Create Twitter button as invisible, show during win condition to post highscore
    this.twitterButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 200,'twitter', this.twitter, this);
    this.twitterButton.anchor.set(0.5);
    this.twitterButton.visible = false;
  },
  gotoMenu: function() {
    this.game.state.start('Menu');
  },
  makeBox: function(x,y) {
    var bmd = this.game.add.bitmapData(x, y);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, x, y);
    bmd.ctx.fillStyle = '#fff';
    bmd.ctx.fill();
    return bmd;
  },
  update: function() {

		if (this.puzzle.won === true) {
      this.game.input.onUp.add(this.nextLevel,this);
      this.win_text = this.game.add.bitmapText(Game.w/2, Game.h/2, 'minecraftia', 'GREAT JOB!\nClick to Play Again.', 24);
      this.win_text.anchor.setTo(0.5);
		}

    // // Toggle Music
    // muteKey.onDown.add(this.toggleMute, this);

  },
  nextLevel: function() {
    this.game.state.start('Gallery');
  },
};

/////////////game
