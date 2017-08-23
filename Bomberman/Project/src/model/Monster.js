class Monster extends Creature {
	constructor(x, y, monsterSprites, time) {
		super();
		super.posX = x;
		super.posY = y;
		super.live = 1;
		super.startTimeAnimation = time;
		super.moveSpeed = Config.MONSTER_SPEED;
		super.spriteSize = Config.MONSTER_SIZE;
		super.sprites = monsterSprites;
		super.numberOfFrames = null;
		this.spritesKill = balloonKill;
		super.stepDuration = 200;
	}
}