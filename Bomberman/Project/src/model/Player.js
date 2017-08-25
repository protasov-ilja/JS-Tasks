class Player extends Creature {
    constructor(resources, _startTimeAnimation) {
    	super();
    	this._resources = resources;
		this.bombCount = Config.START_BOMB_COUNT;
		super.sprites = this._resources.getSpritesByType(ResourceType.PLAYER_SPRITES);
		super.startTimeAnimation = _startTimeAnimation;
		super.spritesKill = this._resources.getSpritesByType(ResourceType.PLAYER_DEATH);
		this.mooving = false;
    }
}