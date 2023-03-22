
import WebGL from 'three/examples/jsm/capabilities/WebGL';
import { GLTFExporter } from './helpers/GLTFExporter'
import { createStudio } from './Entities/studio'
import { createContainerFlat } from './Entities/containerFlat'

import { loadAssets } from "./helpers/loadManager"
import { ASSETS } from "./constants/ASSETS"
import m1_ao from "./assets/1/m1_ao.jpg";
import m8_ao from "./assets/1/m8_ao.jpg";
import m12$1_ao from "./assets/1/m12.1_ao.jpg";
import m12$2_ao from "./assets/1/m12.2_ao.jpg";
import m12$3_ao from "./assets/1/m12.3_ao.jpg";
import m13_ao from "./assets/1/m13_ao.jpg";
import m14_ao from "./assets/1/m14_ao.jpg";

const MATERIALS_AO = {
    'm01': {
        '0': 'm1_ao',
    },
    'm02': {
        '0': 'm1_ao',
    },
    'm08': {
        '0': 'm8_ao',
    },
    'm12': {
        '0': 'm12.1_ao',
        '1': 'm12.2_ao',
        '2': 'm12.3_ao',
    },
    'm13': {
        '0': 'm13_ao',
    },
    'm14': {
        '0': 'm14_ao',
    },
}



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
        for (let key in assets) {
            if (assets[key].typeLoader === 'fbx') {

                //assets[key].model.scale.set(0.01, 0.01, 0.01)
                assets[key].model.scale.set(0.1, 0.1, 0.1)
                assets[key].model.position.set(...assets[key].pos)
                assets[key].model.rotation.y = assets[key].rot

                studio.addToScene(assets[key].model)
                assets[key].model.traverse(item => {
                    if (item.type === 'Mesh') {
                        const uv2 = item.geometry.attributes.uv2
                        if (uv2) {
                            for (let i = 0; i < uv2.array.length; ++i) {
                                if (uv2.array[i] !== 0) {
                                    console.log(uv2.array[i])
                                }
                            }
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
