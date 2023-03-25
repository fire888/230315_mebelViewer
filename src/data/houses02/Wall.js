import { WallSide } from './WallSide'
import { createWindow } from '../../Entities/meshesFlat/createWindow'
import { createDoor } from '../../Entities/meshesFlat/createDoor'
import {
    parallelLine,
    createBufferMesh,
    angleOfLine,
    breakLineToCut,
    getLength,
} from '../../helpers/geomHelper'
import { getID } from '../../helpers/getID'


export class Wall {
    constructor(root, arrRooms, h, isDoor, isWindow) {
        this._root = root
        this.model = new THREE.Group()
        this.model.scale.set(.01, .01, .01)
        this.model.position.y = h
        root.studio.addToScene(this.model)
        this.isHideByCamera = true
        this.isWindow = isWindow
        this.isDoor = isDoor

        this.id = getID()
        this.leftPoints = null
        this.rightPoints = null

        for (let i = 0; i < arrRooms.length; ++i) {
            this.rightPoints = arrRooms[i].points
        }


        this.rightSide = new WallSide(root, this.rightPoints)
        this.rightSide.isOuter = false

        const p = parallelLine([...this.rightPoints[0], ...this.rightPoints[1]], -200)
        this.leftPoints = [
            [p[2], p[3]],
            [p[0], p[1]],
        ]
        this.leftSide = new WallSide(root, this.leftPoints)
        this.leftSide.isOuter = true

    }

    removeOuterFlag() {
        this.leftSide.isOuter = false
        this.isHideByCamera = false
    }


    generateMeshes() {
        if (this._isGenerated) {
            return;
        }
        this._isGenerated = true

        {
            const Y0 = -200
            const v = [
                // top
                this.leftPoints[0][0], 2900, this.leftPoints[0][1],
                this.leftPoints[1][0], 2900, this.leftPoints[1][1],
                this.rightPoints[0][0], 2900, this.rightPoints[0][1],

                this.leftPoints[0][0], 2900, this.leftPoints[0][1],
                this.rightPoints[0][0], 2900, this.rightPoints[0][1],
                this.rightPoints[1][0], 2900, this.rightPoints[1][1],

                // left
                this.leftPoints[0][0], Y0, this.leftPoints[0][1],
                this.leftPoints[0][0], 2900, this.leftPoints[0][1],
                this.rightPoints[1][0], 2900, this.rightPoints[1][1],

                this.leftPoints[0][0], Y0, this.leftPoints[0][1],
                this.rightPoints[1][0], 2900, this.rightPoints[1][1],
                this.rightPoints[1][0], Y0, this.rightPoints[1][1],

                //right
                this.leftPoints[1][0], Y0, this.leftPoints[1][1],
                this.rightPoints[0][0], Y0, this.rightPoints[0][1],
                this.rightPoints[0][0], 2900, this.rightPoints[0][1],

                this.leftPoints[1][0], Y0, this.leftPoints[1][1],
                this.rightPoints[0][0], 2900, this.rightPoints[0][1],
                this.leftPoints[1][0], 2900, this.leftPoints[1][1],
            ]
            this._cap = createBufferMesh(v, this._root.materials.room)
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
            this.model.visible = dot < 25
        })

        this._type = 'none'

        let l = 0
        let offset = 0
        if (this.isWindow) {
            l = 1700
            offset = .45
            this._type = 'window'
        }
        if (this.isDoor) {
            l = 800
            offset = .68
            this._type = 'door'
        }

        if (l) {
            const { lines, phases } = breakLineToCut(this.rightPoints[0], this.rightPoints[1], l, offset)
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

            if (this.isWindow) {
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

            if (this.isDoor) {
                this.door = createDoor({
                    h0: 0,
                    h1: 2000,
                    p1: pointsBreakRight[1][0],
                    p2: pointsBreakRight[1][1],
                    p4: pointsBreakLeft[1][1],
                    p3: pointsBreakLeft[1][0],
                }, this._root.materials.door)
                this.model.add(this.door)
            }

            this.rightSide.generateMeshes(pointsBreakRight, this._type)
            this.model.add(this.rightSide.model)

            this.leftSide.generateMeshes(pointsBreakLeft, this._type)
            this.model.add(this.leftSide.model)
        } else {
            this.rightSide.generateMeshes([this.rightPoints])
            this.leftSide.generateMeshes([this.leftPoints])
            this.model.add(this.rightSide.model)
            this.model.add(this.leftSide.model)
        }
    }

}