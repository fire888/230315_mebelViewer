let id = 0
let getID = () => {
    id += 1
    return id
}


const createRoomsPoints = (center) => {
    const D_MAX = 5000
    const D_MIN = 2000

    const roomId = getID()
    const sTartPoint = [-D_MIN - Math.random() * D_MAX + center[0], D_MIN + Math.random() * D_MAX + center[1]]

    const path = [
        sTartPoint,
        [D_MIN + Math.random() * D_MAX + center[0], D_MIN + Math.random() * D_MAX + center[1]],
        [D_MIN + Math.random() * D_MAX + center[0], -D_MIN - Math.random() * D_MAX + center[1]],
        [-D_MIN - Math.random() * D_MAX + center[0], -D_MIN - Math.random() * D_MAX + center[1]],
        sTartPoint,
    ]
    const mh0 = 0

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

    return {
        room,
        innerPerimeter,
    }
}



const rooms = []
const innerPerimeter = []
for (let i = 0; i < 5; ++i) {
    const result = createRoomsPoints([i * 15000, 0])
    rooms.push(result.room)
    innerPerimeter.push(...result.innerPerimeter)
}


export const flatJSON = {
    "rooms": [rooms],
    "outer-perimeter": [[]],
    "inner-perimeters": [innerPerimeter],
    "objects": [[]]
}


