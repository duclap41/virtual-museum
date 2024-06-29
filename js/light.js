import * as THREE from 'three';
import * as config from './config.json';

const ROOM_HEIGHT = config.RoomHeight;
const ROOM_WIDTH = config.RoomWidth;
const ROOM_DEPTH = config.RoomDepth;
const COLOR_LIGTHT = 0xfcedd9;
const PAINTING_HEIGHT = config.PaintingHeight;

// add into scene
function setupLights(scene, paintings, loadedModels) {
    // add ambient light
    const ambientLight = new THREE.AmbientLight(COLOR_LIGTHT, 0.6);
    scene.add(ambientLight);

    //
    // scene.add(new THREE.DirectionalLight(COLOR_LIGTHT, 10));

    //add point light
    function createPointlight(x, y, z, intensity=150) {
        const pointLight = new THREE.PointLight(COLOR_LIGTHT, intensity);
        pointLight.distance = ROOM_HEIGHT - 50;
        pointLight.decay = 1.5;
        pointLight.position.set(x, y, z);
        scene.add(pointLight);
    }
    // right side
    createSpotlight(ROOM_WIDTH/2-10, ROOM_HEIGHT - 30 ,0, 100, new THREE.Vector3(40, 0, 0), 8);
    createPointlight(ROOM_WIDTH/2-10, ROOM_HEIGHT - 2 , ROOM_DEPTH/2-10);
    createPointlight(ROOM_WIDTH/2-10, ROOM_HEIGHT - 2 , -(ROOM_DEPTH/2-10));
    // left side
    createSpotlight(-(ROOM_WIDTH/2-10), ROOM_HEIGHT - 30 ,0, 100, new THREE.Vector3(-40, 0, 0), 8);
    createPointlight(-(ROOM_WIDTH/2-10), ROOM_HEIGHT - 2, ROOM_DEPTH/2-10);
    createPointlight(-(ROOM_WIDTH/2-10), ROOM_HEIGHT - 2, -(ROOM_DEPTH/2-10));
    // middle
    createPointlight(0, ROOM_HEIGHT - 2, 10);
    createPointlight(0, ROOM_HEIGHT - 2, -10);
    createPointlight(0, ROOM_HEIGHT - 2, ROOM_DEPTH/2-20);
    createPointlight(0, ROOM_HEIGHT - 2, ROOM_DEPTH/2-40);
    createPointlight(0, ROOM_HEIGHT - 2, -(ROOM_DEPTH/2-20));
    createPointlight(0, ROOM_HEIGHT - 2, -(ROOM_DEPTH/2-40));

    // hanging lamp
    createPointlight(38, ROOM_HEIGHT - 30, 0, 80);
    createPointlight(-38, ROOM_HEIGHT - 30, 0, 80);

    // add spot light
    function createSpotlight(x, y, z, intensity, targetPosition, angleRatio=4.5) {
        const spotlight = new THREE.SpotLight(0xffffff, intensity);
        spotlight.position.set(x, y, z);
        spotlight.target.position.copy(targetPosition);
        spotlight.castShadow = true;
        spotlight.angle = Math.PI/angleRatio;
        spotlight.penumbra = 0.5;
        spotlight.decay = 1.2;
        spotlight.distance = 80;
        spotlight.shadow.mapSize.width = 1024;
        spotlight.shadow.mapSize.height = 1024;
        scene.add(spotlight);
        scene.add(spotlight.target);

        const spotLightHelper = new THREE.SpotLightHelper(spotlight);
        scene.add(spotLightHelper);
    }



    // Add spotlights to painting in scene
    createSpotlight(0, config.BigPaintingHeight + 30, -(ROOM_DEPTH/2 - 10), 300, paintings[0].position, 3.5);
    createSpotlight(-(ROOM_WIDTH/2 - 10), PAINTING_HEIGHT + 11, -25, 200, paintings[1].position);
    createSpotlight(-(ROOM_WIDTH/2 - 10), PAINTING_HEIGHT + 11, 30, 200, paintings[2].position);
    createSpotlight((ROOM_WIDTH/2 - 10), PAINTING_HEIGHT + 11, -25, 200, paintings[3].position);
    createSpotlight((ROOM_WIDTH/2 - 10), PAINTING_HEIGHT + 11, 30, 200, paintings[4].position);
}

export { setupLights };
