function checkForKillPlayer(monster) {
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

	if (MathUtils.intersectsRects(playerRect, monsterRect)) {
		killPlayer();
	}

	if (player.live < 0 && !player.dying)
	{
		endOfGame = true;
	}
	else if (player.dyingAnimationComplete)
	{
		player.dyingAnimationComplete = false;
		player.dyingAnimationPlaying = false;
		player.dying = false;

		if (player.live >= 0)
		{
			liveForm.innerHTML = '0' + player.live;
			player.startTimeAnimation = Date.now();
			player.posX = Config.START_POS_PLAYER;
			player.posY = Config.START_POS_PLAYER;
		}
	}
}

function checkForIntersectCellExplodeWithCreatures(object) {
	for (let i = 0; i < monsters.length; ++i)
	{
		if (isIntersects(object, monsters[i])) {
			if (!monsters[i].dyingAnimationPlaying)
			{
				monsters[i].setKillTime( Date.now() );
				monsters[i].dyingAnimationPlaying = true;
				monsters[i].dying = true;
			}
		}
	}

	if ( isIntersects(object, player) )
	{
		killPlayer();
	}
}

function isMonsterDead(monster) {
	if (monster.dyingAnimationComplete)
	{
		monster.dyingAnimationComplete = false;
		monster.dyingAnimationPlaying = false;
		monster.dying = false;

		return true;
	}

	return false;
}

function killPlayer() {
	if (!player.dyingAnimationPlaying)
	{
		player.setKillTime(Date.now());
		player.dyingAnimationPlaying = true;
		player.dying = true;
		player.live--;
	}
}

function isIntersects(object, creature) {
	let creatureRect = {
		left: creature.posX,
		top: creature.posY,
		width: creature.spriteSize,
		height: creature.spriteSize
	};

	let objectRect = {
		left: object.posX,
		top: object.posY,
		width: Config.CELL_SIZE,
		height: Config.CELL_SIZE
	};

	return MathUtils.intersectsRects(objectRect, creatureRect);
}