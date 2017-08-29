function checkForKillPlayer(monster) {
	if (MathUtils.intersectsRects(player.getRect(), monster.getRect())) {
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
				monsters[i].setDyingTime( Date.now() );
				monsters[i].dyingAnimationPlaying = true;
				monsters[i].dying = true;
			}
		}
	}

	if (isIntersects(object, player))
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
		player.setDyingTime(Date.now());
		player.dyingAnimationPlaying = true;
		player.dying = true;
		player.live--;
	}
}

function isIntersects(cellExplode, creature) {
	return MathUtils.intersectsRects(cellExplode.getRect(), creature.getRect());
}