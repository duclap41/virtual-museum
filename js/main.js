import * as THREE from 'three';
import { PointerLockControls} from 'three-stdlib';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    75, // field of view
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // near
    1000 // far
);

scene.add(camera);
camera.position.y = 7;
camera.position.z = 5; // move cam back 5 units

// Renderer
const renderer = new THREE.WebGLRenderer({antialias: true}); // smooth edges
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1); // background color
document.body.appendChild(renderer.domElement);

// Light
    // AmbientLight 
const ambientLight = new THREE.AmbientLight(0x101010, 1.0) // color, intensity, distance. decay
// light folow camera
ambientLight.position.copy(camera.position);
scene.add(ambientLight);

    // Directional Light
const sunLight = new THREE.DirectionalLight(0xdddddd, 1.0); // color, intensity
sunLight.position.y = 15;
scene.add(sunLight);

// create room space
// load floor texture
// const textureLoader = new THREE.TextureLoader().load('./img/Floor.jpg');
const textureLoader = new THREE.TextureLoader();
const floorTexture = textureLoader.load("public/img/floor.jpg");
floorTexture.wrapS = THREE.RepeatWrapping; // wrapS is horizonl direction
floorTexture.wrapT = THREE.RepeatWrapping; // wrapT verical direction
floorTexture.repeat.set(1, 5); // texture repeat time

// create the floor plane
let planeGeometry = new THREE.PlaneGeometry(80, 120);
let planeMaterial = new THREE.MeshBasicMaterial( {
    //color: 0xffff00,
    map: floorTexture,
    side: THREE.DoubleSide // render both side of plane
} );
let plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotateX(Math.PI / 2); // pi/2 radian = 90 degrees
// plane.position.y = -Math.PI;

scene.add(plane);

// create the walls
const wallGroup = new THREE.Group(); // create a group to hold the walls
wallGroup.position.y = 10;
scene.add(wallGroup);

const wallHeight = 30;
// front wall
const frontWall = new THREE.Mesh(
    new THREE.BoxGeometry(80, wallHeight, 0.001),
    new THREE.MeshBasicMaterial({ color: 'green' })
);
frontWall.translateZ(-60);

// back wall
const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(80, wallHeight, 0.001),
    new THREE.MeshBasicMaterial({ color: 'cyan' })
);
backWall.translateZ(60);

// left wall
const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(120, wallHeight, 0.001),
    new THREE.MeshBasicMaterial({ color: 'yellow' })
);
leftWall.rotateY(Math.PI / 2);
leftWall.position.x = -40;

// right wall
const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry(120, wallHeight, 0.001),
    new THREE.MeshBasicMaterial({ color: 'blue' })
);
rightWall.rotateY(Math.PI / 2);
rightWall.position.x = 40;

wallGroup.add(frontWall, backWall, leftWall, rightWall);

// loop through each wall, create bounding box (for collision) and add texture
const wallTexture = textureLoader.load('public/img/white-brick-wall.jpg')
for (let i = 0; i < wallGroup.children.length; i++) {
    wallGroup.children[i].BBox = new THREE.Box3();
    wallGroup.children[i].BBox.setFromObject(wallGroup.children[i]); // add bbox for walls
    wallGroup.children[i].material.map = wallTexture; // at texture for walls
}
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
        const wall = wallGroup.children[i];
        if (playerBBox.intersectsBox(wall.BBox)) {
            return true;
        }
    };
    return false;
}


// create ceilling
const ceilingGeometry = new THREE.PlaneGeometry(80, 120);
const ceilingMaterial = new THREE.MeshBasicMaterial({
    color: 'purple',
    side: THREE.DoubleSide
});
const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceiling.rotateX(Math.PI / 2);
ceiling.position.y = wallHeight-5;
scene.add(ceiling);

function createPainting(imagePath, width, height, position) {
    const textureLoader = new THREE.TextureLoader();
    const paintingTexture = textureLoader.load(imagePath);
    const paintingGeometry = new THREE.BoxGeometry(width, height);
    const paintingMaterial = new THREE.MeshBasicMaterial({ map: paintingTexture });
    const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
    painting.position.copy(position);
    return painting;
}

const paintingHeight = 8;
const painting01 = createPainting(
    'public/artworks/0.jpg',
    10,
    5,
    new THREE.Vector3(10, paintingHeight, -60)
)
const painting02 = createPainting(
    'public/artworks/1.jpg',
    10,
    5,
    new THREE.Vector3(-10, paintingHeight, -60)
)
scene.add(painting01, painting02);

// Controls
const controls = new PointerLockControls(camera, document.body);

// Lock the pointer and hide menu when experience start
function startExperience() {
    clock.start(); // reset clock
    controls.lock(); // lock pointer
    hideMenu();
}

const playButton = document.getElementById('play_button');
playButton.addEventListener('click', startExperience);
controls.addEventListener('unclock')

function hideMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = 'none';
}
function showMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = 'block';
}
controls.addEventListener('unlock', showMenu);

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

// Add the movement (left/right/forward/backward) to the scene. Press the arrow keys or WASD to move
const clock = new THREE.Clock(); // create a clock to keep track the time between frames

function updateMovement(delta) {
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
    if (checkCollision()) {
        camera.position.copy(previousPosition);
    }
}


// animation
let renderLoop = function() {
    updateMovement(clock.getDelta());
    renderer.render(scene, camera); // Render the scene
    window.requestAnimationFrame(renderLoop);
}

renderLoop();