import * as BABYLON from 'babylonjs';
import PlanetVertexShader from '../resources/shaders/planet.vertex.fx';
import PlanetFragmentShader from '../resources/shaders/planet.fragment.fx';
import SimplePlanetVertexShader from '../resources/shaders/simple.vertex.fx';
import SimpleFragmentShader from '../resources/shaders/simple.fragment.fx';

export default 
class PlanetMaterial {
    constructor(scene, name, options) {

        this.scene = scene;

        if(typeof BABYLON.Effect.ShadersStore["planetVertexShader"] == 'undefined')BABYLON.Effect.ShadersStore["planetVertexShader"] = PlanetVertexShader;
        if(typeof BABYLON.Effect.ShadersStore["planetFragmentShader"] == 'undefined')BABYLON.Effect.ShadersStore["planetFragmentShader"] = PlanetFragmentShader;

        if(typeof BABYLON.Effect.ShadersStore["planetloVertexShader"] == 'undefined')BABYLON.Effect.ShadersStore["planetloVertexShader"] = SimplePlanetVertexShader;
        if(typeof BABYLON.Effect.ShadersStore["planetloFragmentShader"] == 'undefined')BABYLON.Effect.ShadersStore["planetloFragmentShader"] = SimpleFragmentShader;


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
            { vertex: "planet",fragment: "planet" },            
            {   
                defines:defines,
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            });
        
        this.shaderMaterial.setVector3("sunPosition", new BABYLON.Vector3(0,0,0));
        this.setSpecular(1.0, 10.0);
        this.setAtmospheric(new BABYLON.Vector3(1.0, 1.0, 0.2), new BABYLON.Vector3(0.9, 0.6, 0.8), 3.0);
        this.setLightBleedPow(2.0);

        this.shaderMaterialLo = new BABYLON.ShaderMaterial(name+"ShaderLo", this.scene, 
            { vertex: "planetlo",fragment: "planetlo" },            
            {   
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            }); 
        this.shaderMaterialLo.setVector3("sunPosition", new BABYLON.Vector3(0,0,0));                   
    }
    setDiffuseMap(map){
        this.shaderMaterial.setTexture("diffuseMap", new BABYLON.Texture(map, this.scene));  
        this.shaderMaterialLo.setTexture("diffuseMap", new BABYLON.Texture(map, this.scene));        
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
    setCameraPosition(pos){
        this.shaderMaterial.setVector3("cameraPosition", pos);
        this.shaderMaterialLo.setVector3("cameraPosition", pos);
    }
    setObjectPosition(pos){
        this.shaderMaterial.setVector3("objectPosition", pos);
        this.shaderMaterialLo.setVector3("objectPosition", pos);
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