
function Menu() {
	this.options = [];
	this.options[0] = new Option("Start Game", "game.start");
	this.options[1] = new Option("Settings","game.settings");
	this.options[2] = new Option("Credits","game.credits");
	this.selection = 0;
}

Menu.prototype.draw = function() {
	ctx.fillStyle="#000";
	ctx.fillRect(0,0,800,600);
	ctx.fillStyle="#333";
	ctx.textAlign = 'center';
	ctx.font = 'regular 40pt Calibri';
	for (var i=0;i<this.options.length;i++) {
		var item = "";
		if (this.selection === i) item = "> ";
		item += this.options[i].title;
		ctx.fillText(item, 400, 200+(i*60));
	}
};

function Option(title, func) {
	this.title = title;
	this.func = func;
}

Option.prototype.execute = function() {
	eval(this.func);
};