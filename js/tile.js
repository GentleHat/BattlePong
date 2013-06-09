//tile.js

var r=0,g=0;b=0;

function Tile(x, y, id) {
	this.x = x;
	this.y = y;
	this.id = id;
	this.color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
	//this.color = "rgb("+r+","+g+","+b+");";
	r += Math.floor(Math.random()*11) - 5
	g += Math.floor(Math.random()*11) - 5
	b += Math.floor(Math.random()*11) - 5
	if (r > 255 || r < 0) r = 0;
	if (g > 255 || g < 0) g = 0;
	if (b > 255 || b < 0) b = 0;
}

Tile.prototype.setColor = function(color) {
	this.color = color;
}

Tile.prototype.render = function() {
	ctx.fillStyle="#CCF";
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x+screen.xOffset,this.y+screen.yOffset,64,64);
}