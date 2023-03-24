import * as turf from '@turf/turf'
import * as THREE from 'three'
//import { Room } from './Room'
import { RoomForFurniture } from './RoomForFurniture'



const step = 30000
const H = 30
const W = 5000



const createFloor = (root, houseIndex, floorIndex, bottomRooms) => {
    const arrLines = []

    const createLine = (indexLine) => {
        const arrLine = []

        for (let i = 0; i < 1; ++i) {

            let pp = {}
            if (
                bottomRooms &&
                bottomRooms[indexLine] &&
                bottomRooms[indexLine][i]
            ) {
                const bottomRoom = bottomRooms[indexLine][i]
                pp = {
                    nw: bottomRoom.nw,
                    ne: bottomRoom.ne,
                    se: bottomRoom.se,
                    sw: bottomRoom.sw,
                }
            }

            const nWall = (arrLines[arrLines.length - 1] && arrLines[arrLines.length - 1][i]) ? arrLines[arrLines.length - 1][i].sWall : null
            const eWall = arrLine[arrLine.length - 1] ? arrLine[arrLine.length - 1].wWall : null
            const r = new RoomForFurniture(
                 root,
                 [houseIndex * step - (W * i), indexLine * W],
                {
                    nWall,
                    eWall,
                },
                floorIndex * H,
                pp,
            )
            arrLine.push(r)
        }

        return arrLine
    }

    for (let i = 0; i < 1; ++i) {
        const line = createLine(i)
        arrLines.push(line)
    }

    return arrLines
}



const createDom = (root, houseIndex) => {
    const arr = []

    const floorsNum = 1 //3//Math.floor(Math.random() * 10) + 5

    for (let floorIndex = 0; floorIndex < floorsNum; ++floorIndex) {
        const prevArr = floorIndex === 0 ? null : arr[floorIndex - 1]
        const floor = createFloor(root, houseIndex, floorIndex, prevArr)
        arr.push(floor)
    }
    return arr
}


export const createPerimeters = (root) => {
    const arr = []

    const houseFullCount = 1//3

    for (let houseIndex = 0; houseIndex < houseFullCount; ++houseIndex) {
        const dom = createDom(root, houseIndex)
        arr.push(dom) 
    }

    for (let i = 0; i < arr.length; ++i) {
        for (let j = 0; j < arr[i].length; ++j) {
            for (let k = 0; k < arr[i][j].length; ++k) {
                for (let l = 0; l < arr[i][j][k].length; ++l) {
                    arr[i][j][k][l].generateMeshes()
                }
            }
        }
    }
}



export const createHouse = (root) => {
    createPerimeters(root)
}