import * as THREE from 'three';

let sound;
let bufferLoaded = false;

function setupAudio(camera) {
    const listener = new THREE.AudioListener();
    camera.add(listener);

    sound = new THREE.Audio(listener);

    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('sound/tiersen.mp3', function(buffer) {
        // load the audio file
        sound.setBuffer(buffer); // set the audio source buffer
        sound.setLoop(true); // set the audio source to loop
        sound.setVolume(0.5); // set the audio source volume
        bufferLoaded = true; // set bufferLoaded flag to true once the audio buffer is loaded
    });
}

function startAudio() {
    if (sound && bufferLoaded) {
        // check if the buffer is loaded before playing
        sound.play();
      }
}

function stopAudio() {
    if (sound) {
        // check if the buffer is loaded before playing
        sound.pause();
      }
}

document.getElementById("start_audio").addEventListener('click', startAudio);
document.getElementById("stop_audio").addEventListener('click', stopAudio);

export { setupAudio };
