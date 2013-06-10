var player = new Player();
function Player() {
	this.score = 0;
	this.x = 0;
	this.y = 0;
	this.speed = 6;
	this.width = 150;
	this.height = 30;
	this.boundingBox = new BoundingBox(this.x,this.y,this.width,this.height);
	this.powerup = 0;
	this.lives = 3;
	this.health = 100;
	this.lastFire = getCurrentMs();
	this.inventory = [];
}

Player.prototype.draw = function() {
	ctx.fillStyle = '#FFF';
	ctx.fillRect(this.x,this.y, this.width,30);
	//Eyes
	var sight = getClosestBall(this.x+20,this.y+13);
	var eye1x = -4 + (this.x - (sight.x * -1)) / 120; //Eye offsets based on closest ball position
	var eye2x = -4 + (this.x - (sight.x * -1)) / 120;

	ctx.strokeCircle(this.x+20,this.y+13,10,"#000");
	ctx.fillCircle(this.x+20+eye1x,this.y+11, 7, "#000");

	ctx.strokeCircle(this.x+130,this.y+13,10,"#000");
	ctx.fillCircle(this.x+130+eye2x,this.y+11, 7, "#000");
	//Mouth 
	//TODO: Change mouth expression based on game state
	ctx.beginPath();
	ctx.arc(this.x+77, this.y+10, 15, 0, Math.PI, false);
	ctx.closePath();
	ctx.fillStyle = 'red';
	ctx.fill();
	ctx.strokeStyle = '#550000';
	ctx.stroke();
};

CanvasRenderingContext2D.prototype.fillCircle = function(x,y,r,color) {
	this.fillStyle = color;
	this.beginPath();
	this.arc(x, y, r, 0, 2 * Math.PI, false);
	this.fill();
};

CanvasRenderingContext2D.prototype.strokeCircle = function(x,y,r,color) {
	this.strokeStyle = color;
	this.beginPath();
	this.arc(x, y, r, 0, 2 * Math.PI, false);
	this.stroke();
};

Player.prototype.update = function() {
	//this.x = mouse.x - (this.width/2);
	this.y = 550;
	this.boundingBox.update(this.x,this.y);
};

Player.prototype.fire = function() {
	if (getCurrentMs() - this.lastFire > 0.120) { //TODO: Fix this, limit fire rate
		fireworks.push(new Firework(this.x+(this.width/2), this.y, enemy.x+(enemy.width/2),enemy.y));
		this.lastFire = getCurrentMs();
	}
};

Player.prototype.useItem = function(number) {

};