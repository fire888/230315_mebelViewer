
import WebGL from 'three/examples/jsm/capabilities/WebGL';
import { GLTFExporter } from './helpers/GLTFExporter'
import { createStudio } from './Entities/studio'
import { createContainerFlat } from './Entities/containerFlat'

import { loadAssets } from "./helpers/loadManager"
import { ASSETS } from "./constants/ASSETS"


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
                        if (item.material) {
                            console.log('!!!!', item.material)
                            if (item.material.aoMap) {
                                console.log('!!!! aoMap')
                            }
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
