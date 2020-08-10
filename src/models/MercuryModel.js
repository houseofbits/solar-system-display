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
        super("mercury", scene, size);
        this.setPlanetMaterial(new PlanetMaterial(this.scene, this.name, {aoEnable:1,specularMapEnable:1}));
        this.planetMaterial.setDiffuseMap(PlanetDiffuse);
        this.planetMaterial.setNormalMap(PlanetNormalmap);
        this.planetMaterial.setSpecularMap(PlanetSpecular);
        this.planetMaterial.setAoMap(PlanetOcclusion);
    } 
    update(){   }
  }

