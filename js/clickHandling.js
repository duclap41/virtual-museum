import * as THREE from 'three';
import { camera, renderer } from './scene';
import * as dat from 'dat.gui';
import { paintings } from './painting';
import * as config from './config.json';

const ROOM_HEIGHT = config.RoomHeight;
const ROOM_WIDTH = config.RoomWidth;
const ROOM_DEPTH = config.RoomDepth;
const PAINTING_HEIGHT = config.PaintingHeight;

let mouse = new THREE.Vector2();
let raycaster = new THREE.Raycaster();

function clickHandling() {
    renderer.domElement.addEventListener("click", (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        onClick(camera, paintings);
    },
    false
    );
}

function onClick(camera, paintings) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(paintings);

    if (intersects.length > 0) {
        const painting = intersects[0].object;

        // perform desired actions
        console.log("Clicked painting");
        applyAffine(painting);
        
    }
}

// add gui
// affin
const gui = new dat.GUI({name: "Affine"});

function applyAffine(painting) {
    
    if (gui.__folders.Painting) {
        gui.__folders.Painting.close();
        gui.removeFolder(gui.__folders.Painting);
        var painting_folder = gui.addFolder("Painting");
        painting_folder.open();
    }
    else {
        var painting_folder = gui.addFolder("Painting");
        painting_folder.open();
    }
    // position
    const painting_position_folder = painting_folder.addFolder("Position");
    painting_position_folder.add(painting.position, 'x', -ROOM_WIDTH/2, ROOM_WIDTH/2);
    painting_position_folder.add(painting.position, 'y', 10, ROOM_HEIGHT);
    painting_position_folder.add(painting.position, 'z', -ROOM_DEPTH/2, ROOM_DEPTH/2);

    const painting_rotation_folder = painting_folder.addFolder("Rotation");
    painting_rotation_folder.add(painting.rotation, 'x', -2, 2);
    painting_rotation_folder.add(painting.rotation, 'y', -2, 2);
    painting_rotation_folder.add(painting.rotation, 'z', -2, 2);

    const painting_scale_folder = painting_folder.addFolder("Scale");
    painting_scale_folder.add(painting.scale, 'x', 0, 10);
    painting_scale_folder.add(painting.scale, 'y', 0, 10);
    painting_scale_folder.add(painting.scale, 'z', 0, 10);
}



export { clickHandling };