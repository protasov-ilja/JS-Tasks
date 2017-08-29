function switchVolume(music) {
	let volume = music ? 1 : 0;
	gameMusic.volume = volume;
	winMusic.volume = volume;
	explodeMusic.volume = volume;
}

function stopCurrSoundAndPlayNew(musicToPlay, musicToStop) {
	musicToStop.pause();
	musicToStop.currentTime = 0;

	musicToPlay.play();
}