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
import m03 from '../assets/1/3.fbx'
import '../assets/1/3_d.jpg'
import m04 from '../assets/1/4.fbx'
import '../assets/1/4_s.jpg'
import m05 from '../assets/1/4.fbx'
import '../assets/1/5_d.jpg'
import m06 from '../assets/1/6.fbx'
import '../assets/1/6_d.jpg'
import '../assets/1/6_n.jpg'
import m07 from '../assets/1/7.fbx'
import m08 from '../assets/1/8.fbx'
import m09 from '../assets/1/9.fbx'
import m10 from '../assets/1/10.fbx'
import m11 from '../assets/1/11.fbx'
import m12 from '../assets/1/12.fbx'
import m13 from '../assets/1/13.fbx'
import m14 from '../assets/1/14.fbx'
import m15 from '../assets/1/15.fbx'
import m16 from '../assets/1/16.fbx'

import m1_ao from '../assets/1/m1_ao.jpg'
import m3_ao from '../assets/1/m3_ao.jpg'
import m4_ao from '../assets/1/m4_ao.png'
import m6_ao from '../assets/1/m6_ao.jpg'
import m8_ao from'../assets/1/m8_ao.jpg'
import m12$1_ao from'../assets/1/m12.1_ao.jpg'
import '../assets/1/m12.1_n.jpg'
import m12$2_ao from '../assets/1/m12.2_ao.jpg'
import '../assets/1/m12.2_n.jpg'
import m12$3_ao from '../assets/1/m12.3_ao.jpg'
import '../assets/1/m12.3_n.jpg'
import m13_ao from '../assets/1/m13_ao.jpg'
import m14_ao from '../assets/1/m14_ao.jpg'
import m16_ao from '../assets/1/m16_ao.jpg'
import '../assets/1/m16_n.jpg'

const X = -25.6
const Z = -20

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

    { key: 'm01', src: m01, typeLoader: 'fbx',  pos: [X, 0, Z], rot: 0},
    { key: 'm02', src: m02, typeLoader: 'fbx',  pos: [X + 8.3, 0, Z], rot: 0 },
    { key: 'm03', src: m03, typeLoader: 'fbx',  pos: [X + 20, 0, Z], rot: 0},
    { key: 'm04', src: m04, typeLoader: 'fbx',  pos: [X + 31, 0, Z], rot: 0},
    { key: 'm05', src: m05, typeLoader: 'fbx',  pos: [X + 37.5, 0, Z], rot: 0},
    { key: 'm06', src: m06, typeLoader: 'fbx',  pos: [X + 44, 0, Z  + .5], rot: 0},
    { key: 'm07', src: m07, typeLoader: 'fbx',  pos: [X + 50.5, 0, Z + .5], rot: 0},

    { key: 'm08', src: m08, typeLoader: 'fbx',  pos: [X + 33, 18, Z - 1], rot: 0 },
    { key: 'm09', src: m09, typeLoader: 'fbx',  pos: [X + 4.5, 18, Z - 1], rot: 0 },
    { key: 'm10', src: m10, typeLoader: 'fbx',  pos: [X - 3, 18, Z + 20], rot: Math.PI / 2 },
    { key: 'm11', src: m11, typeLoader: 'fbx',  pos: [X - 3, 18, Z + 34], rot: Math.PI / 2 },

    { key: 'm12', src: m12, typeLoader: 'fbx',  pos: [X + 7, 0, Z + 27], rot: Math.PI / 2 },
    { key: 'm13', src: m13, typeLoader: 'fbx',  pos: [X - 2, 0, Z + 38], rot: Math.PI / 2 },
    { key: 'm14', src: m14, typeLoader: 'fbx',  pos: [X - 2, 0, Z + 16], rot: Math.PI / 2 },
    { key: 'm15', src: m15, typeLoader: 'fbx',  pos: [X + 7, 0, Z + 27], rot: Math.PI / 2 },
    { key: 'm16', src: m16, typeLoader: 'fbx',  pos: [X + 48, 0, Z + 27], rot: -Math.PI / 2 },


    { key: 'm1_ao', src: m1_ao, typeLoader: 'img' },
    { key: 'm3_ao', src: m3_ao, typeLoader: 'img' },
    { key: 'm4_ao', src: m4_ao, typeLoader: 'img' },
    { key: 'm6_ao', src: m6_ao, typeLoader: 'img' },
    { key: 'm8_ao', src: m8_ao, typeLoader: 'img' },
    { key: 'm12.1_ao', src: m12$1_ao, typeLoader: 'img' },
    { key: 'm12.2_ao', src: m12$2_ao, typeLoader: 'img' },
    { key: 'm12.3_ao', src: m12$3_ao, typeLoader: 'img' },
    { key: 'm13_ao', src: m13_ao, typeLoader: 'img' },
    { key: 'm14_ao', src: m14_ao, typeLoader: 'img' },
    { key: 'm16_ao', src: m16_ao, typeLoader: 'img' },
]


export const MATERIALS_AO = {
    'm01': {
        '0': 'm1_ao',
    },
    'm02': {
        '0': 'm1_ao',
    },
    'm03': {
        '0': 'm3_ao',
    },
    'm04': {
        '0': 'm4_ao',
    },
    'm05': {
        '0': 'm4_ao',
    },
    'm06': {
        '0': 'm6_ao',
    },
    'm07': {
        '0': 'm6_ao',
    },
    'm08': {
        '0': 'm8_ao',
    },
    'm12': {
        '0': 'm12.1_ao',
        '1': 'm12.2_ao',
        '2': 'm12.3_ao',
    },
    'm13': {
        '0': 'm13_ao',
    },
    'm14': {
        '0': 'm14_ao',
    },
    'm16': {
        '0': 'm16_ao',
    },
}