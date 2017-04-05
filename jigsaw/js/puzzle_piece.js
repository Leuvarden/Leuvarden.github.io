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
  this.piecebmd.ctx.beginPath();
  this.piecebmd.ctx.moveTo(tl.x,tl.y);
  this.piecebmd.ctx.lineTo(bl.x,bl.y);
  this.piecebmd.ctx.lineTo(br.x, br.y);
  this.piecebmd.ctx.lineTo(tr.x,tr.y);
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
