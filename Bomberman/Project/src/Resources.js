const playerSprites = [];
const playerDownDirection = [];
const playerUpDirection = [];
const playerRightDirection = [];
const playerLeftDirection = [];
const balloonSprites = [];
const balloonDownDirection = [];
const balloonUpDirection = [];
const balloonRightDirection = [];
const balloonLeftDirection = [];
const bombMove = [];
const burst = [];
const burstCenter = [];
const burstUp = [];
const burstDown = [];
const burstLeft = [];
const burstRight = [];
const burstLongUp = [];
const burstLongLeft = [];

let canvas = null;
let ctx = null;
let loadedResourcesCount = 0;
let spriteBlock1 = null;
let spriteBlock2 = null;
let monsters = [];

window.onload = () => {
	canvas = document.getElementById("canvas");
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	ctx = canvas.getContext('2d');

	LoadingResources();
};

function onItemLoaded() {
	++loadedResourcesCount;

	if (loadedResourcesCount === resourcesToLoadCount)
	{
		initGame();
	}
}

function LoadingResources() {
	const moveDown1 = createImage(onItemLoaded);
	moveDown1.src = 'img/sprites/player/player_down/1.png';
	const moveDown2 = createImage(onItemLoaded);
	moveDown2.src = 'img/sprites/player/player_down/2.png';
	const moveDown3 = createImage(onItemLoaded);
	moveDown3.src = 'img/sprites/player/player_down/3.png';
	playerDownDirection.push(moveDown1, moveDown2, moveDown3/*, four, five*/);

	const moveUp1 = createImage(onItemLoaded);
	moveUp1.src = 'img/sprites/player/player_up/1.png';
	const moveUp2 = createImage(onItemLoaded);
	moveUp2.src = 'img/sprites/player/player_up/2.png';
	const moveUp3 = createImage(onItemLoaded);
	moveUp3.src = 'img/sprites/player/player_up/3.png';
	playerUpDirection.push(moveUp1, moveUp2, moveUp3);

	const moveRight1 = createImage(onItemLoaded);
	moveRight1.src = 'img/sprites/player/player_right/1.png';
	const moveRight2 = createImage(onItemLoaded);
	moveRight2.src = 'img/sprites/player/player_right/2.png';
	const moveRight3 = createImage(onItemLoaded);
	moveRight3.src = 'img/sprites/player/player_right/3.png';
	playerRightDirection.push(moveRight1, moveRight2, moveRight3);

	const moveLeft1 = createImage(onItemLoaded);
	moveLeft1.src = 'img/sprites/player/player_left/1.png';
	const moveLeft2 = createImage(onItemLoaded);
	moveLeft2.src = 'img/sprites/player/player_left/2.png';
	const moveLeft3 = createImage(onItemLoaded);
	moveLeft3.src = 'img/sprites/player/player_left/3.png';
	playerLeftDirection.push(moveLeft1, moveLeft2, moveLeft3);

	playerSprites[DOWN] = playerDownDirection;
	playerSprites[UP] = playerUpDirection;
	playerSprites[RIGHT] = playerRightDirection;
	playerSprites[LEFT] = playerLeftDirection;

	const balloonDown1 = createImage(onItemLoaded);
	balloonDown1.src = 'img/sprites/monster_balloon/monster_down/1.png';
	const balloonDown2 = createImage(onItemLoaded);
	balloonDown2.src = 'img/sprites/monster_balloon/monster_down//2.png';
	const balloonDown3 = createImage(onItemLoaded);
	balloonDown3.src = 'img/sprites/monster_balloon/monster_down//3.png';
	balloonDownDirection.push(balloonDown1, balloonDown2, balloonDown3);

	const balloonUp1 = createImage(onItemLoaded);
	balloonUp1.src = 'img/sprites/monster_balloon/monster_up/1.png';
	const balloonUp2 = createImage(onItemLoaded);
	balloonUp2.src = 'img/sprites/monster_balloon/monster_up//2.png';
	const balloonUp3 = createImage(onItemLoaded);
	balloonUp3.src = 'img/sprites/monster_balloon/monster_up//3.png';
	balloonUpDirection.push(balloonUp1, balloonUp2, balloonUp3);

	const balloonRight1 = createImage(onItemLoaded);
	balloonRight1.src = 'img/sprites/monster_balloon/monster_right/1.png';
	const balloonRight2 = createImage(onItemLoaded);
	balloonRight2.src = 'img/sprites/monster_balloon/monster_right/2.png';
	const balloonRight3 = createImage(onItemLoaded);
	balloonRight3.src = 'img/sprites/monster_balloon/monster_right/3.png';
	balloonRightDirection.push(balloonRight1, balloonRight2, balloonRight3);

	const balloonLeft1 = createImage(onItemLoaded);
	balloonLeft1.src = 'img/sprites/monster_balloon/monster_left/1.png';
	const balloonLeft2 = createImage(onItemLoaded);
	balloonLeft2.src = 'img/sprites/monster_balloon/monster_left/2.png';
	const balloonLeft3 = createImage(onItemLoaded);
	balloonLeft3.src = 'img/sprites/monster_balloon/monster_left/3.png';
	balloonLeftDirection.push(balloonLeft1, balloonLeft2, balloonLeft3);

	balloonSprites[DOWN] = balloonDownDirection;
	balloonSprites[UP] = balloonUpDirection;
	balloonSprites[RIGHT] = balloonRightDirection;
	balloonSprites[LEFT] = balloonLeftDirection;

	const bomb1 = createImage(onItemLoaded);
	bomb1.src = 'img/sprites/bomb/1.png';
	const bomb2 = createImage(onItemLoaded);
	bomb2.src = 'img/sprites/bomb/2.png';
	const bomb3 = createImage(onItemLoaded);
	bomb3.src = 'img/sprites/bomb/3.png';
	bombMove.push(bomb1, bomb2, bomb3);

	const burstCenter1 = createImage(onItemLoaded);
	burstCenter1.src = 'img/sprites/burst/center/1.png';
	const burstCenter2 = createImage(onItemLoaded);
	burstCenter2.src = 'img/sprites/burst/center/2.png';
	const burstCenter3 = createImage(onItemLoaded);
	burstCenter3.src = 'img/sprites/burst/center/3.png';
	const burstCenter4 = createImage(onItemLoaded);
	burstCenter4.src = 'img/sprites/burst/center/4.png';
	burstCenter.push(burstCenter1, burstCenter2, burstCenter3, burstCenter4);

	const burstUp1 = createImage(onItemLoaded);
	burstUp1.src = 'img/sprites/burst/up/1.png';
	const burstUp2 = createImage(onItemLoaded);
	burstUp2.src = 'img/sprites/burst/up/2.png';
	const burstUp3 = createImage(onItemLoaded);
	burstUp3.src = 'img/sprites/burst/up/3.png';
	const burstUp4 = createImage(onItemLoaded);
	burstUp4.src = 'img/sprites/burst/up/4.png';
	burstUp.push(burstUp1, burstUp2, burstUp3, burstUp4);

	const burstDown1 = createImage(onItemLoaded);
	burstDown1.src = 'img/sprites/burst/down/1.png';
	const burstDown2 = createImage(onItemLoaded);
	burstDown2.src = 'img/sprites/burst/down/2.png';
	const burstDown3 = createImage(onItemLoaded);
	burstDown3.src = 'img/sprites/burst/down/3.png';
	const burstDown4 = createImage(onItemLoaded);
	burstDown4.src = 'img/sprites/burst/down/4.png';
	burstDown.push(burstDown1, burstDown2, burstDown3, burstDown4);

	const burstLeft1 = createImage(onItemLoaded);
	burstLeft1.src = 'img/sprites/burst/left/1.png';
	const burstLeft2 = createImage(onItemLoaded);
	burstLeft2.src = 'img/sprites/burst/left/2.png';
	const burstLeft3 = createImage(onItemLoaded);
	burstLeft3.src = 'img/sprites/burst/left/3.png';
	const burstLeft4 = createImage(onItemLoaded);
	burstLeft4.src = 'img/sprites/burst/left/4.png';
	burstLeft.push(burstLeft1, burstLeft2, burstLeft3, burstLeft4);

	const burstRight1 = createImage(onItemLoaded);
	burstRight1.src = 'img/sprites/burst/right/1.png';
	const burstRight2 = createImage(onItemLoaded);
	burstRight2.src = 'img/sprites/burst/right/2.png';
	const burstRight3 = createImage(onItemLoaded);
	burstRight3.src = 'img/sprites/burst/right/3.png';
	const burstRight4 = createImage(onItemLoaded);
	burstRight4.src = 'img/sprites/burst/right/4.png';
	burstRight.push(burstRight1, burstRight2, burstRight3, burstRight4);

	const burstLongUp1 = createImage(onItemLoaded);
	burstLongUp1.src = 'img/sprites/burst/long_up/1.png';
	const burstLongUp2 = createImage(onItemLoaded);
	burstLongUp2.src = 'img/sprites/burst/long_up/2.png';
	const burstLongUp3 = createImage(onItemLoaded);
	burstLongUp3.src = 'img/sprites/burst/long_up/3.png';
	const burstLongUp4 = createImage(onItemLoaded);
	burstLongUp4.src = 'img/sprites/burst/long_up/4.png';
	burstLongUp.push(burstLongUp1, burstLongUp2, burstLongUp3, burstLongUp4);

	const burstLongLeft1 = createImage(onItemLoaded);
	burstLongLeft1.src = 'img/sprites/burst/long_left/1.png';
	const burstLongLeft2 = createImage(onItemLoaded);
	burstLongLeft2.src = 'img/sprites/burst/long_left/2.png';
	const burstLongLeft3 = createImage(onItemLoaded);
	burstLongLeft3.src = 'img/sprites/burst/long_left/3.png';
	const burstLongLeft4 = createImage(onItemLoaded);
	burstLongLeft4.src = 'img/sprites/burst/long_left/4.png';
	burstLongLeft.push(burstLongLeft1, burstLongLeft2, burstLongLeft3, burstLongLeft4);

	burst[DOWN] = burstDown;
	burst[UP] = burstUp;
	burst[RIGHT] = burstRight;
	burst[LEFT] = burstLeft;
	burst[CENTER] = burstDown;
	burst[LONG_UP] = burstUp;
	burst[LONG_LEFT] = burstRight;

	spriteBlock1 = createImage(onItemLoaded);
	spriteBlock1.src = 'img/sprites/blocks/sprite_block1.png';

	spriteBlock2 = createImage(onItemLoaded);
	spriteBlock2.src = 'img/sprites/blocks/sprite_block2.png';
}

function getField(level) {
	let field = [];

	let fieldJson = level.slice(0);

	for (let i = 0; i < fieldJson.length; ++i)
	{
		let currLine = [];

		for (let j = 0; j < fieldJson[i].length; ++j)
		{
			if (fieldJson[i][j] == GRASS)
			{
				currLine.push(new Grass() );
			}

			if (fieldJson[i][j] == IRON)
			{
				currLine.push(new IronWall() );
			}

			if (fieldJson[i][j] == CEMENT)
			{
				currLine.push(new CementWall() );
			}
		}

		field.push(currLine);
	}

	return field;
}