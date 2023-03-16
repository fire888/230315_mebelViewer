import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const BACK_COLOR = 0x090e24




export const createStudio = (cubeMap) => {
    const container = document.querySelector('#scene');
    container.style.width = window.innerWidth + 'px'
    container.style.height = window.innerHeight + 'px';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set( 0, 100, 200);
    camera.lookAt(100, 0, 0)
    scene.add(camera)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(BACK_COLOR, 1)

    container.appendChild( renderer.domElement );

    const light = new THREE.PointLight(0xf6f9e5, 0.5)
    light.position.set(30, 50, 0)
    camera.add(light)

    const ambLight = new THREE.AmbientLight(0xc4b4f4, .7)
    scene.add(ambLight)


    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2;
    controls.maxDistance = 40000;
    controls.target.set(25, 0, 0 );
    controls.update();
    //controls.maxPolarAngle = Math.PI / 2 - 0.1


    return {
        scene,
        addToScene(model) {
            scene.add(model)
        },
        removeFromScene(model) {
            scene.remove(model)
        },
        render () {
            if (!camera) {
                return
            }
            renderer.render(scene, camera)
        },
        setTargetCam: v => {
            controls.target.set( v.x, v.y, v.z );
            controls.update();
        },
        resize () {
            if (!camera) {
                return;
            }
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight)
        },
    }
}
