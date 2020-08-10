precision highp float;

// Varying
varying vec3 vPosition;
varying vec3 vPositionW;
varying vec3 vNormal;
varying vec3 vNormalW;
varying vec2 vUV;
varying vec3 vSunDirection;

// Uniforms
uniform mat4 world;

// Refs
uniform vec3 cameraPosition;

void main(void) {
    
    vec3 lightVectorW = normalize(vSunDirection);

    float ndotl = dot(lightVectorW, vNormalW);

    gl_FragColor = vec4(vec3(ndotl), 1.);
}