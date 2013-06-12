
var items = [];

function Item(x,y,width,height) {
	this.x = x;
	this.y = y;
	this.xv = 0;
	this.yv = 0;
	this.width = width;
	this.height = height;
	this.boundingBox = new BoundingBox(this.x,this.y,this.width,this.height);
	this.xv = 0;
	this.yv = 0;
	this.type = "";
	this.pickedUp = false;
}

Item.prototype.spawn = function() {
	
};

Item.prototype.draw = function() {
	if (!this.pickedUp) {
		ctx.fillStyle = "#F00";
		ctx.fillRect(this.x,this.y,this.width,this.height);
	}
};

var t = 0;
Item.prototype.update = function() {
	this.x += 1;
	t++;
	if (t > 3) {
		this.y += (Math.sin(this.x) * 150) / 100;
		t = 0;
	}
	
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