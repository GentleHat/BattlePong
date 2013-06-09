var enemy = new Enemy(2);
function Enemy(difficulty) {
	this.score = 0;
	this.difficulty = difficulty;
	this.x = 400;
	this.y = 0;
	this.powerup = 0;
	this.lives = 3;
	this.width = 150;
	this.height = 30;
	this.destination = 400 - (this.width / 2);
	this.ticks = 0;
}

Enemy.prototype.draw = function() {
	ctx.fillStyle = '#FFF';
	ctx.fillRect(this.x,this.y, this.width,this.height);
};

Enemy.prototype.update = function() {
	this.ticks++;
	this.y = 25;
	if (this.x < this.destination) this.x += 3;
	if (this.x > this.destination) this.x -= 3;
	if (this.difficulty == 1) {
		if (this.ticks > 90) {
			this.ticks = 0;
			this.destination = Math.random() * 600;
		}
	}
	else if (this.difficulty == 2) {
		if (this.ticks > 90) {
			this.destination = getClosestBall().x - (this.width/2);
		}
	}
};

//The closest ball in proximity to xy point.
function getClosestBall(x,y) {
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