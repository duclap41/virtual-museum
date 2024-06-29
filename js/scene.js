import * as THREE from 'three';

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

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1);
renderer.shadowMap.enabled = true; // allow shadow
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optimize the lights and shadows
document.body.appendChild(renderer.domElement);

export { scene, camera, renderer };