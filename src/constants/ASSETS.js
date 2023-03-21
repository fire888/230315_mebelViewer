// FLAT

// env
import nx from '../assets/env00/nx.jpg'
import px from '../assets/env00/px.jpg'
import ny from '../assets/env00/ny.jpg'
import py from '../assets/env00/py.jpg'
import nz from '../assets/env00/nz.jpg'
import pz from '../assets/env00/pz.jpg'


// floor
import floor00map from '../assets/floor01/tavern-wood-planks1_albedo.jpg'
import floor00aoMap from '../assets/floor01/tavern-wood-planks1_ao.jpg'
import floor00normalMap from '../assets/floor01/tavern-wood-planks1_normal-ogl.jpg'
import floor00specularMap from '../assets/floor01/tavern-wood-planks1_roughness.jpg'


// ceiling
//import ceiling00ao from '../assets/ceiling00/ceiling00ao.jpg'


// wall
// import wall00Map from '../assets/wallinner00/fiber-textured-wall1_albedo.png'
import wall00aoMap from '../assets/wallinner00/fiber-textured-wall1_ao.jpg'
import wall00normalMap from '../assets/wallinner00/fiber-textured-wall1_normal-ogl.jpg'


//import wall00Map from '../assets/wall00Map.jpg'
import aoMap from '../assets/w_ao.jpg'

import chair from '../assets/wooden_chair.glb'



// FURNITURE

// import m00 from '../assets/00_journal_table/Julia_Grup_Brick__corona.fbx'
// import '../assets/00_journal_table/Julia_Grup_Brick_105.png'
// import '../assets/00_journal_table/Julia_Grup_Brick_новое-дерево_170.jpg'

// import m01 from '../assets/01_vena/01_vena.FBX'

// import m02 from '../assets/02_divan_scandi_3/Scandi_3_3D_FBX.FBX'
// import '../assets/02_divan_scandi_3/c3b2fdf4355b.jpg'
// import '../assets/02_divan_scandi_3/10eb4.jpg'
// import '../assets/02_divan_scandi_3/baxter_viktor5_bump1.jpg'
// import '../assets/02_divan_scandi_3/baxter_viktor5_reflect1.png'
// import '../assets/02_divan_scandi_3/Scandi_col01.jpg'

// import m04 from '../assets/04_brighon/04_wall.FBX'
// import '../assets/04_brighon/14-10418-002_Дуб Делано.jpg'
// import '../assets/04_brighon/c3b2fdf4355b.jpg'
// import '../assets/04_brighon/d2e611dca1c6.jpg'
// import '../assets/04_brighon/f661d4030944.jpg'
// import '../assets/04_brighon/mut-1.jpg'
// import '../assets/04_brighon/UV_Checker.png'

// import m05 from '../assets/00_journal_table_01/00_jt_01.FBX'

import m01 from '../assets/1/1.fbx'
import '../assets/1/1_d.jpg'
import '../assets/1/1_n.jpg'
import m02 from '../assets/1/2.fbx'
import '../assets/1/2_d.jpg'
import '../assets/1/2_n.jpg'
import '../assets/1/3_d.jpg'
import '../assets/1/4_s.jpg'
import '../assets/1/5_d.jpg'
import '../assets/1/6_d.jpg'
import '../assets/1/6_n.jpg'
import m08 from '../assets/1/8.fbx'
import m09 from '../assets/1/9.fbx'
import m10 from '../assets/1/10.fbx'
import m11 from '../assets/1/11.fbx'
import m13 from '../assets/1/13.fbx'
import m14 from '../assets/1/14.fbx'
import '../assets/1/m1_ao.jpg'
import '../assets/1/m8_ao.jpg'
import '../assets/1/m13_ao.jpg'
import '../assets/1/m14_ao.jpg'



export const ASSETS = [
    { key: 'env00', src: [nx, px, ny, py, nz, pz], typeLoader: 'imgCube' },

    { key: 'aoMap', src: aoMap, typeLoader: 'img' },

    //{ key: 'ceiling00ao', src: ceiling00ao, typeLoader: 'img', repeat: true },

    { key: 'floor00map', src: floor00map, typeLoader: 'img', repeat: true },
    { key: 'floor00aoMap', src: floor00aoMap, typeLoader: 'img', repeat: true },
    { key: 'floor00normalMap', src: floor00normalMap, typeLoader: 'img', repeat: true },
    { key: 'floor00specularMap', src: floor00specularMap, typeLoader: 'img', repeat: true },

    //{ key: 'wall00map', src: wall00Map, typeLoader: 'img',  repeat: true },
    { key: 'wall00aoMap', src: wall00aoMap, typeLoader: 'img',  repeat: true },
    { key: 'wall00normalMap', src: wall00normalMap, typeLoader: 'img',  repeat: true },


    //{ key: 'chairModel', src: chair, typeLoader: 'gltf' },

    //{ key: 'm00', src: m00, typeLoader: 'fbx', pos: [0, 0, 0], rot: 0 }, // stool
    { key: 'm01', src: m01, typeLoader: 'fbx',  pos: [-10, 0, -20], rot: Math.PI / 2}, // bad
    { key: 'm02', src: m02, typeLoader: 'fbx',  pos: [-5, 0, -10], rot: Math.PI / 2 }, // sofa
    { key: 'm08', src: m08, typeLoader: 'fbx',  pos: [0, 0, 0], rot: Math.PI / 2 }, // sofa
    { key: 'm09', src: m09, typeLoader: 'fbx',  pos: [5, 0, 10], rot: Math.PI / 2 }, // sofa
    { key: 'm10', src: m10, typeLoader: 'fbx',  pos: [10, 0, 20], rot: Math.PI / 2 }, // sofa
    { key: 'm11', src: m11, typeLoader: 'fbx',  pos: [15, 0, 30], rot: Math.PI / 2 }, // sofa
    { key: 'm13', src: m13, typeLoader: 'fbx',  pos: [20, 0, 40], rot: Math.PI / 2 }, // sofa
    { key: 'm14', src: m14, typeLoader: 'fbx',  pos: [25, 0, 50], rot: Math.PI / 2 }, // sofa
]