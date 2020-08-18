import * as BABYLON from 'babylonjs';
import PlanetModel from './PlanetModel.js';
import PlanetMaterial from './PlanetMaterial.js';
import PlanetRingMaterial from './PlanetRingMaterial.js';
import PlanetDiffuse from '../resources/img/uranus/uranus_lo.jpg'
import PlanetNormalmap from '../resources/img/mars/mars_normal.jpg'
import RingsMap from '../resources/img/saturn_ring_alpha.png';

export default
class UranusModel extends PlanetModel{
    constructor(engine, scene, canvas, size) {
        super("uranus", scene, size);

        this.createPlanetNode();
        this.setPlanetMaterial(new PlanetMaterial(this.scene, this.name));
        this.planetMaterial.setDiffuseMap(PlanetDiffuse);
        this.planetMaterial.setNormalMap(PlanetNormalmap);
        this.planetMaterial.setSpecular(0.1, 1.0);
        this.planetMaterial.setLightBleedPow(5.0);
        this.planetMaterial.setAtmospheric(new BABYLON.Vector3(1.0, 1.0, 0.2), new BABYLON.Vector3(0.9, 0.6, 0.0), 8.0);   
        
        this.rotationAxis = new BABYLON.Vector3(0.4,1,0);
        this.rotationAxis.normalize();       
                        
        let vertexData = this.createRing(size * 1.55, 2);
        this.ringMesh = new BABYLON.Mesh(this.name + "Ring", this.scene);
        this.ringMesh.rotation.x = Math.PI * 0.5;
        this.ringMesh.parent = this.centerNode;
        vertexData.applyToMesh(this.ringMesh);
        
        this.planetRingMaterial = new PlanetRingMaterial(this.scene, this.name);
        this.planetRingMaterial.setDiffuseMap(RingsMap);
        this.planetRingMaterial.setCameraPosition(this.scene.activeCamera.position);
        this.ringMesh.material = this.planetRingMaterial.shaderMaterial;

        this.transformNode = new BABYLON.TransformNode(this.name + "PlanetTs"); 
        this.sphere.parent = this.transformNode;
        this.ringMesh.parent = this.transformNode;

        this.transformNode.parent = this.centerNode;     
    }
    getPosition(){
        return this.transformNode.position;
    }    
    setRingsVisible(visibility){
        this.ringMesh.visibility = visibility;
    }      
    setOrbitDistance(distance){
        this.transformNode.position.x = distance;
        this.planetMaterial.setObjectPosition(this.transformNode.position);
        this.planetRingMaterial.setObjectPosition(this.transformNode.position);
    }     
    update(dt){
       this.transformNode.rotate(this.rotationAxis,  dt * 0.1, BABYLON.Space.LOCAL);  
    }
  }

