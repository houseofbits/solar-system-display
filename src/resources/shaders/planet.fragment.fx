precision highp float;

// Varying
varying vec3 vPosition;
varying vec3 vPositionW;
varying vec3 vNormal;
varying vec3 vNormalW;
varying vec2 vUV;
varying vec4 vUV2;
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
uniform sampler2D shadowMap;
/*
Defines
    AO_MAP_ENABLE (aoMap)
    SPECULAR_MAP_ENABLE (specularMap)
    THICK_CLOUDS_OVERLAY_ENABLE (cloudsMap)
    NIGHT_MAP_ENABLE
    CLOUDS_OVERLAY_ENABLE
*/

float boxBlur (sampler2D source, vec2 uv, float offset) {

	vec2 texOffset = vec2(offset, offset);
	
	float edgeOffset = 0.1;
	vec2 edgeDistMult = vec2(1);
	if(uv.s <= edgeOffset)texOffset.s *= (uv.s / edgeOffset);	
	if(uv.t <= edgeOffset)texOffset.t *= (uv.t / edgeOffset);	
	if(uv.s >= (1.0-edgeOffset))texOffset.s *= ((1.0-uv.s) / edgeOffset);	
	if(uv.t >= (1.0-edgeOffset))texOffset.t *= ((1.0-uv.t) / edgeOffset);	
	
	vec2 tc0 = uv.st + vec2(-texOffset.s, -texOffset.t);
	vec2 tc1 = uv.st + vec2(         0.0, -texOffset.t);
	vec2 tc2 = uv.st + vec2(+texOffset.s, -texOffset.t);
	vec2 tc3 = uv.st + vec2(-texOffset.s,          0.0);
	vec2 tc4 = uv.st + vec2(         0.0,          0.0);
	vec2 tc5 = uv.st + vec2(+texOffset.s,          0.0);
	vec2 tc6 = uv.st + vec2(-texOffset.s, +texOffset.t);
	vec2 tc7 = uv.st + vec2(         0.0, +texOffset.t);
	vec2 tc8 = uv.st + vec2(+texOffset.s, +texOffset.t);
	
	float col0 = texture2D(source, tc0).r;
	float col1 = texture2D(source, tc1).r;
	float col2 = texture2D(source, tc2).r;
	float col3 = texture2D(source, tc3).r;
	float col4 = texture2D(source, tc4).r;
	float col5 = texture2D(source, tc5).r;
	float col6 = texture2D(source, tc6).r;
	float col7 = texture2D(source, tc7).r;
	float col8 = texture2D(source, tc8).r;

	float sum = (1.0 * col0 + 2.0 * col1 + 1.0 * col2 + 
	            2.0 * col3 + 4.0 * col4 + 2.0 * col5 +
	            1.0 * col6 + 2.0 * col7 + 1.0 * col8) / 16.0; 
	            
	return sum;	            
}

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
    vec3 bumpNormal = texture2D(normalMap, vUV).xyz * 2.0 - 1.0;
    vec3 normalW = normalize(vNormalW);

    //Tangent space matrix
    mat3 TBN = cotangent_frame(normalW * normalScale, vPositionW, vUV);

    //World space normal
    normalW = TBN * bumpNormal;
    
    // World values
    vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
    vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));
    vec3 viewDirectionW = normalize(cameraPosition - vPositionW);

    vec3 lightVectorW = normalize(vSunDirection);
    //vec3 color = vec3(1,1,1);
    vec3 color = texture2D(diffuseMap, vUV).rgb + cloudsOver;
    
    // diffuse
    float ndl = max(0., dot(normalW, lightVectorW));
    
    #ifdef SHADOW_MAP_ENABLE
        vec3 projCoords = (vUV2.xyz / vUV2.w)*0.5+0.5;
        float shadow = boxBlur(shadowMap, projCoords.xy, 0.003);
        ndl = ndl * shadow;
    #endif

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
