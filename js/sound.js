//Using audiofx.min.js

if (AudioFX.supported) {
	//var shufflesound = AudioFX('sounds/cardshuffle', { formats: ['wav'], pool:2 });
	var lasersound = AudioFX('sounds/8_bit_laser', { formats: ['wave'], pool:10});
	var knocksound = AudioFX('sounds/knock01.wav', { formats: ['wave'], pool:8});
}