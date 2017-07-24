const START_POS = 30;
const START_LIVE = 3;
const START_BOMB_COUNT = 1;

class Player {
    constructor() {
        this.posX = START_POS;
        this.posY = START_POS;
		this.live = START_LIVE;
		this.bombCount =  START_BOMB_COUNT;
		this.direction = DOWN;
		this.moveSpeed = PLAYER_SPEED;
    }
}