import * as THREE from 'three'
//import { flatJSON } from '../data/houses.js'
import { flatJSON } from '../data/houses02.js'
import { createSchemeFlat } from '../helpers/schemeFlat'
import { createMaterials } from '../helpers/createMaterials'
import { createWindow } from './meshesFlat/createWindow'
import { createDoor } from './meshesFlat/createDoor'
import { createWall } from './meshesFlat/createWall'
import { createFloor } from './meshesFlat/createFloor'
import { createCeiling } from './meshesFlat/createCeiling'
import { createPlinth } from './meshesFlat/createPlinth'
import { createMolding } from './meshesFlat/createMolding'




export const  createContainerFlat = (root) => {
    const materials = createMaterials(root.assets)

    const cont = new THREE.Object3D() 
    cont.scale.set(0.01, 0.01, 0.01)


    const scheme = createSchemeFlat(flatJSON)
    console.log(scheme)


    for (let i = 0; i < scheme.windows.length; ++i) {
        const mesh = createWindow(scheme.windows[i], materials)
        mesh.position.y += scheme.windows[i].mh0
        cont.add(mesh)
    }

    for (let i = 0; i < scheme.doors.length; ++i) {
        const mesh = createDoor(scheme.doors[i], materials.door)
        mesh.position.y += scheme.doors[i].mh0
        cont.add(mesh)

        /** floor under door */
        const path = [
            scheme.doors[i].p1,
            scheme.doors[i].p2,
            scheme.doors[i].p3,
            scheme.doors[i].p4,
            scheme.doors[i].p1,
        ]
        const meshF = createFloor({path}, materials.floor)
        meshF.position.y += scheme.doors[i].mh0
        cont.add(meshF)
    }


    for (let key in scheme.rooms) {
        const floorData =  scheme.rooms[key].floor
        const mesh = createFloor(floorData, materials.floor)
        mesh.position.y += floorData.mh0
        cont.add(mesh)

        const meshC = createCeiling(floorData, materials)
        meshC.position.y += floorData.mh0
        cont.add(meshC)


        for (let wInd = 0; wInd < scheme.rooms[key].walls.length; ++wInd) {
            const wallData = scheme.rooms[key].walls[wInd]
            const mesh = createWall(wallData, materials.wall)
            mesh.position.y += wallData.mh0
            cont.add(mesh)

            if (wallData.tag !== 'overDoor') {
                const mPl = createPlinth(wallData, materials)
                mPl.position.y += wallData.mh0
                cont.add(mPl)
            }

            const mPl = createMolding(wallData, materials)
            mPl.position.y += wallData.mh0
            cont.add(mPl)
        }
    }
    return { mesh: cont }
}