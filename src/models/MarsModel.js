import * as BABYLON from 'babylonjs';
import PlanetModel from './PlanetModel.js';
import PlanetMaterial from './PlanetMaterial.js';
import AtmosphereMaterial from './AtmosphereMaterial.js';
import PlanetDiffuse from '../resources/img/mars/mars_b.jpg'
import PlanetNormalmap from '../resources/img/mars/mars_normal.jpg'
import PlanetSpecular from '../resources/img/mars/specularmap_lo.png'

export default
class MarsModel extends PlanetModel{
    constructor(engine, scene, canvas, size) {
        super("mars", scene, size);

        this.createPlanetNode();
        this.setPlanetMaterial(new PlanetMaterial(this.scene, this.name, {specularMapEnable:1}));
        this.planetMaterial.setDiffuseMap(PlanetDiffuse);
        this.planetMaterial.setNormalMap(PlanetNormalmap);
        this.planetMaterial.setSpecularMap(PlanetSpecular);
        this.planetMaterial.setLightBleedPow(5.0);
        this.planetMaterial.setAtmospheric(new BABYLON.Vector3(1.0, 1.0, 0.2), new BABYLON.Vector3(0.9, 0.6, 0.0), 8.0);

        this.createAtmosphericMesh(size, 1.1);
        this.atmShaderMaterial = new AtmosphereMaterial(this.scene, this.name);
        this.atmShaderMaterial.setObjectPosition(this.sphere.position);
        this.atmShaderMaterial.setColor(new BABYLON.Vector3(0.5,0.2,0));
        this.atmShaderMaterial.setDensity(0.4);
        this.atmosphereMesh.material = this.atmShaderMaterial.getMaterial();

        this.setInclination(25.0);
        this.planetRotationSpeed = 0.3;

        this.animatedCameraAngles.push(-30);
        this.animatedCameraAngles.push(40);   
        this.transitionSpeed = 1.0;          
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

