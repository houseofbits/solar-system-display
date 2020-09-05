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

uniform float alphaFade;

void main(void) {

    vec3 lightVectorW = normalize(vSunDirection);

    vec3 viewDirectionW = normalize(cameraPosition - vPositionW);

    vec3 map = texture2D(diffuseMap, vUV).rgb; 

    float ndotl = dot(vNormalW, lightVectorW);

    float ndotl2 = max(0., dot(vNormalW, -lightVectorW)) * 0.4;

    vec3 ambientFragColor = vec3(1., 1., 0.8) * ndotl2;

    vec3 color = ambientFragColor + (map * ndotl) + ambientFragColor;

    float ldv = clamp(dot(viewDirectionW, -lightVectorW), 0., 1.);

    vec3 colorInv = clamp((1. - color), vec3(0.), vec3(1.));

    vec3 lv = (ldv * (colorInv * vec3(1.,1.,0.5) * 0.2));

    color = color + (ldv * ((1. - color) * vec3(1.,1.,0.5) * 0.2));

    gl_FragColor = vec4(vec3(color), alphaFade);
}
