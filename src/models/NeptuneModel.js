
import * as BABYLON from 'babylonjs';

export default
class NeptuneModel {
    constructor(engine, scene, canvas, size) {

        this.scene = scene;

        this.sphere = BABYLON.Mesh.CreateSphere('venusSphere', 26, size, this.scene, false, BABYLON.Mesh.FRONTSIDE);
       
        var material = new BABYLON.StandardMaterial(this.scene);
        material.emissiveColor = new BABYLON.Color3(0.5,0.5,0);
        material.diffuseColor = new BABYLON.Color3(1.0, 1.0, 1.0);
        this.sphere.material = material;
    }
    getScene(){
        return this.scene;
    }  
    setPosition(x,y,z){
        this.sphere.position.x = x;
        this.sphere.position.y = y;
        this.sphere.position.z = z;
    }     
    update(){
    
    }
  }

