import * as turf from '@turf/turf'
import * as THREE from 'three'
import { Room } from './Room' 



const step = 15000
export const createPerimeters = (root) => {
    const arr = []
    for (let i = 0; i < 3; ++i) {
        const r = new Room(root,[i * step, 0])
        arr.push(r)

        for (let j = 1; j < 5; ++j) {
            const rTop = new Room(root, [i * step, j * 7000], { nWall: arr[arr.length - 1].sWall })
            arr.push(rTop)
        }
    }

    for (let i = 0; i < arr.length; ++i) {
        arr[i].generateMeshes()
    }
    return arr
}



export const createHouse = (root) => {
    createPerimeters(root)
}