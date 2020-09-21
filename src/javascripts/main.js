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