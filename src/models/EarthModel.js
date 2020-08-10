import * as BABYLON from 'babylonjs';
import PlanetModel from './PlanetModel.js';
import PlanetMaterial from './PlanetMaterial.js';
import AtmVertexShader from '../resources/shaders/atm.vertex.fx';
import AtmFragmentShader from '../resources/shaders/atm.fragment.fx';
import DiffuseDay from '../resources/img/earth/earth_daymap.jpg'
import DiffuseNight from '../resources/img/earth/earth_nightmap.jpg'
import PlanetNormalmap from '../resources/img/earth/earth_normal_map.png'
import PlanetSpecular from '../resources/img/earth/earth_specular_map.png'
import PlanetClouds from '../resources/img/earth/earth_clouds.jpg'

export default
class EarthModel extends PlanetModel{
    constructor(engine, scene, canvas, size) {
        super("earth", scene, size);

        this.setPlanetMaterial(new PlanetMaterial(this.scene, this.name, {nightMapEnable:1, overlayCloudsEnable:1, specularMapEnable:1}));
        this.planetMaterial.setDiffuseMap(DiffuseDay);
        this.planetMaterial.setDiffuseNightMap(DiffuseNight);        
        this.planetMaterial.setNormalMap(PlanetNormalmap);
        this.planetMaterial.setSpecularMap(PlanetSpecular);
        this.planetMaterial.setCloudsMap(PlanetClouds);
        this.planetMaterial.setLightBleedPow(3.0);
        this.planetMaterial.setAtmospheric(new BABYLON.Vector3(1,1,0.2), new BABYLON.Vector3(0, 0, 1.0), 6.0);    
        this.planetMaterial.setSpecular(2.0, 64.0);
        
        this.createAtmosphericMesh(size, 1.125);

        /////////////////////////////////////////////////////////////////////////////////////

        if(typeof BABYLON.Effect.ShadersStore["atmVertexShader"] == 'undefined')BABYLON.Effect.ShadersStore["atmVertexShader"] = AtmVertexShader;
        if(typeof BABYLON.Effect.ShadersStore["atmFragmentShader"] == 'undefined')BABYLON.Effect.ShadersStore["atmFragmentShader"] = AtmFragmentShader;

        this.atmShaderMaterial = new BABYLON.ShaderMaterial(name+"AtmShader", this.scene, 
            { vertex: "atm",fragment: "atm" },            
            {   
                needAlphaBlending: true,
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            });

        this.atmShaderMaterial.setVector3("sunPosition", new BABYLON.Vector3(0,0,0));  
        this.atmShaderMaterial.setVector3("cameraPosition", this.scene.activeCamera.position);
        this.atmShaderMaterial.setVector3("objectPosition", this.sphere.position);

        this.atmosphereMesh.material = this.atmShaderMaterial;
    }
    setOrbitDistance(distance){
        this.sphere.position.x = distance;
        this.sphere.position.y = 0;
        this.sphere.position.z = 0;

        this.atmosphereMesh.position.x = distance;        
        this.atmosphereMesh.position.y = 0;        
        this.atmosphereMesh.position.z = 0;        
    }      
    update(){   }


  }

