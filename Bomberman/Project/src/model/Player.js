class Player extends Creature {
    constructor(resources, _startTimeAnimation) {
    	super();
		this.bombCount = Config.START_BOMB_COUNT;
		super.sprites = resources.getSpritesByType(ResourceType.PLAYER_SPRITES);
		super.startTimeAnimation = _startTimeAnimation;
		this.mooving = false;
    }
}