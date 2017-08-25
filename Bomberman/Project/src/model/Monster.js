class Monster extends Creature {
	constructor(resources, x, y, monsterSprites, time) {
		super();
		super.posX = x;
		super.posY = y;
		super.live = 1;
		super.startTimeAnimation = time;
		super.moveSpeed = Config.MONSTER_SPEED;
		super.spriteSize = Config.MONSTER_SIZE;
		super.sprites = monsterSprites;
		super.numberOfFrames = null;
		this.spritesKill = resources.getSpritesByType(ResourceType.MONSTER_DEATH);
		super.stepDuration = 200;
	}
}