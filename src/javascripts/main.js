// Required by Webpack - do not touch
require.context('../', true, /\.(html|json|txt|dat)$/i)
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

// First: Set up your name
let std_name = "Julian Dean"
document.querySelector('#std_name').innerHTML = `<strong>${std_name}</strong>`

import { scribble, sierpinski, displayMultiPogram } from './week05'
import { displayCubeIndexed } from './week06'

displayCubeIndexed()