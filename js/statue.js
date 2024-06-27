import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';

function loadStatue(models, scene) {
    const loader = new GLTFLoader();
    
    models.forEach(modelInfo => {
        loader.load(
            modelInfo.path,
            function (gltf) {
                const model = gltf.scene;

                // Set position
                model.position.set(modelInfo.position.x, modelInfo.position.y, modelInfo.position.z);

                // Set scale if provided
                if (modelInfo.scale) {
                    model.scale.set(modelInfo.scale.x, modelInfo.scale.y, modelInfo.scale.z);
                }

                // Set rotation if provided
                if (modelInfo.rotation) {
                    model.rotation.set(modelInfo.rotation.x, modelInfo.rotation.y, modelInfo.rotation.z);
                }

                // Set material if provided
                if (modelInfo.material) {
                    model.traverse(child => {
                        if (child.isMesh) {
                            child.material = modelInfo.material;
                        }
                    });
                }

                scene.add(model);
            },
            // function (xhr) {
            //     console.error(`Error loading GLTF model '${modelInfo.path}':`, xhr);
            // }
        );
    });
}

function initStatues(scene) {
    const models = [
        { path: 'statue/statue01/scene.gltf',
            position: new THREE.Vector3(-30, 0, 0),
            scale:  new THREE.Vector3(0.2, 0.2, 0.2),
            rotation: new THREE.Euler(0, Math.PI / 2, 0),
            material: new THREE.MeshPhongMaterial({})},
        { path: 'statue/statue02/scene.gltf',
            position: new THREE.Vector3(-20, -2, -40),
            scale:new THREE.Vector3(0.25, 0.25, 0.25),
            material: new THREE.MeshPhongMaterial({}) },
        { path: 'statue/statue03/scene.gltf',
            position: new THREE.Vector3(30, 0, 0),
            scale:new THREE.Vector3(0.2, 0.2, 0.2),
            rotation: new THREE.Euler(0, -Math.PI / 2, 0),
            material: new THREE.MeshPhongMaterial({}) },
    ];

    loadStatue(models, scene);
}

export { initStatues };
