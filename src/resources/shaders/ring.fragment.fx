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

    vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
    vec3 lightVectorW = normalize(vSunDirection);

    vec4 map = texture2D(diffuseMap, vUV); 

    float ndotl = pow(clamp(dot(vNormalW, lightVectorW) + 1.0, 0.0,1.0), 3.);

    vec3 color = map.xyz * ndotl;

    float ldv = dot(viewDirectionW, -lightVectorW);

    color = color + (ldv * ((1. - color) * vec3(1,1,0.5) * 0.2));

    gl_FragColor = vec4(color, map.w);
}
