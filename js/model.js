import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import * as sketchfab from "https://static.sketchfab.com/api/sketchfab-viewer-1.12.0.js";
import * as config from './config.json';

const ROOM_HEIGHT = config.RoomHeight;
const ROOM_WIDTH = config.RoomWidth;
const ROOM_DEPTH = config.RoomDepth;

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
        // Statue
        // { path: 'statue/statue01/scene.gltf',
        //     position: new THREE.Vector3(-30, 0, 0),
        //     scale:  new THREE.Vector3(0.2, 0.2, 0.2),
        //     rotation: new THREE.Euler(0, Math.PI / 2, 0),
        //     material: new THREE.MeshPhongMaterial({})},
        // { path: 'statue/statue02/scene.gltf',
        //     position: new THREE.Vector3(-20, -2, -40),
        //     scale:new THREE.Vector3(0.25, 0.25, 0.25),
        //     material: new THREE.MeshPhongMaterial({}) },
        // { path: 'statue/statue03/scene.gltf',
        //     position: new THREE.Vector3(30, 0, 0),
        //     scale:new THREE.Vector3(0.2, 0.2, 0.2),
        //     rotation: new THREE.Euler(0, -Math.PI / 2, 0),
        //     material: new THREE.MeshPhongMaterial({}) },
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
        // side lamp
        { path: 'model/wall_light/scene.gltf',
            position: new THREE.Vector3(10, 30, 10),
            scale:new THREE.Vector3(20, 20, 20)},

    ];

    loadStatue(models, scene);
}

export { initStatues };
