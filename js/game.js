
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
	this.started = true;
	this.gameover = false;
	this.currentWave = 1;
	this.level = new Level(0,0);
	fireworks.push(new Firework(50,50,400,400));
	this.start();
}

Game.prototype.start = function() {
	balls.push(new Ball(250,250,4,4));
};

/* Game Loop */

var frameTime = 0;
function loop()
{

	if (getCurrentMs() - frameTime > 0.018) {
		frameTime = getCurrentMs();
		draw();
		update();
		loop();
	}
	else setTimeout('loop()', 18);
}

function draw() {
	if (game.started) {
		renderLevel(game.level);
		screen.scroll();
		for (var i=0;i<entities.length;i++) {
			entities[i].render();
		}
		drawBalls();
		enemy.draw();
		player.draw();
		drawFireworks();
		drawParticles();
	}
}

function update() {
	if (!game.gameover && game.started) {
		updateBalls();
		enemy.update();
		player.update();
	}
}


