
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
}
function handleKeyUp(evt) {
	keys[evt.keyCode] = false;
}
$('canvas').bind('contextmenu', function(e){
	rightClick(e);
    return false; //Disable usual context menu behaviour
});
//Function for key bindings
function handleInteractions() {
	if (keys[38]) { //Up arrow
		player.yVel = -5;
	}
	if (keys[37]) { //Left Arrow
		player.x--;
	}
	if (keys[39]) { //right arrow
		player.x++;
	}
	if (keys [40]) { //down arrow
		player.yVel = 5;
	}
	if (keys [32]) { //spacebar
		player.fire();
	}
}

$(window).load(function() {
//Mouse movement
	$('#canvas').mousemove(function(e){
		mouse.x = e.pageX - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;
	});
});

function rightClick(e) {

}

$(window).load(function() {
	$("#canvas").click(function(e){
		player.fire1();
	});
});

