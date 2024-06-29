import * as THREE from 'three';
import { GLTFLoader, PointerLockControls} from 'three-stdlib';

import { scene, camera, renderer } from './scene.js';
import { initPaintings, displayPaintingInfo, hidePaintingInfo, paintings } from './painting.js';
import { initModels } from './model.js';
import { initDrawBlock } from './drawBlock.js';
import { setupLights } from './light.js';
import { createRoomSpace, wallGroup} from './room.js';
import { startExperience, showMenu } from './control.js';
import { setupAudio } from './audio.js';
import { updateMovement } from './movement.js';

// init
let controls = new PointerLockControls(camera, document.body);
let clock = new THREE.Clock();

// Add paintings to the scene
initPaintings(scene);

// Load models
initModels(scene);

// Draw blocks
initDrawBlock();

// Setup lights
setupLights(scene, paintings);

// Create room
createRoomSpace(scene);

// Setup audio
setupAudio(camera);

// Start experience button
const playButton = document.getElementById('play_button');
playButton.addEventListener('click', () => startExperience(controls, clock));

controls.addEventListener('unlock', showMenu);

// Animation loop
function renderLoop() {
    updateMovement(clock.getDelta(), camera, controls, wallGroup);
    const distanceThreshold = 8;
    let paintingToShow = "";

    paintings.forEach((paint) => {
        const distanceToPainting = camera.position.distanceTo(paint.position);
        if (distanceToPainting < distanceThreshold) {
            paintingToShow = paint;
        }
    });

    if (paintingToShow) {
        displayPaintingInfo(paintingToShow.userData.info);
    } else {
        hidePaintingInfo();
    }

    renderer.render(scene, camera);
    window.requestAnimationFrame(renderLoop);
}

renderLoop();

// Adjust scene on window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);
