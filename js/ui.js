var ui = new UI();

function UI() {
}

UI.prototype.draw = function() {
	ctx.fillStyle = "#111";
	ctx.fillRect(0,500,700,100);
	ctx.fillStyle = "#FFF";
	ctx.fillText("Player", 50, 540);
	for (var i=0;i<player.lives;i++) {
		ctx.fillStyle = "#FFF";
		ctx.fillRect(50, 550+(i*10), 30, 08);
	}
};

UI.prototype.update = function() {

};