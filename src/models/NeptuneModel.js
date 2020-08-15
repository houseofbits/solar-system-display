import * as BABYLON from 'babylonjs';
import PlanetModel from './PlanetModel.js';
import PlanetMaterial from './PlanetMaterial.js';
import PlanetDiffuse from '../resources/img/neptune/neptune_lo.jpg'
import PlanetNormalmap from '../resources/img/mars/mars_normal.jpg'
import Rings from '../resources/img/saturn_ring_alpha.png';

export default
class NeptuneModel extends PlanetModel{
    constructor(engine, scene, canvas, size) {
        super("neptune", scene, size);

        this.createPlanetNode();
        this.setPlanetMaterial(new PlanetMaterial(this.scene, this.name));
        this.planetMaterial.setDiffuseMap(PlanetDiffuse);
        this.planetMaterial.setNormalMap(PlanetNormalmap);
        this.planetMaterial.setSpecular(0.1, 1.0);
        this.planetMaterial.setLightBleedPow(5.0);
        this.planetMaterial.setAtmospheric(new BABYLON.Vector3(1.0, 1.0, 0.2), new BABYLON.Vector3(0.9, 0.6, 0.0), 8.0);   
        
        this.rotationAxis = new BABYLON.Vector3(0.4,1,0);
        this.rotationAxis.normalize();         
                        
        let vertexData = this.createRing(size * 1.55, 8);
        this.ringMesh = new BABYLON.Mesh(this.name + "Ring", this.scene);
        this.ringMesh.rotation.x = Math.PI * 0.5;
        this.ringMesh.parent = this.centerNode;
        vertexData.applyToMesh(this.ringMesh);    
        
        let material = new BABYLON.StandardMaterial(this.name + "Ring", this.scene);
        material.emissiveColor = new BABYLON.Vector3(1,1,1);
        material.diffuseTexture = new BABYLON.Texture(Rings, this.scene);
        material.diffuseTexture.hasAlpha = true;
        this.ringMesh.material = material;

        this.transformNode = new BABYLON.TransformNode(this.name + "PlanetTs"); 
        this.sphere.parent = this.transformNode;
        this.ringMesh.parent = this.transformNode;

        this.transformNode.parent = this.centerNode;     
    }
    getPosition(){
        return this.transformNode.position;
    }    
    setOrbitDistance(distance){
        this.transformNode.position.x = distance;
        this.planetMaterial.setObjectPosition(this.transformNode.position);
    }     
    update(dt){
       this.transformNode.rotate(this.rotationAxis,  dt * 0.1, BABYLON.Space.LOCAL);  
    }
  }

