class Player extends Creature {
    constructor(startTimeAnimation) {
    	super(startTimeAnimation, playerSprites, playerDeath, Config.START_POS_PLAYER, Config.START_POS_PLAYER, Config.START_LIVE, Config.PLAYER_SPEED, Config.PLAYER_SIZE, Config.PLAYER_STEP_DURATION);
		this.bombCount = Config.START_BOMB_COUNT;
		this.mooving = false;
    }
}