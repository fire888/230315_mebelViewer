const getAngle = (x, y) => {
    let inRads = Math.atan2(y, x);
    if (inRads < 0)
        inRads = Math.abs(inRads);
    else
        inRads = 2 * Math.PI - inRads;

    return inRads
}


export const createSchemeFlat = (data) => {
    const rooms = {}


    const d = {
        windows: [],
        doors: [],
        floors: [],
        walls: [],
        wallsOuter: [],
    }

    let height = 3000

    for (let i = 0; i < data['objects'][0].length; ++i) {
        const ob = data['objects'][0][i]
        if (ob.class === 'window' || ob.class === 'door') {
            let w
            let x
            let z

            let l0 = ob.location[0]
            let l1 = ob.location[1]


            {
                const x1 = l0.path[0][0]
                const x2 = l0.path[1][0]
                x = (x2 + l1.path[1][0]) / 2
                const z1 = l0.path[0][1]
                const z2 = l0.path[1][1]
                z = (z2 + l1.path[1][1]) / 2 

                const dx = Math.abs(x2 - x1) 
                const dz = Math.abs(z2 - z1) 

                w = Math.sqrt(dx * dx + dz * dz)
            }
            let t
            {
                const x1 = ob.location[0].path[0][0]
                const x2 = ob.location[1].path[0][0]

                const z1 = ob.location[0].path[0][1]
                const z2 = ob.location[1].path[0][1]

                const dx = Math.abs(x1 - x2) 
                const dz = Math.abs(z1 - z2) 

                t = Math.sqrt(dx * dx + dz * dz)
            }
            let angle
            {
                const x1 = ob.location[0].path[0][0]
                const x2 = ob.location[0].path[1][0]

                const z1 = ob.location[0].path[0][1]
                const z2 = ob.location[0].path[1][1]

                const x0 = x1 - x2 
                const z0 = z1 - z2 

                angle = getAngle(x0, z0)
            }

            const props = {
                mh0: ob.mh0,
                class: ob.class,
                id: ob.id,
                h0: ob.parameters[0]['height-bottom'],
                h1: ob.parameters[0]['height-top'],
                p1: ob.location[0].path[0],
                p2: ob.location[0].path[1],
                refWall_p1_p2: ob.location[0]['ref-wall'],
                p3: ob.location[1].path[0],
                p4: ob.location[1].path[1],
                refWall_p3_p4: ob.location[1]['ref-wall'],
                w,
                h: ob.parameters[0]['height-top'] - ob.parameters[0]['height-bottom'],
                t,
                x: ob.location[0].path[0],
                z: ob.location[0].path[1],
                angle,
            }
            
            if (ob.class === "window") {
                d.windows.push(props)
            }
            if (ob.class === "door") {
                d.doors.push(props)

                for (let wallInd = 0; wallInd < data['inner-perimeters'][0].length; ++wallInd) {
                    if (
                        l0['ref-wall'] === data['inner-perimeters'][0][wallInd].id
                        || l1['ref-wall'] === data['inner-perimeters'][0][wallInd].id
                    ) {
                        data['inner-perimeters'][0][wallInd]['plinth'] = false
                    }
                }
            }
        }
    }

    /** floors */
    for (let i = 0; i < data.rooms[0].length; ++i) {
        const ob = data.rooms[0][i]

        if (!rooms[ob.id]) {
            rooms[ob.id] = {
                floor: null,
                walls: [],
            }
        }

        if (ob.parameters[0].height) {
            height = ob.parameters[0].height
        }
        const props = {
            mh0: ob.mh0,
            class: ob.class,
            id: ob.id,
            path: ob.path,
            h: height,
        }
        rooms[ob.id].floor = props
    }


    /** walls inner */
    for (let i = 0; i < data['inner-perimeters'][0].length; ++i) {
        const ob = data['inner-perimeters'][0][i]
        const props = {
            ...ob,
            h0: 0,
            h1: height,
            mh0: ob.mh0,
        }

        let isInsert = true 
        for (let i = 0; i < d.windows.length; ++i) {
            if (
                d.windows[i].refWall_p1_p2 === props.id ||
                d.windows[i].refWall_p3_p4 === props.id
            ) {
                props.h1 = d.windows[i].h0
                props.tag = 'underWindow' 

                rooms[ob['ref-room']].walls.push(props)
                
                const copy = {...props}
                copy.h0 = d.windows[i].h1
                copy.tag = 'overWindow'
                copy.h1 = height

                rooms[ob['ref-room']].walls.push(copy)

                isInsert = false
            } 
        }



        for (let i = 0; i < d.doors.length; ++i) {
            if (
                d.doors[i].refWall_p1_p2 === props.id ||
                d.doors[i].refWall_p3_p4 === props.id
            ) {
                props.h0 = d.doors[i].h1
                props.h1 = height
                props.tag = 'overDoor' 

                rooms[ob['ref-room']].walls.push(props)

                isInsert = false
            } 
        }

        if (isInsert) {
            rooms[ob['ref-room']].walls.push(props)
        }
    }



    /** walls outer */
    for (let i = 0; i < data['outer-perimeter'][0].length; ++i) {
        const ob = data['outer-perimeter'][0][i]
        const props = {
            ...ob,
            h0: 0,
            h1: height,
            mh0: data.mh0,
        }

        let isInsert = true 
        for (let i = 0; i < d.windows.length; ++i) {
            if (
                d.windows[i].refWall_p1_p2 === props.id ||
                d.windows[i].refWall_p3_p4 === props.id
            ) {
                props.h1 = d.windows[i].h0
                props.tag = 'underWindow' 

                d.walls.push(props)
                
                const copy = {...props}
                copy.h0 = d.windows[i].h1
                copy.tag = 'overWindow'
                copy.h1 = height

                d.walls.push(copy)

                isInsert = false
            } 
        }

        for (let i = 0; i < d.doors.length; ++i) {
            if (
                d.doors[i].refWall_p1_p2 === props.id ||
                d.doors[i].refWall_p3_p4 === props.id
            ) {
                props.h0 = d.doors[i].h1
                props.h1 = height
                props.tag = 'overDoor' 

                d.walls.push(props)
                isInsert = false
            } 
        }

        if (isInsert) {
            d.walls.push(props)
        }
    }

    return {
        ...d,
        rooms,
    }
}