var player = new Player();
function Player() {
	this.score = 0;
	this.x = 0;
	this.y = 0;
	this.width = 150;
	this.powerup = 0;
	this.lives = 3;
	this.health = 100;
}

Player.prototype.draw = function() {
	ctx.fillStyle = '#FFF';
	ctx.fillRect(this.x,this.y, this.width,30);
};

Player.prototype.update = function() {
	this.x = mouse.x - (this.width/2);
	this.y = 550;
};

Player.prototype.fire1 = function() {
	fireworks.push(new Firework(this.x+(this.width/2), this.y, enemy.x+(enemy.width/2),enemy.y));
};