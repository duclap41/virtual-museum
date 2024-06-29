import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { scene } from './scene.js';
import { initModels } from './model.js';
import * as config from './config.json';

const ROOM_HEIGHT = config.RoomHeight;
const ROOM_WIDTH = config.RoomWidth;
const ROOM_DEPTH = config.RoomDepth;
const COLOR_LIGTHT = 0xfcedd9;
const PAINTING_HEIGHT = config.PaintingHeight;

// Point light
function createPointlight(x, y, z, intensity=150) {
    const pointLight = new THREE.PointLight(COLOR_LIGTHT, intensity);
    pointLight.distance = ROOM_HEIGHT - 40;
    pointLight.decay = 1.2;
    pointLight.position.set(x, y, z);
    scene.add(pointLight);
}

// add spot light
function createSpotlight(x, y, z, intensity, angleRatio, distance, decay, targetPosition) {
    const spotlight = new THREE.SpotLight(0xffffff, intensity);
    spotlight.position.set(x, y, z);
    spotlight.target.position.copy(targetPosition);
    spotlight.castShadow = true;
    spotlight.angle = Math.PI/angleRatio;
    spotlight.penumbra = 0.5;
    spotlight.decay = decay;
    spotlight.distance = distance;
    spotlight.shadow.mapSize.width = 1024;
    spotlight.shadow.mapSize.height = 1024;
    scene.add(spotlight);
    scene.add(spotlight.target);

    const spotLightHelper = new THREE.SpotLightHelper(spotlight);
    scene.add(spotLightHelper);
}

// add into scene
function setupLights(scene, paintings) {
    // add ambient light
    const ambientLight = new THREE.AmbientLight(COLOR_LIGTHT, 0.6);
    scene.add(ambientLight);
    
    // Point Light
    // middle
    createPointlight(0, ROOM_HEIGHT - 2, 10);
    createPointlight(0, ROOM_HEIGHT - 2, -10);
    createPointlight(0, ROOM_HEIGHT - 2, ROOM_DEPTH/2-20);
    createPointlight(0, ROOM_HEIGHT - 2, ROOM_DEPTH/2-40);
    createPointlight(0, ROOM_HEIGHT - 2, -(ROOM_DEPTH/2-20));
    createPointlight(0, ROOM_HEIGHT - 2, -(ROOM_DEPTH/2-40));

    // for hanging lamp
    createPointlight(40, ROOM_HEIGHT - 3, 0, 50);
    createPointlight(-40, ROOM_HEIGHT - 3, 0, 50);
    createPointlight(-40, ROOM_HEIGHT - 3, -(ROOM_DEPTH/2-10), 50);
    createPointlight(-40, ROOM_HEIGHT - 3, (ROOM_DEPTH/2-10), 50);
    createPointlight(40, ROOM_HEIGHT - 3, (ROOM_DEPTH/2-10), 50);
    createPointlight(40, ROOM_HEIGHT - 3, -(ROOM_DEPTH/2-10), 50);

    // Spot light
    // Light for painting
    createSpotlight(0, config.BigPaintingHeight + 30, -(ROOM_DEPTH/2 - 10), 300, 3.5, 80, 1.2, paintings[0].position);
    createSpotlight(-(ROOM_WIDTH/2 - 10), PAINTING_HEIGHT + 11, -25, 200, 4.5, 80, 1.5, paintings[1].position);
    createSpotlight(-(ROOM_WIDTH/2 - 10), PAINTING_HEIGHT + 11, 30, 200, 4.5, 80, 1.5, paintings[2].position);
    createSpotlight((ROOM_WIDTH/2 - 10), PAINTING_HEIGHT + 11, -25, 200, 4.5, 80, 1.5, paintings[3].position);
    createSpotlight((ROOM_WIDTH/2 - 10), PAINTING_HEIGHT + 11, 30, 200, 4.5, 80, 1.5, paintings[4].position);

}

export { setupLights, createSpotlight };
