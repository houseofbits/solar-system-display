import * as BABYLON from 'babylonjs';

export default 
class PlanetModel{
    constructor(name, scene) {
        this.name = name;
        this.scene = scene;
        this.centerNode = new BABYLON.TransformNode(this.name + "Center"); 
    }
    setAngle(angle){
        this.centerNode.rotation.y = angle * (Math.PI/180.);
    }    
    getScene(){
        return this.scene;
    }    
    getCenterNode(){
        return this.centerNode;
    }  
}