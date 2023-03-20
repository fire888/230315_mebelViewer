import * as turf from '@turf/turf'
import * as THREE from 'three'
import { Room } from './Room' 



const step = 20000
const H = 30
const W = 5000



const createFloor = (root, houseIndex, floorIndex, bottomRooms) => {
    const arr = []

    const pp = bottomRooms 
        ? { 
            sw: bottomRooms[0].sw,
            nw: bottomRooms[0].nw,
            ne: bottomRooms[0].ne,
            se: bottomRooms[0].se,
        } : {}

    const r = new Room(
        root,
        [houseIndex * step, 0],
        {},
        H * floorIndex,
        pp
    )
    arr.push(r)

    const rW = new Room(
         root,
         [houseIndex * step - W, 0],
        {
            eWall: r.wWall,
        },
         H * floorIndex,
         pp
    )
    arr.push(rW)

    const rS = new Room(
        root,
        [houseIndex * step, W],
        {
            nWall: r.sWall,
        },
        H * floorIndex,
        pp
    )
    arr.push(rS)

    const rWS = new Room(
        root,
        [houseIndex * step - W, W],
        {
            nWall: rW.sWall,
            eWall: rS.wWall,
        },
        H * floorIndex,
        pp
    )
    arr.push(rWS)

    const rWSS = new Room(
        root,
        [houseIndex * step - W, W * 2],
        {
            nWall: rWS.sWall,
        },
        H * floorIndex,
        pp
    )
    arr.push(rWSS)

    const rWSW = new Room(
        root,
        [houseIndex * step - W * 2, W],
        {
            eWall: rWS.wWall,
        },
        H * floorIndex,
        pp
    )
    arr.push(rWSW)

    const rWSWS = new Room(
        root,
        [houseIndex * step - W * 2, W * 2],
        {
            eWall: rWSS.wWall,
            nWall: rWSW.sWall,
        },
        H * floorIndex,
        pp
    )
    arr.push(rWSWS)





    // const fullNumSouthRoomsRandom = Math.floor(Math.random() * 3) + 1
    //
    // const fullNumSouthRooms = bottomRooms ? bottomRooms.length : fullNumSouthRoomsRandom
    // for (let indexRoomS = 1; indexRoomS < fullNumSouthRooms; ++indexRoomS) {
    //     const pp = bottomRooms
    //     ? {
    //         sw: bottomRooms[indexRoomS].sw,
    //         nw: bottomRooms[indexRoomS].nw,
    //         ne: bottomRooms[indexRoomS].ne,
    //         se: bottomRooms[indexRoomS].se,
    //     } : {}
    //
    //     const rBottom = new Room(
    //         root,
    //         [houseIndex * step, indexRoomS * 7000],
    //         { nWall: arr[arr.length - 1].sWall },
    //         H * floorIndex,
    //         pp
    //     )
    //     arr.push(rBottom)
    // }
    return arr
}



const createDom = (root, houseIndex) => {
    const arr = []

    //const floorsNum = Math.floor(Math.random() * 10) + 5
    const floorsNum = 1//Math.floor(Math.random() * 10) + 5

    for (let floorIndex = 0; floorIndex < floorsNum; ++floorIndex) {
        const prevArr = floorIndex === 0 ? null : arr[floorIndex - 1]
        const floor = createFloor(root, houseIndex, floorIndex, prevArr)
        arr.push(floor)
    }
    return arr
}


export const createPerimeters = (root) => {
    const arr = []

    const houseFullCount = 3

    for (let houseIndex = 0; houseIndex < houseFullCount; ++houseIndex) {
        const dom = createDom(root, houseIndex)
        arr.push(dom) 
    }

    for (let i = 0; i < arr.length; ++i) {
        for (let j = 0; j < arr[i].length; ++j) {
            for (let k = 0; k < arr[i][j].length; ++k) {
                arr[i][j][k].generateMeshes()
            }
        }
    }
}



export const createHouse = (root) => {
    createPerimeters(root)
}