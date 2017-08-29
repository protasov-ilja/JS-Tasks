function killPlayer(monster) {
	const playerRect = {
		left: player.posX,
		top: player.posY - player._moveSpeed,
		width: Config.PLAYER_SIZE,
		height: Config.PLAYER_SIZE
	};
	const monsterRect = {
		left: monster.posX,
		top: monster.posY - monster._moveSpeed,
		width: Config.MONSTER_SIZE,
		height: Config.MONSTER_SIZE
	};

	if ( MathUtils.intersectsRects(playerRect, monsterRect) ) {
		burstPlayer();
	}

	if (player.live < 0 && !player.kill)
	{
		endOfGame = true;
	}
	else if (player.killAnimationComplete)
	{
		player.killAnimationComplete = false;
		player.killAnimationPlaying = false;
		player.kill = false;

		if (player.live >= 0)
		{
			liveForm.innerHTML = '0' + player.live;
			player.startTimeAnimation = Date.now();
			player.posX = Config.START_POS_PLAYER;
			player.posY = Config.START_POS_PLAYER;
		}
	}
}

function IntersectCreatures(object) {
	for (let i = 0; i < monsters.length; ++i)
	{
		if ( intersect(object, monsters[i]) ) {
			if (!monsters[i].killAnimationPlaying)
			{
				monsters[i].setKillTime( Date.now() );
				monsters[i].killAnimationPlaying = true;
				monsters[i].kill = true;
			}
		}
	}

	if ( intersect(object, player) )
	{
		burstPlayer();
	}
}

function killMonster(monster) {
	if (monster.killAnimationComplete)
	{
		monster.killAnimationComplete = false;
		monster.killAnimationPlaying = false;
		monster.kill = false;
		return true;
	}
}

function burstPlayer() {
	if (!player.killAnimationPlaying)
	{
		player.setKillTime( Date.now() );
		player.killAnimationPlaying = true;
		player.kill = true;
		player.live--;
	}
}

function intersect(object, creature) {
	let creatureRect = {
		left: creature.posX,
		top: creature.posY,
		width: creature.spriteSize,
		height: creature.spriteSize
	};

	let objectRect = {
		left: object._posX,
		top: object._posY,
		width: Config.CELL_SIZE,
		height: Config.CELL_SIZE
	};

	return MathUtils.intersectsRects(objectRect, creatureRect);
}