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
    float ndotl = dot(vNormalW, lightVectorW);
    if(ndotl < 0.){
        discard;
    }
    vec4 map = texture2D(diffuseMap, vUV); 
    float val = (map.x + map.y + map.z) * 0.333;
    vec3 color = mix(vec3(val), vec3(1.), 1. - map.w);
    gl_FragColor = vec4(color, map.w);
}
