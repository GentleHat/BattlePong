
$(window).load(function() {
	window.addEventListener('keydown', handleKeyDown, true);
	window.addEventListener('keyup', handleKeyUp, true);
});

var keys = [];
function Mouse() {
	this.x = 0;
	this.y = 0;
}  
var mouse = new Mouse(); 
//Disable browsers usual function of scrolling with up/down arrow keys
document.onkeydown=function(){return event.keyCode!=38 && event.keyCode!=40 && event.keyCode!=32}  
 
function handleKeyDown(evt) {
	keys[evt.keyCode] = true;
	handleInteractions(); 
}
function handleKeyUp(evt) {
	keys[evt.keyCode] = false;
}

//Function for key bindings
function handleInteractions() {
	if (keys[38]) { //Up arrow

	}
	if (keys[37]) { //Left Arrow
		player.x-=player.speed;
	}
	if (keys[39]) { //right arrow
		player.x+=player.speed;
	}
	if (keys [40]) { //down Arrow

	}
	if (keys [32]) { //spacebar
		player.push();
	}
}

$(window).load(function() {
//Mouse movement
	$('#canvas').mousemove(function(e){
		mouse.x = e.pageX - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;
	});
	//Mouse Cick
	$("#canvas").click(function(e){
		fireworks.push(new Firework(player.x,player.y,player.x,player.y-400));
	});
});

function rightClick(e) {

}
 