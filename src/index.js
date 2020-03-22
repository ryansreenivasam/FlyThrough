import _ from 'lodash';
var THREE = require('three');
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

window.addEventListener('load', init, false);

var camera;
var scene;
var renderer;
var starArray = [];
var intro = false;
var moveSpeed = 0;
var numbToUpdate = 1;

function init() {
	// set up the scene
    createScene();

    intro=true;

    //button at bottom of screen that toggles VR view
    document.body.appendChild( VRButton.createButton( renderer ) );

    //call game loop
    //this is used instead of requestAnimationFrame due to VR requirements
    renderer.setAnimationLoop(update);    
}

function createScene() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.xr.enabled = true;
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    camera.position.z = 6;
    camera.position.y = 3;
    addLight();
    addStars();
}

function addStars() {
    for(var i=0; i<150; i++) {
        var geoStar = new THREE.CubeGeometry( 0.2, 0.2, 5 );
        var matStar = new THREE.MeshBasicMaterial({ color: 0xbfdfff });
        var star = new THREE.Mesh( geoStar, matStar );
        scene.add(star);
        starArray[i] = star;
        star.position.x = (Math.random() - 0.5) * window.innerWidth/2;
        star.position.y = (Math.random() - 0.5) * window.innerHeight/2;
        star.position.z = (Math.random() * -200) - 200;
    }
}

function updateStars() {
    if(intro) {
        console.log("intro");
        for(var i=0; i<numbToUpdate; i++) {
            if(starArray[i].position.z >= -40) {
                resetStar(i);
            }
            starArray[i].position.z += moveSpeed;
        }
        if(numbToUpdate < 149) {
            numbToUpdate++;
        }
        moveSpeed += 0.01;
        if(moveSpeed>3) {
            intro = false;
            console.log("intro done");
        }
    }
    else {
        for(var i=0; i<150; i++) {
            if(starArray[i].position.z >= 0) {
                resetStar(i);
            }
            starArray[i].position.z += 3;
        }
    }
}

function resetStar(index) {
    starArray[index].position.z = -150;
    starArray[index].position.x = (Math.random() - 0.5) * window.innerWidth/12;
    starArray[index].position.y = (Math.random() - 0.5) * window.innerHeight/12;
}

function addLight() {
    // var hemisphereLight = new THREE.HemisphereLight(0xff0000,0x000000, 10);
    // scene.add(hemisphereLight);   
}

function update() {
    //world.rotation.z = -Math.PI/2;
    updateStars();
    //render();
    renderer.render( scene, camera );
    //requestAnimationFrame( update );
}

// function render() {
//     renderer.render(scene, camera); //draw
// }

