import * as BABYLON from 'babylonjs';

export default 
class PlanetModel{
    constructor(name, scene, size) {
        this.name = name;
        this.scene = scene;
        this.size = size;
        this.centerNode = new BABYLON.TransformNode(this.name + "Center"); 
        this.sphere = BABYLON.Mesh.CreateSphere(this.name+"Sphere", 26, size, this.scene, false, BABYLON.Mesh.FRONTSIDE);
        this.sphere.parent = this.centerNode;
    }
    setAngle(angle){
        this.centerNode.rotation.y = angle * (Math.PI/180.);
    }      
    getCenterNode(){
        return this.centerNode;
    }  
    setPlanetMaterial(material){
        this.planetMaterial = material;
        this.sphere.material = this.planetMaterial.shaderMaterial; 
        this.planetMaterial.setObjectPosition(this.sphere.position);
        this.planetMaterial.setCameraPosition(this.scene.activeCamera.position);
    }
    setOrbitDistance(distance){
        this.sphere.position.x = distance;
        this.sphere.position.y = 0;
        this.sphere.position.z = 0;
    }      
    createAtmosphericMesh(size, thickness){
        this.atmosphereMesh = BABYLON.Mesh.CreateSphere(this.name + "Sphere2", 26, size * thickness, this.scene, false, BABYLON.Mesh.BACKSIDE);        
    }








    createRing(size, thickness){
        let vertices=[];
        let normals=[];
        let uvs=[];
        let indices = [];
        let indexCounter = 0;
        let innerRadius = size * 0.5;
        let outerRadius = innerRadius + thickness;        
        let step = (2.*Math.PI) / 36;
        for(let a = 0; a <= (2.*Math.PI); a += step){

            let x = Math.cos(a);
            let y = Math.sin(a);

            vertices.push(x * innerRadius);
            vertices.push(y * innerRadius);
            vertices.push(0);

            normals.push(x);
            normals.push(y); 
            normals.push(0);            
            
            uvs.push(a/(2.*Math.PI));
            uvs.push(0.0);            

            vertices.push(x * outerRadius);
            vertices.push(y * outerRadius);
            vertices.push(0);            

            normals.push(x);
            normals.push(y);            
            normals.push(0);            

            uvs.push(a/(2.*Math.PI));
            uvs.push(1.0);            

            indexCounter+=2;
        }
        
        indexCounter = indexCounter - 2;

        for(let i=0; i<indexCounter-1; i+=2){

            indices.push(i);
            indices.push((i + 1)%indexCounter);
            indices.push((i + 3)%indexCounter);
            
            indices.push(i);
            indices.push((i + 3)%indexCounter);           
            indices.push((i + 2)%indexCounter);
        }

        let vertexData = new BABYLON.VertexData();
        
        vertexData.positions = vertices;
        vertexData.uvs = uvs;
        vertexData.indices = indices;    
        vertexData.normals = normals;
        
        this.atmosphereMesh = new BABYLON.Mesh(this.name + "Atm", this.scene);
        vertexData.applyToMesh(this.atmosphereMesh);
    }    
}