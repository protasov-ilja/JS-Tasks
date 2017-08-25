class InterfaceController {
	constructor(gameController) {
		this._gameController = gameController;
		this.music = true;
		this.clearStep = null;
		this.score = 0;
		this.gameMusic = document.getElementById('gameMusic');
		this.winMusic = document.getElementById('winMusic');
		this.explodeMusic = document.getElementById('explodeMusic');
		this.bombForm = document.getElementById('bombNumber');
		this.liveForm = document.getElementById('liveNumber');
		this.scoreForm = document.getElementById('scoreNumber');

		this._newGameButton = document.getElementById('newGameButton');
		this._optionsButton = document.getElementById('gameOptions');
		this._optionsContainer = document.getElementById('optionsContainer');
		this._exitOptionsButton = document.getElementById('exitOptionsButton');

		this._musicButton = document.getElementById('musicButton');
		this._timer = document.getElementById('timeForm');
		this._levelFields = [LEVEL_1, LEVEL_2, LEVEL_3];

		this._musicButton.onclick = () => this._musicOn();
		this._newGameButton.onclick = () => this._startNewGame();
		this._optionsButton.onclick = () => this._openOptionsMenu();
		this._exitOptionsButton.onclick = () => this._closeOptionsMenu();

		const chooseLevel1 = document.getElementById('levelOne');
		const chooseLevel2 = document.getElementById('levelTwo');
		const chooseLevel3 = document.getElementById('levelThree');

		this._levelButtons = [chooseLevel1, chooseLevel2, chooseLevel3];

		for (let selButton = 0; selButton < this._levelButtons.length; ++selButton)
		{
			this._levelButtons[selButton].onclick = () => {
				this._selectLevel(selButton);
				this._gameController.initGame();
				this._closeOptionsMenu();
			};
		}
	}

	_musicOn() {
		if (this.music)
		{
			this._musicButton.innerHTML = 'OFF';
			this.music = false;
		}
		else
		{
			this._musicButton.innerHTML = 'ON';
			this.music = true;
		}

		this._soundController(this.music);
	}

	_soundController(music) {
		let i = music ? 1 : 0;
		this.gameMusic.volume = i;
		this.winMusic.volume = i;
		this.explodeMusic.volume = i;
	}

	_startNewGame() {
		canvas.classList.remove('end_game');
		this.winMusic.pause();

		initGame();
	}

	_selectLevel(indexButton) {
		field = getField(this._levelFields[indexButton]);

		for (let i = 0; i < this._levelButtons.length; ++i)
		{
			if (i == indexButton)
			{
				this._levelOn(this._levelButtons[i]);
			}
			else
			{
				this._levelOff(this._levelButtons[i]);
			}
		}
	}

	_levelOn(currLevel) {
		currLevel.classList.add('selected');
		currLevel.classList.remove('unselected');
	}

	_levelOff(currLevel) {
		currLevel.classList.remove('selected');
		currLevel.classList.add('unselected');
	}

	_openOptionsMenu() {
		this._optionsContainer.classList.remove('none');
	}

	_closeOptionsMenu() {
		this._optionsContainer.classList.add('none');
	}

	useTimer() {
		this._startTime = 300;

		this._timer.innerHTML = this._startTime;

		let currTime = this._startTime;

		clearInterval(this.clearStep);
		this.clearStep = setInterval(step, 1000);

		function step() {
			if (!this._gameController.endOfGame)
			{
				--currTime;

				if (currTime >= 0)
				{
					this._timer.innerHTML = currTime;
				}
				else
				{
					clearInterval(this.clearStep);
					this._gameController.endOfGame = true;
					this.endTheGame();
				}
			}
		}
	}

	endTheGame() {
		ctx.beginPath();
		ctx.font = "bold 50pt Arial";
		ctx.fillStyle = '#ffbe26';
		ctx.textAlign = 'center';
		ctx.fillText('Game Over', Config.WIDTH / 2, Config.HEIGHT / 2);
		ctx.fill();
		ctx.closePath();
	}

	winTheGame() {
		this.gameMusic.pause();
		this.gameMusic.CurrentTime = 0;
		this.winMusic.play();

		ctx.beginPath();
		ctx.font = "bold 50pt Arial";
		ctx.fillStyle = '#ff0021';
		ctx.textAlign = 'center';
		ctx.fillText('You WIN', Config.WIDTH / 2, Config.HEIGHT / 2);
		ctx.fill();
		ctx.closePath();
	}
}