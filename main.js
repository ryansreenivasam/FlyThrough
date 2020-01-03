window.addEventListener('load', init, false);

var camera;
var scene;
var renderer;
var world;
var starArray = [];

function init() {
	// set up the scene
	createScene();

	//call game loop
	update();
}

function createScene() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    camera.position.z = 6;
    camera.position.y = 3;
    addWorld();
    addLight();
    addStars();
}

function addWorld() {
    // var geoWorld = new THREE.SphereGeometry( 25, 40, 40 );
    // var matWorld = new THREE.MeshBasicMaterial( { color: 0x111111 } );
    // world = new THREE.Mesh( geoWorld, matWorld );
    // scene.add( world );
    // world.position.y = -24;
    // world.position.z = 2;
}

function addStars() {
    for(i=0; i<100; i++) {
        var geoStar = new THREE.CubeGeometry( 0.2, 0.2, 5 );
        var matStar = new THREE.MeshBasicMaterial({ color: 0xbfdfff });
        var star = new THREE.Mesh( geoStar, matStar );
        scene.add(star);
        starArray[i] = star;
        star.position.x = (Math.random() - 0.5) * 100;
        star.position.y = (Math.random() - 0.5) * 100;
        star.position.z = Math.random() * -100;
    }
}

function updateStars() {
    for(i=0; i<100; i++) {
        if(starArray[i].position.z >= 0) {
            resetStar(i);
        }
        starArray[i].position.z += 2;
    }
}

function resetStar(index) {
    starArray[index].position.z = -100;
    starArray[index].position.x = (Math.random() - 0.5) * 100;
    starArray[index].position.y = (Math.random() - 0.5) * 60;
}

function addLight() {
    // var hemisphereLight = new THREE.HemisphereLight(0xfffafa,0x000000, .9)
    // scene.add(hemisphereLight);   
}

function update() {
    //world.rotation.z = -Math.PI/2;
    updateStars();
    render();
    requestAnimationFrame( update );
}

function render() {
    renderer.render(scene, camera);//draw
}
