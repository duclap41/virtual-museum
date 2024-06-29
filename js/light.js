import * as THREE from 'three';
import * as config from './config.json';

const ROOM_HEIGHT = config.RoomHeight;
const ROOM_WIDTH = config.RoomWidth;
const ROOM_DEPTH = config.RoomDepth;
const COLOR_LIGTHT = 0xfcedd9;

// add into scene
function setupLights(scene, paintings) {
    // add ambient light
    const ambientLight = new THREE.AmbientLight(COLOR_LIGTHT, 0.6);
    scene.add(ambientLight);

    //add point light
    function createPointlight(x, z, intensity=150) {
        const pointLight = new THREE.PointLight(COLOR_LIGTHT, intensity);
        pointLight.distance = ROOM_HEIGHT - 50;
        pointLight.decay = 1.5;
        pointLight.position.set(x, ROOM_HEIGHT - 2, z);
        scene.add(pointLight);
    }
    // right side
    createPointlight(ROOM_WIDTH/2-10, 0);
    createPointlight(ROOM_WIDTH/2-10, ROOM_DEPTH/2-10);
    createPointlight(ROOM_WIDTH/2-10, -(ROOM_DEPTH/2-10));
    // left side
    createPointlight(-(ROOM_WIDTH/2-10), 0);
    createPointlight(-(ROOM_WIDTH/2-10), ROOM_DEPTH/2-10);
    createPointlight(-(ROOM_WIDTH/2-10), -(ROOM_DEPTH/2-10));
    // middle
    createPointlight(0, 10);
    createPointlight(0, -10);
    createPointlight(0, ROOM_DEPTH/2-20);
    createPointlight(0, ROOM_DEPTH/2-40);
    createPointlight(0, -(ROOM_DEPTH/2-20));
    createPointlight(0, -(ROOM_DEPTH/2-40));

    // add spot light
    function createSpotlight(x, y, z, intensity, targetPosition) {
        const spotlight = new THREE.SpotLight(0xffffff, intensity);
        spotlight.position.set(x, y, z);
        spotlight.target.position.copy(targetPosition);
        spotlight.castShadow = true;
        spotlight.angle = Math.PI/6;
        spotlight.penumbra = 0.5;
        spotlight.decay = 1.2;
        spotlight.distance = 40;
        spotlight.shadow.mapSize.width = 1024;
        spotlight.shadow.mapSize.height = 1024;
        scene.add(spotlight);
        scene.add(spotlight.target);

        const spotLightHelper = new THREE.SpotLightHelper(spotlight);
        scene.add(spotLightHelper);
    }



    // Add spotlights to painting in scene
    createSpotlight(15, 25, -50, 100, paintings[0].position);
    createSpotlight(-15, 25, -50, 100, paintings[1].position);
    createSpotlight(-30, 25, -25, 100, paintings[2].position);
    createSpotlight(-30, 25, 30, 100, paintings[3].position);
    createSpotlight(30, 25, -25, 100, paintings[4].position);
    createSpotlight(30, 25, 30, 100, paintings[5].position);
}

export { setupLights };
