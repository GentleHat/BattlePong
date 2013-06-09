var player = new Player();
function Player() {
	this.score = 0;
	this.x = 0;
	this.y = 0;
	this.powerup = 0;
}

Player.prototype.draw = function() {
	ctx.fillStyle = '#FFF';
	ctx.fillRect(this.x,this.y, 150,30);
}

Player.prototype.update = function() {
	this.x = mouse.x;
	this.y = canvas.height - 200;
}