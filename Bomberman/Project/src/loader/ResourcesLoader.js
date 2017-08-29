const playerSprites = [];
const playerDownDirection = [];
const playerUpDirection = [];
const playerRightDirection = [];
const playerLeftDirection = [];
const playerDeath =[];
const balloonSprites = [];
const balloonDownDirection = [];
const balloonUpDirection = [];
const balloonRightDirection = [];
const balloonLeftDirection = [];
const dropSprites = [];
const dropDownDirection = [];
const dropUpDirection = [];
const dropRightDirection = [];
const dropLeftDirection = [];
const monsterKill = [];
const bombMove = [];
const burst = [];
const burstCenter = [];
const burstUp = [];
const burstDown = [];
const burstLeft = [];
const burstRight = [];
const burstWall = [];

let spriteBlock = null;
let loadedResourcesCount = 0;

function onItemLoaded() {
	++loadedResourcesCount;

	if (loadedResourcesCount === Config.RESOURCES_TO_LOAD_COUNT)
	{
		initGame();
	}
}

function loadResources() {
	loadingPlayerSprites();
	loadingMonsterBalloonSprites();
	loadingMonsterDropSprites();
	loadingBombSprites();
	loadingExplodeSprites();
	loadingBlockSprites();
}

function loadingPlayerSprites() {
	const moveDown1 = ImageUtils.createImage(onItemLoaded);
	moveDown1.src = 'res/img/sprites/player/player_down/1.png';
	const moveDown2 = ImageUtils.createImage(onItemLoaded);
	moveDown2.src = 'res/img/sprites/player/player_down/2.png';
	const moveDown3 = ImageUtils.createImage(onItemLoaded);
	moveDown3.src = 'res/img/sprites/player/player_down/3.png';
	const moveDown4 = ImageUtils.createImage(onItemLoaded);
	moveDown4.src = 'res/img/sprites/player/player_down/4.png';
	playerDownDirection.push(moveDown1, moveDown2, moveDown3, moveDown4/*, five*/);

	const moveUp1 = ImageUtils.createImage(onItemLoaded);
	moveUp1.src = 'res/img/sprites/player/player_up/1.png';
	const moveUp2 = ImageUtils.createImage(onItemLoaded);
	moveUp2.src = 'res/img/sprites/player/player_up/2.png';
	const moveUp3 = ImageUtils.createImage(onItemLoaded);
	moveUp3.src = 'res/img/sprites/player/player_up/3.png';
	const moveUp4 = ImageUtils.createImage(onItemLoaded);
	moveUp4.src = 'res/img/sprites/player/player_up/4.png';
	playerUpDirection.push(moveUp1, moveUp2, moveUp3, moveUp4);

	const moveRight1 = ImageUtils.createImage(onItemLoaded);
	moveRight1.src = 'res/img/sprites/player/player_right/1.png';
	const moveRight2 = ImageUtils.createImage(onItemLoaded);
	moveRight2.src = 'res/img/sprites/player/player_right/2.png';
	const moveRight3 = ImageUtils.createImage(onItemLoaded);
	moveRight3.src = 'res/img/sprites/player/player_right/3.png';
	const moveRight4 = ImageUtils.createImage(onItemLoaded);
	moveRight4.src = 'res/img/sprites/player/player_right/4.png';
	playerRightDirection.push(moveRight1, moveRight2, moveRight3, moveRight4);

	const moveLeft1 = ImageUtils.createImage(onItemLoaded);
	moveLeft1.src = 'res/img/sprites/player/player_left/1.png';
	const moveLeft2 = ImageUtils.createImage(onItemLoaded);
	moveLeft2.src = 'res/img/sprites/player/player_left/2.png';
	const moveLeft3 = ImageUtils.createImage(onItemLoaded);
	moveLeft3.src = 'res/img/sprites/player/player_left/3.png';
	const moveLeft4 = ImageUtils.createImage(onItemLoaded);
	moveLeft4.src = 'res/img/sprites/player/player_left/4.png';
	playerLeftDirection.push(moveLeft1, moveLeft2, moveLeft3, moveLeft4);

	playerSprites[Direction.DOWN] = playerDownDirection;
	playerSprites[Direction.UP] = playerUpDirection;
	playerSprites[Direction.RIGHT] = playerRightDirection;
	playerSprites[Direction.LEFT] = playerLeftDirection;

	const playerDeath1 = ImageUtils.createImage(onItemLoaded);
	playerDeath1.src = 'res/img/sprites/player/death/1.png';
	const playerDeath2 = ImageUtils.createImage(onItemLoaded);
	playerDeath2.src = 'res/img/sprites/player/death/2.png';
	const playerDeath3 = ImageUtils.createImage(onItemLoaded);
	playerDeath3.src = 'res/img/sprites/player/death/3.png';
	const playerDeath4 = ImageUtils.createImage(onItemLoaded);
	playerDeath4.src = 'res/img/sprites/player/death/4.png';
	const playerDeath5 = ImageUtils.createImage(onItemLoaded);
	playerDeath5.src = 'res/img/sprites/player/death/5.png';
	playerDeath.push(playerDeath1, playerDeath2, playerDeath3, playerDeath4, playerDeath5);
}

