let endOfGame = false;
let player = null;
let balloon1 = null;
let balloon2 = null;
let balloon3 = null;
let drop1 = null;
let drop2 = null;
let drop3 = null;
let requestAnimationFrameId;
let bombs = [];
let monsters = [];
let bombCount = 0;
let field = null;

function initGame() {
	soundPlay(gameMusic, winMusic);

	endOfGame = false;
	player = new Player( Date.now() );

    liveForm.innerHTML = '0' + player.live;
    bombForm.innerHTML = '0' + player.bombCount;

	monsters = [];

	addMonster(drop1, 360, 90, dropSprites);
	addMonster(drop2, 270, 300, dropSprites);
	addMonster(drop3, 480, 330, dropSprites);
	addMonster(balloon1, 90, 120, balloonSprites);
	addMonster(balloon2, 180, 30, balloonSprites);
	addMonster(balloon3, 150, 420, balloonSprites);
	cancelAnimationFrame(requestAnimationFrameId);
	useTimer();
	animate();
}

function addMonster(monster, currX, currY, sprites) {
	let speed = sprites == dropSprites ? Config.MONSTER_DROP_SPEED : Config.MONSTER_BALLOON_SPEED;

	monster = new Monster(currX, currY, speed, sprites, Date.now() );
	monsters.push(monster);
}

function animate() {
	step();

	function step() {
		ctx.clearRect(0, 0, Config.WIDTH, Config.HEIGHT);

		drawField();

		for (let i = 0; i < bombs.length; ++i)
		{
			if (bombs[i].getCurrTime() - bombs[i].getCreateTime() < Config.BOMB_TIMER)
			{
				drawCreature(bombs[i], bombs[i].getCurrSprite() );
			}
			else
			{
				if (!bombs[i].isExploded())
				{
					soundPlay(explodeMusic, explodeMusic);
					// explodeMusic.pause();
					// explodeMusic.currentTime = 0;
					// explodeMusic.play();
					bombs[i].explode( bombs[i].getCurrTime() );
					getExplode(bombs[i]);
				}
			}
		}

		for (let i = 0; i < bombs.length; ++i)
		{
			if ( bombs[i].isExploded() )
			{
				// Рисуем взрыв
				const fireBlocks = bombs[i].fireBlocks();
				for (const block of fireBlocks)
				{
					const sprites = burst[block.type];
					drawExplode(sprites[bombs[i].getCurrStep(sprites.length)], block.x, block.y);
				}

				if ( bombs[i].isExplodeCompleted(bombs[i].getCurrTime() ) )
				{
					bombs.splice(i, 1); // удаляем бомбу i
					--bombCount;// уменьшаем индекс bombCount на 1
				}
			}
		}

		if (player.mooving)
		{
			moveCreature(player);
		}

		for (let i = 0; i < monsters.length; ++i)
		{
			moveCreature(monsters[i]);
			drawCreature(monsters[i], monsters[i].getCurrSprite() );
			killPlayer(monsters[i]);
			if ( killMonster(monsters[i]) ) {
				score = score + 100;
				scoreForm.innerHTML = score;
				monsters.splice(i, 1);
			}
		}

		if (endOfGame)
		{
			endTheGame();
		}
		else if (monsters.length == 0)
		{
			winTheGame();
		}
		else
		{
			drawCreature(player, player.getCurrSprite() );
		}

		requestAnimationFrameId = requestAnimationFrame(step); // вызов шага
	}
}