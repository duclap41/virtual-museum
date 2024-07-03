import * as THREE from 'three';
import { scene } from './scene.js';
import { createSpotlight } from './light.js';
import * as config from './config.json';

const ROOM_HEIGHT = config.RoomHeight;
const ROOM_WIDTH = config.RoomWidth;
const ROOM_DEPTH = config.RoomDepth;

const blocks = [];
const ceilingFan = new THREE.Group();

function initDrawBlock() {
    const textureLoader = new THREE.TextureLoader();

    // cube
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(10, 10, 10),
        new THREE.MeshLambertMaterial({
            map: textureLoader.load("img/rock01.jpg"),
        })
    );
    cube.position.set(ROOM_WIDTH/2-10, 10/2 , (ROOM_DEPTH/2 - 10));
    scene.add(cube);
    blocks.push(cube);

    // sphere
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(8, 14, 18),
        new THREE.MeshLambertMaterial({
            map: textureLoader.load("img/rock02.jpg")
        })
    );
    sphere.position.set(ROOM_WIDTH/2-10, 7 , -(ROOM_DEPTH/2 - 10));
    scene.add(sphere);
    blocks.push(sphere);

    // cone
    const cone = new THREE.Mesh(
        new THREE.ConeGeometry(8, 10, 15),
        new THREE.MeshLambertMaterial({
            map: textureLoader.load("img/rock03.jpg")
        })
    );
    cone.position.set(-(ROOM_WIDTH/2-10), 10/2 , -(ROOM_DEPTH/2 - 10));
    cone.rotateX(Math.PI);
    scene.add(cone);
    blocks.push(cone);

    // cylinder
    const cylinder = new THREE.Mesh(
        new THREE.CylinderGeometry(5, 5, 10, 15),
        new THREE.MeshLambertMaterial({
            map: textureLoader.load("img/rock04.jpg")
        })
    );
    cylinder.position.set(-(ROOM_WIDTH/2-10), 10/2 , (ROOM_DEPTH/2 - 10));
    cylinder.rotateX(Math.PI);
    scene.add(cylinder);
    blocks.push(cylinder);

    // ceiling fan
    const radiusBlade = 13;
        // blade 01
    const fanBlade1 = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 3, 20, 3, 1, true, -0.35, 1),
        new THREE.MeshLambertMaterial({
            color: 0xfae6d9
        })
    );
    fanBlade1.position.set(-radiusBlade, ROOM_HEIGHT-20, 0);
    fanBlade1.rotateX(Math.PI/2);
    fanBlade1.rotateZ(Math.PI/2);
    // blade 02
    const fanBlade2 = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 3, 20, 3, 1, true, -0.35, 1),
        new THREE.MeshLambertMaterial({
            color: 0xfae6d9
        })
    );
    fanBlade2.position.set(radiusBlade, ROOM_HEIGHT-20, 0);
    fanBlade2.rotateX(Math.PI/2);
    fanBlade2.rotateZ(-Math.PI/2);
        // blade 03
    const fanBlade3 = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 3, 20, 3, 1, true, -0.35, 1),
        new THREE.MeshLambertMaterial({
            color: 0xfae6d9
        })
    );
    fanBlade3.position.set(0, ROOM_HEIGHT-20, radiusBlade);
    fanBlade3.rotateX(Math.PI/2);
        // blade 04
    const fanBlade4 = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 3, 20, 3, 1, true, -0.35, 1),
        new THREE.MeshLambertMaterial({
            color: 0xfae6d9
        })
    );
    fanBlade4.position.set(0, ROOM_HEIGHT-20, -radiusBlade);
    fanBlade4.rotateX(Math.PI/2);
    fanBlade4.rotateZ(Math.PI);
        // middle
    const fanCircle = new THREE.Mesh(
        new THREE.CircleGeometry(2.3),
        new THREE.MeshLambertMaterial({
            color: 0xfae6d9
        })
    )
    fanCircle.position.set(0, ROOM_HEIGHT-22, 0);
    fanCircle.rotateX(Math.PI/2);

    ceilingFan.add(fanBlade1, fanBlade2, fanBlade3, fanBlade4, fanCircle);
    scene.add(ceilingFan);

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
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].BBox = new THREE.Box3();
        blocks[i].BBox.setFromObject(blocks[i]);
    }
}

function fanAnimation() {
    ceilingFan.rotation.y -= 0.04;
}

export {initDrawBlock, blocks, fanAnimation};