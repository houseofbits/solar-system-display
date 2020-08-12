import * as BABYLON from 'babylonjs';
import PlanetModel from './PlanetModel.js';
import PlanetMaterial from './PlanetMaterial.js';
import PlanetDiffuse from '../resources/img/venus/venus.jpg'
import PlanetNormalmap from '../resources/img/venus/NormalMap.png'
import PlanetSpecular from '../resources/img/venus/SpecularMap.png'
import PlanetOcclusion from '../resources/img/venus/AmbientOcclusionMap.png'
import PlanetClouds from '../resources/img/venus/venus_atmosphere.jpg'

export default
class VenusModel extends PlanetModel{
    constructor(engine, scene, canvas, size) {
        super("venus", scene, size);
        this.createPlanetNode();
        this.setPlanetMaterial(new PlanetMaterial(this.scene, this.name, {thickCloudsEnable:1,specularMapEnable:1}));
        this.planetMaterial.setDiffuseMap(PlanetDiffuse);
        this.planetMaterial.setNormalMap(PlanetNormalmap);
        this.planetMaterial.setSpecularMap(PlanetSpecular);
        this.planetMaterial.setAoMap(PlanetOcclusion);
        this.planetMaterial.setCloudsMap(PlanetClouds);
        this.planetMaterial.setLightBleedPow(5.0);
        this.planetMaterial.setAtmospheric(new BABYLON.Vector3(1.0, 1.0, 0.2), new BABYLON.Vector3(0.9, 0.6, 0.0), 8.0);   
        
        this.rotationAxis = new BABYLON.Vector3(0.4,1,0);
        this.rotationAxis.normalize();        
    }
    update(){
        this.sphere.rotate(this.rotationAxis, 0.003, BABYLON.Space.LOCAL);    
    }
  }

