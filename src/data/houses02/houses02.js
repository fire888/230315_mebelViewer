import * as turf from '@turf/turf'
import * as THREE from 'three'
import { createFloor } from '../../Entities/meshesFlat/createFloor'
import { createCeiling } from '../../Entities/meshesFlat/createCeiling'
import { createWall } from '../../Entities/meshesFlat/createWall'
import { createPlinth } from '../../Entities/meshesFlat/createPlinth'
import { createMolding } from '../../Entities/meshesFlat/createMolding'
import { createWindow } from '../../Entities/meshesFlat/createWindow'
import {
    parallelLine,
    createBufferMesh,
    angleOfLine,
    breakLineToCut,
    getLength,
} from '../../helpers/geomHelper'


let id = 0
let getID = () => {
    id += 1
    return id
}


const D_MAX = 5000
const D_MIN = 2000



class WallElement {
    constructor(root, points, type) {

        this.points = points
        this._root = root

        if (type === 'window') {
            this.model = createWall({
                path: this.points,
                h0: 0,
                h1: 960,
            }, this._root.materials.wall)

            const m = createWall({
                path: this.points,
                h0: 2660,
                h1: 2900,
            }, this._root.materials.wall)
            this.model.add(m)

        } else {
            this.model = createWall({
                path: this.points,
                h0: 0,
                h1: 2900,
            }, this._root.materials.wall)
        }
    }

    generatePlinth () {
        this._plinth = createPlinth({
            path: this.points
        }, this._root.materials)
        this.model.add(this._plinth)
    }

    generateMolding () {
        this._molding = createMolding({
            h1: 2900,
            path: this.points
        }, this._root.materials)
        this.model.add(this._molding)
    }
}



class WallSideOuter {
    constructor(root, points) {
        this._root = root
        this.id = getID()
        this.points = points

        this.model = new THREE.Group()
        this.arrMeshes = []
    }

    generateMeshes(arrLines, type) {

        for (let i = 0; i < arrLines.length; ++i) {
            if (i === 1) {
                if (type === 'window') {
                    const w = new WallElement(this._root, arrLines[i], 'window')
                    this.arrMeshes.push(w)
                    this.model.add(w.model)
                }
            } else {
                const w = new WallElement(this._root, arrLines[i])
                this.arrMeshes.push(w)
                this.model.add(w.model)
            }


        }
    }
}



class WallSideInner extends WallSideOuter {
    constructor(root, points) {
        super(root, points)
    }

    generateMeshes() {
        super.generateMeshes(...arguments)

        for (let i = 0; i < this.arrMeshes.length; ++i) {
            this.arrMeshes[i].generatePlinth()
            this.arrMeshes[i].generateMolding()
        }
    }
}



class Wall {
    constructor(root, arrRooms) {
        this._root = root
        this.model = new THREE.Group()
        this.model.scale.set(.01, .01, .01)
        root.studio.addToScene(this.model)
        this.isHideByCamera = true

        this.id = getID()

        this.leftRoom = null
        this.leftPoints = null

        this.rightRoom = null
        this.rightPoints = null

        for (let i = 0; i < arrRooms.length; ++i) {
            if (arrRooms[i].key === 'leftRoom') {
                this.leftRoom = arrRooms[i].room
                this.leftPoints = arrRooms[i].points
            }
            if (arrRooms[i].key === 'rightRoom') {
                this.rightRoom = arrRooms[i].room
                this.rightPoints = arrRooms[i].points
            }
        }

        this.leftSide = null
        this.rightSide = null

        if (this.rightRoom) {
            this.rightSide = new WallSideInner(root, this.rightPoints)
        }

        if (this.leftRoom) {
            this.leftSide = new WallSideInner(root, this.leftPoints)
        } else {
            const p = parallelLine([...this.rightPoints[0], ...this.rightPoints[1]], -200)
            this.leftPoints = [
                [p[2], p[3]],
                [p[0], p[1]],
            ]
            this.leftSide = new WallSideOuter(root, this.leftPoints)
        }
    }

    getJsonWallsInner() {
        return [
            {
                mh0: 0,
                "id": this.id,
                "class": "inner-wall",
                "type": "solid",
                "ref-room": this.rightRoom.id,
                "path": this.rightPoints,
            }
        ]
    }

    generateMeshes() {
        if (this._isGenerated) {
            return;
        }
        this._isGenerated = true

        {
            const v = [
                // top
                this.leftPoints[0][0], 2900, this.leftPoints[0][1],
                this.leftPoints[1][0], 2900, this.leftPoints[1][1],
                this.rightPoints[0][0], 2900, this.rightPoints[0][1],

                this.leftPoints[0][0], 2900, this.leftPoints[0][1],
                this.rightPoints[0][0], 2900, this.rightPoints[0][1],
                this.rightPoints[1][0], 2900, this.rightPoints[1][1],

                // left
                this.leftPoints[0][0], 0, this.leftPoints[0][1],
                this.leftPoints[0][0], 2900, this.leftPoints[0][1],
                this.rightPoints[1][0], 2900, this.rightPoints[1][1],

                this.leftPoints[0][0], 0, this.leftPoints[0][1],
                this.rightPoints[1][0], 2900, this.rightPoints[1][1],
                this.rightPoints[1][0], 0, this.rightPoints[1][1],

                //right
                this.leftPoints[1][0], 0, this.leftPoints[1][1],
                this.rightPoints[0][0], 0, this.rightPoints[0][1],
                this.rightPoints[0][0], 2900, this.rightPoints[0][1],

                this.leftPoints[1][0], 0, this.leftPoints[1][1],
                this.rightPoints[0][0], 2900, this.rightPoints[0][1],
                this.leftPoints[1][0], 2900, this.leftPoints[1][1],
            ]
            this._cap = createBufferMesh(v, this._root.materials.plinth)
            this.model.add(this._cap)
        }

        this.angle = angleOfLine(this.rightPoints[0][0], this.rightPoints[0][1], this.rightPoints[1][0], this.rightPoints[1][1])
        this.normal = new THREE.Vector3(
            this.rightPoints[1][0] - this.rightPoints[0][0],
            0,
            this.rightPoints[1][1] - this.rightPoints[0][1],
        ).normalize().applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)


