class Monster extends Creature{
	constructor(x, y, speed, monsterSprites, time) {
		super(time, monsterSprites, monsterKill, x, y, 1, speed, Config.MONSTER_SIZE, 200);
	}
}