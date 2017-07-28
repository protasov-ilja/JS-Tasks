class Player extends Creature{
    constructor() {
    	super();
		this.bombCount =  START_BOMB_COUNT;
    }

	getCurrSprite() {
		let stepAnimation = null;
		let animation = playerSprites;

		switch (this.direction) {
			case DOWN:
				stepAnimation = animation[DOWN];
				break;
			case UP:
				stepAnimation = animation[UP];
				break;
			case LEFT:
				stepAnimation = animation[LEFT];
				break;
			case RIGHT:
				stepAnimation = animation[RIGHT];
				break;
		}

		let currAnimation = stepAnimation[super.getCurrStep()];
		return currAnimation;
	}
}