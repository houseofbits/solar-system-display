import * as BABYLON from 'babylonjs';
import CustomMaterial from './CustomMaterial.js';
import AtmVertexShader from '../resources/shaders/atm.vertex.fx';
import AtmFragmentShader from '../resources/shaders/atm.fragment.fx';

export default 
class AtmosphereMaterial extends CustomMaterial {
    constructor(scene, name) {
        super(scene, name);

        this.loadShaderData("atm", AtmVertexShader, AtmFragmentShader);

        this.shaderMaterial = new BABYLON.ShaderMaterial(this.name + this.getShaderName(), this.scene, 
            { vertex: this.getShaderName(),fragment: this.getShaderName() },            
            {   
                needAlphaBlending: true,
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            });

        this.setSunPosition(new BABYLON.Vector3(0,0,0));  
        this.setCameraPosition(this.scene.activeCamera.position);
        this.setColor(new BABYLON.Vector3(0,0,0.5)); 
        this.setDensity(1.0);
    }
    setColor(color){
        this.shaderMaterial.setVector3("atmosphereColor", color); 
    } 
    setDensity(value){
        this.shaderMaterial.setFloat("atmosphereDensity", value); 
    }         
}