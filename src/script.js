import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
 
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
// import { FlakesTexture } from './js/FlakesTexture.js';

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const gui = new dat.GUI()
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 1, 1000)
camera.position.set(0, 0, 500)
scene.add(camera)
//light1
const pointLight = new THREE.PointLight(0xffffff, 2)
 
scene.add(pointLight)
 
 
const ambientLight = new THREE.AmbientLight(0xdfe6e9, 2);
 
	scene.add(ambientLight);
 
 


const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true,
    antialias:true
})

document.body.appendChild(renderer.domElement)

const controls=new OrbitControls(camera ,renderer.domElement)
renderer.outputEncoding= THREE.sRGBEncoding;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.25;
const envmaploader= new THREE.PMREMGenerator(renderer)
animate();
 


    
// const geometry = new THREE.SphereGeometry( 150,.5, 100, 100 );
// const material = new THREE.MeshPhysicalMaterial(matProperties)
// const sphere = new THREE.Mesh(geometry,material)
// scene.add(sphere)
// })

//svgloader
 
 // instantiate a loader
const loader = new SVGLoader();

// load a SVG resource
loader.load(
	// resource URL
	'textures/002.svg',
	// called when the resource is loaded
	function ( data ) {

		const paths = data.paths;
		const group = new THREE.Group()

		for ( let i = 0; i < paths.length; i ++ ) {

			const path = paths[ i ];

			const material = new THREE.MeshBasicMaterial( {
				color: path.color,
				side: THREE.DoubleSide,
				depthWrite: false
			} );

			const shapes = SVGLoader.createShapes( path );

			for ( let j = 0; j < shapes.length; j ++ ) {

				const shape = shapes[ j ];
				const geometry = new THREE.ShapeGeometry( shape );
				const mesh = new THREE.Mesh( geometry, material );
				group.add( mesh );

			}

		}

		scene.add( group );

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);
//=================================================================================
/**
 * Sizes
 */


window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

controls.autoRotate = true;
controls.autoRotateSpeed = 1;
controls.enableDamping = true;

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

function animate(){

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
