
import * as BABYLON from 'babylonjs';
import DiffuseTexture from './img/checker.png';
import NormalTexture from './img/normals.png';
import SpecularTexture from './img/specular.png';

import TestVertexShader from './shaders/test.vertex.fx';
import TestFragmentShader from './shaders/test.fragment.fx';

import StdVertexShader from './shaders/std.vertex.fx';
import StdFragmentShader from './shaders/std.fragment.fx';

export class ShaderTest {
    constructor(engine, canvas) {

        this.scene = new BABYLON.Scene(engine);

        let arcCamera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), this.scene);
        arcCamera.setPosition(new BABYLON.Vector3(0, 1, 10));
        arcCamera.target = new BABYLON.Vector3(0, 1, 0);
        arcCamera.attachControl(canvas, false);  

        let sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 4, this.scene, false, BABYLON.Mesh.FRONTSIDE);
        sphere.position.y = 2;
        sphere.position.x = -2.5;

        let sphere2 = BABYLON.Mesh.CreateSphere('sphere1', 16, 4, this.scene, false, BABYLON.Mesh.FRONTSIDE);
        sphere2.position.y = 2;
        sphere2.position.x = 2.5;

        let light = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 0), this.scene);
        light.intensity = 1;
        light.position = new BABYLON.Vector3(0, 50, 0);

        /*****************************/

        this.shaderMaterial = new BABYLON.ShaderMaterial("shader", this.scene, {
            vertexSource: TestVertexShader,
            fragmentSource: TestFragmentShader,
            },
            {
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            });

        let mainTexture = new BABYLON.Texture(DiffuseTexture, this.scene);
        let normalTexture = new BABYLON.Texture(NormalTexture, this.scene);

        this.shaderMaterial.setTexture("diffuseMap", mainTexture);        
        this.shaderMaterial.setTexture("normalMap", normalTexture);                
        this.shaderMaterial.setVector3("cameraPosition", BABYLON.Vector3.Zero());
        this.shaderMaterial.setVector3("objectPosition", sphere2.position);        
        this.shaderMaterial.setVector3("sunPosition", new BABYLON.Vector3(0,0,0));        

        sphere2.material = this.shaderMaterial;

        /*****************************/
        
        BABYLON.Effect.ShadersStore["custom1VertexShader"] = StdVertexShader;
        BABYLON.Effect.ShadersStore["custom1FragmentShader"] = StdFragmentShader;

        let customMaterial = new BABYLON.StandardMaterial("textureMaterial", this.scene);

        customMaterial.bumpTexture = new BABYLON.Texture(NormalTexture, this.scene);
        customMaterial.diffuseTexture = new BABYLON.Texture(DiffuseTexture, this.scene);
        customMaterial.specularTexture = new BABYLON.Texture(SpecularTexture, this.scene);

        customMaterial.customShaderNameResolve = function(shaderName, 
            uniforms, 
            uniformBuffers, 
            samplers, 
            defines, 
            attributes, 
            options){
                return 'custom1';
        };
            
        sphere.material = customMaterial;  

        /************************ */
    }
    getScene(){
        return this.scene;
    }
    render(){
        
        this.shaderMaterial.setVector3("cameraPosition", this.scene.activeCamera.position);

        this.getScene().render();
    }
  }

