// class ResourceType {
// 	static PLAYER_SPRITES = "PLAYER_SPRITES";
// 	static PLAYER_UP_DIRECTION = "PLAYER_UP_DIRECTION";
// 	static PLAYER_DOWN_DIRECTION = "PLAYER_DOWN_DIRECTION";
// 	static PLAYER_LEFT_DIRECTION = "PLAYER_LEFT_DIRECTION";
// 	static PLAYER_RIGHT_DIRECTION = "PLAYER_RIGHT_DIRECTION";
// 	static PLAYER_DEATH = "PLAYER_DEATH";
// 	static BALLOON_SPRITES = "BALLOON_SPRITES";
// 	static BALLOON_UP_DIRECTION = "BALLOON_UP_DIRECTION";
// 	static BALLOON_DOWN_DIRECTION = "BALLOON_DOWN_DIRECTION";
// 	static BALLOON_LEFT_DIRECTION = "BALLOON_LEFT_DIRECTION";
// 	static BALLOON_RIGHT_DIRECTION = "BALLOON_RIGHT_DIRECTION";
// 	static MONSTER_DEATH = "MONSTER_DEATH";
// 	static BOMB_SPRITES = "BOMB_SPRITES";
// 	static BURST_SPRITES = "BURST_SPRITES";
// 	static BURST_CENTER = "BURST_CENTER";
// 	static BURST_DOWN = "BURST_DOWN";
// 	static BURST_UP = "BURST_UP";
// 	static BURST_LEFT = "BURST_LEFT";
// 	static BURST_RIGHT = "BURST_RIGHT";
// 	static BURST_LONG_UP = "BURST_LONG_UP";
// 	static BURST_LONG_LEFT = "BURST_LONG_LEFT";
// 	static BURST_WALL = "BURST_WALL";
// }

// this._resources = {
// 	[ResourceType.PLAYER_SPRITES]: [],
// 	[ResourceType.PLAYER_DOWN_DIRECTION]: [],
// 	[ResourceType.PLAYER_UP_DIRECTION]: [],
// 	[ResourceType.PLAYER_LEFT_DIRECTION]: [],
// 	[ResourceType.PLAYER_RIGHT_DIRECTION]: [],
// 	[ResourceType.PLAYER_DEATH]: [],
// 	[ResourceType.BALLOON_SPRITES]: [],
// 	[ResourceType.BALLOON_DOWN_DIRECTION]: [],
// 	[ResourceType.BALLOON_UP_DIRECTION]: [],
// 	[ResourceType.BALLOON_LEFT_DIRECTION]: [],
// 	[ResourceType.BALLOON_RIGHT_DIRECTION]: [],
// 	[ResourceType.MONSTER_DEATH]: [],
// 	[ResourceType.BOMB_SPRITES]: [],
// 	[ResourceType.BURST_SPRITES]: [],
// 	[ResourceType.BURST_CENTER]: [],
// 	[ResourceType.BURST_DOWN]: [],
// 	[ResourceType.BURST_UP]: [],
// 	[ResourceType.BURST_LEFT]: [],
// 	[ResourceType.BURST_RIGHT]: [],
// 	[ResourceType.BURST_LONG_UP]: [],
// 	[ResourceType.BURST_LONG_LEFT]: [],
// 	[ResourceType.BURST_WALL]: []
//
// };
//
// function getSpritesByType(type) {
// 	return this._resources[type];
// }

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
const balloonKill = [];
const bombMove = [];
const burst = [];
const burstCenter = [];
const burstUp = [];
const burstDown = [];
const burstLeft = [];
const burstRight = [];
const burstLongUp = [];
const burstLongLeft = [];
const burstWall = [];

let canvas = null;
let ctx = null;
let loadedResourcesCount = 0;
let spriteBlock1 = null;
let spriteBlock2 = null;
let monsters = [];

function onItemLoaded() {
	++loadedResourcesCount;

	if (loadedResourcesCount === resourcesToLoadCount)
	{
		initGame();
	}
}

