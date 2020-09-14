//Runs on the GPU. Runs for every single point.

#version 300 es //OpenGL ES 3

in vec3 coordinates;    // Define a variable. In means input from JavaScript.

void main(void){    // Entry point
    gl_Position = vec4(coordinates, 1.0);   // Convert vec3 to vec4. Everything is floating point
    gl_PointSize = 3.0;
}