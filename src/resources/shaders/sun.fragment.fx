precision highp float;

#define M_PI 3.1415926535897932384626433832795
#define M_PI2 M_PI*2

// Varying
varying vec3 vPosition;
varying vec4 vPositionW;
varying vec3 vNormal;
varying vec3 vNormalW;
varying vec2 vUV;
varying vec4 vUV2;
varying vec4 vColor;

// Uniforms
uniform mat4 world;

// Refs
uniform vec3 cameraPosition;

uniform sampler2D diffuseMap;
uniform sampler2D diffuseMap2;
uniform sampler2D diffuseMap3;
uniform sampler2D depthMap;

uniform vec2 animation;

uniform float transparency;

float exponentialEasing (float x, float a){
  
  float epsilon = 0.00001;
  float min_param_a = 0.0 + epsilon;
  float max_param_a = 1.0 - epsilon;
  a = max(min_param_a, min(max_param_a, a));
  
  if (a < 0.5){
    // emphasis
    a = 2.0*(a);
    float y = pow(x, a);
    return y;
  } else {
    // de-emphasis
    a = 2.0*(a-0.5);
    float y = pow(x, 1.0/(1.-a));
    return y;
  }
}

void main(void) {
    
	vec2 uv1 = vUV;
	float n1 = sin(animation.x + (uv1.y * M_PI * 20.)) * 0.005;
	uv1.x -= n1;
	float n2 = sin(animation.y + (uv1.x * M_PI * 40.)) * 0.005;	
    uv1.y -= n2;

	vec2 uv2 = vUV;
	n1 = sin(animation.x + (uv2.y * M_PI * 15.)) * 0.005;
	uv2.x -= n1;
	n2 = sin(animation.y + (uv2.x * M_PI * 20.)) * 0.005;	
    uv2.y -= n2;


	vec2 uv3 = vUV;
	n1 = sin(animation.x + (uv3.y * M_PI * 10.)) * 0.01;
	uv3.x -= n1;

    vec3 map = texture2D(diffuseMap, uv3).xyz;
    vec3 map2 = texture2D(diffuseMap2, uv1 * 3.).xyz;
    vec3 map21 = texture2D(diffuseMap2, uv2 * 6.).xyz;
    vec3 map3 = texture2D(diffuseMap3, (uv3 * 6.)).xyz;

    vec3 viewDirectionW = normalize(cameraPosition - vPositionW.xyz);
    float fresnelTerm = dot(viewDirectionW, vNormalW);
    float fresnelTermPow = pow(clamp(1.0 - fresnelTerm, 0., 1.), 2.);
    float fresnelTermPow2 = pow(clamp(1.0 - fresnelTerm, 0., 1.), 1.);
    float fresnelTermPow3 = pow(clamp(1.0 - fresnelTerm, 0., 1.), 6.);

    vec3 layer1 = mix(map2, map2 - vec3(0,1,1), fresnelTermPow2);
    vec3 layer2 = (vec3(fresnelTermPow) * vec3(1,1,0));

    vec3 color = fresnelTermPow3 + map21 * ((layer1 * map3) + layer2) + map;

    float alpha = 1.;
    #ifdef RAYS 
        float decay = exponentialEasing(vColor.a, 0.95);
        float alphaMap = (map.x + map.y + map.z) * 0.33;
        alpha = decay * pow(alphaMap, 2.);
        float glow = fresnelTermPow3 * exponentialEasing(vColor.a, 0.99);

        //Current depth of fragment
        float currD = (1./gl_FragCoord.w) / 9999.;
        
        //Scene depth
        vec3 projCoords = (vUV2.xyz / vUV2.w)*0.5+0.5;
        vec4 depthm = texture2D(depthMap, projCoords.xy);
        
        //Compute intersection fade val
        float val = clamp(abs(float(depthm.r - currD)) * 1000., 0.0, 1.0);

        //Fade geometry near camera clipping plane
        float distance = length(cameraPosition - vPositionW.xyz);
        float opacity = clamp(distance / 5., 0., 1.);

        val = val * opacity;

        gl_FragColor = vec4(vec3(color), val * (glow+alpha));

        return;

    #endif
  

    gl_FragColor = vec4(vec3(color), alpha);
}
