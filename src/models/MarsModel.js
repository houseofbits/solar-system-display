import * as BABYLON from 'babylonjs';
import PlanetModel from './PlanetModel.js';
import PlanetMaterial from './PlanetMaterial.js';
// import MarsShellVertexShader from '../resources/shaders/marsShell.vertex.fx';
// import MarsShellFragmentShader from '../resources/shaders/marsShell.fragment.fx';
import PlanetDiffuse from '../resources/img/mars/mars.jpg'
import PlanetNormalmap from '../resources/img/mars/mars_normal.jpg'
import PlanetSpecular from '../resources/img/mars/specularmap_lo.png'

export default
class MarsModel extends PlanetModel{
    constructor(engine, scene, canvas, size) {
        super("mars", scene, size);

        // BABYLON.Effect.ShadersStore["marsShellVertexShader"] = MarsShellVertexShader;
        // BABYLON.Effect.ShadersStore["marsShellFragmentShader"] = MarsShellFragmentShader;        

        this.createPlanetNode();
        this.setPlanetMaterial(new PlanetMaterial(this.scene, this.name, {specularMapEnable:1}));
        this.planetMaterial.setDiffuseMap(PlanetDiffuse);
        this.planetMaterial.setNormalMap(PlanetNormalmap);
        this.planetMaterial.setSpecularMap(PlanetSpecular);
        this.planetMaterial.setLightBleedPow(5.0);
        this.planetMaterial.setAtmospheric(new BABYLON.Vector3(1.0, 1.0, 0.2), new BABYLON.Vector3(0.9, 0.6, 0.0), 8.0);

        this.rotationAxis = new BABYLON.Vector3(0.4,1,0);
        this.rotationAxis.normalize();  

        // this.shellShaderMaterial = new BABYLON.ShaderMaterial(this.name + "Shader2", this.scene, 
        //     {
        //         vertex: "marsShell",
        //         fragment: "marsShell",
        //     },              
        //     {   
        //         needAlphaBlending: true,
        //         attributes: ["position", "normal", "uv"],
        //         uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
        //     }); 

        // this.shellShaderMaterial.setVector3("cameraPosition", BABYLON.Vector3.Zero());
        // this.shellShaderMaterial.setVector3("objectPosition", this.sphere.position);        
        // this.shellShaderMaterial.setVector3("sunPosition", new BABYLON.Vector3(0,0,0));          
   
        // this.sphereOuter = BABYLON.Mesh.CreateSphere(this.name + "Sphere2", 26, size * 1.125, this.scene, false, BABYLON.Mesh.BACKSIDE);
        // this.sphereOuter.position.y = 2;
        // this.sphereOuter.position.x = -2.5;  
        // this.sphereOuter.alphaIndex = 2;
        // this.sphereOuter.material = this.shellShaderMaterial;

        // this.shellShaderMaterial.setVector3("cameraPosition", this.scene.activeCamera.position);      
    }      
    update(dt){
        this.sphere.rotate(this.rotationAxis,  dt * 0.1, BABYLON.Space.LOCAL);
    }
  }

