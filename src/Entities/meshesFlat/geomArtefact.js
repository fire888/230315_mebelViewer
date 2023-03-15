export const createArtefact = (data, mat) => {
    console.log('!!!', data)

    const v = []
    const c = []


    if (data.class === 'window') {
        const h0 = 0
        const h1 = data.parameters[0]['height-bottom']
        const h2 = data.parameters[0]['height-top']

        const c1 = data.location[0].path[0]
        const c2 = data.location[0].path[1]
        const c3 = data.location[1].path[0]
        const c4 = data.location[1].path[1]

        v.push(
            c1[0], h1, c1[1],
            c2[0], h1, c2[1],
            c2[0], h2, c2[1],

            c1[0], h1, c1[1],
            c2[0], h2, c2[1],
            c1[0], h2, c1[1],

            //

            c3[0], h1, c3[1],
            c4[0], h1, c4[1],
            c4[0], h2, c4[1],

            c3[0], h1, c3[1],
            c4[0], h2, c4[1],
            c3[0], h2, c3[1],
        )

        const col = [Math.random(), Math.random(), Math.random()]
        c.push(
            ...col,
            ...col,
            ...col,
            ...col,
            ...col,
            ...col,

            ...col,
            ...col,
            ...col,
            ...col,
            ...col,
            ...col,
        )
    }


    if (data.class === 'door') {
        //const h0 = 0
        const h1 = data.parameters[0]['height-bottom']
        const h2 = data.parameters[0]['height-top']

        const c1 = data.location[0].path[0]
        const c2 = data.location[0].path[1]
        const c3 = data.location[1].path[0]
        const c4 = data.location[1].path[1]

        v.push(
            c1[0], h1, c1[1],
            c2[0], h1, c2[1],
            c2[0], h2, c2[1],

            c1[0], h1, c1[1],
            c2[0], h2, c2[1],
            c1[0], h2, c1[1],

            //

            c3[0], h1, c3[1],
            c4[0], h1, c4[1],
            c4[0], h2, c4[1],

            c3[0], h1, c3[1],
            c4[0], h2, c4[1],
            c3[0], h2, c3[1],
        )

        const col = [Math.random(), Math.random(), Math.random()]
        c.push(
            ...col,
            ...col,
            ...col,
            ...col,
            ...col,
            ...col,

            ...col,
            ...col,
            ...col,
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


    /** mesh main */
    geometry.computeVertexNormals()


    return m
}