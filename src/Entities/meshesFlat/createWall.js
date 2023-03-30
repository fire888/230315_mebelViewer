const S_TEXTURE = 500


export const createWall = (data, mat) => {
    const v = []
    const u = []

    const { h0, h1 } = data

    const c1 = data.path[0]
    const c2 = data.path[1]

    v.push(
        c1[0], h0, c1[1],
        c2[0], h0, c2[1],
        c2[0], h1, c2[1],

        c1[0], h0, c1[1],
        c2[0], h1, c2[1],
        c1[0], h1, c1[1],
    )

    u.push(
        c1[0] / S_TEXTURE + c1[1] / S_TEXTURE, h0 / S_TEXTURE,
        c2[0] / S_TEXTURE + c2[1] / S_TEXTURE, h0 / S_TEXTURE,
        c2[0] / S_TEXTURE + c2[1] / S_TEXTURE, h1 / S_TEXTURE,

        c1[0] / S_TEXTURE + c1[1] / S_TEXTURE, h0 / S_TEXTURE,
        c2[0] / S_TEXTURE + c2[1] / S_TEXTURE, h1 / S_TEXTURE,
        c1[0] / S_TEXTURE + c1[1] / S_TEXTURE, h1 / S_TEXTURE,
    )


    const geometry = new THREE.BufferGeometry()

    const v32 = new Float32Array(v)
    geometry.setAttribute('position', new THREE.BufferAttribute(v32, 3))

    const u32 = new Float32Array(u)
    geometry.setAttribute('uv', new THREE.BufferAttribute(u32, 2))

    geometry.computeVertexNormals()
    const m = new THREE.Mesh(geometry, mat)
    m.receiveShadow = true

    return m
}