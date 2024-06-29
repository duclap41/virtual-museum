import * as THREE from 'three';
import { PointerLockControls } from 'three-stdlib';
import { controls, clock } from './scene';

function startExperience() {
    clock.start(); // reset clock
    controls.lock(); // lock pointer
    hideMenu()
}
// Start experience button
const playButton = document.getElementById('play_button');
playButton.addEventListener('click', startExperience);

controls.addEventListener('unlock', showMenu);

function hideMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = 'none';
}
function showMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = 'block';
}

export { startExperience, showMenu, hideMenu };
