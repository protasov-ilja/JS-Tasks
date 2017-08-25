class Player extends Creature {
    constructor(_startTimeAnimation) {
    	super();
		this.bombCount = Config.START_BOMB_COUNT;
		super.sprites = resourcesLoader.getSpritesByType(ResourceType.PLAYER_SPRITES);
		super.startTimeAnimation = _startTimeAnimation;
		this.mooving = false;
    }
}