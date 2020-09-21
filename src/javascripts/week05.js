import { WebGLHelper } from './webgl_helper'
import * as dat from 'dat.gui'

// Sierpinski
export function sierpinski() {

    // Make sure #version 300 es is on the FIRST LINE!
    const vs_script = `#version 300 es
        in vec3 coordinates;
        in vec3 color;
        uniform float pointSize;
        out vec4 vColor;
        
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_PointSize = pointSize;
            vColor = vec4(color, 1.0);
        }
    `
    const fs_script = `#version 300 es
        precision mediump float;  
        out vec4 fragColor;
        in vec4 vColor;
        
        void main(void){
            fragColor = vColor;  
        }
    `

    let canvas = document.querySelector('#webgl-scene')
    let gl = WebGLHelper.initWebGL(canvas)

    let program = WebGLHelper.initShaders(gl, vs_script, fs_script)
    gl.useProgram(program)

    let vertices = []

    // Controls
    let controls = {
        pointSize: 1,
        pointColor: '#0000FF',
        draw: true,
        pointCount: 100000,
    }

    let buffers = WebGLHelper.initBuffers(gl, program, [{
        name: 'coordinates',
        size: 3,
        data: vertices
    }])

    // v1, v2, v3
    let points = [[-1,1,0],[1,1,0],[0,-1,0]]
    let q = [.3, .5, 0]
   function redraw(){
        if (controls.draw) {
            for(let i = 0; i < controls.pointCount; i++){
                // 0 to 2.9999999
                let p = points[Math.floor([Math.random() * 3])]
                
                q = [(q[0] + p[0]) / 2,
                      (q[1] + p[1]) / 2, 0]
                vertices.push(...q)
            }

            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
            WebGLHelper.loadAttributeF(gl, program, 'color', ...WebGLHelper.getColorFromHex(controls.pointColor))
            WebGLHelper.loadUniformF(gl, program, 'pointSize', controls.pointSize)
            gl.drawArrays(gl.POINTS, 0, vertices.length / 3)
        }
    }

    // Set up controls GUI
    let gui = new dat.GUI()
    document.querySelector('aside').appendChild(gui.domElement)
    gui.add(controls, 'pointSize').min(1).max(10).onChange(redraw)
    gui.add(controls, 'pointCount').min(1000).max(100000).onChange(redraw)
    gui.addColor(controls, 'pointColor').onChange(redraw)
    gui.add(controls, 'draw')

    document.onkeyup = function(e){
        if(e.key === 'Escape')
            controls.draw = !controls.draw
            gui.updateDisplay()
    }
    redraw()
}

// Controls using dat.gui dependency
export function scribble() {

    // Make sure #version 300 es is on the FIRST LINE!
    const vs_script = `#version 300 es
        in vec3 coordinates;
        in vec3 color;
        in float pointSize;
        out vec4 vColor;
        
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_PointSize = pointSize;
            vColor = vec4(color, 1.0);
        }
    `
    const fs_script = `#version 300 es
        precision mediump float;  
        out vec4 fragColor;
        in vec4 vColor;
        
        void main(void){
            fragColor = vColor;  
        }
    `

    let canvas = document.querySelector('#webgl-scene')
    let gl = WebGLHelper.initWebGL(canvas)

    let program = WebGLHelper.initShaders(gl, vs_script, fs_script)
    gl.useProgram(program)

    let vertices = []
    let colors = []
    let pointSizes = []

    // Controls
    let controls = {
        pointSize: 1,
        pointColor: '#0000FF',
        draw: false,
        primitive: gl.POINTS,
        clear: function () {
            vertices = []
            colors = []
            pointSizes = []
            WebGLHelper.clear(gl, [1.0, 1.0, 1.0, 1.0])
        }
    }

    let buffers = WebGLHelper.initBuffers(gl, program, [{
        name: 'coordinates',
        size: 3,
        data: vertices
    },
    {
        name: 'color',
        size: 3,
        data: colors
    },
    {
        name: 'pointSize',
        size: 1,
        data: pointSizes
    }])

    canvas.onmousemove = (e) => {
        if (controls.draw) {
            let [x, y] = WebGLHelper.toWebGlCoordinates(e)
            let [r, g, b] = WebGLHelper.getColorFromHex(controls.pointColor)
            vertices.push(x, y, 0.0)
            colors.push(r, g, b)
            pointSizes.push(controls.pointSize)

            gl.bindBuffer(gl.ARRAY_BUFFER, buffers['coordinates'])
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

            gl.bindBuffer(gl.ARRAY_BUFFER, buffers['color'])
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)

            gl.bindBuffer(gl.ARRAY_BUFFER, buffers['pointSize'])
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointSizes), gl.STATIC_DRAW)


            gl.drawArrays(controls.primitive, 0, vertices.length / 3)
        }
    }

    WebGLHelper.clear(gl, [1.0, 1.0, 1.0, 1.0])

    // Set up controls GUI
    let gui = new dat.GUI()
    document.querySelector('aside').appendChild(gui.domElement)
    gui.add(controls, 'pointSize').min(1).max(10)
    gui.addColor(controls, 'pointColor')
    gui.add(controls, 'primitive', {
        points: gl.POINTS,
        triangles: gl.TRIANGLES,
        triangle_strip: gl.TRIANGLE_STRIP,
        triangle_fan: gl.TRIANGLE_FAN,
        lines: gl.LINES,
        line_strip: gl.LINE_STRIP,
        line_loop: gl.LINE_LOOP
    })
    gui.add(controls, 'draw')
    gui.add(controls, 'clear')

    document.onkeyup = function(e){
        if(e.key === 'Escape')
            controls.draw = !controls.draw
            gui.updateDisplay()
    }
}