import * as THREE from './three.module.js'; //ver r165

console.log("Threejs object here",THREE); // display to console

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
camera.position.z = 5; // move cam back 5 units

// Renderer
const renderer = new THREE.WebGLRenderer({antialias: true}); // smooth edges
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1); // background color
document.body.appendChild(renderer.domElement);

// Light
    // AmbientLight 
let ambientLight = new THREE.AmbientLight(0x101010, 1.0) // color, intensity, distance. decay
// ambientLight.position = camera.position; // light folow camera
scene.add(ambientLight);

    // Directional Light
let sunLight = new THREE.DirectionalLight(0xdddddd, 1.0); // color, intensity
sunLight.position.y = 15;
scene.add(sunLight);

let geometry = new THREE.BoxGeometry(1, 1, 1); // a box shape
let material = new THREE.MeshBasicMaterial({color: 0xff0000}) // corlor of object
let mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Rendering
renderer.render(scene, camera);