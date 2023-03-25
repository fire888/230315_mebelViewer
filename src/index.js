
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
        let indexModel = 0

        for (let key in assets) {
            if (assets[key].typeLoader === 'fbx') {

                assets[key].model.scale.set(0.1, 0.1, 0.1)
                assets[key].model.position.set(...assets[key].pos)
                //assets[key].model.position.set(indexModel * 10 - 60, 10, indexModel * 3 )
                ++indexModel
                assets[key].model.rotation.y = assets[key].rot

                if (assets[key].hideWall) {
                    arrMeshesCheckHide.push({
                        model: assets[key].model,
                        idWall: assets[key].hideWall
                    })
                }

                assets[key].model.traverse(item => {
                    if (item.type === 'Mesh') {
                        const uv2 = item.geometry.attributes.uv2
                        if (uv2) {
                            item.geometry.deleteAttribute('uv2')
                        }
                        console.log(key, item)
                        if (item.material) {
                            console.log('mesh: ' + key, item.material)

                            if (item.material.length) {
                                for (let i = 0; i < item.material[i]; ++i) {
                                    //item.material[i].color = new THREE.Color(1, 1, 1)
                                    //item.material[i].emissive = new THREE.Color(.6, .6, .6)
                                    //item.material[i].needsUpdate = true
                                }
                            } else {
                                //item.material.color = new THREE.Color(1, 1, 1)
                                //item.material.emissive = new THREE.Color(.6, .6, .6)
                                //item.material.needsUpdate = true
                            }


                            if (MATERIALS_AO[key]) {
                                for (let keyIndMat in MATERIALS_AO[key]) {
                                    if (!item.material.length) {
                                        item.material.aoMap = assets[MATERIALS_AO[key][0]].model
                                    }
                                    else {
                                        for (let i = 0; i < item.material.length; ++i) {
                                            if (assets[key]['mat' + i]) {
                                                // for (let k in assets[key]['mat' + i]) {
                                                //     item.material[i][k] = assets[key]['mat' + i][k]
                                                // }
                                                //item.material[i] = {...item.material[i], ...assets[key]['mat' + i]}
                                            }
                                            if (MATERIALS_AO[key][i]) {
                                               item.material[i].aoMap = assets[MATERIALS_AO[key][i]].model
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                })

                studio.addToScene(assets[key].model)
            }
        }

        console.log(assets)
        // assets['m04'] && assets['m04'].model.traverse(item => {
        //     if (item.type === 'Mesh') {
        //         item.material.wireframe = true
        //     }
        //     if (item.type === 'AmbientLight') {
        //         item.intensity = 0
        //     }
        // })
        // assets['m02'] && assets['m02'].model.traverse(item => {
        //     if (item.type === 'Mesh') {
        //         item.material.wireframe = true
        //     }
        // })
        // assets['m01'] && assets['m01'].model.traverse(item => {
        //     if (item.type === 'Mesh') {
        //         item.material.wireframe = true
        //     }
        // })

        root.assets = assets

        const m = createContainerFlat(root)
        //studio.addToScene(m.mesh)
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
