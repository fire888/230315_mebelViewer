import * as THREE from 'three'
import { flatJSON } from '../data/singleRoom.js'
import { createSchemeFlat } from '../helpers/schemeFlat'
import { createMaterials } from '../helpers/createMaterials'
import { createWindow } from './meshesFlat/createWindow'
import { createDoor } from './meshesFlat/createDoor'
import { createWall } from './meshesFlat/createWall'
import { createFloor } from './meshesFlat/createFloor'
import { createCeiling } from './meshesFlat/createCeiling'
import { createPlinth } from './meshesFlat/createPlinth'
import { createMolding } from './meshesFlat/createMolding'


const creaters = {
    'window': createWindow,
    'door': createDoor,
    'wall': createWall,
    'floor': createFloor,
}


export const  createContainerFlat = (root) => {
    const materials = createMaterials(root.assets)

    const cont = new THREE.Object3D() 
    cont.scale.set(0.01, 0.01, 0.01)


    const scheme = createSchemeFlat(flatJSON)


    for (let i = 0; i < scheme.windows.length; ++i) {
        const mesh = createWindow(scheme.windows[i], materials)
        cont.add(mesh)
    }
    for (let i = 0; i < scheme.doors.length; ++i) {
        console.log(scheme.doors[i])
        const mesh = createDoor(scheme.doors[i], materials.door)
        cont.add(mesh)

        /** floor under door */
        const path = [
            scheme.doors[i].p1,
            scheme.doors[i].p2,
            scheme.doors[i].p3,
            scheme.doors[i].p4,
            scheme.doors[i].p1,
        ]
        const meshF = createFloor({
            path,
        }, materials.floor)
        cont.add(meshF)
    }
    for (let i = 0; i < scheme.floors.length; ++i) {
        console.log(scheme.floors[i])
        const mesh = createFloor(scheme.floors[i], materials.floor)
        cont.add(mesh)
    }
    for (let i = 0; i < scheme.floors.length; ++i) {
        const mesh = createCeiling(scheme.floors[i], materials)
        cont.add(mesh)
    }
    for (let i = 0; i < scheme.walls.length; ++i) {
        const mesh = createWall(scheme.walls[i], materials.wall)
        cont.add(mesh)
        if (scheme.walls[i].tag !== 'overDoor') {
            const mPl = createPlinth(scheme.walls[i], materials)
            cont.add(mPl)
        }
        const mPl = createMolding(scheme.walls[i], materials)
        cont.add(mPl)
    }

    return { mesh: cont }
}