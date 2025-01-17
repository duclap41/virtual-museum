import { scene, camera, renderer, controls, clock } from './scene.js';
import { initPaintings, displayPaintingInfo, hidePaintingInfo, paintings } from './painting.js';
import { initModels, modelData } from './model.js';
import { initDrawBlock, fanAnimation } from './drawBlock.js';
import { setupLights } from './light.js';
import { createRoomSpace} from './room.js';
import { startExperience, showMenu } from './control.js';
import { setupAudio } from './audio.js';
import { updateMovement } from './movement.js';
import { clickHandling } from './clickHandling.js';

// Add paintings to the scene
initPaintings();

// Load models
initModels();

// Draw blocks
initDrawBlock();

// Setup lights
setupLights();

// Create room
createRoomSpace(scene);

// Setup audio
setupAudio(camera);

// add click event
clickHandling();

// Animation loop
function renderLoop() {
    updateMovement(clock.getDelta());
    fanAnimation();
    const distanceThreshold = 22;
    let paintingToShow = "";

    paintings.forEach((paint) => {
        const distanceToPainting = camera.position.distanceTo(paint.position);
        if (distanceToPainting < distanceThreshold) {
            paintingToShow = paint;
        }
    });

    let modelToShow = -1;
    for (let i = 0; i < 2; i++) {
        const distanceToModel = camera.position.distanceTo(modelData[i].position);
        if (distanceToModel < distanceThreshold) {
            modelToShow = i;
        }
    }

    if (paintingToShow) {
        displayPaintingInfo(paintingToShow.userData.info);
    }
    else if (modelToShow != -1) {
        displayPaintingInfo(modelData[modelToShow].info);
    }
    else {
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
