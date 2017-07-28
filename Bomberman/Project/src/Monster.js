class Monster extends Creature{
	constructor() {
		super();
		super.posX = 90;
		super.posY = 120;
		super.live = 1;
		super.moveSpeed = MONSTER_SPEED;
		super.spriteSize = MONSTER_SIZE;
		super.numberOfFrames = balloonDownDirection.length;
		super.stepDuration = 200;
	}

	getCurrSprite() {
		let stepAnimation = null;
		let animation = balloonSprites;

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