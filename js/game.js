
var canvas = null;
var ctx = null;

//Draw entire buffer onto main canvas: ctx.drawImage(canvasBuffer, 0, 0);

/* Loading */

var game = null;
var entities = new Array();

//HTML onLoad event - Loading the game
$(window).load(function() {
	canvas = document.getElementById('canvas');
	canvas.height = 600;
	canvas.width = 800;
	//check whether browser supports getting canvas context
	if (canvas && canvas.getContext) {
		ctx = canvas.getContext('2d');
		ctx.fillStyle="#000";
		ctx.fillRect(0,0,800,600);
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
	fireworks.push(new Firework(50,50,400,400));
	this.start();
}

Game.prototype.start = function() {
	balls.push(new Ball(250,250,7,7));
	balls.push(new Ball(350,250,7,7));
	balls.push(new Ball(750,250,7,7));
};

/* Game Loop */

var frameTime = 0;
function loop()
{
	if (getCurrentMs() - frameTime > 0.030) {
		frameTime = getCurrentMs();
		draw();
		update();
		loop();
	}
	else setTimeout('loop()', 30);
}

function draw() {
	if (game.ingame) {
		ctx.fillStyle = "#000";
		ctx.fillRect(0,0,800,600);
		for (var i=0;i<entities.length;i++) {
			entities[i].render();
		}
		drawBalls();
		enemy.draw();
		player.draw();
		drawFireworks();
		drawParticles();
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
	}
	handleInteractions();
}


