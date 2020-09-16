// Required by Webpack - do not touch
require.context('../', true, /\.(html|json|txt|dat)$/i)
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

// First: Set up your name
let std_name = "Julian Dean"
document.querySelector('#std_name').innerHTML = `<strong>${std_name}</strong>`

// SEPTEMBER 14 IN-CLASS WebGL Demo
import vs_script from '../shaders/vertex.glsl'
import fs_script from '../shaders/fragment.glsl'

//displayPoint(vs_script, fs_script)
displayTriangle(vs_script, fs_script)

export function displayTriangle(vs_script, fs_script) {
    let canvas = document.querySelector("#webgl-scene")
    canvas.width = canvas.getClientRects()[0].width;
    canvas.height = canvas.getClientRects()[0].height;
    let gl = canvas.getContext("webgl2")
    if (!gl) {
    alert("Unable to initialize webgl; your browser may not support it.")
    }
    
    let v_shader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(v_shader, vs_script)
    gl.compileShader(v_shader)
    
    let f_shader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(f_shader, fs_script)
    gl.compileShader(f_shader)
    
    let program = gl.createProgram()
    gl.attachShader(program, v_shader)
    gl.attachShader(program, f_shader)
    gl.linkProgram(program)
    
    gl.useProgram(program)
    
    // Sending coordinates to GPU
    let coords = gl.getAttribLocation(program, "coordinates")
    gl.enableVertexAttribArray(coords)
    let buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.vertexAttribPointer(coords, 3, gl.FLOAT, false, 0, 0)

    let vertices = [
        0, 0.5, 0,
        -0.5, -0.5, 0,
        0.5, -0.5, 0
    ]
    
    // Clear the canvas
    gl.clearColor(1.0, 1.0, 1.0, 1.0)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

    gl.drawArrays(gl.TRIANGLES, 0, 3)
}

export function displayPoint(vs_script, fs_script) {
let canvas = document.querySelector("#webgl-scene")
canvas.width = canvas.getClientRects()[0].width;
canvas.height = canvas.getClientRects()[0].height;
let gl = canvas.getContext("webgl2")
if (!gl) {
alert("Unable to initialize webgl; your browser may not support it.")
}

let v_shader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(v_shader, vs_script)
gl.compileShader(v_shader)

let f_shader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(f_shader, fs_script)
gl.compileShader(f_shader)

let program = gl.createProgram()
gl.attachShader(program, v_shader)
gl.attachShader(program, f_shader)
gl.linkProgram(program)

gl.useProgram(program)

// Sending coordinates to GPU
let coords = gl.getAttribLocation(program, "coordinates")
gl.vertexAttrib3f(coords, .8, .8, .0)


// Clear the canvas
gl.clearColor(1.0, 1.0, 1.0, 1.0)
gl.enable(gl.DEPTH_TEST)
gl.depthFunc(gl.LEQUAL)
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)


gl.drawArrays(gl.POINTS, 0, 1)
}


// SEPTEMBER 2 IN-CLASS D3 CHARTS AND GRAPHS
// import * as d3 from 'd3'

// // Create Data
// let courses = [
//     {name: 'CS1010', students: 78},
//     {name: 'CS1030', students: 69},
//     {name: 'CS1400', students: 88},
//     {name: 'CS1410', students: 73},
//     {name: 'CS2350', students: 55},
//     {name: 'CS2420', students: 46}
// ]

// let margin = {
//     top: 30,
//     right: 30,
//     bottom: 30,
//     left: 30
// }
// let width = 600 - (margin.left + margin.right)
// let height = 600 - (margin.top + margin.bottom)

// // Create SVG Image
// let svg = d3.select('main')
//     .append('svg')
//     .attr('width', width + margin.left + margin.right)
//     .attr('height', height + margin.top + margin.bottom)
//     .style('background', 'lightgray')

// // Scaling for axes
// let x = d3.scaleBand()
//     .domain(courses.map(c => c.name))
//     .range([margin.left, width - margin.right])
//     .padding(.1)

// let y = d3.scaleLinear()
//     .domain([0, d3.max(courses, c => c.students)])
//     .range([height - margin.bottom, margin.top])
//     .nice()

// // Display Axes
// svg.append('g')
//     .call(d3.axisBottom(x))
//     .attr('transform', `translate(0, ${height - margin.bottom})`)
// svg.append('g')
//     .call(d3.axisLeft(y))
//     .attr('transform', `translate(${margin.left}, 0)`)

// // Plotting the chart with rectangles
// let bg = svg.append('g')

// bg.selectAll('rect')
//     .data(courses)
//     .enter()
//     .append('rect')
//     .attr('x', c => x(c.name))
//     .attr('y', height - margin.bottom)
//     .attr('width', x.bandwidth())
//     .attr('height', 0)
//     .style('fill', 'steelblue')
//     .style('stroke', 'black')
//     .style('stroke-width', 2)
//     .transition().duration(2000).attr('y', c => y(c.students))
//     .attr('height', c => y(0) - y(c.students))

// bg.selectAll('text')
//     .data(courses)
//     .enter()
//     .append('text')
//     .attr('x', c => x(c.name) + x.bandwidth()/2)
//     .attr('y', c => y(c.students) - 5)
//     .attr('text-anchor', 'middle')
//     .text(c => c.students)
//     .attr('font-size', 10)

// // Interactions
// d3.selectAll('rect').on('mouseover', function(){
//     d3.select(this).style('opacity', 0.5)
// })
// .on('mouseout', function(){
//     d3.select(this).style('opacity', 1)
// })