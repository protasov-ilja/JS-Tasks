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
const levelOn = '#fff601';
const levelOff = '#ffffff';

let music = true;
let clearStep = null;
let score = 0;

musicButton.onclick = musicOn;

function musicOn(event) {
	event.preventDefault();
	if (music) {
		musicButton.innerHTML = 'OFF';
		music = false;
	} else {
		musicButton.innerHTML = 'ON';
		music = true;
	}
}

newGameButton.onclick = startNewGame;

function startNewGame(event) {
	event.preventDefault();

	canvas.classList.remove('end_game');

	initGame();
}

chooseLevel1.onclick = selectLevel1;

function selectLevel1(event) {
	event.preventDefault();

	field = LEVEL_1.slice(0);
	chooseLevel1.style.color = levelOn;
	chooseLevel2.style.color = levelOff;
	chooseLevel3.style.color = levelOff;

	initGame();
}

chooseLevel2.onclick = selectLevel2;

function selectLevel2(event) {
	event.preventDefault();

	field = LEVEL_2.slice(0);
	chooseLevel1.style.color = levelOff;
	chooseLevel2.style.color = levelOn;
	chooseLevel3.style.color = levelOff;

	initGame();
}

chooseLevel3.onclick = selectLevel3;

function selectLevel3(event) {
	event.preventDefault();

	field = LEVEL_3.slice(0);
	chooseLevel1.style.color = levelOff;
	chooseLevel2.style.color = levelOff;
	chooseLevel3.style.color = levelOn;

	initGame();
}

optionsButton.onclick = openOptionsMenu;

function openOptionsMenu(event) {
	event.preventDefault();
	optionsContainer.classList.remove('none');
}

exitOptionsButton.onclick = closeOptionsMenu;

function closeOptionsMenu(event) {
	event.preventDefault();
	optionsContainer.classList.add('none');
}

function useTimer() {
	const startTime = 300;

	let currTime = startTime;

	clearInterval(clearStep);
	clearStep = setInterval(step, 1000);

	function step() {
		--currTime;
		if (currTime > 0) {
			timer.innerHTML = currTime;
		} else {
			clearInterval(clearStep);
			alert('Время вышло');
		}
	}
}