import * as BABYLON from 'babylonjs';
import PlanetModel from './PlanetModel.js';
import SunVertexShader from '../resources/shaders/sun.vertex.fx';
import SunFragmentShader from '../resources/shaders/sun.fragment.fx';
import SunMap from '../resources/img/sun/sun.jpg'
import SunMapTile from '../resources/img/sun/suntile.jpg'
import SunMapTile2 from '../resources/img/sun/suntile2_lo.jpg'

export default 
class SunModel extends PlanetModel{
    constructor(engine, scene, canvas, size) {
        
        super("sun", scene, size);
        
        this.defaultCameraAngle = -60.;
        this.animatedCameraAngles.push(-70);
        this.animatedCameraAngles.push(-50); 
        this.transitionSpeed = 20.0;   

        this.centerNode = new BABYLON.TransformNode(this.name + "Center"); 

        this.animation = new BABYLON.Vector2;

        this.rotationAxis = new BABYLON.Vector3(0.5,1,0);
        this.rotationAxis.normalize();

        BABYLON.Effect.ShadersStore["sunVertexShader"] = SunVertexShader;
        BABYLON.Effect.ShadersStore["sunFragmentShader"] = SunFragmentShader;

        this.shaderMaterial = new BABYLON.ShaderMaterial(this.name+"Shader", this.scene, 
            { vertex: "sun",fragment: "sun" },            
            {   
                attributes: ["position", "normal", "uv", "color"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            });

        this.shaderMaterial.setTexture("diffuseMap", new BABYLON.Texture(SunMap, this.scene));
        this.shaderMaterial.setTexture("diffuseMap2", new BABYLON.Texture(SunMapTile, this.scene));
        this.shaderMaterial.setTexture("diffuseMap3", new BABYLON.Texture(SunMapTile2, this.scene));
        this.shaderMaterial.setVector3("cameraPosition", this.scene.activeCamera.position);
        this.shaderMaterial.setVector2("animation", this.animation);

        this.shaderRaysMaterial = new BABYLON.ShaderMaterial(this.name+"RaysShader", this.scene, 
            { vertex: "sun",fragment: "sun" },            
            {   
                defines:["#define RAYS 1"],
                needAlphaBlending: true,
                attributes: ["position", "normal", "uv", "color"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            });

        this.shaderRaysMaterial.setTexture("diffuseMap", new BABYLON.Texture(SunMap, this.scene));
        this.shaderRaysMaterial.setTexture("diffuseMap2", new BABYLON.Texture(SunMapTile, this.scene));
        this.shaderRaysMaterial.setTexture("diffuseMap3", new BABYLON.Texture(SunMapTile2, this.scene));
        
        this.shaderRaysMaterial.setVector3("cameraPosition", this.scene.activeCamera.position);        
        this.shaderRaysMaterial.setVector2("animation", this.animation);

        this.sphere = BABYLON.Mesh.CreateSphere(this.name+"Sphere", 46, size, this.scene, false, BABYLON.Mesh.FRONTSIDE);    
        this.sphere.material = this.shaderMaterial;       
        this.sphere.parent = this.centerNode;

        let vertexData = this.createLightRays(this.size, 8, 450., true);

        this.rays = new BABYLON.Mesh(this.name + "Rays", this.scene);
        vertexData.applyToMesh(this.rays);
        this.rays.parent = this.centerNode;
        this.rays.material = this.shaderRaysMaterial;
    } 
    update(dt){
        let anim = dt * 0.5;
        this.centerNode.rotate(this.rotationAxis, dt * 0.05, BABYLON.Space.LOCAL);
        this.animation.x += anim;
        this.animation.y += anim;
        this.shaderRaysMaterial.setTexture("depthMap", this.scene._depthTexture);
    }
    setSimplifiedShader(set){

    }
    setVisible(visibility){
        super.setVisible(visibility);
        this.rays.visibility = visibility;
    }
    setRaysVisible(visibility){
        this.rays.visibility = visibility;
    }

    createLightRays(size, segments, length, frontSide){

        let radius = size * 0.5;
    
        let totalZRotationSteps = 2 + segments;
        let totalYRotationSteps = 2 * totalZRotationSteps;
    
        let indices = [];
        let positions = [];
        let normals = [];
        let uvs = [];
        let colors = [];

        //Horizontal bands

        for (let zRotationStep = 0; zRotationStep <= totalZRotationSteps; zRotationStep++) {            
            let indexSize = positions.length / 3;
            let normalizedZ = zRotationStep / totalZRotationSteps;
            let angleZ = normalizedZ * Math.PI;
            let indexCounter = 0;
            for (let yRotationStep = 0; yRotationStep <= totalYRotationSteps; yRotationStep++) {
                let normalizedY = yRotationStep / totalYRotationSteps;

                let angleY = normalizedY * Math.PI * 2.;

                let uvx = normalizedY;
                let uvy = normalizedZ;
                let rotationZ = BABYLON.Matrix.RotationZ(-angleZ);
                let rotationY = BABYLON.Matrix.RotationY(angleY);

                let afterRotZ = BABYLON.Vector3.TransformCoordinates(BABYLON.Axis.Y, rotationZ);
                let complete = BABYLON.Vector3.TransformCoordinates(afterRotZ, rotationY);

                let vertex = complete.scale(radius);
                let normal = complete.normalize();
                let color = new BABYLON.Vector4(1,1,0,1);
                
                positions.push(vertex.x, vertex.y, vertex.z);
                normals.push(normal.x, normal.y, normal.z);
                uvs.push(uvx, uvy);
                colors.push(color.x, color.y, color.z, color.w);          

                vertex = vertex.add(normal.scale(length));
                color = new BABYLON.Vector4(1,0,0,0);
                
                positions.push(vertex.x, vertex.y, vertex.z);
                normals.push(normal.x, normal.y, normal.z);
                uvs.push(uvx, uvy + 0.1);
                colors.push(color.x, color.y, color.z, color.w);

                indexCounter+=2;
            }
            indexCounter = indexCounter;

            for(let i=0; i<indexCounter-2; i+=2){

                    indices.push(indexSize + i);
                    indices.push(indexSize + ((i + 1)%indexCounter));
                    indices.push(indexSize + ((i + 3)%indexCounter));

                    indices.push(indexSize + i);
                    indices.push(indexSize + ((i + 3)%indexCounter));           
                    indices.push(indexSize + ((i + 2)%indexCounter));

                    indices.push(indexSize + ((i + 1)%indexCounter));
                    indices.push(indexSize + i);
                    indices.push(indexSize + ((i + 3)%indexCounter));

                    indices.push(indexSize + ((i + 3)%indexCounter));                           
                    indices.push(indexSize + i);
                    indices.push(indexSize + ((i + 2)%indexCounter));                

            }
        }
        //Vertical bands
        for (let yRotationStep = 0; yRotationStep <= totalYRotationSteps; yRotationStep++) {
            let normalizedY = yRotationStep / totalYRotationSteps;
            let angleY = normalizedY * Math.PI * 2.;
            let indexCounter = 0;
            let indexSize = positions.length / 3;

            for (let zRotationStep = 0; zRotationStep <= totalZRotationSteps; zRotationStep++) {            
                
                let normalizedZ = zRotationStep / totalZRotationSteps;
                let angleZ = normalizedZ * Math.PI;

                let uvx = normalizedY;
                let uvy = normalizedZ;
                let rotationZ = BABYLON.Matrix.RotationZ(-angleZ);
                let rotationY = BABYLON.Matrix.RotationY(angleY);

                let afterRotZ = BABYLON.Vector3.TransformCoordinates(BABYLON.Axis.Y, rotationZ);
                let complete = BABYLON.Vector3.TransformCoordinates(afterRotZ, rotationY);

                let vertex = complete.scale(radius);
                let normal = complete.normalize();
                let color = new BABYLON.Vector4(1,1,0,1);
                
                positions.push(vertex.x, vertex.y, vertex.z);
                normals.push(normal.x, normal.y, normal.z);
                uvs.push(uvx, uvy);
                colors.push(color.x, color.y, color.z, color.w);          

                vertex = vertex.add(normal.scale(length));
                color = new BABYLON.Vector4(1,0,0,0);
                
                positions.push(vertex.x, vertex.y, vertex.z);
                normals.push(normal.x, normal.y, normal.z);
                uvs.push(uvx, uvy+0.1);
                colors.push(color.x, color.y, color.z, color.w);

                indexCounter+=2;
            }
            indexCounter = indexCounter;
            for(let i=0; i<indexCounter-2; i+=2){
 
                indices.push(indexSize + ((i + 1)%indexCounter));
                indices.push(indexSize + i);
                indices.push(indexSize + ((i + 3)%indexCounter));

                indices.push(indexSize + ((i + 3)%indexCounter));           
                indices.push(indexSize + i);
                indices.push(indexSize + ((i + 2)%indexCounter));
                
                indices.push(indexSize + i);
                indices.push(indexSize + ((i + 1)%indexCounter));
                indices.push(indexSize + ((i + 3)%indexCounter));
        
                indices.push(indexSize + i);
                indices.push(indexSize + ((i + 3)%indexCounter));   
                indices.push(indexSize + ((i + 2)%indexCounter));                
            }
        }        
        // Result
        var vertexData = new BABYLON.VertexData();
        
        vertexData.indices = indices;
        vertexData.positions = positions;
        vertexData.normals = normals;
        vertexData.uvs = uvs;
        vertexData.colors = colors;

        return vertexData;  
    }    
  }

