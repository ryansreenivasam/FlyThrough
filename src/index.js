import _ from 'lodash';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

window.addEventListener('load', init, false);

var THREE = require('three');
var camera;
var scene;
var renderer;
var world;
var starArray = [];
var intro = false;

function init() {
    //button at bottom of screen that toggles VR view
    document.body.appendChild( VRButton.createButton( renderer ) );

	// set up the scene
    createScene();

    intro=true;

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
    // addWorld();
    // addLight();
    addStars();
}

function addWorld() {
    // var geoWorld = new THREE.SphereGeometry( 25, 40, 40 );s
    // var matWorld = new THREE.MeshBasicMaterial( { color: 0x111111 } );
    // world = new THREE.Mesh( geoWorld, matWorld );
    // scene.add( world );
    // world.position.y = -24;
    // world.position.z = 2;
}

function addStars() {
    for(var i=0; i<150; i++) {
        var geoStar = new THREE.CubeGeometry( 0.2, 0.2, 5 );
        var matStar = new THREE.MeshBasicMaterial({ color: 0xbfdfff });
        var star = new THREE.Mesh( geoStar, matStar );
        scene.add(star);
        starArray[i] = star;
        star.position.x = (Math.random() - 0.5) * window.innerWidth/12;
        star.position.y = (Math.random() - 0.5) * window.innerHeight/12;
        star.position.z = Math.random() * -100;
    }
}

function updateStars() {
    if(intro) {
        for(var i=0; i<150; i++) {
            if(starArray[i].position.z >= 0) {
                resetStar(i);
            }
            starArray[i].position.z += 0.5;
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
    starArray[index].position.z = -100;
    starArray[index].position.x = (Math.random() - 0.5) * window.innerWidth/12;
    starArray[index].position.y = (Math.random() - 0.5) * window.innerHeight/12;
}

function addLight() {
    // var hemisphereLight = new THREE.HemisphereLight(0xfffafa,0x000000, .9)
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
