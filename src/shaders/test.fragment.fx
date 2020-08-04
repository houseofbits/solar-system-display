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
uniform sampler2D diffuseMap;
uniform sampler2D normalMap;

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
    
    vec3 bumpNormal = texture2D(normalMap, vUV).xyz * 2.0 - 1.0;

    vec3 normalW = normalize(vNormalW);

    mat3 TBN = cotangent_frame(normalW * normalScale, vPositionW, vUV);

    normalW = TBN * bumpNormal;
    
    // World values
    vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
    vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));
    vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
    
    // Light
    vec3 lightVectorW = normalize(vSunDirection);   //normalize(vLightPosition - vPositionW);
    vec3 color = texture2D(diffuseMap, vUV).rgb;

    vec3 normal = texture2D(normalMap, vUV).rgb;
    
    // diffuse
    float ndl = max(0., dot(normalW, lightVectorW));
    
    // Specular
    vec3 angleW = normalize(viewDirectionW + lightVectorW);
    float specComp = max(0., dot(normalW, angleW));
    specComp = pow(specComp, max(1., 64.)) * 2.;
    
    gl_FragColor = vec4(color * ndl + vec3(specComp), 1.);
}
