// Required by Webpack - do not touch
require.context('../', true, /\.(html|json|txt|dat)$/i)
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

// First: Set up your name
let std_name = "Julian Dean"
document.querySelector('#std_name').innerHTML = `<strong>${std_name}</strong>`

//Then: comes everything else
// TODO

// Data Driven Document 3 d
import * as d3 from 'd3' 

// Function instaed of text 
let myData = [100, 2, 3, 4]

d3.select('article').data(myData).text(function(d){
    return 'Hello World ' + d
})

// <svg width="500" height="600" style="background: rgb(221, 166, 166);">
let svg = d3.select('article').append('svg').
    attr('width', 500).attr('height', 600).
    style('background', 'rgb(221, 166, 166)')

// <rect x="200" y="300" width="130" height="150"
// style="fill: blue; stroke: white; stroke-width: 5; stroke-dasharray: 15 5;"/>
let rect = svg.append('rect').attr('x', 200).attr('y', 300).attr('width', 130).attr('height', 150).
    style('fill', 'blue').style('stroke', 'white').
    style('stroke-width', 5).style('stroke-dasharray', '15 5')













// Variables
// let x = 10
// const PI = 3.14
// let ch = "A"
// let choice = 'Ok'
// let description = `This is a
// multi-line string`


// Printing to console
// console.log(x)
// console.log(PI)
// console.log(description)

// let fn = 'John'
// let ln = 'Doe'

// // String interpolation
// let name = `My name is ${fn} ${ln}.`
// console.log(name)

// // Arrays (Are both stacks and queues)
// let numbers = [2,4,5,12,34,67,9,18]
// console.log(`Length: ${numbers.length}`)
// numbers.push(22)
// numbers.unshift(11)

// // Loops
// // Use map to avoid loops
// console.log(numbers.map(
//     (x) => x * 3
// ))
// // Use if you require index
// for(let i = 0; i < numbers.length; i++){
//     console.log(numbers[i]*3)
// }
// // No index
// for(let n of numbers){
//     console.log(n * 3)
// }
// // Index
// for(let i in numbers){
//     console.log(i)
// }

// // Objects
// let self = {
//     fn: 'Julian',
//     ln: 'Dean',
//     school: 'WSU',
//     'favorite sport': 'soccer'
// }
// for(let p in self){
//     console.log(`${p}: ${self[p]}`)
// }

// // Functions
// function getMax(x, y){
//     return Math.max(x, y)
// }
// console.log(`Max is ${getMax(14, 11)}`)
// // gMax is a pointer to the function. You can change the name of the function
// const gMax = function(x, y){
//     return Math.max(x, y)
// }
// console.log(`Max is ${gMax(14, 11)}`)
// // Arrow function
// const gm = (x, y) => Math.max(x, y)
// console.log(`Max is ${gm(14, 11)}`)