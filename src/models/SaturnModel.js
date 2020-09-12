import * as BABYLON from 'babylonjs';
import PlanetWithRingsModel from './PlanetWithRingsModel.js';
import PlanetMaterial from './PlanetMaterial.js';
import PlanetDiffuse from '../resources/img/saturn/saturn.jpg'
import PlanetNormalmap from '../resources/img/saturn/NormalMap.png'
import RingsMap from '../resources/img/saturn/ring.png';
import PlanetSpecular from '../resources/img/saturn/saturn_specular.jpg'

export default
class SaturnModel extends PlanetWithRingsModel{
    constructor(engine, scene, canvas, size) {
        super(engine, scene, canvas, size, "saturn");

        this.createPlanetNode();
        this.setPlanetMaterial(new PlanetMaterial(this.scene, this.name, {shadowMapEnable:1, specularMapEnable:1}));
        this.planetMaterial.setDiffuseMap(PlanetDiffuse);
        this.planetMaterial.setNormalMap(PlanetNormalmap);
        this.planetMaterial.setSpecularMap(PlanetSpecular);
        this.planetMaterial.setSpecular(0.6, 6.0);
        this.planetMaterial.setLightBleedPow(5.0);
        this.planetMaterial.setAtmospheric(new BABYLON.Vector3(1.0, 1.0, 0.2), new BABYLON.Vector3(0.9, 0.6, 0.0), 4.0);   
           
        this.createRingsNode(1.2, 18, RingsMap);

        this.transformNode = new BABYLON.TransformNode(this.name + "PlanetTs"); 
        this.sphere.parent = this.transformNode;
        this.ringMesh.parent = this.transformNode;

        this.transformNode.parent = this.centerNode;

        this.initRingRTT(RingsMap);  
        
        this.animatedCameraAngles.push(0);
        this.animatedCameraAngles.push(-20);   
        this.transitionSpeed = 5.0;  

        this.setInclination(26.0);
        this.planetRotationSpeed = 0.6;         
        
        this.setDetailPosition(55, 130);
    }   
    update(dt){
       super.update(dt);
    }
  }

