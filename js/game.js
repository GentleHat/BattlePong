
var canvas = null;
var ctx = null;

//Draw entire buffer onto main canvas: ctx.drawImage(canvasBuffer, 0, 0);

/* Loading */

var game = null;
var entities = new Array();

//HTML onLoad event - Loading the game
$(window).load(function() {

		canvas = document.getElementById('canvas');
		canvas.height = $(window).height();
		canvas.width = $(window).width();
		//check whether browser supports getting canvas context
		if (canvas && canvas.getContext) {
			ctx = canvas.getContext('2d');
			ctx.fillStyle="#000";
			ctx.fillRect(0,0,1100,900);
		}
		game = new Game();
		loop();
	}
)


function Game() {
	this.started = true;
	this.gameover = false;
	this.currentWave = 1;
	this.level = new Level(0,0);
;}

/* Game Loop */

var frameTime = 0;
function loop()
{
	if ($(window).width() != canvas.width || $(window).height() != canvas.height) {
		canvas.height = $(window).height();
		canvas.width = $(window).width();
	}
	if (getCurrentMs() - frameTime > 0.019) {
		frameTime = getCurrentMs();
		draw();
		update();
		loop();

	}
	else setTimeout('loop()', 19);
}

function draw() {

	if (game.started) {
		renderLevel(game.level);
		screen.scroll();
		for (var i=0;i<entities.length;i++) {
			entities[i].render();
		}
		player.draw();
	}
}

function update() {
	if (!game.gameover && game.started) {
		player.update();
	}
}


function loop2() {
	// we want to create a trailing effect though
	// setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
	ctx.globalCompositeOperation = 'destination-out';
	// decrease the alpha property to create more prominent trails
	ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
	ctx.fillRect( 0, 0, canwidth, canheight );
	// change the composite operation back to our main mode
	// lighter creates bright highlight points as the fireworks and particles overlap each other
	ctx.globalCompositeOperation = 'lighter';
	
	// launch fireworks automatically to random coordinates, when the mouse isn't down
	if( timerTick >= timerTotal ) {
		if( !mousedown ) {
			// start the firework at the bottom middle of the screen, then set the random target coordinates, the random y coordinates will be set within the range of the top half of the screen
			fireworks.push( new Firework( canwidth / 2, canheight, random( 0, canwidth / 2 ), random( 0, ch / 2 ) ) );
			timerTick = 0;
		}
	} else {
		timerTick++;
	}
	
	// limit the rate at which fireworks get launched when mouse is down
	if( limiterTick >= limiterTotal ) {
		if( mousedown ) {
			// start the firework at the bottom middle of the screen, then set the current mouse coordinates as the target
			fireworks.push( new Firework( canwidth / 2, 0, mx, my ) ); //Launched start coordinates
			limiterTick = 0;
		}
	} else {
		limiterTick++;
	}

}
