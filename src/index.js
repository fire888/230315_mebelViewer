import WebGL from 'three/examples/jsm/capabilities/WebGL';
import { GLTFExporter } from './helpers/GLTFExporter'
import * as THREE from 'three'
import { ExporterScene } from './helpers/exporterScene'

import { createStudio } from './Entities/Studio/oldStudio'
//import { createStudio } from './Entities/Studio/9/main'
//import { createStudio } from './Entities/Studio/12/main'
//import { createStudio } from './Entities/Studio/17/main'
//import { createStudio } from './Entities/Studio/20/main'
//import { createStudio } from './Entities/Studio/23/main'
//import { createStudio } from './Entities/Studio/30/main'

import { createContainerFlat } from './Entities/containerFlat'

import { loadAssets } from "./helpers/loadManager"
import { ASSETS, MATERIALS_AO } from "./constants/ASSETS"


const addPic = root => {
    const pic = new THREE.Mesh(
        new THREE.PlaneGeometry(15, 10),
        new THREE.MeshPhongMaterial({
            map: root.assets['picture'].model,
            emissive: 0x666666,
        })
    )
    //pic.rotation.x = -Math.PI / 2
    pic.rotation.y = Math.PI
    pic.position.z = 20
    pic.position.y = 17
    root.studio.addToScene(pic)
}


const prepareFurniture = root => {
    const assets = root.assets
    for (let key in assets) {
        if (assets[key].typeLoader !== 'fbx') {
            continue;
        }


        assets[key].model.scale.set(0.1, 0.1, 0.1)
        assets[key].model.position.set(...assets[key].pos)
        assets[key].model.rotation.y = assets[key].rot

        if (assets[key].hideWall) {
            root.arrMeshesCheckHide.push({
                model: assets[key].model,
                idWall: assets[key].hideWall
            })
        }


        const resetMat = (item, key) => {
            const mBy = oldMat => {
                let mat = oldMat
                if (key === 'm12') {

                }


                if (oldMat.name.includes('wood') && key !== 'm16') {
                    mat = new THREE.MeshPhongMaterial({
                        onBeforeCompile: (sh) => {
                            sh.fragmentShader = sh.fragmentShader.replace(
                                `#include <dithering_fragment>`,
                                `#include <dithering_fragment>
vec3 c = (gl_FragColor.rgb * 1.1 + (1.- gl_FragColor.rgb) * 0.1) + (vec3(.5, .55, .55) * 0.2);
c *= 1.6;
gl_FragColor.rgb = c;`
                            )
                        },
                    }).copy(oldMat)
                } else if (key === 'm12' && (oldMat.name.includes('coton') || oldMat.name.includes('pillow') || oldMat.name.includes('bed'))) {
                    mat = new THREE.MeshPhongMaterial({
                        onBeforeCompile: (sh) => {
                            sh.fragmentShader = sh.fragmentShader.replace(
                                `#include <dithering_fragment>`,
                                `#include <dithering_fragment>
vec3 c = gl_FragColor.rgb * 0.93 + .33;
gl_FragColor.rgb = c;`
                            )
                        },
                    }).copy(oldMat)
                } else {
                    mat = new THREE.MeshPhongMaterial({
                        onBeforeCompile: (sh) => {
                            sh.fragmentShader = sh.fragmentShader.replace(
                                `#include <dithering_fragment>`,
                                `#include <dithering_fragment>
                            gl_FragColor.rgb *= 1.2;`
                            )
                        },
                    }).copy(oldMat)
                }

                if (mat.map && mat.map.source.data === null) {
                    mat.map = null
                }
                mat.envMap = assets['env00'].model
                mat.reflectivity = .01
                if (mat.name === 'glass' || mat.name === 'm17.2') {
                    mat.reflectivity = 1
                    mat.opacity = .3
                }
                mat.shininess = 5
                mat.color = new THREE.Color(1, 1, 1)
                //mat.emissive = new THREE.Color().set(0x3e3b32)
                mat.needsUpdate = true
                return mat
            }

            if (!item.material.length) {
                const newM = mBy(item.material)
                item.material = newM
            } else {
                const arr = []
                for (let i = 0; i < item.material.length; ++i) {
                    const newM = mBy(item.material[i])
                    arr.push(newM)
                }
                item.material = arr
            }


            // if (MATERIALS_AO[key]) {
            //     for (let keyIndMat in MATERIALS_AO[key]) {
            //         if (!item.material.length) {
            //             item.material.aoMap = assets[MATERIALS_AO[key][0]].model
            //             item.material.aoMapIntensity = 0.1
            //         } else {
            //             for (let i = 0; i < item.material.length; ++i) {
            //                 if (MATERIALS_AO[key][i]) {
            //                     item.material[i].aoMap = assets[MATERIALS_AO[key][i]].model
            //                     item.material[i].aoMapIntensity = .05
            //                     //item.material[i].aoMapIntensity = 1
            //                 }
            //             }
            //         }
            //     }
            // }


        }

        const resetGeom = (g) => {
            const uv2 = g.attributes.uv2
            if (uv2) {
                g.deleteAttribute('uv2')
            }
        }


        assets[key].model.traverse(item => {
            if (item.type !== 'Mesh') {
                return;
            }

            resetGeom(item.geometry)

            console.log('mesh: ' + key, item.material)
            resetMat(item, key)

            item.castShadow = true
            item.receiveShadow = true
            // if (item.material.length) {
            //     for (let i = 0; i < item.material.length; ++i) {
            //         resetMat(item.material[i])
            //     }
            // } else {
            //     resetMat(item.material)
            // }
        })

        root.studio.addToScene(assets[key].model)
    }
}



/** ******************************************** */

const addLoadFileListener = root => {
    let aa = true
    document.body.addEventListener('click', () => {
        if (!aa) {
            return;
        }
        aa = false
        ExporterScene.load(data => {
            console.log('!!', data)
            const loader = new THREE.ObjectLoader();
            const object = loader.parse(data);
            root.studio.addToScene(object)

        })
    })
}
const saveScene = root => {
    setTimeout(() => {
        console.log(root.studio.scene)
        const res = root.studio.scene.toJSON()
        console.log('!!!', res)
        ExporterScene.export(res)
    }, 1000)
}

/** *********************************** */


const threeApp = () => {
    const studio = createStudio()
    const exporter = new GLTFExporter()

    const animate = () => {
        requestAnimationFrame( animate );
        studio.render()
    }
    animate()

    const root = {
        studio,
        exporter,
    }

    root.arrMeshesCheckHide = []
    root.onChangeWallVisible = (idWall, isShow) => {
        for (let i = 0; i <  root.arrMeshesCheckHide.length; ++i) {
            if ( root.arrMeshesCheckHide[i].idWall === idWall) {
                root.arrMeshesCheckHide[i].model.visible = isShow
            }
        }
    }





     loadAssets(ASSETS).then(assets => {
        root.assets = assets
        prepareFurniture(root)
        createContainerFlat(root)
        //saveScene(root)
    })

    //addLoadFileListener(root)

    const onWindowResize = () => {
        studio.resize()
    }
    window.addEventListener('resize', onWindowResize, false)
    onWindowResize()

    const isWebGL = () => {
        if ( WebGL.isWebGLAvailable() ) {
        } else {
            const warning = WebGL.getWebGLErrorMessage();
            document.getElementById( 'container' ).appendChild( warning );

        }
    }
    isWebGL()
}



threeApp()