function loadingMonsterBalloonSprites() {
	const balloonDown1 = ImageUtils.createImage(onItemLoaded);
	balloonDown1.src = 'res/img/sprites/monster_balloon/monster_down/1.png';
	const balloonDown2 = ImageUtils.createImage(onItemLoaded);
	balloonDown2.src = 'res/img/sprites/monster_balloon/monster_down//2.png';
	const balloonDown3 = ImageUtils.createImage(onItemLoaded);
	balloonDown3.src = 'res/img/sprites/monster_balloon/monster_down//3.png';
	balloonDownDirection.push(balloonDown1, balloonDown2, balloonDown3);

	const balloonUp1 = ImageUtils.createImage(onItemLoaded);
	balloonUp1.src = 'res/img/sprites/monster_balloon/monster_up/1.png';
	const balloonUp2 = ImageUtils.createImage(onItemLoaded);
	balloonUp2.src = 'res/img/sprites/monster_balloon/monster_up//2.png';
	const balloonUp3 = ImageUtils.createImage(onItemLoaded);
	balloonUp3.src = 'res/img/sprites/monster_balloon/monster_up//3.png';
	balloonUpDirection.push(balloonUp1, balloonUp2, balloonUp3);

	const balloonRight1 = ImageUtils.createImage(onItemLoaded);
	balloonRight1.src = 'res/img/sprites/monster_balloon/monster_right/1.png';
	const balloonRight2 = ImageUtils.createImage(onItemLoaded);
	balloonRight2.src = 'res/img/sprites/monster_balloon/monster_right/2.png';
	const balloonRight3 = ImageUtils.createImage(onItemLoaded);
	balloonRight3.src = 'res/img/sprites/monster_balloon/monster_right/3.png';
	balloonRightDirection.push(balloonRight1, balloonRight2, balloonRight3);

	const balloonLeft1 = ImageUtils.createImage(onItemLoaded);
	balloonLeft1.src = 'res/img/sprites/monster_balloon/monster_left/1.png';
	const balloonLeft2 = ImageUtils.createImage(onItemLoaded);
	balloonLeft2.src = 'res/img/sprites/monster_balloon/monster_left/2.png';
	const balloonLeft3 = ImageUtils.createImage(onItemLoaded);
	balloonLeft3.src = 'res/img/sprites/monster_balloon/monster_left/3.png';
	balloonLeftDirection.push(balloonLeft1, balloonLeft2, balloonLeft3);

	const monsterKill1 = ImageUtils.createImage(onItemLoaded);
	monsterKill1.src = 'res/img/sprites/monster_balloon/death/1.png';
	const monsterKill2 = ImageUtils.createImage(onItemLoaded);
	monsterKill2.src = 'res/img/sprites/monster_balloon/death/2.png';
	const monsterKill3 = ImageUtils.createImage(onItemLoaded);
	monsterKill3.src = 'res/img/sprites/monster_balloon/death/3.png';
	const monsterKill4 = ImageUtils.createImage(onItemLoaded);
	monsterKill4.src = 'res/img/sprites/monster_balloon/death/3.png';
	monsterKill.push(monsterKill1, monsterKill2, monsterKill3, monsterKill4);

	balloonSprites[Direction.DOWN] = balloonDownDirection;
	balloonSprites[Direction.UP] = balloonUpDirection;
	balloonSprites[Direction.RIGHT] = balloonRightDirection;
	balloonSprites[Direction.LEFT] = balloonLeftDirection;
}

