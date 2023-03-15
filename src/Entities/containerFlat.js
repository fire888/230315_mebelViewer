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
        const mesh = createDoor(scheme.doors[i], materials.door)
        cont.add(mesh)
    }
    for (let i = 0; i < scheme.floors.length; ++i) {
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