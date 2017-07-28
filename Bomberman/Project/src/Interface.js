const scoreForm = document.getElementById('scoreNumber');
const newGameButton = document.getElementById('newGameButton');
const optionsButton = document.getElementById('gameOptions');
const optionsContainer = document.getElementById('optionsContainer');
const exitOptionsButton = document.getElementById('exitOptionsButton');
const chooseLevel1 = document.getElementById('levelOne');
const chooseLevel2 = document.getElementById('levelTwo');
const chooseLevel3 = document.getElementById('levelThree');
const musicButton = document.getElementById('musicButton');
const timer = document.getElementById('timeForm');
const bombForm = document.getElementById('bombNumber');
const liveForm = document.getElementById('liveNumber');
const levelButtons = [chooseLevel1, chooseLevel2, chooseLevel3];
const levelFields = [LEVEL_1, LEVEL_2, LEVEL_3];

let music = true;
let clearStep = null;
let score = 0;

musicButton.onclick = musicOn;

function musicOn() {
	if (music) {
		musicButton.innerHTML = 'OFF';
		music = false;
	} else {
		musicButton.innerHTML = 'ON';
		music = true;
	}
}

newGameButton.onclick = startNewGame;

function startNewGame() {
	canvas.classList.remove('end_game');

	initGame();
}

for (let selButton = 0; selButton < levelButtons.length; ++selButton) {
	levelButtons[selButton].onclick = () => {
		selectLevel(selButton);
		initGame();
		closeOptionsMenu();
	};
}

function selectLevel(indexButton) {
	field = levelFields[indexButton].slice(0);

	for (let i = 0; i < levelButtons.length; ++i) {
		if (i == indexButton) {
			levelOn(levelButtons[i]);
		} else {
			levelOff(levelButtons[i]);
		}
	}
}

function levelOn(CurrLevel) {
	CurrLevel.classList.add('selected');
	CurrLevel.classList.remove('unselected');
}

function levelOff(CurrLevel) {
	CurrLevel.classList.remove('selected');
	CurrLevel.classList.add('unselected');
}

optionsButton.onclick = openOptionsMenu;

function openOptionsMenu() {
	optionsContainer.classList.remove('none');
}

exitOptionsButton.onclick = closeOptionsMenu;

function closeOptionsMenu() {
	optionsContainer.classList.add('none');
}

function useTimer() {
	const startTime = 300;

	let currTime = startTime;

	clearInterval(clearStep);
	clearStep = setInterval(step, 1000);

	function step() {
		--currTime;
		if (currTime >= 0) {
			timer.innerHTML = currTime;
		} else {
			clearInterval(clearStep);
			endTheGame();
			alert('Время вышло');
		}
	}
}

function endTheGame() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	ctx.beginPath();
	ctx.fillStyle = '#017709';
	ctx.textAlign = 'center';
	ctx.fillText('Game Over', WIDTH / 2, HEIGHT / 2);
	ctx.fill();
	ctx.closePath();
}