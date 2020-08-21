import * as BABYLON from 'babylonjs';
import PlanetModel from './PlanetModel.js';
import PlanetMaterial from './PlanetMaterial.js';
import AtmosphereMaterial from './AtmosphereMaterial.js';
// import AtmVertexShader from '../resources/shaders/atm.vertex.fx';
// import AtmFragmentShader from '../resources/shaders/atm.fragment.fx';
import DiffuseDay from '../resources/img/earth/earth_daymap.jpg'
import DiffuseNight from '../resources/img/earth/earth_nightmap.jpg'
import PlanetNormalmap from '../resources/img/earth/NormalMap_2.png'
import PlanetSpecular from '../resources/img/earth/earth_specular_map_lo.png'
import PlanetClouds from '../resources/img/earth/earth_clouds.jpg'

export default
class EarthModel extends PlanetModel{
    constructor(engine, scene, canvas, size) {
        super("earth", scene, size);
        this.createPlanetNode();
        this.setPlanetMaterial(new PlanetMaterial(this.scene, this.name, {nightMapEnable:1, overlayCloudsEnable:1, specularMapEnable:1}));
        this.planetMaterial.setDiffuseMap(DiffuseDay);
        this.planetMaterial.setDiffuseNightMap(DiffuseNight);        
        this.planetMaterial.setNormalMap(PlanetNormalmap);
        this.planetMaterial.setSpecularMap(PlanetSpecular);
        this.planetMaterial.setCloudsMap(PlanetClouds);
        this.planetMaterial.setLightBleedPow(3.0);
        this.planetMaterial.setAtmospheric(new BABYLON.Vector3(1,1,0.2), new BABYLON.Vector3(0, 0, 1.0), 6.0);    
        this.planetMaterial.setSpecular(1.0, 24.0);

        this.createAtmosphericMesh(size, 1.1);
        this.atmShaderMaterial = new AtmosphereMaterial(this.scene, this.name);
        this.atmShaderMaterial.setObjectPosition(this.sphere.position);
        this.atmShaderMaterial.setColor(new BABYLON.Vector3(0,0,0.5));
        this.atmosphereMesh.material = this.atmShaderMaterial.getMaterial();

        this.rotationAxis = new BABYLON.Vector3(0.4,1,0);
        this.rotationAxis.normalize();
    }
    setOrbitDistance(distance){
        super.setOrbitDistance(distance);

        this.atmosphereMesh.position.x = distance;        
        this.atmosphereMesh.position.y = 0;        
        this.atmosphereMesh.position.z = 0;        
    }      
    update(dt){ 
        this.sphere.rotate(this.rotationAxis,  dt * 0.1, BABYLON.Space.LOCAL);
    }
    setVisible(visibility){
        super.setVisible(visibility);
        //this.atmosphereMesh.visibility = visibility;
    }

  }

