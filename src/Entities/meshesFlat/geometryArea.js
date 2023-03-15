export const createArea = (data, mat) => {
    const { path } = data

    const v = []
    const c = []

    const center = [0, 0]
    for (let i = 0; i < path.length - 1; ++i) {
        center[0] += path[i][0]
        center[1] += path[i][1]
    }
    center[0] /= path.length - 1
    center[1] /= path.length - 1


    for (let i = 0; i < path.length; ++i) {
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
    }


    const v32 = new Float32Array(v)
    const c32 = new Float32Array(c)
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(v32, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(c32, 3))

    const m = new THREE.Mesh(geometry, mat)


    //uv && geometry.setAttribute('uv', new THREE.BufferAttribute( uv, 2 ))
    geometry.computeVertexNormals()

    return m
}