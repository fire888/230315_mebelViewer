import { angleFromCoords, rotateArrY, translateArr } from '../../helpers/geomHelper'

const CANT = 100
const CANT_Z = 40

export const createDoor = (data, mat) => {
    //console.log('!!! door', data)

    const v = []
    const c = []

    const h1 = data.h0
    const h2 = data.h1

    const c1 = data.p1
    const c2 = data.p2
    const c3 = data.p3
    const c4 = data.p4

    const dX = c2[0] - c1[0]
    const dZ = c2[1] - c1[1]
    const angle = angleFromCoords(dX, dZ)
    const l = Math.sqrt(dX * dX + dZ * dZ)

    const zX = c4[0] - c1[0]
    const zZ = c4[1] - c1[1]
    const halfZ = Math.sqrt(zX * zX + zZ * zZ) / 2

    // CANT
    v.push(
        // left Z
        -CANT, 0, CANT_Z,
        -CANT, 0, 0,
        -CANT, h2 + CANT, 0,

        -CANT, 0, CANT_Z,
        -CANT, h2 + CANT, 0,
        -CANT, h2 + CANT, CANT_Z,



        // left
        -CANT, 0, CANT_Z,
        0, 0, CANT_Z,
        0, h2, CANT_Z,

        -CANT, 0, CANT_Z,
        0, h2, CANT_Z,
        -CANT, h2 + CANT, CANT_Z,


        // left inner
        0, 0, 0 + CANT_Z,
        0, 0, -halfZ,
        0, h2, -halfZ,
        0, 0, 0 + CANT_Z,
        0, h2, -halfZ,
        0, h2, 0 + CANT_Z,


        // top top
        -CANT, h2 + CANT, CANT_Z,
        l/2, h2 + CANT, CANT_Z,
        l/2, h2 + CANT, 0,

        -CANT, h2 + CANT, CANT_Z,
        l/2, h2 + CANT, 0,
        -CANT, h2 + CANT, 0,


        // top
        0, h2, CANT_Z,
        l/2, h2, CANT_Z,
        l/2, h2 + CANT, CANT_Z,

        0, h2, CANT_Z,
        l/2, h2 + CANT, CANT_Z,
        -CANT, h2 + CANT, CANT_Z,

        // top inner
        0, h2, -halfZ,
        l/2, h2, -halfZ,
        l/2, h2, CANT_Z,

        0, h2, -halfZ,
        l/2, h2, CANT_Z,
        0, h2, CANT_Z,

        /** door */
        0, 0, -halfZ + 20,
        l/2, 0, -halfZ + 20,
        l/2, h2, -halfZ + 20,

        0, 0, -halfZ + 20,
        l/2, h2, -halfZ + 20,
        0, h2, -halfZ + 20,
    )

    const copy = [...v]
    for (let i = 0; i < copy.length; i += 3) {
        copy[i] = l - copy[i]
    }
    v.push(...copy)
    const copy2 = [...v]
    for (let i = 0; i < copy2.length; i += 3) {
        copy2[i + 2] = -halfZ * 2 - copy2[i + 2]
    }
    v.push(...copy2)


    rotateArrY(v, -angle)
    translateArr(v, c1[0], 0, c1[1])

    // v.push(
    //     c1[0], h1, c1[1],
    //     c2[0], h1, c2[1],
    //     c2[0], h2, c2[1],
    //
    //     c1[0], h1, c1[1],
    //     c2[0], h2, c2[1],
    //     c1[0], h2, c1[1],
    //
    //     //
    //
    //     c3[0], h1, c3[1],
    //     c4[0], h1, c4[1],
    //     c4[0], h2, c4[1],
    //
    //     c3[0], h1, c3[1],
    //     c4[0], h2, c4[1],
    //     c3[0], h2, c3[1],
    // )

    // const col = [Math.random(), Math.random(), Math.random()]
    // c.push(
    //     ...col,
    //     ...col,
    //     ...col,
    //     ...col,
    //     ...col,
    //     ...col,
    //
    //     ...col,
    //     ...col,
    //     ...col,
    //     ...col,
    //     ...col,
    //     ...col,
    // )


    const v32 = new Float32Array(v)
    const c32 = new Float32Array(c)
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(v32, 3))
    //geometry.setAttribute('color', new THREE.BufferAttribute(c32, 3))

    const m = new THREE.Mesh(geometry, mat)


    /** mesh main */
    geometry.computeVertexNormals()


    return m
}