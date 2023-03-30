import * as THREE from 'three'

const S_TEXTURE = 1500

export const createFloor = (data, materials) => {
    //console.log(data)

    const { path } = data

    const v = []
    const c = []
    const u = []

    const v02 = []
    const u02 = []

    const center = [0, 0]
    for (let i = 0; i < path.length - 1; ++i) {
       center[0] += path[i][0]
       center[1] += path[i][1]
    }
    center[0] /= path.length - 1
    center[1] /= path.length - 1


    for (let i = 0; i < path.length - 1; ++i) {
        const t1 = path[i]
        const t2 = path[i + 1] || path[0]
        v.push(
           t1[0], 0, t1[1],
           t2[0], 0, t2[1],
           center[0], 0, center[1]
        )

        const col = [Math.random(), Math.random(), Math.random()]
        c.push(
            ...col,
            ...col,
            ...col,
        )

        u.push(
            t1[0] / S_TEXTURE, t1[1] / S_TEXTURE,
            t2[0] / S_TEXTURE, t2[1] / S_TEXTURE,
            center[0] / S_TEXTURE, center[1] / S_TEXTURE,
        )

        v02.push(
            t1[0], -200, t1[1],
            t2[0], -200, t2[1],
            t2[0], 0, t2[1],

            t1[0], -200, t1[1],
            t2[0], 0, t2[1],
            t1[0], 0, t1[1],
        )
    }


    const geometry = new THREE.BufferGeometry()

    const v32 = new Float32Array(v)
    geometry.setAttribute('position', new THREE.BufferAttribute(v32, 3))
    const c32 = new Float32Array(c)
    geometry.setAttribute('color', new THREE.BufferAttribute(c32, 3))
    const u32 = new Float32Array(u)
    geometry.setAttribute('uv', new THREE.BufferAttribute(u32, 2))

    const m = new THREE.Mesh(geometry, materials.floor)
    m.receiveShadow = true


    //uv && geometry.setAttribute('uv', new THREE.BufferAttribute( uv, 2 ))
    geometry.computeVertexNormals()



    const geometry02 = new THREE.BufferGeometry()
    const v02_32 = new Float32Array(v02)
    geometry02.setAttribute('position', new THREE.BufferAttribute(v02_32, 3))
    geometry02.computeVertexNormals()
    const m02 = new THREE.Mesh(geometry02, materials.room)
    m.add(m02)

    return m
}