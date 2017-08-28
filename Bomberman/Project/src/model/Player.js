class Player extends Creature {
    constructor(startTimeAnimation) {
    	super(startTimeAnimation, playerSprites, playerDeath, Config.START_POS_PLAYER, Config.START_POS_PLAYER, Config.START_LIVE, Config.PLAYER_SPEED, Config.PLAYER_SIZE, 150);
		this.bombCount = Config.START_BOMB_COUNT;
		this.mooving = false;
    }
}