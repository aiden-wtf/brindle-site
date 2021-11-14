import './style.css'

// Imports Three JS library & OrbitControls, vital for our 3D designs
import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import atmVertexShader from './shaders/atmvertex.glsl'
import atmFragmentShader from './shaders/atmfragment.glsl'
import gsap from 'gsap'

// Creates new scene
const scene = new THREE.Scene();

// Creates a camera with the perspective compariable to a human eye
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Creates the renderer, and sets the canvas (bg)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true
});

// Scales the renderer and properly sizes it
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize ( window.innerWidth, window.innerHeight );

// Sets the position of the camera on the Z axis
camera.position.setZ(15);

// Tells the renderer to render the scene and camera
renderer.render( scene, camera );

// Adds a point light and sets its position
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);

// Adds an ambient light and sets its position
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.ShaderMaterial( {
    vertexShader,
    fragmentShader,
    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load('01-3.jpeg')
      }
    }
  })
);

const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.ShaderMaterial( {
    vertexShader: atmVertexShader,
    fragmentShader: atmFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
  })
);

atmosphere.scale.set(1.1, 1.1, 1.1)

scene.add(atmosphere);

const group = new THREE.Group()
group.add(earth)
scene.add(group)

const mouse = {
  x: undefined,
  y: undefined
}

// A function to repeat this action and create an animation
function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  earth.rotation.y += 0.005;
}

animate()
