import * as BABYLON from 'babylonjs';
import PlanetMaterial from './PlanetMaterial.js';
import PlanetDiffuse from '../resources/img/venus/venus.jpg'
import PlanetNormalmap from '../resources/img/venus/NormalMap.png'
import PlanetSpecular from '../resources/img/venus/SpecularMap.png'
import PlanetOcclusion from '../resources/img/venus/AmbientOcclusionMap.png'
import PlanetClouds from '../resources/img/venus/venus_atmosphere.jpg'

export default
class VenusModel {
    constructor(engine, scene, canvas, size) {

        this.name = "venus";

        this.scene = scene;

        this.planetMaterial = new PlanetMaterial(this.scene, this.name, {thickCloudsEnable:1,specularMapEnable:1});

        this.planetMaterial.setDiffuseMap(PlanetDiffuse);
        this.planetMaterial.setNormalMap(PlanetNormalmap);
        this.planetMaterial.setSpecularMap(PlanetSpecular);
        this.planetMaterial.setAoMap(PlanetOcclusion);
        this.planetMaterial.setCloudsMap(PlanetClouds);
        this.planetMaterial.setLightBleedPow(5.0);
        this.planetMaterial.setAtmospheric(new BABYLON.Vector3(1.0, 1.0, 0.2), new BABYLON.Vector3(0.9, 0.6, 0.0), 8.0);

        this.sphere = BABYLON.Mesh.CreateSphere(this.name+"Sphere", 26, size, this.scene, false, BABYLON.Mesh.FRONTSIDE);
        this.sphere.alphaIndex = 1;
        this.sphere.material = this.planetMaterial.shaderMaterial;  

        this.planetMaterial.setObjectPosition(this.sphere.position);

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
        this.planetMaterial.setCameraPosition(this.scene.activeCamera.position);

       // this.shellShaderMaterial.setVector3("cameraPosition", this.scene.activeCamera.position);
    }
  }

