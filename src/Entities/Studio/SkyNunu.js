import * as THREE from 'three'

const vertexShader = `
varying vec3 vWorldPosition;
void main()
{
vec4 worldPosition = modelMatrix * vec4(position, 1.0);
vWorldPosition = worldPosition.xyz;
gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`

const fragmentShader = `
uniform vec3 topColor;
uniform vec3 bottomColor;
uniform float offset;
uniform float exponent;
varying vec3 vWorldPosition;
void main()
{
float h = normalize(vWorldPosition + offset).y;
gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h , 0.0), exponent), 0.0)), 1.0);
}`

const uniforms = {
    bottomColor: {type: "c", value: new THREE.Vector3(0, 0, 1)},
    exponent: {type: "f", value: 0.2},
    offset: {type: "f", value: 20},
    topColor: {type: "c", value: new THREE.Vector3(1, 1, 1)},
}

export const createSky = () => {
    const sky = new THREE.Group()


    // const hemisphereLight = new THREE.HemisphereLight(
    //     new THREE.Color(0.19607843137254902, 0.5176470588235295, 1),
    //     new THREE.Color(1, 0.8, 0.4980392156862745),
    //     .5
    // )
    const hemisphereLight = new THREE.HemisphereLight(
        new THREE.Color(0.6, 0.8, 1),
        new THREE.Color(.7, 0.7, 0.7),
        .45
    )
    hemisphereLight.position.y = 1
    sky.add(hemisphereLight)


    // const directionalLight = new THREE.DirectionalLight(
    //     new THREE.Color(1, 1, 0.6666666666666666),
    //     .3,
    // )
    const directionalLight = new THREE.PointLight(
        new THREE.Color(.8, .8, 0.6666666666666666),
        .3,
    )
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 256
    directionalLight.shadow.mapSize.height = 256
    directionalLight.shadow.camera.near = 0.5
    directionalLight.shadow.camera.far = 10000
    directionalLight.shadow.camera.bottom = -5
    directionalLight.shadow.camera.top = 5
    directionalLight.shadow.camera.right = 5
    directionalLight.shadow.camera.left = -5
    //directionalLight.position.set(-70, 70, 0)
    directionalLight.position.set(0, 3, 0)
    sky.add(directionalLight)


    const geom = new THREE.SphereBufferGeometry(1500, 16, 16)
    const mat = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader
    })
    const m = new THREE.Mesh(geom, mat)
    sky.add(m)

    return {
        sky
    }
}