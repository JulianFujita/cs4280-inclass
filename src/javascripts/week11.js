import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { sinusoidal, checkerboard, somePattern } from './textures'
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

export function displayCity() {
    let canvas = document.querySelector('#webgl-scene')
    let scene = new THREE.Scene()
    let renderer = new THREE.WebGLRenderer({ canvas })
    let camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientWidth, .1, 2000)

    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0xEEEEEE)

    let axes = new THREE.AxesHelper(10)
    scene.add(axes)

    // Load mtl and obj---------------------------------------------------------------------------------------
    let mtlLoader = new MTLLoader()
    let objLoader = new OBJLoader()

    mtlLoader.load("./models/city.mtl", function (material) {
        material.preload()
        objLoader.setMaterials(material)
        objLoader.load("/models/city.obj", function (object) {
            for (let o of object.children) {
                let c = new THREE.Color(0xFFFFFF)
                c.setHex(Math.random() * 0xFFFFFF)
                o.material = new THREE.MeshPhongMaterial({ color: c })
                o.castShadow = true
                o.receiveShadow = true

                //scene.add(o)
            }
            scene.add(object)
            renderer.render(scene, camera)
        })
    })
    //---------------------------------------------------------------------------------------------------------


    let cameraControls = new OrbitControls(camera, renderer.domElement)
    cameraControls.addEventListener("change", function () {
        renderer.render(scene, camera)
    })

    window.onkeydown = function (e) {
        let t = cameraControls.target
        switch (e.keyCode) {
            case 40: // down
                break;
            case 38: // up
                t.position.set(t.x, t.y + 5, t.z)
                break;
            case 39: // right
                t.position.set(t.x - 5, t.y, t.z)
                break;
            case 37: // left
                t.position.set(t.x + 5, t.y, t.z)
                break;
        }
    }

    // Lights
    let spotLight = new THREE.SpotLight(0xffffff)
    spotLight.position.set(0, 100, 0)
    let ambientLight = new THREE.AmbientLight(0x333333)
    let directionalLight = new THREE.DirectionalLight(0x7777777)
    let pointLight = new THREE.PointLight(0x999999)
    pointLight.position.set(0, 300, 0)
    pointLight.castShadow = true

    scene.add(spotLight)
    scene.add(ambientLight)
    scene.add(directionalLight)
    // scene.add(pointLight)

    let controls = {

    }

    camera.position.set(-200, 400, -200)

    function animate() {
        camera.lookAt(scene.position)
        renderer.render(scene, camera)
        cameraControls.update()
    }

    animate()

    let gui = new dat.GUI()
    document.querySelector('aside').appendChild(gui.domElement)
}

export function displayTexturedScene() {
    let canvas = document.querySelector('#webgl-scene')
    let scene = new THREE.Scene()
    let renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
    let camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientWidth, .1, 2000)

    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0xEEEEEE)

    let axes = new THREE.AxesHelper(10)
    scene.add(axes)



    // Load Textures
    let texLoader = new THREE.TextureLoader()
    let textures = {
        crate: texLoader.load('./images/crate0.png', function () {
            renderer.render(scene, camera)
        }),
        crate_bump: texLoader.load('./images/crate0_bump.png', function () {
            renderer.render(scene, camera)
        }),
        crate_normal: texLoader.load('./images/crate0_normal.png', function () {
            renderer.render(scene, camera)
        }),
        earth: texLoader.load('./images/earth.jpg'), function() {
            renderer.render(scene, camera)
        },
        wall: texLoader.load('./images/stone.jpg'), function(texture) {
            texture.wrapS = THREE.RepeatWrapping
            texture.wrapT = THREE.RepeatWrapping
            texture.repeat.set(5, 2)
            renderer.render(scene, camera)
        },
        floor: texLoader.load('./images/floor.jpg'), function() {
            renderer.render(scene, camera)
        },
        waldo: texLoader.load('./images/waldo.png'), function() {
            renderer.render(scene, camera)
        },
        sinsoidal: sinusoidal(256),
        checkerboard: checkerboard(256, 256, 8, 8),
        somePattern: somePattern(256, 256)
    }

    // Crate
    let geometry = new THREE.BoxGeometry(100, 100, 100)
    let crate = new THREE.Mesh(geometry)
    crate.position.set(-180, 50, -80)
    crate.name = 'crate'
    scene.add(crate)

    crate.castShadow = true

    crate.material = new THREE.MeshStandardMaterial()
    crate.material.map = textures[crate.name]
    crate.material.bumpMap = textures['crate_bump']
    crate.material.normalMap = textures['crate_normal']
    crate.material.bumpScale = 0.6

    //Waldo cube
    geometry = new THREE.BoxGeometry(100, 100, 100)
    let cube = new THREE.Mesh(geometry)
    cube.castShadow = true
    cube.position.set(150, 50, 80)
    cube.name = 'checkerboard'
    scene.add(cube)

    cube.material = new THREE.MeshStandardMaterial()
    cube.material.map = textures[cube.name]

    // Floor
    geometry = new THREE.PlaneGeometry(500, 300)
    let plane = new THREE.Mesh(geometry)
    plane.receiveShadow = true
    plane.rotateX(Math.PI / 2)
    plane.materialParams = { side: THREE.DoubleSide }
    plane.name = 'floor'

    plane.material = new THREE.MeshStandardMaterial(plane.materialParams)
    plane.material.map = textures[plane.name]

    scene.add(plane)

    // Wall
    geometry = new THREE.BoxGeometry(500, 200, 5)
    let wall = new THREE.Mesh(geometry)
    wall.receiveShadow = true
    wall.name = 'wall'
    wall.position.set(0, 100, 150)
    scene.add(wall)

    wall.material = new THREE.MeshStandardMaterial()
    wall.material.map = textures[wall.name]

    // Earth
    geometry = new THREE.SphereGeometry(50, 40, 40)
    let earth = new THREE.Mesh(geometry)
    earth.castShadow = true
    earth.name = 'earth'
    earth.position.set(-10, 100, 0)
    scene.add(earth)

    earth.material = new THREE.MeshStandardMaterial()
    earth.material.map = textures[earth.name]

    let cameraControls = new OrbitControls(camera, renderer.domElement)
    cameraControls.addEventListener("change", function () {
        renderer.render(scene, camera)
    })

    // Lights
    let ambientLight = new THREE.AmbientLight(0x333333)
    let directionalLight = new THREE.DirectionalLight(0x7777777)
    directionalLight.castShadow = true
    let pointLight = new THREE.PointLight(0x999999)
    pointLight.position.set(0, 200, 0)
    pointLight.castShadow = true
    scene.add(ambientLight)
    scene.add(directionalLight)
    scene.add(pointLight)

    let controls = {

    }

    camera.position.set(-200, 400, -200)

    function animate() {
        renderer.shadowMap.enabled = true
        camera.lookAt(scene.position)
        renderer.render(scene, camera)
        cameraControls.update()
    }

    animate()

    let gui = new dat.GUI()
    document.querySelector('aside').appendChild(gui.domElement)
    // gui.add(controls, 'radius').min(2).max(900).onChange(animate)
    // gui.add(controls, 'theta').min(-1 * Math.PI).max(Math.PI).onChange(animate)
    // gui.add(controls, 'phi').min(-1 * Math.PI).max(Math.PI).onChange(animate)
}