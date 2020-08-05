
import * as BABYLON from 'babylonjs';
import EarthVertexShader from '../resources/shaders/earth.vertex.fx';
import EarthFragmentShader from '../resources/shaders/earth.fragment.fx';
import EarthShellVertexShader from '../resources/shaders/earthShell.vertex.fx';
import EarthShellFragmentShader from '../resources/shaders/earthShell.fragment.fx';
import EarthDiffuseDay from '../resources/img/earth/earth_daymap.jpg'
import EarthDiffuseNight from '../resources/img/earth/earth_nightmap.jpg'
import EarthNormalmap from '../resources/img/earth/earth_normal_map.png'
import EarthSpecular from '../resources/img/earth/earth_specular_map.png'
import EarthClouds from '../resources/img/earth/earth_clouds.jpg'

export default
class EarthModel {
    constructor(engine, scene, canvas, size) {

        this.scene = scene;

        BABYLON.Effect.ShadersStore["earthVertexShader"] = EarthVertexShader;
        BABYLON.Effect.ShadersStore["earthFragmentShader"] = EarthFragmentShader;
        BABYLON.Effect.ShadersStore["earthShellVertexShader"] = EarthShellVertexShader;
        BABYLON.Effect.ShadersStore["earthShellFragmentShader"] = EarthShellFragmentShader;        

        this.earthShaderMaterial = new BABYLON.ShaderMaterial("earthShader", this.scene, 
            {
                vertex: "earth",
                fragment: "earth",
            },            
            {
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            });          

        let earthDiffuseDayTexture = new BABYLON.Texture(EarthDiffuseDay, this.scene);
        let earthDiffuseNightTexture = new BABYLON.Texture(EarthDiffuseNight, this.scene);
        let earthNormalTexture = new BABYLON.Texture(EarthNormalmap, this.scene);
        let earthSpecularTexture = new BABYLON.Texture(EarthSpecular, this.scene);
        let earthCloudsTexture = new BABYLON.Texture(EarthClouds, this.scene);

        this.earthShaderMaterial.setTexture("diffuseMap", earthDiffuseDayTexture);        
        this.earthShaderMaterial.setTexture("diffuseMap2", earthDiffuseNightTexture);                
        this.earthShaderMaterial.setTexture("normalMap", earthNormalTexture);      
        this.earthShaderMaterial.setTexture("specularMap", earthSpecularTexture);              
        this.earthShaderMaterial.setTexture("cloudsMap", earthCloudsTexture);              

        this.earthShaderMaterial.setVector3("cameraPosition", BABYLON.Vector3.Zero());
        this.earthShaderMaterial.setVector3("sunPosition", new BABYLON.Vector3(0,0,0));  
        
        this.sphere = BABYLON.Mesh.CreateSphere('sphere1', 26, size, this.scene, false, BABYLON.Mesh.FRONTSIDE);
        this.sphere.position.y = 2;
        this.sphere.position.x = -2.5;          
        this.sphere.alphaIndex = 1;
        this.sphere.material = this.earthShaderMaterial;  

        this.earthShaderMaterial.setVector3("objectPosition", this.sphere.position);        


        this.earthShellShaderMaterial = new BABYLON.ShaderMaterial("earthShader2", this.scene, 
            {
                vertex: "earthShell",
                fragment: "earthShell",
            },              
            {   
                needAlphaBlending: true,
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            }); 

        this.earthShellShaderMaterial.setVector3("cameraPosition", BABYLON.Vector3.Zero());
        this.earthShellShaderMaterial.setVector3("objectPosition", this.sphere.position);        
        this.earthShellShaderMaterial.setVector3("sunPosition", new BABYLON.Vector3(0,0,0));          
   
        this.sphereOuter = BABYLON.Mesh.CreateSphere('sphere2', 26, size * 1.125, this.scene, false, BABYLON.Mesh.BACKSIDE);
        this.sphereOuter.position.y = 2;
        this.sphereOuter.position.x = -2.5;  
        this.sphereOuter.alphaIndex = 2;
        this.sphereOuter.material = this.earthShellShaderMaterial;
        
    }
    getScene(){
        return this.scene;
    }
    setPosition(x,y,z){
        this.sphere.position.x = x;
        this.sphereOuter.position.x = x;            
        this.sphere.position.y = y;
        this.sphereOuter.position.y = y;        
        this.sphere.position.z = z;
        this.sphereOuter.position.z = z;                        
    }
    update(){        
        this.earthShaderMaterial.setVector3("cameraPosition", this.scene.activeCamera.position);
        this.earthShellShaderMaterial.setVector3("cameraPosition", this.scene.activeCamera.position);
    }
  }

