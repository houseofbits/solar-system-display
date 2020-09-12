import * as BABYLON from 'babylonjs';
import PlanetModel from './PlanetModel.js';
import PlanetMaterial from './PlanetMaterial.js';
import PlanetDiffuse from '../resources/img/mercury/mercury.jpg'
import PlanetNormalmap from '../resources/img/mercury/NormalMap.png'
import PlanetSpecular from '../resources/img/mercury/specular_map_lo.png'
import PlanetOcclusion from '../resources/img/mercury/AmbientOcclusionMap_lo.png'

export default
class MercuryModel extends PlanetModel{
    constructor(engine, scene, canvas, size) {
        super("mercury", scene, size);
        this.createPlanetNode();
        this.setPlanetMaterial(new PlanetMaterial(this.scene, this.name, {aoEnable:1,specularMapEnable:1}));
        this.planetMaterial.setDiffuseMap(PlanetDiffuse);
        this.planetMaterial.setNormalMap(PlanetNormalmap);
        this.planetMaterial.setSpecularMap(PlanetSpecular);
        this.planetMaterial.setAoMap(PlanetOcclusion);

        this.setInclination(1.0);
        this.planetRotationSpeed = 0.1;
        
        this.animatedCameraAngles.push(-20);
        this.animatedCameraAngles.push(35);   
        this.transitionSpeed = 1.0;       

        this.setDetailPosition(19, 35);
    } 
    update(dt){ 
        super.update(dt);
    }
  }

