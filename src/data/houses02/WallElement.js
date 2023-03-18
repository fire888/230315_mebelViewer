import { createWall } from '../../Entities/meshesFlat/createWall'
import { createPlinth } from '../../Entities/meshesFlat/createPlinth'
import { createMolding } from '../../Entities/meshesFlat/createMolding'
import { getID } from '../../helpers/getID'



export class WallElement {
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

        } else if (type === 'door') {
            this.model = createWall({
                path: this.points,
                h0: 2000,
                h1: 2900,
            }, this._root.materials.wall)

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