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

uniform vec3 cameraPosition;

uniform sampler2D diffuseMap;

void main(void) {

    vec3 lightVectorW = normalize(vSunDirection);

    vec3 map = texture2D(diffuseMap, vUV).rgb; 

    float ndotl = dot(vNormalW, lightVectorW);

    vec3 color = map * ndotl;

    gl_FragColor = vec4(vec3(color), 1.);
}
