class Player extends Creature {
    constructor(_startTimeAnimation) {
    	super();
		this.bombCount = START_BOMB_COUNT;
		super.sprites = playerSprites;
		super.startTimeAnimation = _startTimeAnimation;
		this.mooving = false;
    }
}