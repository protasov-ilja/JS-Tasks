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
	stopCurrSoundAndPlayNew(gameMusic, winMusic);

	endOfGame = false;
	player = new Player( Date.now() );
	score = 0;
	scoreForm.innerHTML = score + '000';

    liveForm.innerHTML = '0' + player.live;
    bombForm.innerHTML = '0' + player.bombCount;

	monsters = [];

	field = getField(LEVELS[currLevel]);

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

	monster = new Monster(currX, currY, speed, sprites, Date.now());
	monsters.push(monster);
}

function animate() {
	clearField();
	drawField();
	checkIsBombExploded();
	movePlayer();
	processMonsters();
	checkEndOfGame();

	requestAnimationFrameId = requestAnimationFrame(animate); // вызов шага
}

function checkIsBombExploded() {
	for (let i = 0; i < bombs.length; ++i) {
		if (Date.now() - bombs[i].getCreateTime() < Config.BOMB_TIMER) {
			drawObject(bombs[i], bombs[i].getCurrSprite());
		}
		else
		{
			if (!bombs[i].isExploded())
			{
				stopCurrSoundAndPlayNew(explodeMusic, explodeMusic);
				bombs[i].explode(Date.now());
				explodeBomb(bombs[i]);
			}
			else
			{
				// Рисуем взрыв
				const fireBlocks = bombs[i].fireBlocks();

				for (const block of fireBlocks) {
					const sprites = burst[block.type];
					drawExplode(sprites[bombs[i].getCurrStep(sprites.length)], block.x, block.y);
				}

				if (bombs[i].isExplodeCompleted(Date.now())) {
					bombs.splice(i, 1); // удаляем бомбу i
					--bombCount;// уменьшаем индекс bombCount на 1
				}
			}
		}
	}
}

function movePlayer() {
	if (player.mooving)
	{
		moveCreature(player);
	}

	drawObject(player, player.getCurrSprite());
}

function processMonsters() {
	for (let i = 0; i < monsters.length; ++i)
	{
		moveCreature(monsters[i]);
		drawObject(monsters[i], monsters[i].getCurrSprite());
		checkForKillPlayer(monsters[i]);

		if (isMonsterDead(monsters[i])) {
			score = score + Config.SCORE_BONUS;
			scoreForm.innerHTML = score;
			monsters.splice(i, 1);
		}
	}
}

function checkEndOfGame() {
	if (endOfGame)
	{
		endTheGame();
	}
	else if (monsters.length == 0)
	{
		winTheGame();
	}
}

function endTheGame() {
	drawTheEndOfGame();
}

function winTheGame() {
	stopCurrSoundAndPlayNew(winMusic, gameMusic);

	drawTheWinOfGame();
}