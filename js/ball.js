var balls = [];

function Ball(x,y,xv,yv) {
	this.x = x;
	this.y = y;
	this.xv = xv;
	this.yv = yv;
	this.width = 20;
	this.height = 20;
}

Ball.prototype.draw = function() {
	ctx.fillStyle = "#F0F";
	ctx.fillRect(this.x,this.y,this.width,this.height);
};

Ball.prototype.update = function() {
	this.move();
};

Ball.prototype.move = function() {
	//Collision with walls
	if (this.x + this.xv < 0 || this.x + this.width + this.xv > 800) this.xv *= -1;
	if (this.y + this.yv < 0 || this.y + this.height + this.yv > 600) this.yv *= -1;
	//Collision with player
	if (this.x + this.width > player.x && this.x < player.x + player.width) {
		if (this.y + this.height > player.y) {
			this.yv *= -1;
			this.y -= 3;
		}
	}
	//Collision with enemy
	if (this.x + this.width > enemy.x && this.x < enemy.x + enemy.width) {
		if (this.y < enemy.y + enemy.height) {
			this.yv *= -1;
			this.y += 3;
		}
	}
	//Collide with other balls
	for (var i=0;i<balls.length;i++) {
		if (balls[i] !== this) {
						
		}
	}
	this.x += this.xv;
	this.y += this.yv;
};

Ball.prototype.collidex = function() {
	this.yv = this.xv * -1;
};
Ball.prototype.collidey = function() {
	this.yv = this.yv * -1;
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