import * as BABYLON from 'babylonjs';
import CustomMaterial from './CustomMaterial.js';
import PlanetRingVertexShader from '../resources/shaders/ring.vertex.fx';
import PlanetRingFragmentShader from '../resources/shaders/ring.fragment.fx';

export default 
class PlanetRingMaterial extends CustomMaterial {
    constructor(scene, name) {
        super(scene, name);

        this.loadShaderData("ring", PlanetRingVertexShader, PlanetRingFragmentShader);

        this.shaderMaterial = new BABYLON.ShaderMaterial(name + this.getShaderName(), this.scene, 
            { vertex: this.getShaderName(),fragment: this.getShaderName() },            
            {   
                needAlphaBlending: true,
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            });

        this.setSunPosition(new BABYLON.Vector3(0,0,0));  
        this.setCameraPosition(this.scene.activeCamera.position);
    }
}