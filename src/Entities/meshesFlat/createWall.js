const S_TEXTURE = 500


export const createWall = (data, mat) => {
    console.log('wall', data)

    const v = []
    const c = []
    const u = []

    const h1 = data.h0
    const h2 = data.h1

    const c1 = data.path[0]
    const c2 = data.path[1]

    v.push(
        c1[0], h1, c1[1],
        c2[0], h1, c2[1],
        c2[0], h2, c2[1],

        c1[0], h1, c1[1],
        c2[0], h2, c2[1],
        c1[0], h2, c1[1],
    )

    const col = [Math.random(), Math.random(), Math.random()]
    c.push(
        ...col,
        ...col,
        ...col,
        ...col,
        ...col,
        ...col,
    )

    u.push(
        c1[0] / S_TEXTURE + c1[1] / S_TEXTURE, h1 / S_TEXTURE,
        c2[0] / S_TEXTURE + c2[1] / S_TEXTURE, h1 / S_TEXTURE,
        c2[0] / S_TEXTURE + c2[1] / S_TEXTURE, h2 / S_TEXTURE,

        c1[0] / S_TEXTURE + c1[1] / S_TEXTURE, h1 / S_TEXTURE,
        c2[0] / S_TEXTURE + c2[1] / S_TEXTURE, h2 / S_TEXTURE,
        c1[0] / S_TEXTURE + c1[1] / S_TEXTURE, h2 / S_TEXTURE,
    )


    const v32 = new Float32Array(v)
    const c32 = new Float32Array(c)
    const u32 = new Float32Array(u)
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(v32, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(c32, 3))
    geometry.setAttribute('uv', new THREE.BufferAttribute(u32, 2))

    const m = new THREE.Mesh(geometry, mat)


    /** mesh main */
    geometry.computeVertexNormals()


    return m
}