
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

//Impact 1 - Impact particles that fall down
function createImpact1(x,y) {
	var particleCount = 55;
	while( particleCount-- ) {
		particles.push( new ImpactParticle1( x, y ) );
	}
}

function ImpactParticle1(x,y) {
	this.x = x;
	this.y = y;
	this.coordinates = [];
	this.coordinateCount = 5;
	this.angle = random( 4, Math.PI * 4 );
	this.speed = random( 2, 4 );
	this.friction = 0.95;
	while (this.coordinateCount--) {
		this.coordinates.push([this.x,this.y]);
	}
	this.alpha = 75;
	this.decay = 0.6;
}

ImpactParticle1.prototype.update = function(index) {
	this.coordinates.pop();
	// add current coordinates to the start of the array
	this.coordinates.unshift( [ this.x, this.y ] );
	this.x += Math.cos( this.angle ) * this.speed * 1;
	this.y += Math.abs(Math.sin( this.angle ) * this.speed * 0.5)*-1;

	this.alpha *= this.decay;
	if (this.alpha <= this.decay) {
		particles.splice( index, 1 );
	}
};

ImpactParticle1.prototype.draw = function() {

	for (var i=0;i<this.coordinates.length;i++) {
		var alpha = i * 80;
		ctx.fillStyle = "rgba("+222+","+222+","+222+","+alpha+")";
		ctx.fillRect(this.coordinates[i][0],this.coordinates[i][1],1,1);
	}
	ctx.strokeStyle = 'hsla(' + 12 + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
	ctx.strokeStyle = "rgba("+222+","+222+","+222+",150)";
	//ctx.beginPath();
	// move to the last tracked coordinates in the set, then draw a line to the current x and y
	//ctx.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
	//ctx.lineTo( this.x, this.y );
	//ctx.stroke();
};


//Impact 2 - Impact particles that fall up
function createImpact2(x,y) {
	var particleCount = 15;
	while( particleCount-- ) {
		particles.push( new ImpactParticle2( x, y ) );
	}
}

function ImpactParticle2(x,y) {
	this.x = x;
	this.y = y;
	this.coordinates = [];
	this.coordinateCount = 5;
	this.angle = random( 0, Math.PI * 2 );
	this.speed = random( 2, 4 );
	this.friction = 0.95;
	while (this.coordinateCount--) {
		this.coordinates.push([this.x,this.y]);
	}
	this.alpha = 75;
	this.decay = 0.6;
}

ImpactParticle2.prototype.update = function(index) {
	this.coordinates.pop();
	// add current coordinates to the start of the array
	this.coordinates.unshift( [ this.x, this.y ] );
	this.x += Math.cos( this.angle ) * this.speed * 1;
	this.y += Math.abs(Math.sin( this.angle ) * this.speed * 0.5)*-1;

	this.alpha *= this.decay;
	if (this.alpha <= this.decay) {
		particles.splice( index, 1 );
	}
};

ImpactParticle2.prototype.draw = function() {

	for (var i=0;i<this.coordinates.length;i++) {
		var alpha = i * 80;
		ctx.fillStyle = "rgba("+222+","+222+","+222+","+alpha+")";
		ctx.fillRect(this.coordinates[i][0],this.coordinates[i][1],1,1);
	}
	ctx.strokeStyle = 'hsla(' + 12 + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
	ctx.strokeStyle = "rgba("+222+","+222+","+222+",150)";
	//ctx.beginPath();
	// move to the last tracked coordinates in the set, then draw a line to the current x and y
	//ctx.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
	//ctx.lineTo( this.x, this.y );
	//ctx.stroke();
};


//Block destroy particles
function createBlockParticles(x,y) {
	//TODO: Block paricles spawn in in the shape of the block (rectangle)
	var particleCount = 12;
	var yOffset = 0;
	for (var i=0;i<particleCount;i++) {
		if (i > 5) yOffset = 3;
		particles.push( new BlockParticle( x + (i*5), y + yOffset ));
	}
}

function BlockParticle(x,y) {
	this.x = x;
	this.y = y;
	this.coordinates = [];
	this.coordinateCount = 5;
	this.angle = random( 0, Math.PI * 2 );
	this.speed = random( 2, 4 );
	this.friction = 0.95;
	while (this.coordinateCount--) {
		this.coordinates.push([this.x,this.y]);
	}
	this.alpha = 75;
	this.decay = 0.9;
}

BlockParticle.prototype.update = function(index) {
	this.coordinates.pop();
	// add current coordinates to the start of the array
	this.coordinates.unshift( [ this.x, this.y ] );
	//this.x += Math.cos( this.angle ) * this.speed * 1;
	//this.y += Math.abs(Math.sin( this.angle ) * this.speed * 0.5)*-1;
	this.x += Math.random(this.speed*-1,this.speed);
	this.y += Math.random(this.speed*-1,this.speed);

	this.alpha *= this.decay;
	if (this.alpha <= this.decay) {
		particles.splice( index, 1 );
	}
};

BlockParticle.prototype.draw = function() {
	for (var i=0;i<this.coordinates.length;i++) {
		var alpha = i * 80;
		ctx.fillStyle = "rgba("+30+","+30+","+30+","+alpha+")";
		ctx.fillRect(this.coordinates[i][0],this.coordinates[i][1],3,3);
		ctx.strokeStyle = "#000";
		ctx.fillRect(this.coordinates[i][0],this.coordinates[i][1],3,3);
	}
};