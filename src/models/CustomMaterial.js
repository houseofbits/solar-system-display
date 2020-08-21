import * as BABYLON from 'babylonjs';

export default 
class CustomMaterial {
    constructor(scene, name) {
        this.scene = scene;
        this.name = name;
        this.shaderMaterial = null;
    }
    loadShaderData(shaderName, vertex, fragment){
        this.shaderName = shaderName;
        if(typeof BABYLON.Effect.ShadersStore[this.shaderName + "VertexShader"] == 'undefined')BABYLON.Effect.ShadersStore[this.shaderName + "VertexShader"] = vertex;
        if(typeof BABYLON.Effect.ShadersStore[this.shaderName + "FragmentShader"] == 'undefined')BABYLON.Effect.ShadersStore[this.shaderName + "FragmentShader"] = fragment;
    }
    getShaderName(){
        return this.shaderName;
    }
    getMaterial(){
        return this.shaderMaterial;
    }
    setCameraPosition(pos){
        this.shaderMaterial.setVector3("cameraPosition", pos);
    }
    setObjectPosition(pos){
        this.shaderMaterial.setVector3("objectPosition", pos);
    }    
    setSunPosition(pos){
        this.shaderMaterial.setVector3("sunPosition", pos);    
    } 
    setDiffuseMap(map){
        this.shaderMaterial.setTexture("diffuseMap", new BABYLON.Texture(map, this.scene));       
    }      
}