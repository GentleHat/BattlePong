
var items = [];

function Item() {
	var x = Math.floor(Math.random() * canvas.width) - 30; //Subtract item width to prevent offscreen items
	x = -30;
	var y = 150 + (Math.floor(Math.random() * (200)));
	this.x = x;
	this.y = y;
	this.xv = 0;
	this.yv = 0;
	this.width = 30;
	this.height = 30;
	this.boundingBox = new BoundingBox(this.x,this.y,this.width,this.height);
	this.xv = 0;
	this.yv = 0;
	this.type = "";
	this.pickedUp = false;
	this.sin = -100;
}

Item.prototype.spawn = function() {
	
};

Item.prototype.draw = function() {
	if (!this.pickedUp) {
		ctx.fillStyle = "#F00";
		ctx.fillRect(this.x,this.y,this.width,this.height);
	}
};

Item.prototype.update = function() {
	this.x += 1;
	this.sin++;

	this.y += Math.sin(this.sin / 90) ;
	if (this.sin > 100) this.sin = -100;
	this.boundingBox.update(this.x,this.y);
};

Item.prototype.use = function() {
	if (this.type == "firework") {

	}
};

function drawItems() {
	for (var i=0;i<items.length;i++) {
		items[i].draw();
	}
}
function updateItems() {
	for (var i=0;i<items.length;i++) {
		items[i].update();
	}
}