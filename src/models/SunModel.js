
import * as BABYLON from 'babylonjs';

export default 
class SunModel {
    constructor(engine, scene, canvas, size) {

        this.scene = scene;

        this.sphere = BABYLON.Mesh.CreateSphere('sunSphere', 26, size, this.scene, false, BABYLON.Mesh.FRONTSIDE);
       
        var material = new BABYLON.StandardMaterial(this.scene);
        material.emissiveColor = new BABYLON.Color3(1,1,0);
        material.diffuseColor = new BABYLON.Color3(1.0, 1.0, 0.0);
        this.sphere.material = material;
    }
    getScene(){
        return this.scene;
    }  
    update(){
    
    }
  }

