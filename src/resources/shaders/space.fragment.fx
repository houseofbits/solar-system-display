precision highp float;

// Varying
varying vec3 vPosition;
varying vec3 vPositionW;
varying vec3 vNormal;
varying vec3 vNormalW;
varying vec2 vUV;

// Uniforms
uniform mat4 world;

// Refs
uniform vec3 cameraPosition;

uniform sampler2D diffuseMap;

void main(void) {

    //vec3 viewDirectionW = normalize(cameraPosition - vPositionW);

    vec3 map = texture2D(diffuseMap, vUV).xyz;

    vec3 color = map + map;

    //float fresnelTerm = dot(viewDirectionW, vNormalW);
    //float fresnelTermPow = clamp(1.0 - fresnelTerm, 0., 1.);//pow(clamp(1.0 - fresnelTerm, 0., 1.), 1.);

    float opacity = 1.;
    #ifdef OPACITY
        opacity = (map.x + map.y + map.z) * 0.33;
        opacity = opacity + opacity + opacity + opacity + opacity;
    #endif
    #ifdef MILKYWAY
        color = texture2D(diffuseMap, vUV).xyz;
        opacity = (color.x + color.y + color.z) * 0.33;
    #endif

    //gl_FragColor = vec4(vec3(fresnelTermPow), 1.);

    gl_FragColor = vec4(color, opacity);
}
