import * as BABYLON from 'babylonjs';
import PlanetModel from './PlanetModel.js';
import PlanetMaterial from './PlanetMaterial.js';
import PlanetDiffuse from '../resources/img/saturn/saturn.jpg'
import PlanetNormalmap from '../resources/img/mars/mars_normal.jpg'

export default
class SaturnModel extends PlanetModel{
    constructor(engine, scene, canvas, size) {
        super("saturn", scene, size);

        this.createPlanetNode();
        this.setPlanetMaterial(new PlanetMaterial(this.scene, this.name));
        this.planetMaterial.setDiffuseMap(PlanetDiffuse);
        this.planetMaterial.setNormalMap(PlanetNormalmap);
        this.planetMaterial.setSpecular(0.1, 1.0);
        this.planetMaterial.setLightBleedPow(5.0);
        this.planetMaterial.setAtmospheric(new BABYLON.Vector3(1.0, 1.0, 0.2), new BABYLON.Vector3(0.9, 0.6, 0.0), 8.0);   
        
        this.rotationAxis = new BABYLON.Vector3(0.4,1,0);
        this.rotationAxis.normalize();        
    }   
    update(){
       this.sphere.rotate(this.rotationAxis, 0.003, BABYLON.Space.LOCAL);  
    }
  }

