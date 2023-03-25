import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import {HemisphereLight} from "./third_party/three.module";
import {scene} from "./modules/renderer";

const BACK_COLOR = 0xf8cfc1
const LIGHT_COLOR = 0xf7e2d7

const CAM_POS = [0, 73, 10]
const CAM_TARGET_POS = [0, 15, 0]

export const createStudio = (cubeMap) => {
    const container = document.querySelector('#scene');
    container.style.width = window.innerWidth + 'px'
    container.style.height = window.innerHeight + 'px';

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog( BACK_COLOR, 50, 150 );
    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 100000);
    camera.position.set(...CAM_POS);
    scene.add(camera)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    //renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setClearColor(BACK_COLOR, 1)

    container.appendChild(renderer.domElement)

    const light = new THREE.PointLight(LIGHT_COLOR, .2)
    light.position.set(0, 15, 0)
    scene.add(light)
    //camera.add(light)

    const hemiLight = new THREE.HemisphereLight(0xe7e9ed, 0xc4b1a3, 0.75);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2;
    controls.maxDistance = 40000;
    controls.maxPolarAngle = Math.PI / 2 - 0.01
    controls.target.set(...CAM_TARGET_POS)
    controls.update();


    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry( 300000, 300000 ),
        new THREE.MeshPhongMaterial( {
            color: 0xe8ddd0,
            specular: 0x101010,
            emissive: 0x3d3c3a,
        })
    );
    plane.rotation.x = - Math.PI / 2;
    plane.position.y = -3;
    scene.add( plane );



    let composer = false
    //const renderScene = new RenderPass( scene, camera );
    // const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
    // bloomPass.threshold = params.bloomThreshold;
    // bloomPass.strength = params.bloomStrength;
    // bloomPass.radius = params.bloomRadius;
    //
    // const composer = new EffectComposer( renderer );
    // composer.addPass( renderScene );
    // composer.addPass( bloomPass );
    // composer = new EffectComposer(renderer)
    // const renderPass = new RenderPass(scene, camera)
    // composer.addPass(renderPass)
    // const shader = new ShaderPass(Saturate3)
    // composer.addPass(shader)

    const functionsOmCameraMove = []
    const spherical = new THREE.Spherical(controls.getDistance(), controls.getPolarAngle(), controls.getAzimuthalAngle())
    const v3Look = new THREE.Vector3()

    const FOG_FAR = 65
    const FOG_NEAR = 20
    scene.fog.near = spherical.radius + FOG_NEAR
    scene.fog.far = spherical.radius + FOG_FAR

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

            if (camera.position.y < 3) {
                camera.position.y = 3
                controls.update()
            }

            if (spherical.radius !== controls.getDistance()) {
                spherical.radius = controls.getDistance()
                scene.fog.near = spherical.radius + FOG_NEAR
                scene.fog.far = spherical.radius + FOG_FAR
            }

            if (
                spherical.phi !== controls.getPolarAngle() ||
                spherical.theta !== controls.getAzimuthalAngle()
            ) {
                spherical.phi = controls.getPolarAngle()
                spherical.theta = controls.getAzimuthalAngle()
                for (let i = 0; i < functionsOmCameraMove.length; ++i) {
                    v3Look.setFromSpherical(spherical)
                    functionsOmCameraMove[i](v3Look)
                }
            }

            if (composer) {
                composer.render();
            }   else {
                renderer.render(scene, camera)
            }


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
        onCameraMove: func => {
            functionsOmCameraMove.push(func)
        },
    }
}
