import * as THREE from 'three';
import { Group } from 'three/examples/jsm/libs/tween.module.js';

let wallGroup;

function createRoomSpace(scene) {
    const textureLoader = new THREE.TextureLoader();

    // Floor
    const floorTexture = textureLoader.load("img/floor.jpg");
    floorTexture.wrapS = THREE.RepeatWrapping; // hortizon
    floorTexture.wrapT = THREE.RepeatWrapping; // vertical
    floorTexture.repeat.set(1, 5);

    const planeGeometry = new THREE.PlaneGeometry(80, 120);
    const planeMaterial = new THREE.MeshPhongMaterial({
        map: floorTexture,
        side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotateX(Math.PI / 2);
    scene.add(plane);

    // Ceiling
    const ceilingTexture = textureLoader.load("img/ceiling.jpg");
    ceilingTexture.wrapS = THREE.RepeatWrapping;
    ceilingTexture.wrapT = THREE.RepeatWrapping;
    ceilingTexture.repeat.set(1, 10);
    const ceilingGeometry = new THREE.PlaneGeometry(80, 120);
    const ceilingMaterial = new THREE.MeshLambertMaterial({
        map: ceilingTexture,
        color: 0x9e8175,
        side: THREE.DoubleSide
    });
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.rotateX(Math.PI / 2);
    ceiling.position.y = 35;
    scene.add(ceiling);

    // Group Wall
    wallGroup = new THREE.Group(); // create a group to hold the walls
    wallGroup.position.y = 10;
    scene.add(wallGroup);

    const wallTexture = textureLoader.load("img/white-brick-wall.jpg");
    wallTexture.wrapS = THREE.RepeatWrapping;
    wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(1, 1);

    const wallMaterial = new THREE.MeshPhongMaterial({
        map: wallTexture,
        side: THREE.DoubleSide
    });

    // font wall
    const wall1 = new THREE.Mesh(
    new THREE.BoxGeometry(80, 50, 0.001),
    wallMaterial
    );
    wall1.position.z = -60;

    // back wall
    const wall2 = new THREE.Mesh(
        new THREE.BoxGeometry(80, 50, 0.001),
        wallMaterial
    );
    wall2.position.z = 60;

    // left wall
    const wall3 = new THREE.Mesh(
        new THREE.BoxGeometry(120, 50, 0.001),
        wallMaterial
    );
    wall3.position.x = -40;
    wall3.rotateY(Math.PI / 2);

    // right wall
    const wall4 = new THREE.Mesh(
        new THREE.BoxGeometry(120, 50, 0.001),
        wallMaterial
    );
    wall4.position.x = 40;
    wall4.rotateY(-Math.PI / 2);

    wallGroup.add(wall1, wall2, wall3, wall4);

    // loop through each wall, create bounding box (for collision) and add texture
    for (let i = 0; i < wallGroup.children.length; i++) {
        wallGroup.children[i].BBox = new THREE.Box3();
        wallGroup.children[i].BBox.setFromObject(wallGroup.children[i]); // add bbox for walls
}
}

export { createRoomSpace, wallGroup };