function loadingMonsterDropSprites() {
	const dropDown1 = ImageUtils.createImage(onItemLoaded);
	dropDown1.src = 'res/img/sprites/monster_drop/monster_down/1.png';
	const dropDown2 = ImageUtils.createImage(onItemLoaded);
	dropDown2.src = 'res/img/sprites/monster_drop/monster_down//2.png';
	const dropDown3 = ImageUtils.createImage(onItemLoaded);
	dropDown3.src = 'res/img/sprites/monster_drop/monster_down//3.png';
	dropDownDirection.push(dropDown1, dropDown2, dropDown3);

	const dropUp1 = ImageUtils.createImage(onItemLoaded);
	dropUp1.src = 'res/img/sprites/monster_drop/monster_up/1.png';
	const dropUp2 = ImageUtils.createImage(onItemLoaded);
	dropUp2.src = 'res/img/sprites/monster_drop/monster_up/2.png';
	const dropUp3 = ImageUtils.createImage(onItemLoaded);
	dropUp3.src = 'res/img/sprites/monster_drop/monster_up/3.png';
	dropUpDirection.push(dropUp1, dropUp2, dropUp3);

	const dropRight1 = ImageUtils.createImage(onItemLoaded);
	dropRight1.src = 'res/img/sprites/monster_drop/monster_right/1.png';
	const dropRight2 = ImageUtils.createImage(onItemLoaded);
	dropRight2.src = 'res/img/sprites/monster_drop/monster_right/2.png';
	const dropRight3 = ImageUtils.createImage(onItemLoaded);
	dropRight3.src = 'res/img/sprites/monster_drop/monster_right/3.png';
	dropRightDirection.push(dropRight1, dropRight2, dropRight3);

	const dropLeft1 = ImageUtils.createImage(onItemLoaded);
	dropLeft1.src = 'res/img/sprites/monster_drop/monster_left/1.png';
	const dropLeft2 = ImageUtils.createImage(onItemLoaded);
	dropLeft2.src = 'res/img/sprites/monster_drop/monster_left/2.png';
	const dropLeft3 = ImageUtils.createImage(onItemLoaded);
	dropLeft3.src = 'res/img/sprites/monster_drop/monster_left/3.png';
	dropLeftDirection.push(dropLeft1, dropLeft2, dropLeft3);

	dropSprites[Direction.DOWN] = dropDownDirection;
	dropSprites[Direction.UP] = dropUpDirection;
	dropSprites[Direction.RIGHT] = dropRightDirection;
	dropSprites[Direction.LEFT] = dropLeftDirection;
}

function loadingBombSprites() {
	const bomb1 = ImageUtils.createImage(onItemLoaded);
	bomb1.src = 'res/img/sprites/bomb/1.png';
	const bomb2 = ImageUtils.createImage(onItemLoaded);
	bomb2.src = 'res/img/sprites/bomb/2.png';
	const bomb3 = ImageUtils.createImage(onItemLoaded);
	bomb3.src = 'res/img/sprites/bomb/3.png';
	bombMove.push(bomb1, bomb2, bomb3);
}

