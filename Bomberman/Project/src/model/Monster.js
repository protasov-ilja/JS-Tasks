class Monster extends Creature{
	constructor(x, y, speed, monsterSprites, startTimeAnimation) {
		super(startTimeAnimation, monsterSprites, monsterDeath, x, y, 1, speed, Config.MONSTER_SIZE, Config.MONSTER_STEP_DURATION);
	}
}