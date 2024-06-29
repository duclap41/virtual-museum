import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import * as sketchfab from "https://static.sketchfab.com/api/sketchfab-viewer-1.12.0.js";
import * as config from './config.json';

const ROOM_HEIGHT = config.RoomHeight;
const ROOM_WIDTH = config.RoomWidth;
const ROOM_DEPTH = config.RoomDepth;
const PAINTING_HEIGHT = config.PaintingHeight;

let loadedModels = [];
function loadModel(models, scene) {
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
                
                // for light
                model.receiveShadow = true;
                model.castShadow = true;

                scene.add(model);
                loadedModels.add(model);
            },
            // function (xhr) {
            //     console.error(`Error loading GLTF model '${modelInfo.path}':`, xhr);
            // }
        );
    });
}

function initModels(scene) {
    const objects = [
        // Statue
        { path: 'statue/statue01/scene.gltf',
            position: new THREE.Vector3(-40, 0, 0),
            scale:  new THREE.Vector3(0.3, 0.3, 0.3),
            rotation: new THREE.Euler(0, Math.PI / 2, 0)},
        { path: 'statue/statue03/scene.gltf',
            position: new THREE.Vector3(40, 0, 0),
            scale:new THREE.Vector3(0.3, 0.3, 0.3),
            rotation: new THREE.Euler(0, -Math.PI / 2, 0)},
        // Door
        { path: 'model/wooden_door/scene.gltf',
            position: new THREE.Vector3(0, 0, ROOM_DEPTH/2),
            scale:new THREE.Vector3(5, 10, 15),
            rotation: new THREE.Euler(0, -Math.PI / 2, 0)},
        // Middle lamp 01
        { path: 'model/wooden_ceiling_lamp/scene.gltf',
            position: new THREE.Vector3(0, ROOM_HEIGHT-3, 0),
            scale:new THREE.Vector3(20, 10, 20)},
        // Middle lamp 02
        { path: 'model/wooden_ceiling_lamp/scene.gltf',
            position: new THREE.Vector3(0, ROOM_HEIGHT-3, ROOM_DEPTH/2-30),
            scale:new THREE.Vector3(20, 10, 20)},
        // Middle lamp 02
        { path: 'model/wooden_ceiling_lamp/scene.gltf',
            position: new THREE.Vector3(0, ROOM_HEIGHT-3, -(ROOM_DEPTH/2-30)),
            scale:new THREE.Vector3(20, 10, 20)},
        // wall lamp
        { path: 'model/wall_light/scene.gltf',
            position: new THREE.Vector3(-9.5, (config.BigPaintingHeight) + 13, -(ROOM_DEPTH/2 - 10)),
            scale:new THREE.Vector3(50, 40, 30)},
        { path: 'model/wall_light/scene.gltf',
            position: new THREE.Vector3(-(ROOM_WIDTH/2-7), PAINTING_HEIGHT + 3, -21.5),
            scale:new THREE.Vector3(20, 20, 20),
            rotation: new THREE.Euler(0, Math.PI / 2, 0)},
        { path: 'model/wall_light/scene.gltf',
            position: new THREE.Vector3(-(ROOM_WIDTH/2-7), PAINTING_HEIGHT + 3, 34),
            scale:new THREE.Vector3(20, 20, 20),
            rotation: new THREE.Euler(0, Math.PI / 2, 0)},
        { path: 'model/wall_light/scene.gltf',
            position: new THREE.Vector3((ROOM_WIDTH/2-7), PAINTING_HEIGHT + 3, -29),
            scale:new THREE.Vector3(20, 20, 20),
            rotation: new THREE.Euler(0, -Math.PI / 2, 0)},
        { path: 'model/wall_light/scene.gltf',
            position: new THREE.Vector3((ROOM_WIDTH/2-7), PAINTING_HEIGHT + 3, 26.5),
            scale:new THREE.Vector3(20, 20, 20),
            rotation: new THREE.Euler(0, -Math.PI / 2, 0)},
        // hanging lamp
        { path: 'model/hanging_lamp/scene.gltf',
            position: new THREE.Vector3(40, ROOM_HEIGHT-40, 0),
            scale:new THREE.Vector3(10, 30, 10),
            rotation: new THREE.Euler(0, -Math.PI / 2, 0)},
        { path: 'model/hanging_lamp/scene.gltf',
            position: new THREE.Vector3(-40, ROOM_HEIGHT-40, 0),
            scale:new THREE.Vector3(10, 30, 10),
            rotation: new THREE.Euler(0, -Math.PI / 2, 0)},
        // barrier
        { path: 'model/barrier/scene.gltf',
            position: new THREE.Vector3(ROOM_WIDTH/2 - 20, 0, 0),
            scale:new THREE.Vector3(10, 10, 10),
            rotation: new THREE.Euler(0, -Math.PI / 2, 0)},
        { path: 'model/barrier/scene.gltf',
            position: new THREE.Vector3(-(ROOM_WIDTH/2 - 20), 0, 0),
            scale:new THREE.Vector3(10, 10, 10),
            rotation: new THREE.Euler(0, Math.PI / 2, 0)},

    ];

    loadModel(objects, scene);
}

export { initModels, loadedModels };