function loadingExplodeSprites() {
	const burstCenter1 = ImageUtils.createImage(onItemLoaded);
	burstCenter1.src = 'res/img/sprites/burst/center/1.png';
	const burstCenter2 = ImageUtils.createImage(onItemLoaded);
	burstCenter2.src = 'res/img/sprites/burst/center/2.png';
	const burstCenter3 = ImageUtils.createImage(onItemLoaded);
	burstCenter3.src = 'res/img/sprites/burst/center/3.png';
	const burstCenter4 = ImageUtils.createImage(onItemLoaded);
	burstCenter4.src = 'res/img/sprites/burst/center/4.png';
	burstCenter.push(burstCenter1, burstCenter2, burstCenter3, burstCenter4);

	const burstUp1 = ImageUtils.createImage(onItemLoaded);
	burstUp1.src = 'res/img/sprites/burst/up/1.png';
	const burstUp2 = ImageUtils.createImage(onItemLoaded);
	burstUp2.src = 'res/img/sprites/burst/up/2.png';
	const burstUp3 = ImageUtils.createImage(onItemLoaded);
	burstUp3.src = 'res/img/sprites/burst/up/3.png';
	const burstUp4 = ImageUtils.createImage(onItemLoaded);
	burstUp4.src = 'res/img/sprites/burst/up/4.png';
	burstUp.push(burstUp1, burstUp2, burstUp3, burstUp4);

	const burstDown1 = ImageUtils.createImage(onItemLoaded);
	burstDown1.src = 'res/img/sprites/burst/down/1.png';
	const burstDown2 = ImageUtils.createImage(onItemLoaded);
	burstDown2.src = 'res/img/sprites/burst/down/2.png';
	const burstDown3 = ImageUtils.createImage(onItemLoaded);
	burstDown3.src = 'res/img/sprites/burst/down/3.png';
	const burstDown4 = ImageUtils.createImage(onItemLoaded);
	burstDown4.src = 'res/img/sprites/burst/down/4.png';
	burstDown.push(burstDown1, burstDown2, burstDown3, burstDown4);

	const burstLeft1 = ImageUtils.createImage(onItemLoaded);
	burstLeft1.src = 'res/img/sprites/burst/left/1.png';
	const burstLeft2 = ImageUtils.createImage(onItemLoaded);
	burstLeft2.src = 'res/img/sprites/burst/left/2.png';
	const burstLeft3 = ImageUtils.createImage(onItemLoaded);
	burstLeft3.src = 'res/img/sprites/burst/left/3.png';
	const burstLeft4 = ImageUtils.createImage(onItemLoaded);
	burstLeft4.src = 'res/img/sprites/burst/left/4.png';
	burstLeft.push(burstLeft1, burstLeft2, burstLeft3, burstLeft4);

	const burstRight1 = ImageUtils.createImage(onItemLoaded);
	burstRight1.src = 'res/img/sprites/burst/right/1.png';
	const burstRight2 = ImageUtils.createImage(onItemLoaded);
	burstRight2.src = 'res/img/sprites/burst/right/2.png';
	const burstRight3 = ImageUtils.createImage(onItemLoaded);
	burstRight3.src = 'res/img/sprites/burst/right/3.png';
	const burstRight4 = ImageUtils.createImage(onItemLoaded);
	burstRight4.src = 'res/img/sprites/burst/right/4.png';
	burstRight.push(burstRight1, burstRight2, burstRight3, burstRight4);

	const burstWall1 = ImageUtils.createImage(onItemLoaded);
	burstWall1.src = 'res/img/sprites/burst/wall/1.png';
	const burstWall2 = ImageUtils.createImage(onItemLoaded);
	burstWall2.src = 'res/img/sprites/burst/wall/2.png';
	const burstWall3 = ImageUtils.createImage(onItemLoaded);
	burstWall3.src = 'res/img/sprites/burst/wall/3.png';
	const burstWall4 = ImageUtils.createImage(onItemLoaded);
	burstWall4.src = 'res/img/sprites/burst/wall/4.png';
	const burstWall5 = ImageUtils.createImage(onItemLoaded);
	burstWall3.src = 'res/img/sprites/burst/wall/5.png';
	const burstWall6 = ImageUtils.createImage(onItemLoaded);
	burstWall4.src = 'res/img/sprites/burst/wall/6.png';
	burstWall.push(burstWall1, burstWall2, burstWall3, burstWall4, burstWall5, burstWall6);

	burst[Direction.DOWN] = burstDown;
	burst[Direction.UP] = burstUp;
	burst[Direction.RIGHT] = burstRight;
	burst[Direction.LEFT] = burstLeft;
	burst[Direction.CENTER] = burstCenter;
	burst[Direction.WALL] = burstWall;
}

function loadingBlockSprites() {
	spriteBlock = ImageUtils.createImage(onItemLoaded);
	spriteBlock.src = 'res/img/sprites/blocks/sprite_block1.png';
}