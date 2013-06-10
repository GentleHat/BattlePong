var balls = [];

function Ball(x,y,xv,yv) {
	this.x = x;
	this.y = y;
	this.xv = xv;
	this.yv = yv;
	this.width = 18;
	this.height = 18;
	this.spawned = false;
	this.item = null;
	this.particleTicks = 0;
	this.boundingBox = new BoundingBox(this.x,this.y,this.width,this.height);
	this.coordinates = [];
	this.coordinateCount = 10;
	while( this.coordinateCount-- ) {
		this.coordinates.push( [ this.x, this.y ] );
	}
}

Ball.prototype.draw = function() {
	var hue = 123;
	if (this.item !== null) {
		this.particleTicks++;
		if (this.particleTicks > 2) {
			hue = 2;
			this.particleTicks = 0;
		}
	}
	this.coordinates.pop();
	this.coordinates.unshift( [this.x,this.y] );
	ctx.beginPath();
	ctx.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
	ctx.lineTo(this.x,this.y);
	if (Math.abs(this.x)+Math.abs(this.y) < 10) i = 22;
	for (var i=0;i<this.coordinates.length;i++) {
		var alpha = (3 - i) * 0.12;
		hue = 249;
		ctx.fillStyle = 'hsla(' + hue + ', 100%, ' + 90 + '%, ' + alpha + ')';
		ctx.fillCircle(this.coordinates[i][0], this.coordinates[i][1], 10,10);
		ctx.fillCircle(this.coordinates[i][0]-this.xv/2, this.coordinates[i][1]-this.yv/2, 10,10);
		ctx.fillCircle(this.coordinates[i][0]-this.xv/5, this.coordinates[i][1]-this.yv/5, 10,10);
	}
};

Ball.prototype.update = function() {
	this.move();
	this.boundingBox.update(this.x-(this.width/3),this.y-(this.height/3));
};

Ball.prototype.move = function() {
	var changex = this.xv;
	var changey = this.yv;

	this.x += changex;
	this.y += changey;
	//Collision with walls
	if (this.x + this.xv < 0 || this.x + this.width + this.xv > canvas.width) this.xv *= -1;

	//Collision with paddles
	if (this.yv > 0) {
		if (this.boundingBox.isColliding(player)) {
			this.yv *= -1;
			if (player.pushing) this.yv *= 1.5;
		}
	}
	//Collision with enemy
	if (this.yv < 0) {
		if (this.boundingBox.isColliding(enemy) && this.y > 25) {
			this.yv *= -1;
			if (enemy.pushing) this.yv *= 1.5;
		}
	}
	//Collision with player
	for (var i=0;i<items.length;i++) {
		if (this.boundingBox.isColliding(items[i])) {
			this.item = items[i];
			items[i].pickedUp = true;
		}
	}
	for (var i=0;i<blocks.length;i++) {
		if (this.boundingBox.isColliding(blocks[i])) {
			blocks[i].damage();
			this.yv *= -1;
			break;
		}
	}
	//Speed limits
	if (this.xv > 14) this.xv = 14;
	if (this.yv > 14) this.yv = 14;
	if (this.xv < -14) this.xv = -14;
	if (this.yv < -14) this.yv = -14;

	this.x -= changex;
	this.y -= changey;
	this.x += this.xv;
	this.y += this.yv;
};

Ball.prototype.destroy = function() {
	for (var i = 0; i < balls.length; i++)
	{
		if (balls[i] === this) { 
			balls.splice(i, 1);
			break;
		}
	}
}

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