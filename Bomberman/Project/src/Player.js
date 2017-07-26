class Creature {
	constructor() {
		this.posX = START_POS_PLAYER;
		this.posY = START_POS_PLAYER;
		this.live = START_LIVE;
		this.direction = DOWN;
		this.moveSpeed = PLAYER_SPEED;
		this.spriteSize = PLAYER_SIZE;
		this.numberOfFrames = playerDownDirection.length;
		this.startTimeAnimation = null;
		this.stepDuration = 100;
	}

	getCurrStep() {
		let currTime = ( new Date().getTime() ) - this.startTimeAnimation;
		let progressAnimation = currTime % (this.stepDuration * this.numberOfFrames); // прогресс анимации
		progressAnimation = Math.floor(progressAnimation / ( (this.stepDuration * this.numberOfFrames) / this.numberOfFrames));

		return progressAnimation;
	}
}


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

class Block {
	constructor() {
		this.posX = 90;
		this.posY = 90;
		this.spriteSize = 30;
	}
}