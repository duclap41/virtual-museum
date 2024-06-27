import * as THREE from 'three';
import { PointerLockControls } from 'three-stdlib';

function startExperience(controls, clock) {
    clock.start(); // reset clock
    controls.lock(); // lock pointer
    hideMenu()
}

function hideMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = 'none';
}
function showMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = 'block';
}

export { startExperience, showMenu };
