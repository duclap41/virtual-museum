import * as THREE from 'three';
import { wallGroup } from './room.js';
import { paintings } from './painting.js';
import { camera, controls, clock } from './scene.js';
import { loadedModels } from './model.js';
import { blocks } from './drawBlock.js';
import { hideMenu, showMenu } from './control.js';

const keysPressed = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  w: false,
  a: false,
  s: false,
  d: false,
};
// Event listener for when we press keys
let isLock = false;
document.addEventListener(
  'keydown',
  (event) => {
      if (event.key in keysPressed) {
      keysPressed[event.key] = true;
      }
      if (event.key === "Enter") {
        hideMenu();
        controls.lock();
      }
      if (event.key === "v") {
        controls.addEventListener('unlock', showMenu);
        controls.unlock();
        // showMenu();
        }
      if (event.key === "e") {
        if (!isLock) {
          controls.addEventListener('unlock', hideMenu);
          controls.unlock();
          isLock = true;
        }
        else {
          controls.lock();
          isLock = false;
        }
      }
    },
  false
);
// Event Listener for when we release keys
document.addEventListener(
  'keyup',
  (event) => {
    if (event.key in keysPressed) {
      keysPressed[event.key] = false;
    }
  },
  false
);

let isCrtl = false;
function updateMovement(delta) {
    const moveSpeed = 15 * delta;
    const previousPosition = camera.position.clone();

    if (keysPressed.ArrowRight || keysPressed.d) {
      controls.moveRight(moveSpeed*1.5);
    }
    if (keysPressed.ArrowLeft || keysPressed.a) {
      controls.moveRight(-moveSpeed*1.5);
    }
    if (keysPressed.ArrowUp || keysPressed.w) {
      controls.moveForward(moveSpeed);
    }
    if (keysPressed.ArrowDown || keysPressed.s) {
      controls.moveForward(-moveSpeed);
    }

    //if collision, revert camera's potision to previous position
    if (checkCollision()) {
        camera.position.copy(previousPosition);
    }
}

// collision
// create bbox for every object

// check if player intersects with the wall
function checkCollision() {
    const playerBBox = new THREE.Box3();
    const cameraWorldPosition = new THREE.Vector3(); // create vector hold camera position
    camera.getWorldPosition(cameraWorldPosition); // get the camera position, store it in vector
    playerBBox.setFromCenterAndSize( //take center abd size of bbox
        cameraWorldPosition,
        new THREE.Vector3(1, 1, 1)
    ); // set player's bbox and center it on camera's world potision

    // loop through each wall
    for (let i = 0; i < wallGroup.children.length; i++) {
      const object = wallGroup.children[i];
      if (playerBBox.intersectsBox(object.BBox)) {
          return true;
      }
    }
    for (let i = 0; i < paintings.length; i++) {
      const object = paintings[i];
      if (playerBBox.intersectsBox(object.BBox)) {
          return true;
      }
    }
    for (let i = 0; i < loadedModels.length; i++) {
      const object = loadedModels[i];
      if (playerBBox.intersectsBox(object.BBox)) {
          return true;
      }
    }
    for (let i = 0; i < blocks.length; i++) {
      const object = blocks[i];
      if (playerBBox.intersectsBox(object.BBox)) {
          return true;
      } 
    }

    return false;
}

export { updateMovement };