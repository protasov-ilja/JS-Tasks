const gameMusic = document.getElementById('gameMusic');
const winMusic = document.getElementById('winMusic');
const explodeMusic = document.getElementById('explodeMusic');
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
	if (music)
	{
		musicButton.innerHTML = 'OFF';
		music = false;
	}
	else
	{
		musicButton.innerHTML = 'ON';
		music = true;
	}

	SoundController(music);
}

function SoundController(music) {
	let i = music ? 1 : 0;
	gameMusic.volume = i;
	winMusic.volume = i;
	explodeMusic.volume = i;
}

newGameButton.onclick = startNewGame;

function startNewGame() {
	canvas.classList.remove('end_game');
	winMusic.pause();

	initGame();
}

for (let selButton = 0; selButton < levelButtons.length; ++selButton)
{
	levelButtons[selButton].onclick = () => {
		selectLevel(selButton);
		initGame();
		closeOptionsMenu();
	};
}

function selectLevel(indexButton) {
	field = getField(levelFields[indexButton]);

	for (let i = 0; i < levelButtons.length; ++i)
	{
		if (i == indexButton)
		{
			levelOn(levelButtons[i]);
		}
		else
		{
			levelOff(levelButtons[i]);
		}
	}
}

function levelOn(currLevel) {
	currLevel.classList.add('selected');
	currLevel.classList.remove('unselected');
}

function levelOff(currLevel) {
	currLevel.classList.remove('selected');
	currLevel.classList.add('unselected');
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

	timer.innerHTML = startTime;

	let currTime = startTime;

	clearInterval(clearStep);
	clearStep = setInterval(step, 1000);

	function step() {
		if (!endOfGame)
		{
			--currTime;

			if (currTime >= 0)
			{
				timer.innerHTML = currTime;
			}
			else
			{
				clearInterval(clearStep);
				endOfGame = true;
				endTheGame();
			}
		}
	}
}

function endTheGame() {
	ctx.beginPath();
	ctx.font = "bold 50pt Arial";
	ctx.fillStyle = '#ffbe26';
	ctx.textAlign = 'center';
	ctx.fillText('Game Over', Config.WIDTH / 2, Config.HEIGHT / 2);
	ctx.fill();
	ctx.closePath();
}

function winTheGame() {
	gameMusic.pause();
	gameMusic.CurrentTime = 0;
	winMusic.play();

	ctx.beginPath();
	ctx.font = "bold 50pt Arial";
	ctx.fillStyle = '#ff0021';
	ctx.textAlign = 'center';
	ctx.fillText('You WIN', Config.WIDTH / 2, Config.HEIGHT / 2);
	ctx.fill();
	ctx.closePath();
}