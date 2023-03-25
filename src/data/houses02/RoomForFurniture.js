import { Wall } from './Wall'
import { createFloor } from '../../Entities/meshesFlat/createFloor'
import { createCeiling } from '../../Entities/meshesFlat/createCeiling'
import { getID } from '../../helpers/getID'
import * as THREE from 'three'


const D_MAX = 0
const D_MIN = 12000

let mesh

const X_MAX = 2900
const X_MIN = -2950
const Z_MAX = 2100
const Z_MII = -2200

export class RoomForFurniture {
    constructor(root, center = [0, 0], walls = {}, h = 0, pp = {}) {
        this.id = getID()
        this._root = root

        this.model = new THREE.Group()
        this.model.scale.set(.01, .01, .01)
        this.model.position.y = h
        this._root.studio.addToScene(this.model)

        this.sw = [X_MIN, Z_MAX]
        this.nw = [X_MIN, Z_MII]
        this.ne = [X_MAX, Z_MII]
        this.se = [X_MAX, Z_MAX]


        this.floorPerimeter = [this.nw, this.sw, this.se, this.ne, this.nw]


        this.sWall = new Wall(root, [{ room: this,  points: [this.se, this.sw], }], h, false, false, 's',)
        this.wWall = new Wall(root, [{ room: this,  points: [this.sw, this.nw],}], h, true, false, 'w',)
        this.nWall = new Wall(root, [{ room: this, points: [this.nw, this.ne], }], h, false, false, 'n')
        this.eWall = new Wall(root, [{ room: this, points: [this.ne, this.se], }], h, false, true, 'e')

    }

    getJsonRoom() {
        return {
            id: this.id,
            mh0: 0,
            path: this.floorPerimeter,
            parameters: [
                { height : 2900 },
            ],
            "class": "bedroom",
        }
    }

    getJsonWallsInner() {
        return [
            ...this.wWall.getJsonWallsInner(),
            ...this.nWall.getJsonWallsInner(),
            ...this.eWall.getJsonWallsInner(),
            ...this.sWall.getJsonWallsInner(),
        ]
    }

    generateMeshes () {
        this._floorModel = createFloor({ path: this.floorPerimeter },  this._root.materials)
        this.model.add(this._floorModel)
        this._ceilingModel = createCeiling({  path: this.floorPerimeter, h: 2900 }, this._root.materials)
        this.model.add(this._ceilingModel)

        this.wWall.generateMeshes()
        this.nWall.generateMeshes()
        this.eWall.generateMeshes()
        this.sWall.generateMeshes()
    }
}