// FLAT

// env
import nx from '../assets/env00/nx.jpg'
import px from '../assets/env00/px.jpg'
import ny from '../assets/env00/ny.jpg'
import py from '../assets/env00/py.jpg'
import nz from '../assets/env00/nz.jpg'
import pz from '../assets/env00/pz.jpg'


// floor
import floor00map from '../assets/floor01/tavern-wood-planks1_albedo.png'
import floor00aoMap from '../assets/floor01/tavern-wood-planks1_ao.png'
import floor00normalMap from '../assets/floor01/tavern-wood-planks1_normal-ogl.png'
import floor00specularMap from '../assets/floor01/tavern-wood-planks1_roughness.png'


// ceiling
import ceiling00ao from '../assets/ceiling00/ceiling00ao.jpg'


// wall
import wall00Map from '../assets/wallinner00/fiber-textured-wall1_albedo.png'
import wall00aoMap from '../assets/wallinner00/fiber-textured-wall1_ao.png'
import wall00normalMap from '../assets/wallinner00/fiber-textured-wall1_normal-ogl.png'


//import wall00Map from '../assets/wall00Map.jpg'
import aoMap from '../assets/w_ao.jpg'



// FURNITURE

import m00 from '../assets/00_journal_table/Julia_Grup_Brick__corona.fbx'
import '../assets/00_journal_table/Julia_Grup_Brick_105.png'
import '../assets/00_journal_table/Julia_Grup_Brick_новое-дерево_170.jpg'

import m01 from '../assets/01_vena/01_vena.FBX'

import m02 from '../assets/02_divan_scandi_3/Scandi_3_3D_FBX.FBX'
import '../assets/02_divan_scandi_3/c3b2fdf4355b.jpg'
import '../assets/02_divan_scandi_3/10eb4.jpg'
import '../assets/02_divan_scandi_3/baxter_viktor5_bump1.jpg'
import '../assets/02_divan_scandi_3/baxter_viktor5_reflect1.png'
import '../assets/02_divan_scandi_3/Scandi_col01.jpg'

import m04 from '../assets/04_brighon/04_wall.FBX'
import '../assets/04_brighon/14-10418-002_Дуб Делано.jpg'
import '../assets/04_brighon/c3b2fdf4355b.jpg'
import '../assets/04_brighon/d2e611dca1c6.jpg'
import '../assets/04_brighon/f661d4030944.jpg'
import '../assets/04_brighon/mut-1.jpg'
import '../assets/04_brighon/UV_Checker.png'

import m05 from '../assets/00_journal_table_01/00_jt_01.FBX'



export const ASSETS = [
    { key: 'env00', src: [nx, px, ny, py, nz, pz], typeLoader: 'imgCube' },

    { key: 'aoMap', src: aoMap, typeLoader: 'img' },

    //{ key: 'ceiling00ao', src: ceiling00ao, typeLoader: 'img', repeat: true },

    { key: 'floor00map', src: floor00map, typeLoader: 'img', repeat: true },
    { key: 'floor00aoMap', src: floor00aoMap, typeLoader: 'img', repeat: true },
    { key: 'floor00normalMap', src: floor00normalMap, typeLoader: 'img', repeat: true },
    { key: 'floor00specularMap', src: floor00specularMap, typeLoader: 'img', repeat: true },

    { key: 'wall00map', src: wall00Map, typeLoader: 'img',  repeat: true },
    { key: 'wall00aoMap', src: wall00aoMap, typeLoader: 'img',  repeat: true },
    { key: 'wall00normalMap', src: wall00normalMap, typeLoader: 'img',  repeat: true },

    { key: 'm00', src: m00, typeLoader: 'fbx', pos: [0, 0, 0], rot: 0 }, // stool
    { key: 'm01', src: m01, typeLoader: 'fbx',  pos: [-40, 0, -30], rot: Math.PI / 2}, // bad
    { key: 'm02', src: m02, typeLoader: 'fbx',  pos: [-40, 0, 20], rot: Math.PI / 2 }, // sofa
    { key: 'm04', src: m04, typeLoader: 'fbx',  pos: [-20, 0, -45], rot: 0 }, // long
    { key: 'm05', src: m05, typeLoader: 'fbx',  pos: [-80, 0, 120], rot: 0 },
]