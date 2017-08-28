window.onload = () => {
	canvas = document.getElementById("canvas");
	canvas.width = Config.WIDTH;
	canvas.height = Config.HEIGHT;
	ctx = canvas.getContext('2d');
	gameMusic.play();

	loadingResources();

	field = getField(LEVEL_1);
};