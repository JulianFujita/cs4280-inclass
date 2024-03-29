// Required by Webpack - do not touch
require.context('../', true, /\.(html|json|txt|dat)$/i)
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

// First: Set up your name
let std_name = "Julian Dean"
document.querySelector('#std_name').innerHTML = `<strong>${std_name}</strong>`

// SEPTEMBER 2 IN-CLASS D3 CHARTS AND GRAPHS
import * as d3 from 'd3'

// Create Data
let courses = [
    {name: 'CS1010', students: 78},
    {name: 'CS1030', students: 69},
    {name: 'CS1400', students: 88},
    {name: 'CS1410', students: 73},
    {name: 'CS2350', students: 55},
    {name: 'CS2420', students: 46}
]

let margin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
}
let width = 600 - (margin.left + margin.right)
let height = 600 - (margin.top + margin.bottom)

// Create SVG Image
let svg = d3.select('main')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .style('background', 'lightgray')

// Scaling for axes
let x = d3.scaleBand()
    .domain(courses.map(c => c.name))
    .range([margin.left, width - margin.right])
    .padding(.1)

let y = d3.scaleLinear()
    .domain([0, d3.max(courses, c => c.students)])
    .range([height - margin.bottom, margin.top])
    .nice()

// Display Axes
svg.append('g')
    .call(d3.axisBottom(x))
    .attr('transform', `translate(0, ${height - margin.bottom})`)
svg.append('g')
    .call(d3.axisLeft(y))
    .attr('transform', `translate(${margin.left}, 0)`)

// Plotting the chart with rectangles
let bg = svg.append('g')

bg.selectAll('rect')
    .data(courses)
    .enter()
    .append('rect')
    .attr('x', c => x(c.name))
    .attr('y', height - margin.bottom)
    .attr('width', x.bandwidth())
    .attr('height', 0)
    .style('fill', 'steelblue')
    .style('stroke', 'black')
    .style('stroke-width', 2)
    .transition().duration(2000).attr('y', c => y(c.students))
    .attr('height', c => y(0) - y(c.students))

bg.selectAll('text')
    .data(courses)
    .enter()
    .append('text')
    .attr('x', c => x(c.name) + x.bandwidth()/2)
    .attr('y', c => y(c.students) - 5)
    .attr('text-anchor', 'middle')
    .text(c => c.students)
    .attr('font-size', 10)

// Interactions
d3.selectAll('rect').on('mouseover', function(){
    d3.select(this).style('opacity', 0.5)
})
.on('mouseout', function(){
    d3.select(this).style('opacity', 1)
})