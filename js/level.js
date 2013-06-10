//level.js
var level = null;


function Level(num) {
	this.tiles = [];
	this.entities = [];
	this.background = '#000';
	this.itemSpawnTime = 0;
}

Level.prototype.draw = function() {
	
};

Level.prototype.update = function() {
	this.itemSpawnTime++;
	if (this.itemSpawnTime > 120) {
		this.spawnItem();
		this.itemSpawnTime = 0;
	}
};

Level.prototype.spawnItem = function() {
	var x = Math.floor(Math.random() * canvas.width) - 30; //Subtract item width to prevent offscreen items
	var y = 100 + (Math.floor(Math.random() * (canvas.height - 200)));
	items.push(new Item(x,y,30,30));
};