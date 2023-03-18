import { createFace4, translateArr } from '../../helpers/geomHelper'
import { angleFromCoords } from "../../helpers/geomHelper";


/**
angle 3.141592653589793
class "window"
h 1700
h0 960
h1 2660
id "346"
p1 [-2500, 5000]
p2 [2500, 5000]
p3 [-2500, 5200]
p4 [2500, 5200]
refWall_p1_p2 "222"
refWall_p3_p4 "424"
t 200
w 5000
x 2500
z 5100
**/

export const createWindow = (data, mat) => {
    const { window, windowGlass, lineG1 } = mat


    const arrLines = []

    const v = []
    const c = []
    const u = []

    const wR = 50
    const tr = 40
    const htr = tr / 2

    const { w, h } = data

    const u6z = [
        0, 0,   0, 0,   0, 0, 
        0, 0,   0, 0,   0, 0, 
    ]


    /** outer */
    v.push(
         ...createFace4(
            [0, 0, htr],
            [w, 0, htr],
            [w - wR, wR, htr],
            [wR, wR, htr],
        ),
        ...createFace4(
            [w - wR, wR, htr],
            [w, 0, htr],
            [w, h, htr],
            [w - wR, h - wR, htr],
        ),
        ...createFace4(
            [wR, h - wR, htr],
            [w - wR, h - wR, htr],
            [w, h, htr],
            [0, h, htr],
        ),
        ...createFace4(
            [0, 0, htr],
            [wR, wR, htr],
            [wR, h - wR, htr],
            [0, h, htr],
        ),
    )

    u.push(
        ...u6z,
        ...u6z,
        ...u6z,
        ...u6z,
    )

    /** inner */
    v.push(
        ...createFace4(
           [0, 0, -htr],
           [w, 0, -htr],
           [w - wR, wR, -htr],
           [wR, wR, -htr],
       ),
       ...createFace4(
           [w - wR, wR, -htr],
           [w, 0, -htr],
           [w, h, -htr],
           [w - wR, h - wR, -htr],
       ),
       ...createFace4(
           [wR, h - wR, -htr],
           [w - wR, h - wR, -htr],
           [w, h, -htr],
           [0, h, -htr],
       ),
       ...createFace4(
           [0, 0, -htr],
           [wR, wR, -htr],
           [wR, h - wR, -htr],
           [0, h, -htr],
       ),
    )

    u.push(
        ...u6z,
        ...u6z,
        ...u6z,
        ...u6z,
    )

    /** tickness */
    v.push(
        ...createFace4(
            [wR, wR, htr],
            [w - wR, wR, htr],
            [w - wR, wR, -htr],
            [wR, wR, -htr],
        ),
        ...createFace4(
            [w - wR, wR, htr],
            [w - wR, h - wR, htr],
            [w - wR, h - wR, -htr],
            [w - wR, wR, -htr],
        ),
        ...createFace4(
            [wR, wR, htr],
            [wR, h - wR, htr],
            [wR, h - wR, -htr],
            [wR, wR, -htr],
        ),
        ...createFace4(
            [wR, h - wR, htr],
            [wR, h - wR, -htr],
            [w - wR, h - wR, -htr],
            [w - wR, h - wR, htr],
        ),
    )

    u.push(
        ...u6z,
        ...u6z,
        ...u6z,
        ...u6z,
    )

    /** inner dividers */
    const step = w / Math.ceil(w / 800)        
    for (let i = step; i < w; i += step) {
        v.push(
            ...createFace4(
                [i - htr, wR, htr],
                [i + htr, wR, htr],
                [i + htr, h - wR, htr],
                [i - htr, h - wR, htr],
            ),
            ...createFace4(
                [i + htr, wR, htr],
                [i + htr, wR, -htr],
                [i + htr, h - wR, -htr],
                [i + htr, h - wR, htr],
            ),
            ...createFace4(
                [i + htr, wR, -htr],
                [i + htr, h - wR, -htr],
                [i - htr, h - wR, -htr],
                [i - htr, wR, -htr],
            ),
            ...createFace4(
                [i - htr, wR, htr],
                [i - htr, wR, -htr],
                [i - htr, h - wR, -htr],
                [i - htr, h - wR, htr],
            ),
        )

        u.push(
            ...u6z,
            ...u6z,
            ...u6z,
            ...u6z,
        )


        /** toggle */
        if ((i + (step + 100)) > w) {
            v.push(
                ...createFace4(
                    [i - htr, h / 2, -htr],
                    [i + htr, h / 2, -htr],
                    [i + htr, h / 2, -80],
                    [i - htr, h / 2, -80],
                ),
                ...createFace4(
                    [i - htr, h / 2, -80],
                    [i + htr, h / 2, -80],
                    [i + htr, h / 2 - 140, -80],
                    [i - htr, h / 2 - 140, -80],
                ),
            )

            u.push(
                ...u6z,
                ...u6z,
            )

            // /** line */
            // const lv = [
            //     i - htr, h / 2, -80,
            //     i - htr, h / 2 - 140, -80,
            //     i + htr, h / 2 - 140, -80,
            //     i + htr, h / 2, -80,
            // ]
            // const v32L = new Float32Array(lv)
            // const gl = new THREE.BufferGeometry()
            // gl.setAttribute('position', new THREE.BufferAttribute(v32L, 3))
            // const line = new THREE.Line(gl, lineG1)
            // arrLines.push(line)
        }
    }

    /** under window */
    v.push(
        ...createFace4(
            [0, 0, htr],
            [w, 0, htr],
            [w, 0, -200],
            [0, 0, -200],
        ),
        ...createFace4(
            [w, 0, htr],
            [w, 0, -200],
            [w, -40, -200],
            [w, -40, htr],
        ),
        ...createFace4(
            [0, 0, htr],
            [0, 0, -200],
            [0, -40, -200],
            [0, -40, htr],
        ),
        ...createFace4(
            [0, 0, -200],
            [w, 0, -200],
            [w, -40, -200],
            [0, -40, -200],
        ),
    )

    u.push(
        0, .75,  .25, .75,  .25, 1,  0, .75,  .25, 1,  0, 1,
        ...u6z,
        ...u6z,
        ...u6z,
    )

    /** warm */
    v.push(
        ...createFace4(
            [150, - 150, -170],
            [w - 150, - 150, -170],
            [w - 150, - 150 - 500, -170],
            [150, - 150 - 500, -170],
        ),
        ...createFace4(
            [150, - 150, 0],
            [w - 150, - 150, 0],
            [w - 150, - 150, -170],
            [150, - 150, -170],
        ),
    )

    u.push(
        ...u6z,
        ...u6z,
    )

    /** cap walls */
   const { p1, p2, p3, p4 } = data 

    const th = data.t / 2
    v.push(
        ...createFace4(
            [w, 0, th],
            [w, h, th],
            [w, h, -th],
            [w, 0, -th],
        ),
        ...createFace4(
            [0, 0, th],
            [0, h, th],
            [0, h, -th],
            [0, 0, -th],
        ),
        ...createFace4(
            [0, h, th],
            [w, h, th],
            [w, h, -th],
            [0, h, -th],
        ),
        ...createFace4(
            [0, 0, 0],
            [w, 0, 0],
            [w, 0, th],
            [0, 0, th],
        ),
    )

    u.push(
        .25, .75, .5, .75, .5, 1,   .25, .75, .5, 1, .25, 1,
        .25, .75, .5, .75, .5, 1,   .25, .75, .5, 1, .25, 1,
        ...u6z,
        ...u6z,
    )

    translateArr(v, 0, 0, 100)



    const v32 = new Float32Array(v)
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(v32, 3))

    const u32 = new Float32Array(u)    
    geometry.setAttribute('uv2', new THREE.BufferAttribute(u32, 2))

    geometry.computeVertexNormals()

    const m = new THREE.Mesh(geometry, window)
    m.position.set(data.p1[0], data.h0, data.p1[1])

    const dX = data.p2[0] - data.p1[0]
    const dZ = data.p2[1] - data.p1[1]
    const angle = angleFromCoords(dX, dZ)
    m.rotation.y = -angle//data.angle


    const v32glass = new Float32Array([
        ...createFace4(
            [wR, wR, 100],
            [w - wR, wR, 100],
            [w - wR, h - wR, 100],
            [wR, h - wR, 100],
        )
    ])
    const geometryGl = new THREE.BufferGeometry()
    geometryGl.setAttribute('position', new THREE.BufferAttribute(v32glass, 3))
    geometryGl.computeVertexNormals()
    const mGl = new THREE.Mesh(geometryGl, windowGlass)
    m.add(mGl)


    // /** line */
    // const lv = [
    //     w, 0, th,
    //     w, h, th,
    //     0, h, th,
    //     0, 0, th,
    //     w, 0, th,
    //
    //     w, 0, -th,
    //     w, h, -th,
    //     0, h, -th,
    //     0, 0, -th,
    //
    //     0, -40, -th,
    //     0, -40, -200,
    //     w, -40, -200,
    //     w, -40, -th,
    //     //w, 0, th,
    // ]
    // translateArr(lv, 0, 0, 100)
    // const v32L = new Float32Array(lv)
    // const gl = new THREE.BufferGeometry()
    // gl.setAttribute('position', new THREE.BufferAttribute(v32L, 3))
    // const line = new THREE.Line(gl, lineG1)
    // m.add(line)

    // for (let i = 0; i < arrLines.length; ++i) {
    //     m.add(arrLines[i])
    // }

    return m
}