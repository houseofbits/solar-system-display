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
uniform vec3 atmosphereColor;
uniform float atmosphereDensity;

void main(void) {

    vec3 lightVectorW = -normalize(vSunDirection);

    vec3 viewDirectionW = normalize(cameraPosition - vPositionW);

    // Fresnel
	float fresnelTerm = dot(viewDirectionW, vNormalW);

    float ndlFren = max(0., dot(vNormalW + (lightVectorW * 0.4), lightVectorW));

    float ft1 = pow(clamp(fresnelTerm + fresnelTerm + (fresnelTerm * 0.5), 0., 1.), 5.);

    // specular
    vec3 angleW = normalize(viewDirectionW + lightVectorW);
    float specComp = max(0., dot(vNormalW, angleW));
    specComp = pow(specComp, max(1., 12.)) * 2.;

    //Blue atmosferic effect
    float fresnelTermPow = pow(clamp(1.0 - fresnelTerm, 0., 1.), 2.);
    vec3 atmosphere = (atmosphereColor + ft1 * ndlFren); 

    vec3 color = vec3(specComp) + vec3(fresnelTermPow * ndlFren) + atmosphere;

    float inte = (specComp + ndlFren) * atmosphereDensity + (1.0 - ndlFren) * 0.4;

    gl_FragColor = vec4(vec3(color), inte * ft1);
}
