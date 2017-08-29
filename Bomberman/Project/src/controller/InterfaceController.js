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
let currLevel = 0;

musicButton.onclick = musicOn;
newGameButton.onclick = startNewGame;
optionsButton.onclick = openOptionsMenu;
exitOptionsButton.onclick = closeOptionsMenu;

for (let selButton = 0; selButton < levelButtons.length; ++selButton)
{
	levelButtons[selButton].onclick = () => {
		currLevel = selButton;

		selectLevel(selButton);
		initGame();
		closeOptionsMenu();
	};
}

function startNewGame() {
	canvas.classList.remove('end_game');

	field = getField(levelFields[currLevel]);

	initGame();
}

function selectLevel(indexButton) {
	field = getField(levelFields[indexButton]);

	for (let i = 0; i < levelButtons.length; ++i)
	{
		setLevelButtonSelected(levelButtons[i], i == indexButton);
	}
}

function setLevelButtonSelected(button, selected) {
	button.classList.remove(selected ? 'unselected' : 'selected');
	button.classList.add(selected ? 'selected' : 'unselected');
}

function openOptionsMenu() {
	optionsContainer.classList.remove('none');
}

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