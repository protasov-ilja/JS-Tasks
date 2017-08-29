document.onkeydown = function (event) {
	if (!endOfGame && !player.kill)
	{
		switch (event.keyCode)
		{
			case KeyCode.SPACE:
				stayBomb();
				break;
			case KeyCode.ARROW_UP:
			case KeyCode.W:
				event.preventDefault();
				player.direction = Direction.UP;
				player.mooving = true;

				break;
			case KeyCode.ARROW_RIGHT:
			case KeyCode.D:
				event.preventDefault();
				player.direction = Direction.RIGHT;
				player.mooving = true;

				break;
			case KeyCode.ARROW_DOWN:
			case KeyCode.S:
				event.preventDefault();
				player.direction = Direction.DOWN;
				player.mooving = true;

				break;
			case KeyCode.ARROW_LEFT:
			case KeyCode.A:
				event.preventDefault();
				player.direction = Direction.LEFT;
				player.mooving = true;
		}
	}
};

document.onkeyup = () => {
	if (!endOfGame)
	{
		switch (event.keyCode)
		{
			case KeyCode.ARROW_UP:
			case KeyCode.W:
				if (player.direction == Direction.UP)
				{
					player.mooving = false;
				}

				break;
			case KeyCode.ARROW_RIGHT:
			case KeyCode.D:
				if (player.direction == Direction.RIGHT)
				{
					player.mooving = false;
				}

				break;
			case KeyCode.ARROW_DOWN:
			case KeyCode.S:
				if (player.direction == Direction.DOWN)
				{
					player.mooving = false;
				}

				break;
			case KeyCode.ARROW_LEFT:
			case KeyCode.A:
				if (player.direction == Direction.LEFT)
				{
					player.mooving = false;
				}
		}
	}
};