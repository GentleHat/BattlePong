
function createSmoke(x,y) {
	var particleCount = 55;
	while( particleCount-- ) {
		particles.push( new SmokeParticle( x, y ) );
	}
}

function SmokeParticle(x,y) {
	this.x = x;
	this.y = y;
	this.coordinates = [];
	this.coordinateCount = 5;
	this.angle = random( 0, Math.PI * 2 );
	this.speed = random( 0, 2 );
	this.friction = 0.95;
	while (this.coordinateCount--) {
		this.coordinates.push([this.x,this.y]);
	}
	this.alpha = 40;
	this.decay = 0.8;

}

SmokeParticle.prototype.update = function(index) {
	this.coordinates.pop();
	// add current coordinates to the start of the array
	this.coordinates.unshift( [ this.x, this.y ] );
	this.x += Math.cos( this.angle ) * this.speed;
	this.y += Math.sin( this.angle ) * this.speed;

	this.alpha *= this.decay;
	if (this.alpha <= this.decay) {
		particles.splice( index, 1 );
	}
};

SmokeParticle.prototype.draw = function() {

	for (var i=0;i<this.coordinates.length;i++) {
		var alpha = (3 - i) * 0.12;
		ctx.fillStyle = 'hsla(' + 3 + ', 29%, ' + 66 + '%, ' + this.alpha + ')';
	}
	ctx.beginPath();
	// move to the last tracked coordinates in the set, then draw a line to the current x and y
	ctx.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
	ctx.lineTo( this.x, this.y );
	ctx.fillStyle = 'hsla(' + 3 + ', 29%, ' + this.alpha + '%, ' + this.alpha + ')';

	ctx.beginPath();
	ctx.arc(this.x,this.y, 9, 0, 2 * Math.PI, false);
	ctx.fill();
};



/* Dust Particle */

function createDust(x,y) {
	var particleCount = 55;
	while( particleCount-- ) {
		particles.push( new DustParticle( x, y ) );
	}
}

function DustParticle(x,y) {
	this.x = x;
	this.y = y;
	this.coordinates = [];
	this.coordinateCount = 5;
	this.angle = random( 0, Math.PI * 2 );
	this.speed = random( 0, 2 );
	this.friction = 0.95;
	while (this.coordinateCount--) {
		this.coordinates.push([this.x,this.y]);
	}
	this.alpha = 90;
	this.decay = 0.8;
}

DustParticle.prototype.update = function(index) {
	this.coordinates.pop();
	// add current coordinates to the start of the array
	this.coordinates.unshift( [ this.x, this.y ] );
	this.x += Math.cos( this.angle ) * this.speed * 2;
	this.y += Math.sin( this.angle ) * this.speed * 0.5;

	this.alpha *= this.decay;
	if (this.alpha <= this.decay) {
		particles.splice( index, 1 );
	}
};

DustParticle.prototype.draw = function() {

	for (var i=0;i<this.coordinates.length;i++) {
		var alpha = (3 - i) * 0.12;
		ctx.strokeStyle = 'hsla(' + 12 + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
	}
	ctx.strokeStyle = 'hsla(' + 12 + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
	ctx.beginPath();
	// move to the last tracked coordinates in the set, then draw a line to the current x and y
	ctx.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
	ctx.lineTo( this.x, this.y );
	ctx.stroke();
};
