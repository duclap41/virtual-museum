import * as THREE from 'three';

// add into scene
function setupLights(scene, paintings) {
    // add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // add light of sun
    const sunLight = new THREE.DirectionalLight(0xdddddd, 1.0);
    sunLight.position.y = 20;
    scene.add(sunLight);

    //TODO: add point light

    // add spot light
    function createSpotlight(x, y, z, intensity, targetPosition) {
        const spotlight = new THREE.SpotLight(0xffffff, intensity);
        spotlight.position.set(x, y, z);
        spotlight.target.position.copy(targetPosition);
        spotlight.castShadow = true;
        spotlight.angle = Math.PI / 6;
        spotlight.penumbra = 0.9;
        spotlight.decay = 2;
        spotlight.distance = 40;
        spotlight.shadow.mapSize.width = 1024;
        spotlight.shadow.mapSize.height = 1024;
        scene.add(spotlight);
        scene.add(spotlight.target);

        const spotLightHelper = new THREE.SpotLightHelper(spotlight);
        scene.add(spotLightHelper);
    }

    // Add spotlights to painting in scene
    createSpotlight(15, 25, -50, 1.5, paintings[0].position);
    createSpotlight(-15, 25, -50, 1.5, paintings[1].position);
    createSpotlight(-30, 25, -25, 1.5, paintings[2].position);
    createSpotlight(-30, 25, 30, 1.5, paintings[3].position);
    createSpotlight(30, 25, -25, 1.5, paintings[4].position);
    createSpotlight(30, 25, 30, 1.5, paintings[5].position);
}

export { setupLights };
