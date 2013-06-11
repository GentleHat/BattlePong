var enemy = new Enemy(2);
function Enemy(difficulty) {
	this.score = 0;
	this.difficulty = difficulty;
	this.x = 275;
	this.y = 40;
	this.powerup = 0;
	this.lives = 3;
	this.width = 150;
	this.height = 30;
	this.pushing = false;
	this.lastPush = 0;
	this.speed = 3;
	this.boundingBox = new BoundingBox(this.x,this.y,this.width,this.height);
	this.destination = 400 - (this.width / 2);
	this.ticks = 0;
}

Enemy.prototype.draw = function() {
	ctx.fillStyle = '#FFF';
	ctx.fillRect(this.x,this.y, this.width,this.height);
	ctx.strokeStyle = "#CCC";
	ctx.strokeRect(this.x,this.y,this.width,this.height);

	var sight = getClosestBall(this.x+(this.width/2),this.y);
	var eye1x = -4 + (this.x - (sight.x * -1)) / 120; //Eye offsets based on closest ball position
	var eye2x = -4 + (this.x - (sight.x * -1)) / 120;

	ctx.strokeCircle(this.x+20,this.y+18,10,"#000");
	ctx.fillCircle(this.x+20+eye1x,this.y+20, 4, "#000");

	ctx.strokeCircle(this.x+130,this.y+18,10,"#000");
	ctx.fillCircle(this.x+130+eye2x,this.y+20, 4, "#000");
	//Mouth 
	//TODO: Change mouth expression based on game state
	ctx.fillStyle = "#333"
	ctx.fillRect(this.x+55,this.y+15,40,15);
};

Enemy.prototype.update = function() {
	this.ticks++;
	this.x += (this.destination - this.x) * 0.1;
	
	if (this.difficulty == 1) {
		if (this.ticks > 90) {
			this.ticks = 0;
			this.destination = Math.random() * 600;
		}
	}
	else if (this.difficulty == 2) {
		if (this.ticks > 80) {
			this.destination = getClosestBall().x - (this.width/2);
			var closeBall = getClosestBall();
			if (lineDistance(new Point(this.x+(this.width/2),this.y),new Point(closeBall.x,closeBall.y)) < 50) {
				this.push();
			}
		}
	}
	else if (this.difficulty == 3) {
		if (this.ticks > 40) {
			this.destination = getClosestBall().x - (this.width/2);
			var closeBall = getClosestBall();
			if (lineDistance(new Point(this.x+(this.width/2),this.y),new Point(closeBall.x,closeBall.y)) < 50) {
				this.push();
			}
		}
	}
	this.boundingBox.update(this.x,this.y);
};


Enemy.prototype.push = function() {
	if (this.lastPush + 0.8 < getCurrentMs()) {
		this.pushing = true;
		this.pushUp();
		this.lastPush = getCurrentMs();
	}
};

Enemy.prototype.pushUp = function() {
	var self = this;
	if (this.y > 65) {
		setTimeout(function () {
			self.pushing = false;
		}, 5);
	}
	if (this.pushing) {
		this.y += 3;
		setTimeout(function () {
			self.pushUp();
		}, 5);
		return;
	}
	else if (this.y > 40) {
		this.y -= 1;
		setTimeout(function () {
			self.pushUp();
		}, 5);
	}
};

//The closest ball in proximity to xy point.
function getClosestBall(x,y) { //TODO: This returns null if there's no balls in the array
	var theBall = null;
	for (var i=0;i<balls.length;i++) {
		if (balls[i] instanceof Ball) {
			if (theBall === null) {
				theBall = balls[i];
				continue;
			}
			else {
				if (lineDistance(theBall.x, theBall.y) > lineDistance(balls[i].x,balls[i].y)) {
					theBall = balls[i];
				}
			}
		}
	}
	if (theBall === null) theBall = new Ball(350,0,0,0);
	return theBall;
}

function lineDistance( point1, point2 )
{
	var xs = 0;
	var ys = 0;

	xs = point2.x - point1.x;
	xs = xs * xs;

	ys = point2.y - point1.y;
	ys = ys * ys;

	return Math.sqrt( xs + ys );
 }