import * as THREE from 'three'

export const createMaterials = (assets) => {
    //console.log(assets)
    for (let key in assets) {
        if (assets[key].repeat) {
            assets[key].model.wrapS = THREE.RepeatWrapping
            assets[key].model.wrapT = THREE.RepeatWrapping
        }
    }


    const materials =  {
        floor: new THREE.MeshPhongMaterial({
            envMap: assets['env00'].model,
            //emissive: 0x191919,
            reflectivity: .3,
            color: 0xffffff,
            specular: 0x777777,
            map: assets['floor00map'].model,
            //aoMap: assets['floor00aoMap'].model,
            //aoMapIntensity: 1,
            normalMap: assets['floor00normalMap'].model,
            normalScale: new THREE.Vector2(1.5, 1.5),
            specularMap: assets['floor00specularMap'].model,
            onBeforeCompile: (sh) => {
                sh.fragmentShader = sh.fragmentShader.replace(
                    `#include <dithering_fragment>`,
                    `#include <dithering_fragment>                              
                    gl_FragColor.rgb *= 1.5;`
                )
            },
        }),
        ceiling: new THREE.MeshPhongMaterial({
            //envMap: assets['env00'].model,
            emissive: 0x444444,
            //reflectivity: .001,
            color: 0xffffff,
            specular: 0x000000,
            shininess: 100,
            //map: assets['ceiling00ao'].model,
            //aoMap: assets['ceiling00ao'].model,
            //aoMapIntensity: 1,
            //normalMap: assets['floor00normalMap'].model,
            //normalScale: new THREE.Vector2(.7, .7),
            //specularMap: assets['floor00specularMap'].model,
        }),
        room: new THREE.MeshPhongMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            specular: 0xffffff,
            emissive: 0x4c413d,
            //vertexColors: true,
        }),
        plinth: new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0x333333,
            emissive: 0x3222222,
        }),
        wall: new THREE.MeshPhongMaterial({
            //side: THREE.DoubleSide,
            color: 0xffffff,
            // specular: 0x333333,
            // //vertexColors: true,
            envMap: assets['env00'].model,
            reflectivity: .01,
            //roughness: 0,
            specular: 0x333333,
            emissive: 0x111111,
            //map: assets['wall00aoMap'].model,
            aoMap: assets['wall00aoMap'].model,
            aoMapIntensity: -0.1,
            normalMap: assets['wall00normalMap'].model,
            normalScale: new THREE.Vector2(4.5, 4.5),
            // onBeforeCompile: (sh) => {
            //     sh.fragmentShader = sh.fragmentShader.replace(
            //         `#include <dithering_fragment>`,
            //         `#include <dithering_fragment>
            //         gl_FragColor.rgb = gl_FragColor.rgb -.3;`
            //     )
            // },
            //specularMap: assets['wall00specularMap'].model,
        }),
        window: new THREE.MeshPhongMaterial({
            //envMap: assets['env00'].model,
            //reflectivity: .2,
            color: 0xffffff,
            side: THREE.DoubleSide,
            specular: 0x333333,
            //aoMap: assets['aoMap'].model,
            aoMapIntensity: 1,
            emissive: 0x1a1c1c,
            ///vertexColors: true,
        }),
        lineG1: new THREE.LineBasicMaterial({
            color: 0x888866,
        }),
        windowGlass: new THREE.MeshPhongMaterial({
            envMap: assets['env00'].model,
            reflectivity: 1,
            color: 0x00ffff,
            side: THREE.DoubleSide,
            specular: 0xffffff,
            shininess: 100,
            opacity: .2,
            transparent: true,
            emissive: 0x28caff,
            ///vertexColors: true,
        }),
        door: new THREE.MeshPhongMaterial({
            //envMap: assets['env00'].model,
            //reflectivity: .2,
            color: 0xffffff,
            side: THREE.DoubleSide,
            specular: 0x333333,
            //aoMap: assets['aoMap'].model,
            aoMapIntensity: 1,
            emissive: 0x1a1c1c,
            ///vertexColors: true,








            // color: 0xffffff,
            // side: THREE.DoubleSide,
            // specular: 0x333333,
            // emissive: 0x1a1c1c,
        }),
        whiteStandard: new THREE.MeshStandardMaterial({
            color: 0xffffff,
            ///vertexColors: true,
        }),
        red: new THREE.MeshPhongMaterial({
            color: 0xff0000,
            emissive: 0x442222,
            ///vertexColors: true,
        }),
    }

    return materials
}