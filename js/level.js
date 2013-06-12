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
	items.push(new Item());
};