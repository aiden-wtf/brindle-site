import './style.css'

// Imports Three JS library & OrbitControls, vital for our 3D designs
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Creates new scene
const scene = new THREE.Scene();

// Creates a camera with the perspective compariable to a human eye
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Creates the renderer, and sets the canvas (bg)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

// Scales the renderer and properly sizes it
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize ( window.innerWidth, window.innerHeight );

// Sets the position of the camera on the Z axis
camera.position.setZ(30);

// Tells the renderer to render the scene and camera
renderer.render( scene, camera );

// Creates variables that define the shape (torus)
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshPhongMaterial( { color: 0xFF6347 } ); 
const torus = new THREE.Mesh( geometry, material );

// Adds the shape (torus) into the scene
scene.add(torus);

// Adds a point light and sets its position
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);

// Adds an ambient light and sets its position
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Adds a Light Helper which supports the point light - Grid Helper creates Grid
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,200);
scene.add(lightHelper, gridHelper);

// Orbit Controls to update positioning according to mouse movement
const controls = new OrbitControls(camera, renderer.domElement);

// Function to add stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );
  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space-2.jpeg');

// A function to repeat this action and create an animation
function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render( scene, camera );
}

animate()