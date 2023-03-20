import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

export const loadAssets = arr => {
    return new Promise(res => {
        const loaders = {
            'fbx': new FBXLoader(),
            'img': new THREE.TextureLoader(),
            'imgCube': new THREE.CubeTextureLoader(),
            'gltf': new GLTFLoader(),
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


