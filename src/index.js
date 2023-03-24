
import WebGL from 'three/examples/jsm/capabilities/WebGL';
import { GLTFExporter } from './helpers/GLTFExporter'
import { createStudio } from './Entities/studio'
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



    loadAssets(ASSETS).then(assets => {
        let indexModel = 0

        for (let key in assets) {
            if (assets[key].typeLoader === 'fbx') {

                assets[key].model.scale.set(0.1, 0.1, 0.1)
                //assets[key].model.position.set(...assets[key].pos)
                assets[key].model.position.set(indexModel * 10 - 60, 10, indexModel * 3 )
                ++indexModel
                //assets[key].model.rotation.y = assets[key].rot
                assets[key].model.traverse(item => {
                    if (item.type === 'Mesh') {
                        const uv2 = item.geometry.attributes.uv2
                        if (uv2) {
                            item.geometry.deleteAttribute('uv2')
                            // for (let i = 0; i < uv2.array.length; ++i) {
                            //     if (uv2.array[i] !== 0) {
                            //         console.log(uv2.array[i])
                            //     }
                            // }
                        }
                        console.log(key, assets[key].model)
                        if (item.material) {
                            console.log('mesh: ' + key, item.material)


                            if (MATERIALS_AO[key]) {
                                for (let keyIndMat in MATERIALS_AO[key]) {
                                    if (!item.material.length) {
                                        item.material.aoMap = assets[MATERIALS_AO[key][0]].model
                                    }
                                    else {
                                        for (let i = 0; i < item.material.length; ++i) {
                                            if (MATERIALS_AO[key][i]) {
                                                item.material[i].aoMap = assets[MATERIALS_AO[key][i]].model
                                            }
                                        }
                                    }
                                }
                            }


                            // if (item.material.aoMap) {
                            //     console.log('!!!! aoMap')
                            // }
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
