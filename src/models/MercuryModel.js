import * as BABYLON from 'babylonjs';
import PlanetModel from './PlanetModel.js';
import PlanetMaterial from './PlanetMaterial.js';
import PlanetDiffuse from '../resources/img/mercury/mercury.jpg'
import PlanetNormalmap from '../resources/img/mercury/NormalMap.png'
import PlanetSpecular from '../resources/img/mercury/SpecularMap.png'
import PlanetOcclusion from '../resources/img/mercury/AmbientOcclusionMap.png'

export default
class MercuryModel extends PlanetModel{
    constructor(engine, scene, canvas, size) {
        super("mercury", scene);

        this.planetMaterial = new PlanetMaterial(this.scene, this.name, {aoEnable:1,specularMapEnable:1});

        this.planetMaterial.setDiffuseMap(PlanetDiffuse);
        this.planetMaterial.setNormalMap(PlanetNormalmap);
        this.planetMaterial.setSpecularMap(PlanetSpecular);
        this.planetMaterial.setAoMap(PlanetOcclusion);

        this.sphere = BABYLON.Mesh.CreateSphere(this.name+"Sphere", 26, size, this.scene, false, BABYLON.Mesh.FRONTSIDE);
        this.sphere.alphaIndex = 1;
        this.sphere.material = this.planetMaterial.shaderMaterial;  

        this.planetMaterial.setObjectPosition(this.sphere.position);

        this.sphere.parent = this.getCenterNode();

        this.setAngle(2);
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

