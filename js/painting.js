import * as THREE from 'three';

function createPainting(imagePath, width, height, position, info) {
    const textureLoader = new THREE.TextureLoader();
    const paintingTexture = textureLoader.load(imagePath);
    const paintingGeometry = new THREE.BoxGeometry(width, height);
    const paintingMaterial = new THREE.MeshBasicMaterial({ map: paintingTexture });
    const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
    painting.position.copy(position);
    painting.userData = info;
    return painting;
}

const paintings = []

// add into scene
function initPaintings(scene) {
    const artworks = [];

    for (let i = 0; i < 6; i++) {
        const info = {
            title: `Van Gogh ${i + 1}`,
            artist: 'Vincent van Gogh',
            description: `This is one of the masterpieces by Vincent van Gogh, showcasing his unique style and emotional honesty. Artwork ${
                i + 1
            } perfectly encapsulates his love for the beauty of everyday life.`,
            year: `Year ${i + 1}`,
        };

        artworks.push(info);
    }

    const paintingHeight = 8;
    // on front wall
    const painting01 = createPainting(
        'artworks/1.jpg',
        20,
        10,
        new THREE.Vector3(15, paintingHeight, -60),
        { type: 'painting', info: artworks[0] }
    );

    const painting02 = createPainting(
        'artworks/2.jpg',
        20,
        10,
        new THREE.Vector3(-15, paintingHeight, -60),
        { type: 'painting', info: artworks[1] }
    );

    scene.add(painting01, painting02);
    // on left wall
    const painting03 = createPainting(
        'artworks/3.jpg',
        20,
        10,
        new THREE.Vector3(-40, paintingHeight, -25),
        { type: 'painting', info: artworks[2] }
    );

    painting03.rotateY(Math.PI / 2);

    const painting04 = createPainting(
        'artworks/4.jpg',
        20,
        10,
        new THREE.Vector3(-40, paintingHeight, 30),
        { type: 'painting', info: artworks[3] }
    );

    painting04.rotateY(Math.PI / 2);
    scene.add(painting03, painting04);
    // on right wall
    const painting05 = createPainting(
        'artworks/5.jpg',
        20,
        10,
        new THREE.Vector3(40, paintingHeight, -25),
        { type: 'painting', info: artworks[4] }
    );

    painting05.rotateY(-Math.PI / 2);

    const painting06 = createPainting(
        'artworks/6.jpg',
        20,
        10,
        new THREE.Vector3(40, paintingHeight, 30),
        { type: 'painting', info: artworks[5] }
    );

    painting06.rotateY(-Math.PI / 2);
    scene.add(painting05, painting06);

    // for show info section
    paintings.push(painting01, painting02, painting03, painting04, painting05, painting06);
}

// show info of painting
function displayPaintingInfo(info) {
    const infoElement = document.getElementById("painting_info");

    infoElement.innerHTML = `
        <h3>${info.title}</h3>
        <p>Artist: ${info.artist}</p>
        <p>Description: ${info.description}</p>
        <p>Year: ${info.year}</p>
    `;
    infoElement.classList.add("show");
}
// hide info of painting
function hidePaintingInfo() {
    const infoElement = document.getElementById("painting_info");
    infoElement.classList.remove("show");
}

export { initPaintings, displayPaintingInfo, hidePaintingInfo, paintings };