class Player extends Creature{
    constructor() {
    	super();
		this.bombCount = START_BOMB_COUNT;
		super.sprites = playerSprites;
    }
}