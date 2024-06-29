import * as THREE from 'three';
import * as config from './config.json';

const ROOM_HEIGHT = config.RoomHeight;
const ROOM_WIDTH = config.RoomWidth;
const ROOM_DEPTH = config.RoomDepth;

let wallGroup;

function createRoomSpace(scene) {
    const textureLoader = new THREE.TextureLoader();

    // Floor
    const floorTexture = textureLoader.load("img/floor.jpg");
    floorTexture.wrapS = THREE.RepeatWrapping; // hortizon
    floorTexture.wrapT = THREE.RepeatWrapping; // vertical
    floorTexture.repeat.set(1, 5);

    const planeGeometry = new THREE.PlaneGeometry(ROOM_WIDTH, ROOM_DEPTH);
    const planeMaterial = new THREE.MeshLambertMaterial({
        map: floorTexture,
        side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotateX(Math.PI / 2);
    scene.add(plane);

    // Ceiling
    const ceilingTexture = textureLoader.load("img/ceiling02.jpg");
    ceilingTexture.wrapS = THREE.RepeatWrapping;
    ceilingTexture.wrapT = THREE.RepeatWrapping;
    ceilingTexture.repeat.set(1, 1);
    const ceilingGeometry = new THREE.PlaneGeometry(ROOM_WIDTH, ROOM_DEPTH);
    const ceilingMaterial = new THREE.MeshLambertMaterial({
        map: ceilingTexture,
        side: THREE.DoubleSide
    });
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.rotateX(Math.PI / 2);
    ceiling.position.y = ROOM_HEIGHT;
    scene.add(ceiling);

    // Group Wall
    wallGroup = new THREE.Group(); // create a group to hold the walls
    wallGroup.position.y = ROOM_HEIGHT - ROOM_HEIGHT/2;
    scene.add(wallGroup);

    const wallTexture = textureLoader.load("img/white-brick-wall.jpg");
    wallTexture.wrapS = THREE.RepeatWrapping;
    wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(1, 1);

    const wallMaterial = new THREE.MeshLambertMaterial({
        map: wallTexture,
        color: 0xe8e9eb,
        side: THREE.DoubleSide
    });

    // font wall
    const wall1 = new THREE.Mesh(
    new THREE.BoxGeometry(ROOM_WIDTH, ROOM_HEIGHT, 0.001),
    wallMaterial
    );
    wall1.position.z = -ROOM_DEPTH/2;

    // back wall
    const wall2 = new THREE.Mesh(
        new THREE.BoxGeometry(ROOM_WIDTH, ROOM_HEIGHT, 0.001),
        wallMaterial
    );
    wall2.position.z = ROOM_DEPTH/2;

    // left wall
    const wall3 = new THREE.Mesh(
        new THREE.BoxGeometry(ROOM_DEPTH, ROOM_HEIGHT, 0.001),
        wallMaterial
    );
    wall3.position.x = -ROOM_WIDTH/2;
    wall3.rotateY(Math.PI / 2);

    // right wall
    const wall4 = new THREE.Mesh(
        new THREE.BoxGeometry(ROOM_DEPTH, ROOM_HEIGHT, 0.001),
        wallMaterial
    );
    wall4.position.x = ROOM_WIDTH/2;
    wall4.rotateY(-Math.PI / 2);

    wallGroup.add(wall1, wall2, wall3, wall4);

    // loop through each wall, create bounding box (for collision) and add texture
    for (let i = 0; i < wallGroup.children.length; i++) {
        wallGroup.children[i].BBox = new THREE.Box3();
        wallGroup.children[i].BBox.setFromObject(wallGroup.children[i]); // add bbox for walls

    // for light
    plane.receiveShadow = true;
    plane.castShadow = true;
    ceiling.receiveShadow = true;
    ceiling.castShadow = true;
    wall1.receiveShadow = true;
    wall1.castShadow = true;
    wall2.receiveShadow = true;
    wall2.castShadow = true;
    wall3.receiveShadow = true;
    wall3.castShadow = true;
    wall4.receiveShadow = true;
    wall4.castShadow = true;

}
}

export { createRoomSpace, wallGroup };
