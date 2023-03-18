import * as THREE from 'three'
//import { flatJSON } from '../data/houses.js'
import { createHouse } from '../data/houses02/houses02.js'
import { createSchemeFlat } from '../helpers/schemeFlat'
import { createMaterials } from '../helpers/createMaterials'
import { createWindow } from './meshesFlat/createWindow'
import { createDoor } from './meshesFlat/createDoor'
import { createWall } from './meshesFlat/createWall'
import { createFloor } from './meshesFlat/createFloor'
import { createCeiling } from './meshesFlat/createCeiling'
import { createPlinth } from './meshesFlat/createPlinth'
import { createMolding } from './meshesFlat/createMolding'




export const createContainerFlat = (root) => {
    const materials = createMaterials(root.assets)
    root.materials = materials
    createHouse(root)
}