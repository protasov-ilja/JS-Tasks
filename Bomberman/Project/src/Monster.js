class Monster extends Creature{
	constructor(x, y, monsterSprites, time) {
		super();
		super.posX = x;
		super.posY = y;
		super.live = 1;
		super.startTimeAnimation = time;
		super.moveSpeed = MONSTER_SPEED;
		super.spriteSize = MONSTER_SIZE;
		super.sprites = monsterSprites;
		super.numberOfFrames = null;
		super.stepDuration = 200;
	}
}