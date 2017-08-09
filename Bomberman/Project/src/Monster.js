class Monster extends Creature{
	constructor(_posX, _posY, _sprites, _startTimeAnimation) {
		super();
		super.posX = _posX;
		super.posY = _posY;
		super.live = 1;
		super.startTimeAnimation = _startTimeAnimation;
		super.moveSpeed = MONSTER_SPEED;
		super.spriteSize = MONSTER_SIZE;
		super.sprites = _sprites;
		super.numberOfFrames = balloonDownDirection.length;
		super.stepDuration = 200;
	}
}