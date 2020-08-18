import * as BABYLON from 'babylonjs';
import PlanetRingVertexShader from '../resources/shaders/ring.vertex.fx';
import PlanetRingFragmentShader from '../resources/shaders/ring.fragment.fx';

export default 
class PlanetRingMaterial {
    constructor(scene, name) {

        this.scene = scene;

        if(typeof BABYLON.Effect.ShadersStore["ringVertexShader"] == 'undefined')BABYLON.Effect.ShadersStore["ringVertexShader"] = PlanetRingVertexShader;
        if(typeof BABYLON.Effect.ShadersStore["ringFragmentShader"] == 'undefined')BABYLON.Effect.ShadersStore["ringFragmentShader"] = PlanetRingFragmentShader;

        this.shaderMaterial = new BABYLON.ShaderMaterial(name+"RingShader", this.scene, 
            { vertex: "ring",fragment: "ring" },            
            {   
                needAlphaBlending: true,
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            });

        this.shaderMaterial.setVector3("sunPosition", new BABYLON.Vector3(0,0,0)); 


    }
    setObjectPosition(pos){
        this.shaderMaterial.setVector3("objectPosition", pos);
    }  
    setDiffuseMap(map){
        this.shaderMaterial.setTexture("diffuseMap", new BABYLON.Texture(map, this.scene));       
    }   
    setCameraPosition(pos){
        this.shaderMaterial.setVector3("cameraPosition", pos);
    }     
}