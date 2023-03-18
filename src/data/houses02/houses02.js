import * as turf from '@turf/turf'
import * as THREE from 'three'
import { Room } from './Room' 



const step = 15000
const H = 30


const createFloor = (root, i, j, bottomRooms) => {
    const arr = []

    const pp = bottomRooms 
        ? { 
            sw: bottomRooms[0].sw,
            nw: bottomRooms[0].nw,
            ne: bottomRooms[0].ne,
            se: bottomRooms[0].se,
        } : {}

    const r = new Room(root, [i * step, 0], {},  H * j, pp)
    arr.push(r)

    const n = bottomRooms ? bottomRooms.length : (Math.floor(Math.random() * 3) + 1)
    for (let k = 1; k < n; ++k) {
        const pp = bottomRooms 
        ? { 
            sw: bottomRooms[k].sw,
            nw: bottomRooms[k].nw,
            ne: bottomRooms[k].ne,
            se: bottomRooms[k].se,
        } : {}

        const rTop = new Room(root, [i * step, k * 7000], { nWall: arr[arr.length - 1].sWall }, H * j, pp)
        arr.push(rTop)
    }
    return arr
}



const createDom = (root, i) => {
    const arr = []

    for (let j = 0; j < Math.floor(Math.random() * 10) + 5; ++j) {
        const prevArr = j === 0 ? null : arr[j - 1]
        const floor = createFloor(root, i, j, prevArr)
        arr.push(floor)
    }
    return arr
}


export const createPerimeters = (root) => {
    const arr = []
    for (let i = 0; i < 3; ++i) {
        const dom = createDom(root, i)
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