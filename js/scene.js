import * as THREE from 'three';
import { PointerLockControls } from 'three-stdlib';
import * as dat from 'dat.gui';

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(
    75, // field of view
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // near
    1000 // far
);

scene.add(camera);
camera.position.y = 12;
camera.position.z = 5;

const cameraSettings = {
    fov: camera.fov
};

// Change
// Function to update the field of view
function updateFieldOfView(newFov) {
    camera.fov = newFov;
    camera.updateProjectionMatrix();
}
const gui = new dat.GUI({name: "Scene roperties"});
const camera_folder = gui.addFolder("Camera");
// camera_folder.open();
camera_folder.add(cameraSettings, 'fov', 30, 120).onChange((value) => {
    updateFieldOfView(value);
});
camera_folder.add(camera.position, "y", 2, 30);

// init
let controls = new PointerLockControls(camera, document.body);
let clock = new THREE.Clock();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1);
renderer.shadowMap.enabled = true; // allow shadow
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optimize the lights and shadows
document.body.appendChild(renderer.domElement);

export { scene, camera, renderer, controls, clock };