        this._root.studio.onCameraMove(cameraDir => {
            if (!this.isHideByCamera) {
                return;
            }
            const dot = this.normal.dot(cameraDir)
            this.model.visible = dot < .8
        })

        const isWindow = this.isHideByCamera
        this._type = isWindow ? 'window': 'door'

        let l = 800
        if (this._type) {
            l = getLength(
                this.rightPoints[0][0],
                this.rightPoints[0][1],
                this.rightPoints[1][0],
                this.rightPoints[1][1],
            ) * Math.random() * .5 + .3
        }

        const { lines, phases } = breakLineToCut(this.rightPoints[0], this.rightPoints[1], l)
        const pointsBreakRight = lines
        const leftDifX = this.leftPoints[1][0] - this.leftPoints[0][0]
        const leftDifZ = this.leftPoints[1][1] - this.leftPoints[0][1]
        const left1 = [
            this.leftPoints[0],
            [
                this.leftPoints[0][0] + leftDifX * (1 - phases[1]),
                this.leftPoints[0][1] + leftDifZ * (1 - phases[1]),
            ]
        ]
        const left2 = [
            left1[1],
            [
                this.leftPoints[0][0] + leftDifX * (1 - phases[0]),
                this.leftPoints[0][1] + leftDifZ * (1 - phases[0]),
            ]
        ]
        const left3 = [
            left2[1],
            this.leftPoints[1],
        ]

        const pointsBreakLeft = [left1, left2, left3]


        if (isWindow) {
            this.window = createWindow({
                w: l,
                h: 1700,
                h0: 960,
                h1: 2660,
                p1: pointsBreakRight[1][1],
                p2: pointsBreakRight[1][0],
                p3: pointsBreakRight[1][1],
                p4: pointsBreakRight[1][0],
                t: 200,
            }, this._root.materials)
            this.model.add(this.window)
        }

        if (pointsBreakRight) {
            console.log(pointsBreakRight)
            this.rightSide.generateMeshes(pointsBreakRight, this._type)
        } else {
            //this.rightSide.generateMeshes([this.rightPoints])
        }
        this.model.add(this.rightSide.model)


        if (pointsBreakLeft) {
            //this.leftSide.generateMeshes(pointsBreakLeft, this._type)
            this.leftSide.generateMeshes(pointsBreakLeft, this._type)
        } else {
            //this.leftSide.generateMeshes([this.leftPoints])
        }
        this.model.add(this.leftSide.model)
    }
}



class Room {
    constructor(root, center = [0, 0], walls = {}) {
        this.id = getID()
        this._root = root

        this.model = new THREE.Group()
        this.model.scale.set(.01, .01, .01)
        this._root.studio.addToScene(this.model)

        this.sw = [-D_MIN - Math.random() * D_MAX + center[0], D_MIN + Math.random() * D_MAX + center[1]]
        if (walls.sWall) {
            this.sw = walls.sWall.rightPoints[0]
        }

        this.nw = [-D_MIN - Math.random() * D_MAX + center[0], -D_MIN - Math.random() * D_MAX + center[1]]
        if (walls.nWall) {
            this.nw = walls.nWall.rightPoints[1]
        }

        this.ne = [D_MIN + Math.random() * D_MAX + center[0], -D_MIN - Math.random() * D_MAX + center[1]]
        if (walls.nWall) {
            this.ne = walls.nWall.rightPoints[0]
        }
        this.se = [D_MIN + Math.random() * D_MAX + center[0], D_MIN + Math.random() * D_MAX + center[1]]
        if (walls.sWall) {
            this.se = walls.sWall.rightPoints[1]
        }

        this.floorPerimeter = [this.nw, this.sw, this.se, this.ne, this.nw]

        const points = turf.points([...this.floorPerimeter])
        const c = turf.center(points)
        this.center = c.geometry.coordinates

        if (walls.sWall) {
            this.sWall = walls.sWall
        } else {
            this.sWall = new Wall(root, [{ key: 'rightRoom', room: this, points: [this.se, this.sw] }])
        }
        this.wWall = new Wall(root, [{ key: 'rightRoom', room: this, points: [this.sw, this.nw] }])
        if (walls.nWall) {
            this.nWall = walls.nWall
            this.nWall.isHideByCamera = false
        } else {
            this.nWall = new Wall(root, [{ key: 'rightRoom', room: this, points: [this.nw, this.ne] }])
        }
        this.eWall = new Wall(root, [{ key: 'rightRoom', room: this, points: [this.ne, this.se] }])
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


const step = 15000
export const createPerimeters = (root) => {
    const arr = []
    for (let i = 0; i < 3; ++i) {
        const r = new Room(root,[i * step, 0])
        arr.push(r)

        // const r1 = new Room(root,[i * step, -1500], { sWall})
        // arr.push(r1)


        for (let j = 1; j < 5; ++j) {
            const rTop = new Room(root, [i * step, j * 7000], { nWall: arr[arr.length - 1].sWall })
            arr.push(rTop)
        }

        // const rTopTop = new Room(root, [i * step, 14000], { nWall: rTop.sWall })
        // arr.push(rTopTop)
    }

    for (let i = 0; i < arr.length; ++i) {
        arr[i].generateMeshes()
    }
    return arr
}



export const createHouse = (root) => {
    createPerimeters(root)
}