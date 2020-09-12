import * as BABYLON from 'babylonjs';
import PlanetModel from './PlanetModel.js';
import PlanetMaterial from './PlanetMaterial.js';
import AtmosphereMaterial from './AtmosphereMaterial.js';
import PlanetDiffuse from '../resources/img/venus/venus.jpg'
import PlanetNormalmap from '../resources/img/venus/NormalMap.png'
import PlanetSpecular from '../resources/img/venus/SpecularMap_lo.png'
import PlanetOcclusion from '../resources/img/venus/AmbientOcclusionMap.png'
import PlanetClouds from '../resources/img/venus/venus_atmosphere_b.png'

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
        this.planetMaterial.setLightBleedPow(3.0);
        this.planetMaterial.setSpecular(1.6, 1.0);
        this.planetMaterial.setAtmospheric(new BABYLON.Vector3(1.0, 1.0, 0.2), new BABYLON.Vector3(0.9, 0.6, 0.0), 8.0);   
        
        this.createAtmosphericMesh(size, 1.08);
        this.atmShaderMaterial = new AtmosphereMaterial(this.scene, this.name);
        this.atmShaderMaterial.setObjectPosition(this.sphere.position);
        this.atmShaderMaterial.setColor(new BABYLON.Vector3(1.,1.,0));
        this.atmShaderMaterial.setDensity(0.5);
        this.atmosphereMesh.material = this.atmShaderMaterial.getMaterial();
        
        this.setInclination(177.0);
        this.planetRotationSpeed = 0.05;

        this.animatedCameraAngles.push(-20);
        this.animatedCameraAngles.push(20);   
        this.transitionSpeed = 2.0; 
        
        this.setDetailPosition(22, 50);
    }
    setOrbitDistance(distance){
        super.setOrbitDistance(distance);

        this.atmosphereMesh.position.x = distance;
        this.atmosphereMesh.position.y = 0;        
        this.atmosphereMesh.position.z = 0;        
    }      
    update(dt){
        super.update(dt);
    }
  }

