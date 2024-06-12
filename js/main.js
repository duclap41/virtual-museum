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
// Optimize the lights and shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);



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
// on front wall
const painting01 = createPainting(
    'public/artworks/0.jpg',
    20,
    10,
    new THREE.Vector3(15, paintingHeight, -60)
)
const painting02 = createPainting(
    'public/artworks/1.jpg',
    20,
    10,
    new THREE.Vector3(-15, paintingHeight, -60)
)
scene.add(painting01, painting02)
// on left wall
const painting03 = createPainting(
    'public/artworks/2.jpg',
    20,
    10,
    new THREE.Vector3(-40, paintingHeight, -25)
)
painting03.rotateY(Math.PI / 2);
const painting04 = createPainting(
    'public/artworks/3.jpg',
    20,
    10,
    new THREE.Vector3(-40, paintingHeight, 30)
)
painting04.rotateY(Math.PI / 2);
scene.add(painting03, painting04);
// on right wall
const painting05 = createPainting(
    'public/artworks/4.jpg',
    20,
    10,
    new THREE.Vector3(40, paintingHeight, -25)
)
painting05.rotateY(-Math.PI / 2);
const painting06 = createPainting(
    'public/artworks/5.jpg',
    20,
    10,
    new THREE.Vector3(40, paintingHeight, 30)
)
painting06.rotateY(-Math.PI / 2);
scene.add(painting05, painting06);

// Painting info


// Light
    // AmbientLight 
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6) // color, intensity, distance. decay
scene.add(ambientLight);

//     // Directional Light
// const sunLight = new THREE.DirectionalLight(0xdddddd, 1.0); // color, intensity
// sunLight.position.y = 15;
// scene.add(sunLight);

// const spotlight = new THREE.Dir

// Spotlights can be used to simulate ceiling-mounted lights or track lights that focus on specific areas or artworks.
function createSpotlight(x, y, z, intensity, targetPosition) {
    const spotlight = new THREE.SpotLight(0xffffff, intensity);
    spotlight.position.set(x, y, z);
    spotlight.target.position.copy(targetPosition);
    spotlight.castShadow = true;
    spotlight.angle = Math.PI / 6; // 30 degrees
    spotlight.penumbra = 0.9;
    spotlight.decay = 2;
    spotlight.distance = 40;
    spotlight.shadow.mapSize.width = 1024;
    spotlight.shadow.mapSize.height = 1024;
    scene.add(spotlight);
    scene.add(spotlight.target);

    const spotLightHelper = new THREE.SpotLightHelper(spotlight);
    scene.add(spotLightHelper);

    // return spotlight;
  }
// Add spotlights to the scene
createSpotlight(15, 25, -50, 1.5, painting01.position);
createSpotlight(-15, 25, -50, 1.5, painting02.position);
createSpotlight(-30, 25, -25, 1.5, painting03.position);
createSpotlight(-30, 25, 30, 1.5, painting04.position);
createSpotlight(30, 25, -25, 1.5, painting05.position);
createSpotlight(30, 25, 30, 1.5, painting06.position);

// create room space
// load floor texture
const textureLoader = new THREE.TextureLoader();

// create the floor plane
const floorTexture = textureLoader.load("public/img/floor.jpg");
floorTexture.wrapS = THREE.RepeatWrapping; // wrapS is horizonl direction
floorTexture.wrapT = THREE.RepeatWrapping; // wrapT verical direction
floorTexture.repeat.set(1, 5); // texture repeat time
let planeGeometry = new THREE.PlaneGeometry(80, 120);
let planeMaterial = new THREE.MeshPhongMaterial( {
    map: floorTexture,
    side: THREE.DoubleSide // render both side of plane
} );
let plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotateX(Math.PI / 2); // pi/2 radian = 90 degrees
scene.add(plane);

// create ceilling
const ceilingTexture = textureLoader.load("public/img/ceilling.jpg");
ceilingTexture.wrapS = THREE.RepeatWrapping;
ceilingTexture.wrapT = THREE.RepeatWrapping;
ceilingTexture.repeat.set(1, 10);
const ceilingGeometry = new THREE.PlaneGeometry(80, 120);
const ceilingMaterial = new THREE.MeshLambertMaterial({
    map: ceilingTexture,
    side: THREE.DoubleSide
});
const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceiling.rotateX(Math.PI / 2);
ceiling.position.y = 30-5;
scene.add(ceiling);

// create the walls
const wallGroup = new THREE.Group(); // create a group to hold the walls
wallGroup.position.y = 10;
scene.add(wallGroup);

// add wall texture
const wallTexture = textureLoader.load('public/img/white-brick-wall.jpg')
wallTexture.wrapS = THREE.RepeatWrapping;
wallTexture.wrapT = THREE.RepeatWrapping;
wallTexture.repeat.set(1, 1);

const wallMeterial = new THREE.MeshLambertMaterial({ map: wallTexture });

const wallHeight = 30;
// front wall
const frontWall = new THREE.Mesh(
    new THREE.BoxGeometry(80, wallHeight, 0.001),
    wallMeterial
);
frontWall.translateZ(-60);

// back wall
const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(80, wallHeight, 0.001),
    wallMeterial
);
backWall.translateZ(60);

// left wall
const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(120, wallHeight, 0.001),
    wallMeterial
);
leftWall.rotateY(Math.PI / 2);
leftWall.position.x = -40;

// right wall
const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry(120, wallHeight, 0.001),
    wallMeterial
);
rightWall.rotateY(Math.PI / 2);
rightWall.position.x = 40;

wallGroup.add(frontWall, backWall, leftWall, rightWall);

// loop through each wall, create bounding box (for collision) and add texture
for (let i = 0; i < wallGroup.children.length; i++) {
    wallGroup.children[i].BBox = new THREE.Box3();
    wallGroup.children[i].BBox.setFromObject(wallGroup.children[i]); // add bbox for walls
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


// Enable shadows on objects
plane.receiveShadow = true;
ceiling.receiveShadow = true;
frontWall.castShadow = true;
frontWall.receiveShadow = true;
leftWall.castShadow = true;
leftWall.receiveShadow = true;
rightWall.castShadow = true;
rightWall.receiveShadow = true;
backWall.castShadow = true;
backWall.receiveShadow = true;
painting01.castShadow = true;
painting01.receiveShadow = true;
painting02.castShadow = true;
painting02.receiveShadow = true;
painting03.castShadow = true;
painting03.receiveShadow = true;
painting04.castShadow = true;
painting04.receiveShadow = true;
painting05.castShadow = true;
painting05.receiveShadow = true;
painting06.castShadow = true;
painting06.receiveShadow = true;


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

// Adjust scene on window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);