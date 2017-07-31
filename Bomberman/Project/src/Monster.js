class Monster extends Creature{
	constructor() {
		super();
		super.posX = 90;
		super.posY = 120;
		super.live = 1;
		super.moveSpeed = MONSTER_SPEED;
		super.spriteSize = MONSTER_SIZE;
		super.sprites = balloonSprites;
		super.numberOfFrames = balloonDownDirection.length;
		super.stepDuration = 200;
	}
}