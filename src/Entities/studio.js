import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const BACK_COLOR = 0x1a1e27

export const Saturate3 = {
    uniforms: {
        "tDiffuse": { value: null },
        "effect": { value: 0 },
    },


    vertexShader: `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix*modelViewMatrix*vec4( position, 1.0 );
}`,


    fragmentShader: `
uniform sampler2D tDiffuse;
uniform float effect;
varying vec2 vUv;
void main() {
  vec4 texel = texture2D( tDiffuse, vUv );
  vec3 col = vec3(texel);
  col *= sin(col.r * 100. * effect);
  gl_FragColor = (texel * texel * texel) * vec4(3.) + vec4(col, 1.);
}`,
}



// const params = {
//     exposure: 1.16,
//     bloomStrength: .5,
//     bloomThreshold: .7,
//     bloomRadius: .01,
// };


const CAM_POS = [0, 150, 300]
const CAM_TARGET_POS = [0, 0, 0]

export const createStudio = (cubeMap) => {
    const container = document.querySelector('#scene');
    container.style.width = window.innerWidth + 'px'
    container.style.height = window.innerHeight + 'px';

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog( BACK_COLOR, 100, 5000 );
    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 100000);
    camera.position.set(...CAM_POS);
    scene.add(camera)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    //renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setClearColor(BACK_COLOR, 1)

    container.appendChild( renderer.domElement );

    const light = new THREE.PointLight(0xc3c8e2, .3)
    light.position.set(0, 100, 100)
    camera.add(light)

    const ambLight = new THREE.AmbientLight(0xe0e3f1, .7)
    scene.add(ambLight)




    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2;
    controls.maxDistance = 40000;
    controls.maxPolarAngle = Math.PI / 2 - 0.01
    controls.target.set(...CAM_TARGET_POS)
    controls.update();


    const functionsOmCameraMove = []
    const spherical = new THREE.Spherical(1., controls.getPolarAngle(), controls.getAzimuthalAngle())
    const v3Look = new THREE.Vector3()



    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry( 300000, 300000 ),
        new THREE.MeshPhongMaterial( { color: 0x838488, specular: 0x101010 } )
    );
    plane.rotation.x = - Math.PI / 2;
    plane.position.y = -100;
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

            if (
                spherical.phi !== controls.getPolarAngle() ||
                spherical.theta !== controls.getAzimuthalAngle()
            ) {
                spherical.phi = controls.getPolarAngle()
                spherical.theta = controls.getAzimuthalAngle()
                for (let i = 0; i < functionsOmCameraMove.length; ++i) {
                    v3Look.setFromSpherical(spherical)
                    //const phi = controls.getPolarAngle()
                    //const theta = controls.getAzimuthalAngle()
                    //console.log(phi, theta)
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
