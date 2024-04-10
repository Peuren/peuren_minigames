function playAudio(name, volume = 0.35, duration) {
    console.log(`Playing: ${name} ${volume}`);

    var audio = new Audio(`sounds/${name}.ogg`);
    const ambientContext = new AudioContext();
    const source = ambientContext.createMediaElementSource(audio);
    const ambientPan = ambientContext.createStereoPanner();
    source.connect(ambientPan);
    ambientPan.connect(ambientContext.destination);
    ambientPan.pan.value = 0;
    audio.loop = false;
    audio.volume = volume;
    audio.autoplay = true;
    audio.play();

    if (duration) {
        setTimeout(() => {
            audio.pause();
        }, duration)
    }
}

export default playAudio;