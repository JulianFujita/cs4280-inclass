import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export function displayThreeHelloWorld() {
    let canvas = document.querySelector('#webgl-scene')

    // Three components of any 3D scene
    let scene = new THREE.Scene()
    let renderer = new THREE.WebGL1Renderer({ canvas, antialias: true })
    let camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)

    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0xEEEEEE)

    // Shows x, y, and z axis for debugging
    let axes = new THREE.AxesHelper(10)
    scene.add(axes)


    //----------------------------------------------------------------------------

    // Create a point
    let geometry = new THREE.Geometry()
    geometry.vertices.push(
        new THREE.Vector3(0, 10, -10),
        new THREE.Vector3(20, 40, -30)
    )

    let material = new THREE.PointsMaterial({
        size: 2,
        color: 0xFF0000
    })

    scene.add(new THREE.Points(geometry, material))

    // Adding a line
    geometry = new THREE.Geometry()
    geometry.vertices.push(
        new THREE.Vector3(50, -10, 15),
        new THREE.Vector3(3, 40, 30)
    )
    material = new THREE.LineBasicMaterial({
        color: 0x0000FF
    })

    scene.add(new THREE.Line(geometry, material))

    // Adding a triangle
    geometry = new THREE.Geometry()
    geometry.vertices.push(
        new THREE.Vector3(40, 20, 0),
        new THREE.Vector3(30, 45, 0),
        new THREE.Vector3(20, 20, 0)
    )
    geometry.faces.push(new THREE.Face3(0, 1, 2))

    material = new THREE.MeshBasicMaterial({
        color: 0xFFFF00
    })
    let mesh = new THREE.Mesh(geometry, material)
    mesh.drawMode = THREE.TrianglesDrawMode

    scene.add(mesh)

    // Adding a plane
    geometry = new THREE.PlaneGeometry(200, 70, 40, 20)
    material = new THREE.MeshBasicMaterial({
        color: 0x00FFFF,
        wireframe: true
    })
    mesh = new THREE.Mesh(geometry, material)
    mesh.rotateY(Math.PI / 2)

    scene.add(mesh)

    // Add a cube. Use the buffered geometries for faster rendering
    geometry = new THREE.BoxGeometry(30, 30, 30)
    material = new THREE.MeshNormalMaterial({
        color: 0xFF00FF
    })
    mesh = new THREE.Mesh(geometry, material)

    scene.add(mesh)

    // Clone the cube
    let box2 = mesh.clone();
    box2.translateZ(40)
    scene.add(box2)

    // Create a sphere
    geometry = new THREE.SphereGeometry(20, 40, 40)
    material = new THREE.MeshNormalMaterial({
        wireframe: false
    })
    mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = 30
    mesh.position.y = 30
    mesh.position.z = 30
    scene.add(mesh)

    // Clone some spheres
    let sphere1 = mesh.clone()
    sphere1.translateY(50)

    scene.add(sphere1)

    //----------------------------------------------------------------------------

    // Controls for the camera
    let controls = {
        radius: 400,
        theta: 1,
        phi: 1
    }

    function animate() {
        // Move camera around an imaginary sphere
        camera.position.x = controls.radius * Math.sin(controls.theta) * Math.cos(controls.phi)
        camera.position.y = controls.radius * Math.cos(controls.theta)
        camera.position.z = controls.radius * Math.sin(controls.theta) * Math.sin(controls.phi)

        // Point camera to center, and render the scene
        camera.lookAt(scene.position)
        renderer.render(scene, camera)

    }
    animate()

    let gui = new dat.GUI()
    document.querySelector('aside').appendChild(gui.domElement)
    gui.add(controls, 'radius').min(2).max(900).onChange(animate)
    gui.add(controls, 'theta').min(-1 * Math.PI).max(Math.PI).onChange(animate)
    gui.add(controls, 'phi').min(-1 * Math.PI).max(Math.PI).onChange(animate)
}

export function displayAnimatedCube() {
    let canvas = document.querySelector('#webgl-scene')

    // Three components of any 3D scene
    let scene = new THREE.Scene()
    let renderer = new THREE.WebGL1Renderer({ canvas, antialias: true })
    let camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
    //let camera = new THREE.OrthographicCamera(-20, 20, 24, -24, 10, -100)

    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0xEEEEEE)
    camera.position.z = 9

    // Cube
    let geometry = new THREE.BoxBufferGeometry(3, 3, 3)
    let material = new THREE.MeshNormalMaterial()
    let cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    // Shows x, y, and z axis for debugging
    let axes = new THREE.AxesHelper(10)
    scene.add(axes)

    // Animation
    function animate() {
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
        cube.rotation.z += 0.01

        renderer.render(scene, camera)
        requestAnimationFrame(animate)
    }
    animate()
}

export function displayCubeScene() {
    let canvas = document.querySelector('#webgl-scene')

    // Three components of any 3D scene
    let scene = new THREE.Scene()
    let renderer = new THREE.WebGL1Renderer({ canvas, antialias: true })
    let camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)

    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0xEEEEEE)

    // Shows x, y, and z axis for debugging
    let axes = new THREE.AxesHelper(10)
    scene.add(axes)

    // Orbit controls
    let cameraControls = new OrbitControls(camera, renderer.domElement)
    cameraControls.addEventListener("change", function () {
        renderer.render(scene, camera)
    })

    //-------------------------------------------------------------------

    let geometry2 = new THREE.SphereBufferGeometry(10, 10, 10)
    let material2 = new THREE.MeshPhongMaterial()
    let s = new THREE.Mesh(geometry2, material2)

    let geometry = new THREE.BoxBufferGeometry(15, 15, 15)
    let material = new THREE.MeshPhongMaterial()
    let c = new THREE.Mesh(geometry, material)

    // Ligth sources
    let ambientLight = new THREE.AmbientLight(0x333333)
    ambientLight.intensity = 2
    scene.add(ambientLight)

    let pointLight = new THREE.PointLight(0x333333)
    pointLight.intensity = 5
    pointLight.position.set(50, 200, 300)
    scene.add(pointLight)


    // A 1000 cubes
    let cube_number = 10

    for (let i = 0; i < cube_number; i++) {
        for (let j = 0; j < cube_number; j++) {
            for (let k = 0; k < cube_number; k++) {
                if (Math.random() > 0.2) {
                    let box = null;
                    if (Math.random() > 0.5)
                        box = c.clone()
                    else
                        box = s.clone()

                    box.position.x = i * 25
                    box.position.y = j * 25
                    box.position.z = k * 25

                    box.material = new THREE.MeshPhongMaterial()
                    box.material.color = new THREE.Color(Math.random(), Math.random(), Math.random())

                    scene.add(box)
                }
            }
        }
    }

    //-------------------------------------------------------------------

    // Controls
    let controls = {
        radius: 800,
        theta: 1,
        phi: 1
    }
    let gui = new dat.GUI()
    document.querySelector('aside').appendChild(gui.domElement)
    gui.add(controls, 'radius').min(50).max(1000).onChange(animate)
    gui.add(controls, 'theta').min(-1 * Math.PI).max(Math.PI).onChange(animate)
    gui.add(controls, 'phi').min(-1 * Math.PI).max(Math.PI).onChange(animate)

    // Animation
    function animate() {
        camera.position.x = controls.radius * Math.sin(controls.theta) * Math.cos(controls.phi)
        camera.position.y = controls.radius * Math.cos(controls.theta)
        camera.position.z = controls.radius * Math.sin(controls.theta) * Math.sin(controls.phi)

        camera.lookAt(scene.position)

        renderer.render(scene, camera)
    }
    animate()
}