class Monster extends Creature {
	constructor(x, y, monsterSprites, time) {
		super();
		super.posX = x;
		super.posY = y;
		super.live = 1;
		super.startTimeAnimation = time;
		super.moveSpeed = Config.MONSTER_SPEED;
		super.spriteSize = Config.MONSTER_SIZE;
		super.sprites = resourcesLoader.getSpritesByType(ResourceType.BALLOON_SPRITES);
		super.numberOfFrames = null;
		this.spritesKill = resourcesLoader.getSpritesByType(ResourceType.MONSTER_DEATH);
		super.stepDuration = 200;
	}
}