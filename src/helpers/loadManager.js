import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import * as THREE from 'three'

export const loadAssets = arr => {
    return new Promise(res => {
        const loaders = {
            'fbx': new FBXLoader(),
            'img': new THREE.TextureLoader(),
            'imgCube': new THREE.CubeTextureLoader()
        }

        const assets = {}

        const iterate = i => {
            if (!arr[i]) {
                res(assets)
                return;
            }

            const { key, src, typeLoader } = arr[i]
            loaders[typeLoader].load(src, model => {
                assets[key] = {
                    ...arr[i],
                    model,
                }
                iterate(i + 1)
            })
        }

        iterate(0)
    })
}


