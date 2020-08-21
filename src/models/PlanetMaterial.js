import * as BABYLON from 'babylonjs';
import CustomMaterial from './CustomMaterial.js';
import PlanetVertexShader from '../resources/shaders/planet.vertex.fx';
import PlanetFragmentShader from '../resources/shaders/planet.fragment.fx';

export default 
class PlanetMaterial extends CustomMaterial {
    constructor(scene, name, options) {
        super(scene, name);

        this.loadShaderData("planet", PlanetVertexShader, PlanetFragmentShader);

        let defines = [];
        if(typeof options != 'undefined'){
            if(typeof options['aoEnable'] != 'undefined')defines.push("#define AO_MAP_ENABLE 1");
            if(typeof options['specularMapEnable'] != 'undefined')defines.push("#define SPECULAR_MAP_ENABLE 1");
            if(typeof options['thickCloudsEnable'] != 'undefined')defines.push("#define THICK_CLOUDS_OVERLAY_ENABLE 1");
            if(typeof options['nightMapEnable'] != 'undefined')defines.push("#define NIGHT_MAP_ENABLE 1");
            if(typeof options['overlayCloudsEnable'] != 'undefined')defines.push("#define CLOUDS_OVERLAY_ENABLE 1");   
            if(typeof options['shadowMapEnable'] != 'undefined')defines.push("#define SHADOW_MAP_ENABLE 1");                
        }
        this.shaderMaterial = new BABYLON.ShaderMaterial(name+"Shader", this.scene, 
            { vertex: this.getShaderName(),fragment: this.getShaderName() },            
            {   
                defines:defines,
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            });
        
        this.setSunPosition(new BABYLON.Vector3(0,0,0));  
        this.setCameraPosition(this.scene.activeCamera.position);
        this.setSpecular(1.0, 10.0);
        this.setAtmospheric(new BABYLON.Vector3(1.0, 1.0, 0.2), new BABYLON.Vector3(0.9, 0.6, 0.8), 3.0);
        this.setLightBleedPow(2.0);                 
    }
    setDiffuseNightMap(map){
        this.shaderMaterial.setTexture("diffuseNightMap", new BABYLON.Texture(map, this.scene));        
    }
    setNormalMap(map){
        this.shaderMaterial.setTexture("normalMap", new BABYLON.Texture(map, this.scene));        
    }
    setSpecularMap(map){
        this.shaderMaterial.setTexture("specularMap", new BABYLON.Texture(map, this.scene));        
    }
    setAoMap(map){
        this.shaderMaterial.setTexture("aoMap", new BABYLON.Texture(map, this.scene));        
    }
    setCloudsMap(map){
        this.shaderMaterial.setTexture("cloudsMap", new BABYLON.Texture(map, this.scene));        
    }  
    setSpecular(mult, pow){
        this.shaderMaterial.setFloat("specularMult", mult);    
        this.shaderMaterial.setFloat("specularPow", pow); 
    }
    setAtmospheric(ambColor, frensColor, pow){
        this.shaderMaterial.setVector3("ambientColor", ambColor);    
        this.shaderMaterial.setVector3("atmosphericColor", frensColor);
        this.shaderMaterial.setFloat("atmosphericPow", pow);    
    }
    setLightBleedPow(pow){
        this.shaderMaterial.setFloat("frensnelPow", pow); 
    }
}