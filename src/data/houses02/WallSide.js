import { WallElement } from './WallElement'
import { getID } from '../../helpers/getID'


export class WallSideOuter {
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
                if (type === 'door') {
                    const w = new WallElement(this._root, arrLines[i], 'door')
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



export class WallSideInner extends WallSideOuter {
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