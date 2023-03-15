import { m4 } from './m4'

export const createFace4 = (v1, v2, v3, v4) => [...v1, ...v2, ...v3, ...v1, ...v3, ...v4]

export const angleFromCoords = (x, y) => {
    let rad = Math.atan(y / x)
    x < 0 && y > 0 && (rad = Math.PI - Math.abs(rad))
    x < 0 && y <= 0 && (rad = Math.PI + Math.abs(rad))
    return rad
}

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