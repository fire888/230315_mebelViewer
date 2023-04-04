//const S_TEXTURE = 500


import * as THREE from "three"
import {
    angleFromCoords,
    rotateArrY,
    transformArr,
    translateArr,
} from '../../helpers/geomHelper'

const PROFILE = [
    [0,  40],
    [10,  30],
    [20,  20],
    [65,  20],
    [75,  10],
    [80,  0],
]

export const createPlinth = (data, materials) => {
    const v = []
    const c = []
    const u = []

    // const h1 = data.h0
    // const h2 = data.h1

    const c1 = data.path[0]
    const c2 = data.path[1]


    const dX = c2[0] - c1[0]
    const dZ = c2[1] - c1[1]

    const angle = angleFromCoords(dX, dZ)
    const l = Math.sqrt(dX * dX + dZ * dZ)

    const OFFSET = 0

    for (let i = 0; i < PROFILE.length - 1; ++i) {
        v.push(
            0  + OFFSET, PROFILE[i][0], PROFILE[i][1],
            l - OFFSET, PROFILE[i][0], PROFILE[i][1],
            l - OFFSET, PROFILE[i + 1][0], PROFILE[i + 1][1],

            0 + OFFSET, PROFILE[i][0], PROFILE[i][1],
            l - OFFSET, PROFILE[i + 1][0], PROFILE[i + 1][1],
            0 + OFFSET, PROFILE[i + 1][0], PROFILE[i + 1][1],
        )
    }

    rotateArrY(v, -angle)
    translateArr(v, c1[0], 0, c1[1], 0)

    const v32 = new Float32Array(v)
    const c32 = new Float32Array(c)
    const u32 = new Float32Array(u)
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(v32, 3))
    // geometry.setAttribute('color', new THREE.BufferAttribute(c32, 3))
    // geometry.setAttribute('uv', new THREE.BufferAttribute(u32, 2))

    const m = new THREE.Mesh(geometry, materials.plinth)
    m.receiveShadow = true


    /** mesh main */
    geometry.computeVertexNormals()


    return m
}