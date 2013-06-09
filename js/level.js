//level.js

function Level(width,height) {
	this.width = width;
	this.height = height;
	this.tiles = new Array();
	this.entities = new Array();
	this.background = '#000';
	this.xOffset = 0;
	this.yOffset = 0;
	for (var x=0;x<width;x++)
	{
		this.tiles[x] = new Array();
		for (var y=0;y<width;y++) {
			this.tiles[x][y] = new Tile(x*64,y*64,1);
		}
	}

}

var screen = new Screen();
function Screen() {
	this.xOffset = 0;
	this.yOffset = 0;
	this.maxXOffset = 17 * 32 * -1;
	this.maxYOffset = 17 * 32;
}

Screen.prototype.scroll = function() {
	if (this.yOffset < this.maxYOffset) this.yOffset--;
	else {
		game.level = new Level(60,30);
		this.yOffset = 0;
	}
}
function renderLevel(level) {
	ctx.fillStyle = level.background;
	ctx.fillRect(0,0,canvas.width,canvas.height);
	for (var x=0;x<level.width;x++) {
		for (var y=0;y<level.height;y++) {
			level.tiles[x][y].render();
		}
	}
}