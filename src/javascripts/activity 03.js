// Required by Webpack - do not touch
require.context('../', true, /\.(html|json|txt|dat)$/i)
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

// First: Set up your name
let std_name = "Julian Dean"
document.querySelector('#std_name').innerHTML = `<strong>${std_name}</strong>`

// ACTIVITY 03
const canvas = document.querySelector('canvas')
canvas.width = canvas.getClientRects()[0].width;
canvas.height = canvas.getClientRects()[0].height;
const gl = canvas.getContext('webgl')

if(!gl){
    throw new Error('WebGL Not Supported')
}

// Create vertex data
const vertexData = [
    0, 0, 0, -0.5, 0.5, 0, 0.5, 0.5, 0,
    0, 0, 0, 0.5, 0.5, 0, 0.5, -0.5, 0,
    0, 0, 0, 0.5, -0.5, 0, -0.5, -0.5, 0,
    0, 0, 0, -0.5, -0.5, 0, -0.5, 0.5, 0
]
const colorData =[
    0, 0, 1, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 0, 1, 0, 0, 0, 1,
    0, 1, 0, 0, 1, 0, 0, 1, 0,
    1, 0, 0, 1, 0, 0, 1, 0, 0
]

// Create a buffer on the GPU
const locationBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, locationBuffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW)

const colorBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW)

// Create a vertex shader
const vertexShader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vertexShader, `
precision mediump float;
attribute vec3 position;
attribute vec3 color;
varying vec3 vColor;

void main(){
    vColor = color;
    gl_Position = vec4(position, 1);
}`)
gl.compileShader(vertexShader)

// Create a fragment shader
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragmentShader, `
precision mediump float;
varying vec3 vColor;

void main(){
    gl_FragColor = vec4(vColor, 1);
}`)
gl.compileShader(fragmentShader)

// Create a program
const program = gl.createProgram()

// Attach shaders to program
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)

// Link the program
gl.linkProgram(program)

// Enable vertex attributes
const positionLocation = gl.getAttribLocation(program, `position`)
gl.enableVertexAttribArray(positionLocation)
gl.bindBuffer(gl.ARRAY_BUFFER, locationBuffer)
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0)

const colorLocation = gl.getAttribLocation(program, 'color')
gl.enableVertexAttribArray(colorLocation)
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0)

// Draw
gl.useProgram(program)
gl.drawArrays(gl.TRIANGLES, 0, 12)