import { Wall } from './Wall'
import { createFloor } from '../../Entities/meshesFlat/createFloor'
import { createCeiling } from '../../Entities/meshesFlat/createCeiling'
import { getID } from '../../helpers/getID'
import * as turf from '@turf/turf'

const D_MAX = 5000
const D_MIN = 2000


export class Room {
    constructor(root, center = [0, 0], walls = {}, h = 0, pp = {}) {
        this.id = getID()
        this._root = root

        this.model = new THREE.Group()
        this.model.scale.set(.01, .01, .01)
        this.model.position.y = h
        this._root.studio.addToScene(this.model)

        this.sw = pp.sw || [-D_MIN - Math.random() * D_MAX + center[0], D_MIN + Math.random() * D_MAX + center[1]]

        this.nw = pp.nw || [-D_MIN - Math.random() * D_MAX + center[0], -D_MIN - Math.random() * D_MAX + center[1]]
        if (walls.nWall) {
            this.nw = walls.nWall.leftPoints[0]
        }

        this.ne = pp.ne || [D_MIN + Math.random() * D_MAX + center[0], -D_MIN - Math.random() * D_MAX + center[1]]
        if (walls.nWall) {
            this.ne = walls.nWall.leftPoints[1]
            walls.nWall.removeOuterFlag()
        }
        this.se = pp.se || [D_MIN + Math.random() * D_MAX + center[0], D_MIN + Math.random() * D_MAX + center[1]]

        this.floorPerimeter = [this.nw, this.sw, this.se, this.ne, this.nw]

        const points = turf.points([...this.floorPerimeter])
        const c = turf.center(points)
        this.center = c.geometry.coordinates

        if (walls.sWall) {
            this.sWall = walls.sWall
        } else {
            this.sWall = new Wall(root, [{ key: 'rightRoom', room: this, points: [this.se, this.sw] }], h)
        }
        this.wWall = new Wall(root, [{ key: 'rightRoom', room: this, points: [this.sw, this.nw] }], h)
        if (walls.nWall) {
            this.nWall = walls.nWall
            this.nWall.isHideByCamera = false
        } else {
            this.nWall = new Wall(root, [{ key: 'rightRoom', room: this, points: [this.nw, this.ne] }], h)
        }
        this.eWall = new Wall(root, [{ key: 'rightRoom', room: this, points: [this.ne, this.se] }], h)
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
        this._floorModel = createFloor({ path: this.floorPerimeter },  this._root.materials.floor)
        this.model.add(this._floorModel)
        this._ceilingModel = createCeiling({  path: this.floorPerimeter, h: 2900 }, this._root.materials)
        this.model.add(this._ceilingModel)

        this.wWall.generateMeshes()
        this.nWall.generateMeshes()
        this.eWall.generateMeshes()
        this.sWall.generateMeshes()
    }
}