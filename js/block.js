var blocks = [];

for (var i=0;i<14;i++) {
	blocks.push(new Block(i*50,480));
}
for (var i=0;i<14;i++) {
	blocks.push(new Block(i*50,0,player));
}

function Block(x,y,owner) {
	this.x = x;
	this.y = y;
	this.width = 50;
	this.height = 20;
	this.health = 3;
	this.owner = owner;
	this.boundingBox = new BoundingBox(this.x,this.y,this.width,this.height);
}

Block.prototype.draw = function() {
	ctx.fillStyle = "#F00"; //Error case
	switch (this.health) {
		case 3: ctx.fillStyle = "#999"; break;
		case 2: ctx.fillStyle = "#666"; break;
		case 1: ctx.fillStyle = "#333"; break;
		case 0: ctx.fillStyle = "#000"; break;
	}
	ctx.fillRect(this.x,this.y,this.width,this.height);
	ctx.strokeStyle = "#000";
	ctx.strokeRect(this.x,this.y,this.width,this.height);
};

Block.prototype.update = function() {

};

Block.prototype.damage = function() {
	this.health -= 15;
	if (this.health <= 0) this.destroy();
};

Block.prototype.destroy = function() {
	createBlockParticles(this.x,this.y);
	for (var i = 0; i < blocks.length; i++)
	{
		if (blocks[i] === this) { 
			blocks.splice(i, 1);
			break;
		}
	}
};

function drawBlocks() {
	for (var i=0;i<blocks.length;i++) {
		blocks[i].draw();
	}
}

function updateBlocks() {
	for (var i=0;i<blocks.length;i++) {
		blocks[i].update();
	}
}
