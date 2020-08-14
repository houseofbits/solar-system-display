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

uniform vec3 ambientColor;
uniform vec3 atmosphericColor;
uniform float atmosphericPow;
uniform float specularMult;
uniform float specularPow;
uniform float frensnelPow;

uniform sampler2D diffuseMap;
uniform sampler2D diffuseNightMap;
uniform sampler2D normalMap;
uniform sampler2D specularMap;
uniform sampler2D aoMap;
uniform sampler2D cloudsMap;

/*
Defines
    AO_MAP_ENABLE (aoMap)
    SPECULAR_MAP_ENABLE (specularMap)
    THICK_CLOUDS_OVERLAY_ENABLE (cloudsMap)
    NIGHT_MAP_ENABLE
    CLOUDS_OVERLAY_ENABLE
*/

mat3 cotangent_frame(vec3 normal, vec3 p, vec2 uv)
{
    // flip the uv for the backface
    uv = gl_FrontFacing ? uv : -uv;

    // get edge vectors of the pixel triangle
    vec3 dp1 = dFdx(p);
    vec3 dp2 = dFdy(p);
    vec2 duv1 = dFdx(uv);
    vec2 duv2 = dFdy(uv);

    // solve the linear system
    vec3 dp2perp = cross(dp2, normal);
    vec3 dp1perp = cross(normal, dp1);
    vec3 tangent = dp2perp * duv1.x + dp1perp * duv2.x;
    vec3 bitangent = dp2perp * duv1.y + dp1perp * duv2.y;

    // construct a scale-invariant frame
    float invmax = inversesqrt(max(dot(tangent, tangent), dot(bitangent, bitangent)));
    return mat3(tangent * invmax, bitangent * invmax, normal);
}

void main(void) {

    float normalScale = 1.0;

    vec3 cloudsOver = vec3(0,0,0);
    #ifdef CLOUDS_OVERLAY_ENABLE
        cloudsOver = texture2D(cloudsMap, vUV).rgb;        
    #endif

    //Normal map normal    
    //vec3 bumpNormal = texture2D(normalMap, vUV).xyz * 2.0 - 1.0;
    vec3 normalW = normalize(vNormalW);

    //Tangent space matrix
//    mat3 TBN = cotangent_frame(normalW * normalScale, vPositionW, vUV);

    //World space normal
  //  normalW = TBN * bumpNormal;
    
    // World values
    vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
    vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));
    vec3 viewDirectionW = normalize(cameraPosition - vPositionW);

    vec3 lightVectorW = normalize(vSunDirection);
    //vec3 color = vec3(1,1,1);
    vec3 color = texture2D(diffuseMap, vUV).rgb + cloudsOver;
    
    // diffuse
    float ndl = max(0., dot(normalW, lightVectorW));
    
    // specular
    float specular = 1.0;
    #ifdef SPECULAR_MAP_ENABLE
        specular = texture2D(specularMap, vUV).r;
    #endif

    vec3 angleW = normalize(viewDirectionW + lightVectorW);
    float specComp = max(0., dot(normalW, angleW));
    specComp = pow(specComp, max(1., specularPow)) * specularMult * specular;       //specularPow, specularMult
    
    // Fresnel
	float fresnelTerm = dot(viewDirectionW, normalW);
	float fresnelTermPow = pow(clamp(1.0 - fresnelTerm, 0., 1.), frensnelPow);       //frensnelPow

    float ndlFren = max(0., dot(normalW + (lightVectorW * 0.2), lightVectorW));

    //Clouds
    vec3 clouds = vec3(0,0,0);    
    #ifdef THICK_CLOUDS_OVERLAY_ENABLE
        clouds = texture2D(cloudsMap, vUV).rgb;
        clouds = (clouds * clouds * clouds * clouds * clouds * clouds);

        float cloudsNdl = max(0., dot(vNormalW + (lightVectorW * 0.5), lightVectorW));
        float cloudsFresnelTerm = 1. - dot(viewDirectionW, vNormalW);

        clouds = (clouds+clouds) * cloudsFresnelTerm * cloudsNdl;
    #endif

    vec3 sunFragColor = color * ndl + vec3(specComp) + clouds + (fresnelTermPow * ndlFren);

    // Fake ambient light
    lightVectorW = -normalize(vSunDirection);
    color = (texture2D(diffuseMap, vUV).rgb + cloudsOver) * ambientColor;                          //ambientColor
    
    // diffuse
    ndl = max(0., dot(normalW, lightVectorW)) * 0.3;

    vec3 ambientFragColor = color * ndl;

    //Blue atmosferic effect
    fresnelTermPow = pow(clamp(1.0 - fresnelTerm, 0., 1.), atmosphericPow);         //atmPow
    vec3 atmosphere = 0.3 * fresnelTermPow * atmosphericColor;                      //atmColor

    //Ambient occlusion map
    vec3 ao = vec3(1,1,1);
    #ifdef AO_MAP_ENABLE
        ao = texture2D(aoMap, vUV).rgb;
    #endif

    vec3 nightColor = vec3(0,0,0);
    #ifdef NIGHT_MAP_ENABLE
        nightColor = texture2D(diffuseNightMap, vUV).rgb;
    #endif

    float ldv = dot(viewDirectionW, lightVectorW);

    vec3 finalColor = nightColor + (ao * (ambientFragColor + sunFragColor) + atmosphere);

    finalColor = finalColor + (ldv * ((1. - finalColor) * vec3(1,1,0.5) * 0.2));

    gl_FragColor = vec4(finalColor, 1.);
}
