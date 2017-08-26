class Monster extends Creature{
	constructor(x, y, speed, monsterSprites, time) {
		super();
		super.posX = x;
		super.posY = y;
		super.live = 1;
		super.startTimeAnimation = time;
		super.moveSpeed = speed;
		super.spriteSize = Config.MONSTER_SIZE;
		super.sprites = monsterSprites;
		super.numberOfFrames = null;
		this.spritesKill = monsterKill;
		super.stepDuration = 200;
	}
}