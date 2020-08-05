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

    vec3 lightVectorW = -normalize(vSunDirection);

    vec3 viewDirectionW = normalize(cameraPosition - vPositionW);

    // Fresnel
	float fresnelTerm = dot(viewDirectionW, vNormalW);
	float fresnelTermPow = pow(clamp(1.0 - fresnelTerm, 0., 1.), 2.);

    float ndlFren = max(0., dot(vNormalW + (lightVectorW * 0.4), lightVectorW));

    // specular
    vec3 angleW = normalize(viewDirectionW + lightVectorW);
    float specComp = max(0., dot(vNormalW, angleW));
    specComp = pow(specComp, max(1., 12.)) * 2.;

    //Blue atmosferic effect
    fresnelTermPow = pow(clamp(1.0 - fresnelTerm, 0., 1.), 2.);
    vec3 atmosphere = 0.5 * fresnelTermPow * vec3(0,0,1);

    vec3 lightSide = vec3(specComp) + vec3(fresnelTermPow * ndlFren) + atmosphere;

    float ft1 = pow(clamp(fresnelTerm, 0., 1.), 2.);
    //float ft2 = pow(clamp(1.0 - fresnelTerm, 0., 1.), 2.);

    float ftfin = (ft1 + ft1 + ft1);
    //if(ftfin > 0.65)ftfin = 0.;

    gl_FragColor = vec4(vec3(ftfin), 1.);

    gl_FragColor = vec4(lightSide, ftfin);
}
