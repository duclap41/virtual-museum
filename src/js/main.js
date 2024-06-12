import * as THREE from 'three';

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
camera.position.x = 0.5;
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

let geometry = new THREE.BoxGeometry(1, 1, 1); // a box shape
let material = new THREE.MeshBasicMaterial({color: 0xff0000}); // corlor of object
let cube = new THREE.Mesh(geometry, material); // create cube with geometry and material
scene.add(cube);

// create room space
// load floor texture
const textureLoader = new THREE.TextureLoader().load('./img/Floor.jpg');

// create the floor plane
let planeGeometry = new THREE.PlaneGeometry(50, 50);
let planeMaterial = new THREE.MeshBasicMaterial( {
    //color: 0xffff00,
    map: textureLoader,
    side: THREE.BackSide // render both side of plane
} );
let plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotateX(Math.PI / 2); // pi/2 radian = 90 degrees
plane.position.y = -Math.PI;

scene.add(plane);

// create the walls
const wallGroup = new THREE.Group(); // create a group to hold the walls
wallGroup.position.y = Math.PI*2;
scene.add(wallGroup);

// front wall
const frontWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.001),
    new THREE.MeshBasicMaterial({ color: 'green' })
);
frontWall.translateZ(-20);

// left wall
const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.001),
    new THREE.MeshBasicMaterial({ color: 'yellow' })
);
leftWall.rotateY(Math.PI / 2);
leftWall.position.x = -20;

// right wall
const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.001),
    new THREE.MeshBasicMaterial({ color: 'blue' })
);
rightWall.rotateY(Math.PI / 2);
rightWall.position.x = 20;

wallGroup.add(frontWall, leftWall, rightWall);

// loop through each wall, create bounding box (for collision)
for (let i = 0; i < wallGroup.children.length; i++) {
    wallGroup.children[i].BBox = new THREE.Box3();
    wallGroup.children[i].BBox.setFromObject(wallGroup.children[i]);
}

// create ceilling
const ceilingGeometry = new THREE.PlaneGeometry(50, 50);
const ceilingMaterial = new THREE.MeshBasicMaterial({
    color: 'purple'
});
const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceiling.rotateX(Math.PI / 2);
ceiling.position.y = 6*Math.PI;
scene.add(ceiling);

// Controls
    // Evemt listener for when pressing keys
document.addEventListener('keydown', onKeyDown, false);
function onKeyDown(event) {
    let keycode = event.which;

    // right arrow key
    if (keycode == 39) { // == is not must same data type
        camera.translateX(0.05);
    }
    // left arrow key
    else if (keycode === 37) { // === is must same data type
        camera.translateX(-0.05);
    }
    // up arrow key
    else if (keycode === 38) {
        camera.translateY(0.05);
    }
    // down arrow key
    else if (keycode === 40) {
        camera.translateY(-0.05);
    }
}

// animation
let renderLoop = function() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // mesh.rotateX(0.01);
    // mesh.rotateY(0.01);
    renderer.render(scene, camera); // Render the scene
    window.requestAnimationFrame(renderLoop);
}

renderLoop();