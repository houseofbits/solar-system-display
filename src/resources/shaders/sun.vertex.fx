precision highp float;

// Attributes
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute vec4 color;

// Uniforms
uniform mat4 worldViewProjection;

uniform mat4 world;
uniform mat4 view;

// Varying
varying vec3 vPosition;
varying vec4 vPositionW;
varying vec3 vNormal;
varying vec3 vNormalW;
varying vec2 vUV;
varying vec4 vUV2;
varying vec4 vColor;

void main(void) {

    gl_Position = worldViewProjection * vec4(position, 1.0);
    
    vPositionW = world * vec4(position, 1.0);

    mat3 normalWorld = mat3(world);
    vNormalW = normalize(normalWorld * normal);

    vUV = uv;
    vUV2 = worldViewProjection * vec4(position, 1.0);
    vPosition = position;
    vNormal = normal;
    vColor = color;
}

