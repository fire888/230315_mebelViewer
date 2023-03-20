import { WallElement } from './WallElement'
import { getID } from '../../helpers/getID'


export class WallSide {
    constructor(root, points) {
        this._root = root
        this.id = getID()
        this.points = points

        this.model = new THREE.Group()
        this.arrMeshes = []

        this.isOuter = true
    }

    generateMeshes(arrLines, type) {
        for (let i = 0; i < arrLines.length; ++i) {
            if (i === 1) {
                if (type === 'window') {
                    const w = new WallElement(this._root, arrLines[i], 'window')
                    if (!this.isOuter) {
                        w.generateMolding()
                        w.generatePlinth()
                    }
                    this.arrMeshes.push(w)
                    this.model.add(w.model)
                }
                if (type === 'door') {
                    const w = new WallElement(this._root, arrLines[i], 'door')
                    if (!this.isOuter) {
                        w.generateMolding()
                    }
                    this.arrMeshes.push(w)
                    this.model.add(w.model)
                }
            } else {
                const w = new WallElement(this._root, arrLines[i])
                if (!this.isOuter) {
                    w.generateMolding()
                    w.generatePlinth()
                }
                this.arrMeshes.push(w)
                this.model.add(w.model)
            }
        }
    }
}
