import { m4 } from './m4'
import * as THREE from "three";

export const createFace4 = (v1, v2, v3, v4) => [...v1, ...v2, ...v3, ...v1, ...v3, ...v4]



export const rotateArrY = (arr, angle) => {
    const matrix = m4.yRotation(angle);

    for (let i = 0; i < arr.length; i += 3) {
        const vector = m4.transformPoint(matrix, [arr[i + 0], arr[i + 1], arr[i + 2], 1])
        arr[i + 0] = vector[0]
        arr[i + 1] = vector[1]
        arr[i + 2] = vector[2]
    }
}

export const transformArr = (arr, x = 0, y = 0, z = 0, r = 0) => {
    let matrix = m4.yRotation(r);
    matrix = m4.translate(matrix, x, y, z);

    for (let i = 0; i < arr.length; i += 3) {
        const vector = m4.transformPoint(matrix, [arr[i + 0], arr[i + 1], arr[i + 2], 1])
        arr[i + 0] = vector[0]
        arr[i + 1] = vector[1]
        arr[i + 2] = vector[2]
    }
}

export const translateArr = (arr, x = 0, y = 0, z = 0) => {
    const matrix = m4.translation(x, y, z);

    for (let i = 0; i < arr.length; i += 3) {
        const vector = m4.transformPoint(matrix, [arr[i + 0], arr[i + 1], arr[i + 2], 1])
        arr[i + 0] = vector[0]
        arr[i + 1] = vector[1]
        arr[i + 2] = vector[2]
    }
}



export const angleFromCoords = (x, y) => {
    let rad = Math.atan(y / x)
    x < 0 && y > 0 && (rad = Math.PI - Math.abs(rad))
    x < 0 && y <= 0 && (rad = Math.PI + Math.abs(rad))
    return rad
}

export const angleOfLine = (x0, z0, x1, z1) => {
    const dX = x1 - x0
    const dZ = z1 - z0
    const angle = angleFromCoords(dX, dZ)
    return angle
}

export const getLength = (x0, y0, x1, y1) => {
    const dX = x1 - x0
    const dY = y1 - y0
    return Math.sqrt(dX * dX + dY * dY)
}


export const parallelLine = (arr, offset) => {
    const l = getLength(...arr)
    const angle = angleOfLine(...arr)

    const newLine = [0, 11111, 0, l, 1111, 0]
    rotateArrY(newLine, -angle)

    const newX = arr[0] + Math.sin(-angle) * offset
    const newZ = arr[1] + Math.cos(-angle) * offset

    translateArr(newLine, newX, 0, newZ)
    return [newLine[0], newLine[2], newLine[3], newLine[5]]
}


export const breakLineToCut = (p0, p1, w = 800, offset = 'random') => {
    const len = getLength(...p0, ...p1)

    const normalizedW = w / len

    let offsetVal = Math.random() * (1 - normalizedW)
    if (typeof offset === 'number') {
        offsetVal = offset
    }
    const phase01 = offsetVal
    const phase02 = phase01 + normalizedW

    const l1 = [
        [...p0],
        [p0[0] + (p1[0] - p0[0]) * phase01, p0[1] + (p1[1] - p0[1]) * phase01,],
    ]

    const l2 = [
        [p0[0] + (p1[0] - p0[0]) * phase01, p0[1] + (p1[1] - p0[1]) * phase01,],
        [p0[0] + (p1[0] - p0[0]) * phase02, p0[1] + (p1[1] - p0[1]) * phase02],
    ]

    const l3 = [
        [p0[0] + (p1[0] - p0[0]) * phase02, p0[1] + (p1[1] - p0[1]) * phase02],
        [...p1],
    ]

    return {
        lines: [l1, l2, l3],
        phases: [phase01, phase02]
    }
}


export const createBufferMesh = (v, mat) => {
    const v32 = new Float32Array(v)
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(v32, 3))
    geometry.computeVertexNormals()
    const m = new THREE.Mesh(geometry, mat)
    return m
}

