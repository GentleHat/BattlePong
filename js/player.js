var player = new Player();
function Player() {
	this.score = 0;
	this.x = 275;
	this.y = 430;
	this.speed = 6;
	this.width = 150;
	this.height = 30;
	this.boundingBox = new BoundingBox(this.x,this.y,this.width,this.height);
	this.powerup = 0;
	this.lives = 3;
	this.health = 100;
	this.pushing = false;
	this.lastPush = 0;
	this.lastFire = getCurrentMs();
	this.inventory = [];
}

Player.prototype.draw = function() {
	ctx.fillStyle = '#FFF';
	ctx.fillRect(this.x,this.y, this.width,this.height);
	ctx.strokeStyle = "#CCC";
	ctx.strokeRect(this.x,this.y,this.width,this.height);
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
	this.boundingBox.update(this.x,this.y);
};

Player.prototype.fire = function() {
	if (getCurrentMs() - this.lastFire > 0.120) { //TODO: Fix this, limit fire rate
		fireworks.push(new Firework(this.x+(this.width/2), this.y, enemy.x+(enemy.width/2),enemy.y));
		this.lastFire = getCurrentMs();
	}
};

Player.prototype.push = function() {
	if (this.lastPush + 0.8 < getCurrentMs()) {
		this.pushing = true;
		this.pushUp();
		this.lastPush = getCurrentMs();
	}
};

Player.prototype.pushUp = function() {
	var self = this;
	if (this.y < 390) {
		setTimeout(function () {
			self.pushing = false;
		}, 5);
	}
	if (this.pushing) {
		this.y -= (this.y / 300);
		setTimeout(function () {
			self.pushUp();
		}, 5);
		return;
	}
	else if (this.y < 430) {
		this.y += 1;
		setTimeout(function () {
			self.pushUp();
		}, 5);
	}
};

Player.prototype.useItem = function(number) {

};