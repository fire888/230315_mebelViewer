import { Wall } from './Wall'
import { createFloor } from '../../Entities/meshesFlat/createFloor'
import { createCeiling } from '../../Entities/meshesFlat/createCeiling'
import { getID } from '../../helpers/getID'
import * as THREE from 'three'


const D_MAX = 0
const D_MIN = 8000

let mesh

export class Room {
    constructor(root, center = [0, 0], walls = {}, h = 0, pp = {}) {
        this.id = getID()
        this._root = root

        this.model = new THREE.Group()
        this.model.scale.set(.01, .01, .01)
        this.model.position.y = h
        this._root.studio.addToScene(this.model)

        // if (!mesh) {
        //     root.assets.chairModel.model.scene.children[0].traverse(item => {
        //         if (item instanceof THREE.Mesh) {
        //
        //             mesh = item
        //             //mesh.material.color = 0xffffff
        //             mesh.material.needsUpdate = true
        //             console.log(mesh.material)
        //         }
        //     })
        // }
        // this.chair = new THREE.Mesh(
        //     mesh.geometry,
        //     root.materials.red,
        // )

        // this.chair.position.set(center[0], h, center[1])
        // this.chair.scale.set(1000, 1000, 1000)
        // this.chair.rotation.y = Math.random() * Math.PI * 2
        // this.model.add(this.chair)


        this.sw = pp.sw || [-D_MIN - Math.random() * D_MAX + center[0], D_MIN + Math.random() * D_MAX + center[1]]

        this.nw = pp.nw || [-D_MIN - Math.random() * D_MAX + center[0], -D_MIN - Math.random() * D_MAX + center[1]]
        if (walls.nWall) {
            this.nw = walls.nWall.leftPoints[0]
        }

        this.ne = pp.ne || [D_MIN + Math.random() * D_MAX + center[0], -D_MIN - Math.random() * D_MAX + center[1]]
        if (walls.nWall) {
            this.ne = walls.nWall.leftPoints[1]
        }
        if (walls.eWall) {
            this.ne = walls.eWall.leftPoints[0]
        }


        this.se = pp.se || [D_MIN + Math.random() * D_MAX + center[0], D_MIN + Math.random() * D_MAX + center[1]]
        if (walls.eWall) {
            this.se = walls.eWall.leftPoints[1]
        }

        this.floorPerimeter = [this.nw, this.sw, this.se, this.ne, this.nw]


        this.sWall = new Wall(root, [{ room: this, points: [this.se, this.sw] }], h)
        this.wWall = new Wall(root, [{ room: this, points: [this.sw, this.nw] }], h)
        if (walls.nWall) {
            this.nWall = walls.nWall
            walls.nWall.removeOuterFlag()
        } else {
            this.nWall = new Wall(root, [{ room: this, points: [this.nw, this.ne] }], h)
        }

        if (walls.eWall) {
            this.eWall = walls.eWall
            walls.eWall.removeOuterFlag()
        } else {
            this.eWall = new Wall(root, [{ room: this, points: [this.ne, this.se] }], h)
        }

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