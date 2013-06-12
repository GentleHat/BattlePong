
var canvas = null;
var _canvas = document.createElement('canvas');

var ctx = null;

//Draw entire buffer onto main canvas: ctx.drawImage(canvasBuffer, 0, 0);

/* Loading */

var game = null;
var entities = [];

//HTML onLoad event - Loading the game
$(window).load(function() {
	canvas = document.getElementById('canvas');
	canvas.height = 600;
	canvas.width = 600;
	//check whether browser supports getting canvas context
	if (canvas && canvas.getContext) {
		ctx = canvas.getContext('2d');
		ctx.fillStyle="#000";
		ctx.fillRect(0,0,canvas.width,canvas.height);
	}
	game = new Game();
	loop();
});


function Game() {
	this.ingame = true;
	this.menu = new Menu();
	this.gameover = false;
	this.currentLevel = 0;
	this.levels = [];
	for (var i=0;i<10;i++) {
		this.levels[i] = new Level(i);
	}
	level = this.levels[0];
	fireworks.push(new Firework(50,50,400,400));
	this.start();
}

Game.prototype.start = function() {
	balls.push(new Ball(-500,-500,0,0));
	balls.push(new Ball(250,250,4,4));
	balls.push(new Ball(350,250,4,4));
};

/* Game Loop */

var lastFrame = 0;
var frameTime = 0;
function loop()
{
	frameTime = getCurrentMs() - lastFrame;
	var thisFrame = getCurrentMs();
	draw();
	update();
	requestAnimationFrame(loop);
}

function draw() {
	if (game.ingame) {
		ctx.fillStyle = "#000";
		ctx.fillRect(0,0,canvas.width,canvas.height);
		for (var i=0;i<entities.length;i++) {
			entities[i].render();
		}
		//drawBalls();
		drawParticles();
		//enemy.draw();
		//player.draw();
		drawItems();
		drawFireworks();
		drawBlocks();
		ui.draw();
	}
	else {
		if (game.menu !== null)
			game.menu.draw();
	}
}

function update() {
	if (!game.gameover) {
		updateBalls();
		enemy.update();
		player.update();
		updateItems();
		level.update();
	}
	handleInteractions();
}


