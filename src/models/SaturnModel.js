import * as BABYLON from 'babylonjs';
import PlanetModel from './PlanetModel.js';

import PlanetVertexShader from '../resources/shaders/planet.vertex.fx';
import PlanetFragmentShader from '../resources/shaders/planet.fragment.fx';

import PlanetDiffuse from '../resources/img/mars/mars.jpg'
import PlanetNormalmap from '../resources/img/mars/mars_normal.jpg'

export default
class SaturnModel extends PlanetModel{
    constructor(engine, scene, canvas, size) {
        super("saturn", scene, size);

        BABYLON.Effect.ShadersStore["planetVertexShader"] = PlanetVertexShader;
        BABYLON.Effect.ShadersStore["planetFragmentShader"] = PlanetFragmentShader;

        this.shaderMaterial = new BABYLON.ShaderMaterial(this.name+"Shader", this.scene, 
            {
                vertex: "planet",
                fragment: "planet",
            },            
            {
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            });

        this.shaderMaterial.setTexture("diffuseMap", new BABYLON.Texture(PlanetDiffuse, this.scene));        
        this.shaderMaterial.setTexture("normalMap", new BABYLON.Texture(PlanetNormalmap, this.scene));      

        this.shaderMaterial.setVector3("cameraPosition", BABYLON.Vector3.Zero());
        this.shaderMaterial.setVector3("sunPosition", new BABYLON.Vector3(0,0,0));  

        this.sphere = BABYLON.Mesh.CreateSphere(this.name+"Sphere", 26, size, this.scene, false, BABYLON.Mesh.FRONTSIDE);
        this.sphere.alphaIndex = 1;
        this.sphere.material = this.shaderMaterial;  

        this.shaderMaterial.setVector3("objectPosition", this.sphere.position);

        this.centerNode = new BABYLON.TransformNode(this.name + "Center"); 
        this.sphere.parent = this.centerNode;        
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
        this.shaderMaterial.setVector3("cameraPosition", this.scene.activeCamera.position);
       // this.shellShaderMaterial.setVector3("cameraPosition", this.scene.activeCamera.position);
    }
  }

