import * as BABYLON from 'babylonjs';
import PlanetWithRingsModel from './PlanetWithRingsModel.js';
import PlanetMaterial from './PlanetMaterial.js';
import PlanetDiffuse from '../resources/img/uranus/uranus_lo.jpg'
import PlanetNormalmap from '../resources/img/uranus/NormalMap.png'
import RingsMap from '../resources/img/uranus/ring.png';
import PlanetSpecular from '../resources/img/uranus/uranus_specular.jpg'

export default
class UranusModel extends PlanetWithRingsModel{
    constructor(engine, scene, canvas, size) {
        super(engine, scene, canvas, size, "uranus");

        this.createPlanetNode();
        this.setPlanetMaterial(new PlanetMaterial(this.scene, this.name, {shadowMapEnable:1, specularMapEnable:1}));
        this.planetMaterial.setDiffuseMap(PlanetDiffuse);
        this.planetMaterial.setNormalMap(PlanetNormalmap);
        this.planetMaterial.setSpecularMap(PlanetSpecular);        
        this.planetMaterial.setSpecular(0.6, 2.0);
        this.planetMaterial.setLightBleedPow(5.0);
        this.planetMaterial.setAtmospheric(new BABYLON.Vector3(1.0, 1.0, 0.2), new BABYLON.Vector3(0.6, 0.8, 1.0), 2.0);     

        this.createRingsNode(1.5, 10, RingsMap);

        this.transformNode = new BABYLON.TransformNode(this.name + "PlanetTs"); 
        this.sphere.parent = this.transformNode;
        this.ringMesh.parent = this.transformNode;

        this.transformNode.parent = this.centerNode;  
        
        this.initRingRTT(RingsMap); 

        this.animatedCameraAngles.push(0);
        this.animatedCameraAngles.push(-25);   
        this.transitionSpeed = 3.0;       
        
        this.setInclination(97.0);
        this.planetRotationSpeed = 0.5;   
    }    
    update(dt){
       super.update(dt);
    }
  }

