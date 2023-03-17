
import {
    parallelLine,
    getLength
} from '../helpers/geomHelper'


let id = 0
let getID = () => {
    id += 1
    return id
}


const breakLineToCut = (p0, p1, w = 800, offset = 'random') => {
    const len = getLength(...p0, ...p1)

    const normalizedW = w / len

    const phase01 = Math.random() * (1 - normalizedW)
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

    return [l1, l2, l3]
}


const createRoomsPoints = (center) => {
    const rooms = []
    const D_MAX = 5000
    const D_MIN = 2000

    const roomId = getID()
    const sTartPoint = [-D_MIN - Math.random() * D_MAX + center[0], D_MIN + Math.random() * D_MAX + center[1]]



    const lll = breakLineToCut([0, 0], [10000, 0], 600)
    console.log('---',lll)


    const path = [
        [...sTartPoint],
        [D_MIN + Math.random() * D_MAX + center[0], D_MIN + Math.random() * D_MAX + center[1]],
        [D_MIN + Math.random() * D_MAX + center[0], -D_MIN - Math.random() * D_MAX + center[1]],
        [-D_MIN - Math.random() * D_MAX + center[0], -D_MIN - Math.random() * D_MAX + center[1]],
        [...sTartPoint],
    ]

    const mh0 = 0

    /** central room */
    const room = {
        id: roomId,
        mh0,
        path,
        parameters: [
            { height : 2900 },
        ],
        "class": "bedroom",
    }


    const innerPerimeter = []
    for (let i = 1; i < path.length; ++i) {
        innerPerimeter.push({
            mh0,
            "id": getID(),
            "class": "inner-wall",
            "type": "solid",
            "ref-room": roomId,
            "path":
                [
                    [...path[i]],
                    [...path[i - 1]],
                ]
        })
    }

    rooms.push({
        room,
        innerPerimeter,
    })

    /** top room *****/
    const l = parallelLine([...path[2], ...path[3],], 300)
    const pathTop = [
        [l[2], l[3]],
        [l[0], l[1]],
        [l[0], l[1] - D_MIN - Math.random() * D_MAX * 3],
        [l[2], l[3] - D_MIN - Math.random() * D_MAX * 3],
        [l[2], l[3]],
    ]

    const roomId_02 = getID()
    const room_02 = {
        id: roomId_02,
        mh0,
        path: pathTop,
        parameters: [
            { height : 2900 },
        ],
        "class": "bedroom",
    }

    const innerPerimeter02 = []
    for (let i = 1; i < pathTop.length; ++i) {
        innerPerimeter02.push({
            mh0,
            "id": getID(),
            "class": "inner-wall",
            "type": "solid",
            "ref-room": roomId,
            "path":
                [
                    [...pathTop[i]],
                    [...pathTop[i - 1]],
                ]
        })
    }



    rooms.push({
        room: room_02,
        innerPerimeter: innerPerimeter02,
    })


    return {
        rooms,
    }
}



const rooms = []
const innerPerimeter = []
for (let i = 0; i < 5; ++i) {
    const result = createRoomsPoints([i * 30000, 0])
    for (let i = 0; i < result.rooms.length; ++i) {
        rooms.push(result.rooms[i].room)
        result.rooms[i].innerPerimeter && innerPerimeter.push(...result.rooms[i].innerPerimeter)
    }

}


export const flatJSON = {
    "rooms": [rooms],
    "outer-perimeter": [[]],
    "inner-perimeters": [innerPerimeter],
    "objects": [[]]
}
