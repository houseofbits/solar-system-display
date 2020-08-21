import * as BABYLON from 'babylonjs';
import PlanetWithRingsModel from './PlanetWithRingsModel.js';
import PlanetMaterial from './PlanetMaterial.js';
import PlanetDiffuse from '../resources/img/uranus/uranus_lo.jpg'
import PlanetNormalmap from '../resources/img/uranus/NormalMap.png'
import RingsMap from '../resources/img/saturn_ring_alpha.png';

export default
class UranusModel extends PlanetWithRingsModel{
    constructor(engine, scene, canvas, size) {
        super(engine, scene, canvas, size, "uranus");

        this.createPlanetNode();
        this.setPlanetMaterial(new PlanetMaterial(this.scene, this.name, {shadowMapEnable:1}));
        this.planetMaterial.setDiffuseMap(PlanetDiffuse);
        this.planetMaterial.setNormalMap(PlanetNormalmap);
        this.planetMaterial.setSpecular(0.1, 1.0);
        this.planetMaterial.setLightBleedPow(5.0);
        this.planetMaterial.setAtmospheric(new BABYLON.Vector3(1.0, 1.0, 0.2), new BABYLON.Vector3(0.9, 0.6, 0.0), 8.0);   
        
        this.rotationAxis = new BABYLON.Vector3(0.4,1,0);
        this.rotationAxis.normalize();       

        this.createRingsNode(1.5, 4, RingsMap);

        this.transformNode = new BABYLON.TransformNode(this.name + "PlanetTs"); 
        this.sphere.parent = this.transformNode;
        this.ringMesh.parent = this.transformNode;

        this.transformNode.parent = this.centerNode;  
        
        this.initRingRTT(RingsMap); 

        this.animatedCameraAngles.push(0);
        this.animatedCameraAngles.push(-20);   
        this.transitionSpeed = 3.0;           
    }    
    update(dt){
       this.transformNode.rotate(this.rotationAxis,  dt * 0.1, BABYLON.Space.LOCAL);  
    }
  }

