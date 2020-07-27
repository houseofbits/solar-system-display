
import * as BABYLON from 'babylonjs';
import DiffuseTexture from './img/checker.png';
import NormalTexture from './img/normals.png';

export class ShadowsExample {
    constructor(engine, canvas) {

        this.scene = new BABYLON.Scene(engine);

        // let camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), this.scene);
        // camera.setTarget(BABYLON.Vector3.Zero());
        // camera.attachControl(canvas, false);    

        let arcCamera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), this.scene);
        arcCamera.setPosition(new BABYLON.Vector3(0, 1, 10));
        arcCamera.target = new BABYLON.Vector3(0, 1, 0);
        arcCamera.attachControl(canvas, false);  

        let sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, this.scene, false, BABYLON.Mesh.FRONTSIDE);
        sphere.position.y = 1;

        let textureMaterial = new BABYLON.StandardMaterial("textureMaterial", this.scene);
        textureMaterial.diffuseTexture = new BABYLON.Texture(DiffuseTexture, this.scene);
        textureMaterial.bumpTexture = new BABYLON.Texture(NormalTexture, this.scene);

        sphere.material = textureMaterial;

        let sphere2 = BABYLON.Mesh.CreateSphere('sphere2', 16, 2, this.scene, false, BABYLON.Mesh.FRONTSIDE);
        sphere2.position.x = 1; 
        sphere2.position.y = -1.5;  
        sphere2.receiveShadows = true;      

        let ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, this.scene, false);
        ground.position.y = -3;
        ground.receiveShadows = true;
        
        let light = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 0), this.scene);
        light.intensity = 3;
        light.position = new BABYLON.Vector3(0, 50, 0);
        light.includedOnlyMeshes.push(ground);
        light.includedOnlyMeshes.push(sphere);
        light.includedOnlyMeshes.push(sphere2);

        let shadowGenerator = new BABYLON.ShadowGenerator(512, light);
        shadowGenerator.getShadowMap().renderList.push(sphere);
        shadowGenerator.getShadowMap().renderList.push(sphere2);
        shadowGenerator.usePoissonSampling = true;
        //shadowGenerator.useBlurExponentialShadowMap = true;
        //shadowGenerator.blurBoxOffset = 2.0; 
        
        // light.shadowMinZ = 0;
        // light.shadowMaxZ = 500;
        // shadowGenerator.depthScale = 500;
        // shadowGenerator.bias = 0.001;   
        
        // let hl = new BABYLON.HighlightLayer("hl", this.scene);
        // hl.addMesh(sphere, BABYLON.Color3.Yellow());      
        // hl.isEnabled = true;  
        // hl.innerGlow = false;
    }
    getScene(){
        return this.scene;
    }
    render(){
        this.getScene().render();
    }
  }

