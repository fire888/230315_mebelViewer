
import WebGL from 'three/examples/jsm/capabilities/WebGL';
import { GLTFExporter } from './helpers/GLTFExporter'
import * as THREE from 'three'

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

    const arrMeshesCheckHide = []
    root.onChangeWallVisible = (idWall, isShow) => {
        for (let i = 0; i < arrMeshesCheckHide.length; ++i) {
            if (arrMeshesCheckHide[i].idWall === idWall) {
                arrMeshesCheckHide[i].model.visible = isShow
            }
        }

    }



    loadAssets(ASSETS).then(assets => {
        for (let key in assets) {
            if (assets[key].typeLoader !== 'fbx') {
                continue;
            }

            assets[key].model.scale.set(0.1, 0.1, 0.1)
            assets[key].model.position.set(...assets[key].pos)
            assets[key].model.rotation.y = assets[key].rot

            if (assets[key].hideWall) {
                arrMeshesCheckHide.push({
                    model: assets[key].model,
                    idWall: assets[key].hideWall
                })
            }


            const resetMat = (item, key) => {
                const mBy = oldMat => {
                    let mat = oldMat
                    if (oldMat.name.includes('wood')) {
                        mat = new THREE.MeshPhongMaterial({
                            onBeforeCompile: (sh) => {
                                sh.fragmentShader = sh.fragmentShader.replace(
                                    `#include <dithering_fragment>`,
                                    `#include <dithering_fragment>                              
                                    gl_FragColor.rgb = (gl_FragColor.rgb + (1.- gl_FragColor.rgb) * 0.1) * 1.8;`
                                )
                            },
                        }).copy(oldMat)
                    } else {
                        mat = new THREE.MeshPhongMaterial({
                            onBeforeCompile: (sh) => {
                                sh.fragmentShader = sh.fragmentShader.replace(
                                    `#include <dithering_fragment>`,
                                    `#include <dithering_fragment>                              
                                    gl_FragColor.rgb *= 1.5;`
                                )
                            },
                        }).copy(oldMat)
                    }

                    if (mat.map && mat.map.source.data === null) {
                        mat.map = null
                    }
                    mat.envMap = assets['env00'].model
                    mat.reflectivity = .01
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


                if (MATERIALS_AO[key]) {
                    for (let keyIndMat in MATERIALS_AO[key]) {
                        if (!item.material.length) {
                            item.material.aoMap = assets[MATERIALS_AO[key][0]].model
                            item.material.aoMapIntensity = 0.1
                        }
                        else {
                            for (let i = 0; i < item.material.length; ++i) {
                                if (MATERIALS_AO[key][i]) {
                                    item.material[i].aoMap = assets[MATERIALS_AO[key][i]].model
                                    item.material[i].aoMapIntensity = .05
                                    //item.material[i].aoMapIntensity = 1
                                }
                            }
                        }
                    }
                }


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
                // if (item.material.length) {
                //     for (let i = 0; i < item.material.length; ++i) {
                //         resetMat(item.material[i])
                //     }
                // } else {
                //     resetMat(item.material)
                // }
            })

            studio.addToScene(assets[key].model)
        }

        console.log(assets)
        root.assets = assets

        createContainerFlat(root)
    })






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
