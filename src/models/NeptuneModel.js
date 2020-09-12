import * as BABYLON from 'babylonjs';
import PlanetWithRingsModel from './PlanetWithRingsModel.js';
import PlanetMaterial from './PlanetMaterial.js';
import PlanetDiffuse from '../resources/img/neptune/neptune_lo.jpg'
import PlanetNormalmap from '../resources/img/neptune/NormalMap.png'
import RingsMap from '../resources/img/neptune/rings.png';
import PlanetSpecular from '../resources/img/neptune/neptune_specular.jpg'

export default
class NeptuneModel extends PlanetWithRingsModel{
    constructor(engine, scene, canvas, size) {
        super(engine, scene, canvas, size, "neptune");

        this.createPlanetNode();
        this.setPlanetMaterial(new PlanetMaterial(this.scene, this.name, {shadowMapEnable:1, specularMapEnable:1}));
        this.planetMaterial.setDiffuseMap(PlanetDiffuse);
        this.planetMaterial.setNormalMap(PlanetNormalmap);
        this.planetMaterial.setSpecularMap(PlanetSpecular);
        this.planetMaterial.setSpecular(0.6, 1.0);
        this.planetMaterial.setLightBleedPow(5.0);
        this.planetMaterial.setAtmospheric(new BABYLON.Vector3(1.0, 1.0, 0.2), new BABYLON.Vector3(0.7, 0.6, 1.0), 2.0);         

        this.createRingsNode(1.3, 18, RingsMap);

        this.transformNode = new BABYLON.TransformNode(this.name + "PlanetTs"); 
        this.sphere.parent = this.transformNode;
        this.ringMesh.parent = this.transformNode;

        this.transformNode.parent = this.centerNode;  
        
        this.initRingRTT(RingsMap); 

        this.animatedCameraAngles.push(0);
        this.animatedCameraAngles.push(-20);   
        this.transitionSpeed = 3.0;   
        
        this.setInclination(28.0);
        this.planetRotationSpeed = 0.4;    

        this.setDetailPosition(45, 100);
    }   
    update(dt){
       super.update(dt);
    }
  }

