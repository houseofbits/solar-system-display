
import * as BABYLON from 'babylonjs';
import MarsVertexShader from '../resources/shaders/mars.vertex.fx';
import MarsFragmentShader from '../resources/shaders/mars.fragment.fx';
import MarsShellVertexShader from '../resources/shaders/marsShell.vertex.fx';
import MarsShellFragmentShader from '../resources/shaders/marsShell.fragment.fx';
import MarsDiffuse from '../resources/img/mars/mars.jpg'
import MarsNormalmap from '../resources/img/mars/mars_normal.jpg'

export default
class MarsModel {
    constructor(engine, scene, canvas, size) {

        this.scene = scene;

        BABYLON.Effect.ShadersStore["marsVertexShader"] = MarsVertexShader;
        BABYLON.Effect.ShadersStore["marsFragmentShader"] = MarsFragmentShader;
        BABYLON.Effect.ShadersStore["marsShellVertexShader"] = MarsShellVertexShader;
        BABYLON.Effect.ShadersStore["marsShellFragmentShader"] = MarsShellFragmentShader;        

        this.shaderMaterial = new BABYLON.ShaderMaterial("marsShader", this.scene, 
            {
                vertex: "mars",
                fragment: "mars",
            },            
            {
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            });

        let marsDiffuseTexture = new BABYLON.Texture(MarsDiffuse, this.scene);
        let marsNormalTexture = new BABYLON.Texture(MarsNormalmap, this.scene);

        this.shaderMaterial.setTexture("diffuseMap", marsDiffuseTexture);        
        this.shaderMaterial.setTexture("normalMap", marsNormalTexture);      

        this.shaderMaterial.setVector3("cameraPosition", BABYLON.Vector3.Zero());
        this.shaderMaterial.setVector3("sunPosition", new BABYLON.Vector3(0,0,0));  
        
        this.sphere = BABYLON.Mesh.CreateSphere('marsSphere', 26, size, this.scene, false, BABYLON.Mesh.FRONTSIDE);
        this.sphere.position.y = 2;
        this.sphere.position.x = -2.5;          
        this.sphere.alphaIndex = 1;
        this.sphere.material = this.shaderMaterial;  

        this.shaderMaterial.setVector3("objectPosition", this.sphere.position);        


        this.shellShaderMaterial = new BABYLON.ShaderMaterial("marsShader2", this.scene, 
            {
                vertex: "marsShell",
                fragment: "marsShell",
            },              
            {   
                needAlphaBlending: true,
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            }); 

        this.shellShaderMaterial.setVector3("cameraPosition", BABYLON.Vector3.Zero());
        this.shellShaderMaterial.setVector3("objectPosition", this.sphere.position);        
        this.shellShaderMaterial.setVector3("sunPosition", new BABYLON.Vector3(0,0,0));          
   
        this.sphereOuter = BABYLON.Mesh.CreateSphere('marsSphere2', 26, size * 1.125, this.scene, false, BABYLON.Mesh.BACKSIDE);
        this.sphereOuter.position.y = 2;
        this.sphereOuter.position.x = -2.5;  
        this.sphereOuter.alphaIndex = 2;
        this.sphereOuter.material = this.shellShaderMaterial;
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
        
        this.shaderMaterial.setVector3("cameraPosition", this.scene.activeCamera.position);
        this.shellShaderMaterial.setVector3("cameraPosition", this.scene.activeCamera.position);

    }
  }

