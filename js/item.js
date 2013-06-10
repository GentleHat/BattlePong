
var items = [];

function Item(x,y,width,height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.boundingBox = new BoundingBox(this.x,this.y,this.width,this.height);
	this.xv = 0;
	this.yv = 0;
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

Item.prototype.update = function() {
	this.x += this.xv;
	this.y += this.yv;
	this.boundingBox.update(this.x,this.y);
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