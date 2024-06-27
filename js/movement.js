import * as THREE from 'three';

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
document.addEventListener(
  'keydown',
  (event) => {
      if (event.key in keysPressed) {
      keysPressed[event.key] = true;
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

function updateMovement(delta, camera, controls, wallGroup) {
    const moveSpeed = 12 * delta;
    const previousPosition = camera.position.clone();

    if (keysPressed.ArrowRight || keysPressed.d) {
      controls.moveRight(moveSpeed);
    }
    if (keysPressed.ArrowLeft || keysPressed.a) {
      controls.moveRight(-moveSpeed);
    }
    if (keysPressed.ArrowUp || keysPressed.w) {
      controls.moveForward(moveSpeed);
    }
    if (keysPressed.ArrowDown || keysPressed.s) {
      controls.moveForward(-moveSpeed);
    }

    //if collision, revert camera's potision to previous position
    if (checkCollision(camera, wallGroup)) {
        camera.position.copy(previousPosition);
    }
}

// collision
// check if player intersects with the wall
function checkCollision(camera, wallGroup) {
    const playerBBox = new THREE.Box3();
    const cameraWorldPosition = new THREE.Vector3(); // create vector hold camera position
    camera.getWorldPosition(cameraWorldPosition); // get the camera position, store it in vector
    playerBBox.setFromCenterAndSize( //take center abd size of bbox
        cameraWorldPosition,
        new THREE.Vector3(1, 1, 1)
    ); // set player's bbox and center it on camera's world potision

    // loop through each wall
    for (let i = 0; i < wallGroup.children.length; i++) {
        const wall = wallGroup.children[i];
        if (playerBBox.intersectsBox(wall.BBox)) {
            return true;
        }
    };

    return false;
}

export { updateMovement };