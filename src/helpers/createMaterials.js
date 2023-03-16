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
            emissive: 0x403939,
            reflectivity: 1,
            color: 0xffffff,
            specular: 0xffffff,
            map: assets['floor00map'].model,
            aoMap: assets['floor00aoMap'].model,
            aoMapIntensity: 1.5,
            normalMap: assets['floor00normalMap'].model,
            normalScale: new THREE.Vector2(.7, .7),
            specularMap: assets['floor00specularMap'].model,
        }),
        ceiling: new THREE.MeshPhongMaterial({
                envMap: assets['env00'].model,
                emissive: 0x000000,
                reflectivity: .001,
                color: 0xffffff,
                specular: 0xffffff,
                shininess: 100,
                //map: assets['ceiling00ao'].model,
                //aoMap: assets['ceiling00ao'].model,
                //aoMapIntensity: 1,
                //normalMap: assets['floor00normalMap'].model,
                //normalScale: new THREE.Vector2(.7, .7),
                //specularMap: assets['floor00specularMap'].model,
        }),
        room: new THREE.MeshPhongMaterial({
            color: 0xdddddd,
            side: THREE.DoubleSide,
            specular: 0x333333,
            //vertexColors: true,
        }),
        plinth: new THREE.MeshPhongMaterial({
            color: 0xdddddd,
            specular: 0x333333,
        }),
        wall: new THREE.MeshPhongMaterial({
            //side: THREE.DoubleSide,
            color: 0xf7f6ff,
            // specular: 0x333333,
            // //vertexColors: true,
            envMap: assets['env00'].model,
            reflectivity: .01,
            //roughness: 0,
            specular: 0x999999,
            //map: assets['wall00aoMap'].model,
            aoMap: assets['wall00aoMap'].model,
            aoMapIntensity: -0.5,
            normalMap: assets['wall00normalMap'].model,
            normalScale: new THREE.Vector2(4.5, 4.5),
            //specularMap: assets['wall00specularMap'].model,
        }),
        window: new THREE.MeshPhongMaterial({
            envMap: assets['env00'].model,
            reflectivity: .2,
            color: 0xffffff,
            side: THREE.DoubleSide,
            specular: 0x333333,
            aoMap: assets.aoMap.model,
            aoMapIntensity: 1,
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
            color: 0xffffff,
            side: THREE.DoubleSide,
            specular: 0x333333,
            ///vertexColors: true,
        }),
    }

    return materials
}