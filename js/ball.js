var balls = [];

function Ball(x,y,xv,yv) {
	this.x = x;
	this.y = y;
	this.xv = xv;
	this.yv = yv;
	this.width = 20;
	this.height = 20;
	this.spawned = false;
	this.spawn();
	this.item = null;
	this.particleTicks = 0;
	this.boundingBox = new BoundingBox(this.x,this.y,this.width,this.height);
}

Ball.prototype.spawn = function() {
	ctx.fillRect();
};

Ball.prototype.draw = function() {
	ctx.fillStyle = "#F0F";
	ctx.fillRect(this.x,this.y,this.width,this.height);
	if (this.item !== null) {
		this.particleTicks++;
		if (this.particleTicks > 2) {
			ctx.fillStyle = "#0F0";
			ctx.fillRect(this.x,this.y,this.width,this.height);
			this.particleTicks = 0;
		}
	}
};

Ball.prototype.update = function() {
	this.move();
	this.boundingBox.update(this.x,this.y);
};

Ball.prototype.move = function() {
	var changex = this.xv;
	var changey = this.yv;

	this.x += changex;
	this.y += changey;
	//Collision with walls
	if (this.x + this.xv < 0 || this.x + this.width + this.xv > canvas.width) this.xv *= -1;
	if (this.y + this.yv < 0 || this.y + this.height + this.yv > canvas.height) this.yv *= -1;

	//Collision with paddles
	if (this.yv > 0) {
		if (this.boundingBox.isColliding(player)) {
			this.yv *= -1;
		}
	}
	if (this.yv < 0) {
		if (this.boundingBox.isColliding(enemy)) {
			this.yv *= -1;
		}
	}

	for (var i=0;i<items.length;i++) {
		if (this.boundingBox.isColliding(items[i])) {
			this.item = items[i];
			items[i].pickedUp = true;
		}
	}

	this.x -= changex;
	this.y -= changey;
	this.x += this.xv;
	this.y += this.yv;
};

function drawBalls() {
	for (var i=0;i<balls.length;i++) {
		balls[i].draw();
	}
}

function updateBalls() {
	for (var i=0;i<balls.length;i++) {
		balls[i].update();
	}
}