//
//
//
//
//
//
//
//
//
//
//
//
//
//
// const rooms = []
// const innerPerimeters = []
// const objects = []
//
// let mh0 = 0
//
// let currentZ = -4000
// let newZ = 4000
//
//
//
// const createFloor = () => {
//     let currentX = -20000
//
//     let startDoorZ = currentZ + 1000 + (Math.random() * (newZ - currentZ - 2000))
//     let endDoorZ = startDoorZ + 800
//
//     for (let i = 0; i < 3; ++i) {
//         const w = Math.random() * 7000 + 3000
//         const newX = currentX + w
//
//         const roomId = getID()
//         rooms.push({
//             mh0,
//             "id": roomId,
//             "class": "bedroom",
//             'path': [
//                 [currentX, currentZ],
//                 [currentX, newZ],
//                 [newX, newZ],
//                 [newX, currentZ],
//                 [currentX, currentZ],
//             ],
//             "parameters": [
//                 {
//                     "height": 2900,
//                     "wall-texture": "GUID-iurn9rewqer0g",
//                     "floor-texture": "GUID-iufsdhfdhfqer0g",
//                     "ceiling-texture": "GUID-iurn9rgsdfhxvcng"
//                 }
//             ],
//         })
//
//
//         let newStartDoorZ = currentZ + 1000 + (Math.random() * (newZ - currentZ - 2000))
//         let newEndDoorZ = newStartDoorZ + 800
//
//         const doorWallId = getID()
//         const doorWallId_02 = getID()
//         const windowWallId = getID()
//         const windowWallId02 = getID()
//
//         const windowX01 = currentX + Math.random() * (newX - currentX) * 0.3 + 500
//         const windowX02 = windowX01 + Math.random() * (newX - windowX01) * 0.8 + 1000
//
//         innerPerimeters.push(
//             /** TOP */
//             {
//                 mh0,
//                 "id": getID(),
//                 "class": "inner-wall",
//                 "type": "solid",
//                 "ref-room": roomId,
//                 "path":
//                     [
//                         [currentX, currentZ],
//                         [windowX01, currentZ],
//                     ]
//             },
//             {
//                 mh0,
//                 "id": getID(),
//                 "class": "inner-wall",
//                 "type": "solid",
//                 "ref-room": roomId,
//                 "path":
//                     [
//                         [windowX02, currentZ],
//                         [newX, currentZ],
//                     ]
//             },
//             {
//                 mh0,
//                 "id": windowWallId,
//                 "class": "inner-wall",
//                 "type": "cut",
//                 "ref-room": roomId,
//                 "path":
//                     [
//                         [windowX01, currentZ],
//                         [windowX02, currentZ],
//                     ]
//             },
//
//             /** BOTTOM */
//             {
//                 mh0,
//                 "id": getID(),
//                 "class": "inner-wall",
//                 "type": "solid",
//                 "ref-room": roomId,
//                 "path":
//                     [
//                         [newX, newZ],
//                         [windowX02, newZ],
//                     ]
//             },
//             {
//                 mh0,
//                 "id": windowWallId02,
//                 "class": "inner-wall",
//                 "type": "solid",
//                 "ref-room": roomId,
//                 "path":
//                     [
//                         [windowX02, newZ],
//                         [windowX01, newZ],
//                     ]
//             },
//             {
//                 mh0,
//                 "id": getID(),
//                 "class": "inner-wall",
//                 "type": "cut",
//                 "ref-room": roomId,
//                 "path":
//                     [
//                         [windowX01, newZ],
//                         [currentX, newZ],
//                     ]
//             },
//
//
//             /** LEFT */
//             {
//                 mh0,
//                 "id": getID(),
//                 "class": "inner-wall",
//                 "type": "solid",
//                 "ref-room": roomId,
//                 "path":
//                     [
//                         [currentX, startDoorZ],
//                         [currentX, currentZ],
//                     ]
//             },
//             {
//                 mh0,
//                 "id": doorWallId,
//                 "class": "inner-wall",
//                 "type": "cut",
//                 "ref-room": roomId,
//                 "path":
//                     [
//                         [currentX, endDoorZ],
//                         [currentX, startDoorZ],
//                     ]
//             },
//             {
//                 mh0,
//                 "id": getID(),
//                 "class": "inner-wall",
//                 "type": "solid",
//                 "ref-room": roomId,
//                 "path":
//                     [
//                         [currentX, newZ],
//                         [currentX, endDoorZ],
//                     ]
//             },
//             /** RIGHT */
//             {
//                 mh0,
//                 "id": getID(),
//                 "class": "inner-wall",
//                 "type": "solid",
//                 "ref-room": roomId,
//                 "path":
//                     [
//                         [newX, currentZ],
//                         [newX, newStartDoorZ],
//                     ]
//             },
//             {
//                 mh0,
//                 "id": doorWallId_02,
//                 "class": "inner-wall",
//                 "type": "cut",
//                 "ref-room": roomId,
//                 "path":
//                     [
//                         [newX, newStartDoorZ],
//                         [newX, newEndDoorZ],
//                     ]
//             },
//             {
//                 mh0,
//                 "id": getID(),
//                 "class": "inner-wall",
//                 "type": "solid",
//                 "ref-room": roomId,
//                 "path":
//                     [
//                         [newX, newEndDoorZ],
//                         [newX, newZ],
//                     ]
//             },
//         )
//
//         objects.push(
//             {
//                 mh0,
//                 "id": "349",
//                 "class": "door",
//                 "parameters": [{
//                     "type": "interior-door",
//                     "height-bottom": 0,
//                     "height-top": 2000
//                 }],
//                 "location": [{
//                     "ref-wall": doorWallId_02,
//                     "path": [
//                         [currentX - 200, startDoorZ],
//                         [currentX - 200, endDoorZ],
//                     ]
//                 },
//                     {
//                         "ref-wall": doorWallId,
//                         "path": [
//                             [currentX, endDoorZ],
//                             [currentX, startDoorZ],
//                         ]
//                     }
//                 ]
//             },
//             {
//                 mh0,
//                 "id": "347",
//                 "class": "window",
//                 "parameters":
//                     [
//                         {
//                             "height-bottom": 960,
//                             "height-top": 2660
//                         }
//                     ],
//                 "location":
//                     [
//                         {
//                             "ref-wall": windowWallId,
//                             "path":
//                                 [
//                                     [windowX02, currentZ],
//                                     [windowX01, currentZ]
//                                 ]
//                         },
//                         {
//                             "ref-wall": "232",
//                             "path":
//                                 [
//                                     [windowX02, currentZ - 200],
//                                     [windowX01, currentZ - 200]
//                                 ]
//                         },
//
//                     ]
//             },
//             {
//                 mh0,
//                 "id": getID(),
//                 "class": "window",
//                 "parameters":
//                     [
//                         {
//                             "height-bottom": 960,
//                             "height-top": 2660
//                         }
//                     ],
//                 "location":
//                     [
//                         {
//                             "ref-wall": windowWallId02,
//                             "path":
//                                 [
//                                     [windowX01, newZ],
//                                     [windowX02, newZ],
//
//                                 ]
//                         },
//                         {
//                             "ref-wall": "232",
//                             "path":
//                                 [
//                                     [windowX01, newZ - 200],
//                                     [windowX02, newZ - 200],
//
//                                 ]
//                         },
//
//
//                     ]
//             },
//         )
//
//         startDoorZ = newStartDoorZ
//         endDoorZ = newEndDoorZ
//         currentX = newX + 200
//
//     }
// }
//
// /** change Z **/
// for (let j = 0; j < 3; ++j) {
//     mh0 = 0
//     currentZ -= 20000
//     newZ = currentZ + 10000
//
//     /** change H **/
//     const H = Math.floor(Math.random() * 7) + 4
//     for (let i = 0; i < H; ++i) {
//         createFloor()
//         mh0 += 3000
//     }
// }
//
//
// export const flatJSON = (() => {
//     const data = {
//         "rooms": [rooms],
//         "outer-perimeter":
//             [
//                 []
//             ],
//         "inner-perimeters": [ innerPerimeters ],
//         "objects": [objects]
//     }
//
//     return data
// })()
