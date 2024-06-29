import * as THREE from 'three';
import { scene } from './scene.js';
import { createSpotlight } from './light.js';
import * as config from './config.json';

const ROOM_HEIGHT = config.RoomHeight;
const ROOM_WIDTH = config.RoomWidth;
const ROOM_DEPTH = config.RoomDepth;

const blocks = [];
function initDrawBlock() {
    const textureLoader = new THREE.TextureLoader();

    // cube
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(10, 10, 10),
        new THREE.MeshLambertMaterial({
            map: textureLoader.load("img/rock01.jpg"),
        })
    )
    cube.position.set(ROOM_WIDTH/2-10, 10/2 , (ROOM_DEPTH/2 - 10));
    scene.add(cube);

    // sphere
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(8, 14, 18),
        new THREE.MeshLambertMaterial({
            map: textureLoader.load("img/rock02.jpg")
        })
    )
    sphere.position.set(ROOM_WIDTH/2-10, 7 , -(ROOM_DEPTH/2 - 10));
    scene.add(sphere);

    // cone
    const cone = new THREE.Mesh(
        new THREE.ConeGeometry(8, 10, 15),
        new THREE.MeshLambertMaterial({
            map: textureLoader.load("img/rock03.jpg")
        })
    )
    cone.position.set(-(ROOM_WIDTH/2-10), 10/2 , -(ROOM_DEPTH/2 - 10));
    cone.rotateX(Math.PI);
    scene.add(cone);

    // cylinder
    const cylinder = new THREE.Mesh(
        new THREE.CylinderGeometry(5, 5, 10, 15),
        new THREE.MeshLambertMaterial({
            map: textureLoader.load("img/rock04.jpg")
        })
    )
    cylinder.position.set(-(ROOM_WIDTH/2-10), 10/2 , (ROOM_DEPTH/2 - 10));
    cylinder.rotateX(Math.PI);
    scene.add(cylinder);

    // splot light
    createSpotlight(cube.position.x, ROOM_HEIGHT-30, cube.position.z, 200, 10, 120, 1, cube.position);
    createSpotlight(sphere.position.x, ROOM_HEIGHT-30, sphere.position.z, 200, 10, 120, 1, sphere.position);
    createSpotlight(cone.position.x, ROOM_HEIGHT-30, cone.position.z, 200, 10, 120, 1, cone.position);
    createSpotlight(cylinder.position.x, ROOM_HEIGHT-30, cylinder.position.z, 200, 10, 120, 1, cylinder.position);

    // shadow
    cube.castShadow = true;
    cube.receiveShadow = true;
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    cone.castShadow = true;
    cone.receiveShadow = true;
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;

    // for collision
    blocks.push(cube, sphere, cone, cylinder);
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].BBox = new THREE.Box3();
        blocks[i].BBox.setFromObject(blocks[i]);
    }
}

export {initDrawBlock, blocks};