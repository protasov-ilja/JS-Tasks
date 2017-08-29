function musicOn() {
	if (music)
	{
		musicButton.innerHTML = 'OFF';
		music = false;
	}
	else
	{
		musicButton.innerHTML = 'ON';
		music = true;
	}

	volumeOnOff(music);
}

function volumeOnOff(music) {
	let volume = music ? 1 : 0;
	gameMusic.volume = volume;
	winMusic.volume = volume;
	explodeMusic.volume = volume;
}

function soundPlay(musicPlay, musicOff) {
	musicOff.pause();
	musicOff.CurrentTime = 0;

	musicPlay.play();
}