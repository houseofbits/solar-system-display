precision highp float;

// Attributes
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute vec4 world0;
attribute vec4 world1;
attribute vec4 world2;
attribute vec4 world3;

// Uniforms
uniform mat4 worldViewProjection;

uniform mat4 world;
uniform vec3 sunPosition;

// Varying
varying vec3 vPosition;
varying vec3 vPositionW;
varying vec3 vNormal;
varying vec3 vNormalW;
varying vec2 vUV;
varying vec3 vSunDirection;

void main(void) {

    mat4 finalWorld = mat4(world0, world1, world2, world3);
    
    vec3 pos = finalWorld[3].xyz;

    vPositionW = vec3(finalWorld * vec4(position, 1.0));

    gl_Position = worldViewProjection * vec4(vPositionW, 1.0);    

    mat3 normalWorld = mat3(finalWorld);
    vNormalW = normalize(normalWorld * normal);

    vUV = uv;
    vPosition = position;
    vNormal = normal;

    vSunDirection = sunPosition - pos;
}

