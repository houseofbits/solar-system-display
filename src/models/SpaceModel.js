import * as BABYLON from 'babylonjs';
import PlanetModel from './PlanetModel.js';
import Stars1 from '../resources/img/stars_milky_way_lo.jpg'
//import Stars2 from '../resources/img/stars.jpg'
import MilkyWay from '../resources/img/milky_way_lo.jpg'
import SpaceVertexShader from '../resources/shaders/space.vertex.fx';
import SpaceFragmentShader from '../resources/shaders/space.fragment.fx';

export default 
class SpaceModel extends PlanetModel{
    constructor(engine, scene, canvas, size) {
        
        super("space", scene, size);

        this.centerNode = new BABYLON.TransformNode(this.name + "Center"); 
        this.centerNode.rotation.z = Math.PI / 8.;

        BABYLON.Effect.ShadersStore["spaceVertexShader"] = SpaceVertexShader;
        BABYLON.Effect.ShadersStore["spaceFragmentShader"] = SpaceFragmentShader;

        this.shaderMaterial = new BABYLON.ShaderMaterial(this.name+"Shader", this.scene, 
            { vertex: "space",fragment: "space" },            
            {   
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            });
        this.shaderMaterial.setTexture("diffuseMap", new BABYLON.Texture(Stars1, this.scene));
        this.shaderMaterial.setVector3("cameraPosition", this.scene.activeCamera.position);
        this.shaderMaterial.setVector3("objectPosition", this.centerNode.position);
        this.sphere = BABYLON.Mesh.CreateSphere(this.name+"Sphere", 46, size, this.scene, false, BABYLON.Mesh.BACKSIDE);
        this.sphere.parent = this.centerNode;    
        this.sphere.material = this.shaderMaterial;


        // this.shaderMaterialInner = new BABYLON.ShaderMaterial(this.name+"Shader2", this.scene, 
        //     { vertex: "space",fragment: "space" },            
        //     {   
        //         defines:["#define OPACITY 1"],
        //         needAlphaBlending: true,
        //         attributes: ["position", "normal", "uv"],
        //         uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
        //     });        
        // this.shaderMaterialInner.setTexture("diffuseMap", new BABYLON.Texture(Stars1, this.scene));
        // this.sphereInner = BABYLON.Mesh.CreateSphere(this.name+"SphereInner", 46, size*0.8, this.scene, false, BABYLON.Mesh.BACKSIDE);
        // this.sphereInner.parent = this.centerNode; 
        // this.sphereInner.material = this.shaderMaterialInner;
        // this.sphereInner.rotation.z = Math.PI / 8.;

        this.shaderMaterialInner2 = new BABYLON.ShaderMaterial(this.name+"Shader3", this.scene, 
            { vertex: "space",fragment: "space" },            
            {   
                defines:["#define MILKYWAY 1"],
                needAlphaBlending: true,
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            });        
        this.shaderMaterialInner2.setTexture("diffuseMap", new BABYLON.Texture(MilkyWay, this.scene));
        this.shaderMaterialInner2.setVector3("cameraPosition", this.scene.activeCamera.position);
        this.shaderMaterialInner2.setVector3("objectPosition", this.centerNode.position);
        this.sphereInner2 = BABYLON.Mesh.CreateSphere(this.name+"SphereInner2", 46, size*0.8, this.scene, false, BABYLON.Mesh.BACKSIDE);
        this.sphereInner2.parent = this.centerNode; 
        this.sphereInner2.material = this.shaderMaterialInner2;        

    } 
    setPosition(pos){
        this.centerNode.position = pos;
    }
    update(){
    
    }
  }

