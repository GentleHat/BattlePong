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
	this.boundingBox = new BoundingBox(this.x,this.y,this.width,this.height);
}

Ball.prototype.spawn = function() {
	ctx.fillRect();
};

Ball.prototype.draw = function() {
	ctx.fillStyle = "#F0F";
	ctx.fillRect(this.x,this.y,this.width,this.height);
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
	if (this.x + this.xv < 0 || this.x + this.width + this.xv > 800) this.xv *= -1;
	if (this.y + this.yv < 0 || this.y + this.height + this.yv > 600) this.yv *= -1;

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
	
	//Collide with balls
	for (var i=0;i<balls.length;i++) {
		if (balls[i] !== this) {
			if (this.boundingBox.isCollidingX(balls[i])) {
				this.xv *= -1;
				this.yv *= -1;
			}
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