import * as BABYLON from 'babylonjs';
import PlanetModel from './PlanetModel.js';
import SunVertexShader from '../resources/shaders/sun.vertex.fx';
import SunFragmentShader from '../resources/shaders/sun.fragment.fx';
import SunMap from '../resources/img/sun/sun.jpg'
import SunMapTile from '../resources/img/sun/suntile.jpg'
import SunMapTile2 from '../resources/img/sun/suntile2.jpg'

export default 
class SunModel extends PlanetModel{
    constructor(engine, scene, canvas, size) {
        
        super("sun", scene, size);

        BABYLON.Effect.ShadersStore["sunVertexShader"] = SunVertexShader;
        BABYLON.Effect.ShadersStore["sunFragmentShader"] = SunFragmentShader;

        this.shaderMaterial = new BABYLON.ShaderMaterial(this.name+"Shader", this.scene, 
            { vertex: "sun",fragment: "sun" },            
            {   
                needAlphaBlending: true,
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            });

        this.shaderMaterial.setTexture("diffuseMap", new BABYLON.Texture(SunMap, this.scene));
        this.shaderMaterial.setTexture("diffuseMap2", new BABYLON.Texture(SunMapTile, this.scene));
        this.shaderMaterial.setTexture("diffuseMap3", new BABYLON.Texture(SunMapTile2, this.scene));

        this.shaderMaterial.setVector3("cameraPosition", this.scene.activeCamera.position);

        this.sphere = BABYLON.Mesh.CreateSphere(this.name+"Sphere", 46, size, this.scene, false, BABYLON.Mesh.FRONTSIDE);
       
        this.sphere.material = this.shaderMaterial;

        this.animation = new BABYLON.Vector2;       
        
        this.shaderMaterial.setVector2("animation", this.animation);

        this.rotationAxis = new BABYLON.Vector3(0,1,0);
        this.rotationAxis.normalize();

        //this.shaderMaterial.setFloat("transparency", 0.5);

        // let meshes = [];
        
        // for(let i=0; i<100; i++){

        //     let sphere = BABYLON.MeshBuilder.CreateSphere("sphere"+i, {diameter: size * (1.+ (0.004 * i)), segments: 10}, this.scene);
        //     meshes.push(sphere);
        //     // this["sphereShell"+i] = BABYLON.Mesh.CreateSphere(this.name+"Sphere2" + i, 10, size * (1.+ (0.004 * i)), this.scene, false, BABYLON.Mesh.FRONTSIDE);              
        //     // this["sphereShell"+i].material = this.shaderMaterial;             

        // }

        // var mesh = BABYLON.Mesh.MergeMeshes(meshes);
        // mesh.material = this.shaderMaterial;  

        // this.sphere2 = BABYLON.Mesh.CreateSphere(this.name+"Sphere2", 20, size * 1.002, this.scene, false, BABYLON.Mesh.DOUBLESIDE);              
        // this.sphere2.material = this.shaderMaterial;     
        
        // this.sphere3 = BABYLON.Mesh.CreateSphere(this.name+"Sphere2", 20, size * 1.02, this.scene, false, BABYLON.Mesh.DOUBLESIDE);              
        // this.sphere3.material = this.shaderMaterial;     
        
        // this.sphere4 = BABYLON.Mesh.CreateSphere(this.name+"Sphere2", 20, size * 1.03, this.scene, false, BABYLON.Mesh.DOUBLESIDE);              
        // this.sphere4.material = this.shaderMaterial;             

        // this.sphere5 = BABYLON.Mesh.CreateSphere(this.name+"Sphere2", 20, size * 1.04, this.scene, false, BABYLON.Mesh.DOUBLESIDE);              
        // this.sphere5.material = this.shaderMaterial;             

        // this.sphere6 = BABYLON.Mesh.CreateSphere(this.name+"Sphere2", 20, size * 1.05, this.scene, false, BABYLON.Mesh.DOUBLESIDE);              
        // this.sphere6.material = this.shaderMaterial;             


        // this.sphere.onBeforeDrawObservable.add(function(mesh){
        //     mesh.material.setFloat("transparency", 1.0);
        // });        
        // this.sphere2.onBeforeDrawObservable.add(function(mesh){
        //     mesh.material.setFloat("transparency", 0.5);
        // });
    } 
    update(){
       // this.sphere.rotate(this.rotationAxis, 0.001, BABYLON.Space.LOCAL);
        this.animation.x += 0.01;
        this.animation.y += 0.01;
    }
  }

