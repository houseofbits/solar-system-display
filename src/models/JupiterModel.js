import * as BABYLON from 'babylonjs';
import PlanetWithRingsModel from './PlanetWithRingsModel.js';
import PlanetMaterial from './PlanetMaterial.js';
import PlanetDiffuse from '../resources/img/jupiter/jupiter_lo.jpg'
import PlanetNormalmap from '../resources/img/jupiter/NormalMap.png'
import RingsMap from '../resources/img/jupiter/ring.png';
import PlanetSpecular from '../resources/img/jupiter/jupiter_specular.jpg'

export default
class JupiterModel extends PlanetWithRingsModel{
    constructor(engine, scene, canvas, size) {
        super(engine, scene, canvas, size, "jupiter");

        this.createPlanetNode();
        this.setPlanetMaterial(new PlanetMaterial(this.scene, this.name, {shadowMapEnable:1, specularMapEnable:1}));
        this.planetMaterial.setDiffuseMap(PlanetDiffuse);
        this.planetMaterial.setNormalMap(PlanetNormalmap);
        this.planetMaterial.setSpecularMap(PlanetSpecular);
        this.planetMaterial.setSpecular(0.8, 8.0);
        this.planetMaterial.setLightBleedPow(5.0);
        this.planetMaterial.setAtmospheric(new BABYLON.Vector3(1.0, 1.0, 1.0), new BABYLON.Vector3(0.9, 0.6, 0.8), 4.0);   

        this.createRingsNode(1.5, 6, RingsMap);

        this.transformNode = new BABYLON.TransformNode(this.name + "PlanetTs"); 
        this.sphere.parent = this.transformNode;
        this.ringMesh.parent = this.transformNode;

        this.transformNode.parent = this.centerNode;

        this.initRingRTT(RingsMap);   

        this.animatedCameraAngles.push(0);
        this.animatedCameraAngles.push(-20);   
        this.transitionSpeed = 5.0;  
        
        this.setInclination(3.0);
        this.planetRotationSpeed = 0.6;       
        
        this.setDetailPosition(48, 145);
    }      
    update(dt){
        super.update(dt);
    }
  }