function loadingResources() {
	loadingPlayerSprites();
	loadingMonsterBaloonSprites();
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

function loadingMonsterBaloonSprites() {
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

	const balloonKill1 = ImageUtils.createImage(onItemLoaded);
	balloonKill1.src = 'res/img/sprites/monster_balloon/death/1.png';
	const balloonKill2 = ImageUtils.createImage(onItemLoaded);
	balloonKill2.src = 'res/img/sprites/monster_balloon/death/2.png';
	const balloonKill3 = ImageUtils.createImage(onItemLoaded);
	balloonKill3.src = 'res/img/sprites/monster_balloon/death/3.png';
	const balloonKill4 = ImageUtils.createImage(onItemLoaded);
	balloonKill4.src = 'res/img/sprites/monster_balloon/death/3.png';
	balloonKill.push(balloonKill1, balloonKill2, balloonKill3, balloonKill4);

	balloonSprites[Direction.DOWN] = balloonDownDirection;
	balloonSprites[Direction.UP] = balloonUpDirection;
	balloonSprites[Direction.RIGHT] = balloonRightDirection;
	balloonSprites[Direction.LEFT] = balloonLeftDirection;
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

	const burstLongUp1 = ImageUtils.createImage(onItemLoaded);
	burstLongUp1.src = 'res/img/sprites/burst/long_up/1.png';
	const burstLongUp2 = ImageUtils.createImage(onItemLoaded);
	burstLongUp2.src = 'res/img/sprites/burst/long_up/2.png';
	const burstLongUp3 = ImageUtils.createImage(onItemLoaded);
	burstLongUp3.src = 'res/img/sprites/burst/long_up/3.png';
	const burstLongUp4 = ImageUtils.createImage(onItemLoaded);
	burstLongUp4.src = 'res/img/sprites/burst/long_up/4.png';
	burstLongUp.push(burstLongUp1, burstLongUp2, burstLongUp3, burstLongUp4);

	const burstLongLeft1 = ImageUtils.createImage(onItemLoaded);
	burstLongLeft1.src = 'res/img/sprites/burst/long_left/1.png';
	const burstLongLeft2 = ImageUtils.createImage(onItemLoaded);
	burstLongLeft2.src = 'res/img/sprites/burst/long_left/2.png';
	const burstLongLeft3 = ImageUtils.createImage(onItemLoaded);
	burstLongLeft3.src = 'res/img/sprites/burst/long_left/3.png';
	const burstLongLeft4 = ImageUtils.createImage(onItemLoaded);
	burstLongLeft4.src = 'res/img/sprites/burst/long_left/4.png';
	burstLongLeft.push(burstLongLeft1, burstLongLeft2, burstLongLeft3, burstLongLeft4);

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
	burst[Direction.LONG_UP] = burstUp;
	burst[Direction.LONG_LEFT] = burstRight;
	burst[Direction.WALL] = burstWall;
}

function loadingBlockSprites() {
	spriteBlock1 = ImageUtils.createImage(onItemLoaded);
	spriteBlock1.src = 'res/img/sprites/blocks/sprite_block1.png';

	spriteBlock2 = ImageUtils.createImage(onItemLoaded);
	spriteBlock2.src = 'res/img/sprites/blocks/sprite_block2.png';
}

function getField(level) {
	let field = [];

	let fieldJson = level.slice(0);

	for (let i = 0; i < fieldJson.length; ++i)
	{
		let currLine = [];

		for (let j = 0; j < fieldJson[i].length; ++j)
		{
			switch(fieldJson[i][j]) {
				case FieldType.GRASS:
					currLine.push( new FieldCell(FieldType.GRASS, i, j) );
					break;
				case FieldType.IRON:
					currLine.push( new FieldCell(FieldType.IRON, i, j) );
					break;
				case FieldType.CEMENT:
					currLine.push( new FieldCell(FieldType.CEMENT, i, j) );
					break;
			}
		}

		field.push(currLine);
	}

	return field;
}