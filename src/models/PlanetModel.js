import * as BABYLON from 'babylonjs';

export default 
class PlanetModel{
    constructor(name, scene, size) {
        this.name = name;
        this.scene = scene;
        this.size = size;
    }
    createPlanetNode(){
        this.centerNode = new BABYLON.TransformNode(this.name + "Center"); 
        this.sphere = BABYLON.Mesh.CreateSphere(this.name+"Sphere", 36, this.size, this.scene, false, BABYLON.Mesh.FRONTSIDE);
        this.sphere.parent = this.centerNode;
        this.sphere.rotation.z = Math.PI;
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
    setSimplifiedShader(set){
        if(set){
            this.sphere.material = this.planetMaterial.shaderMaterial;
        }else{
            this.sphere.material = this.planetMaterial.shaderMaterialLo;
        }
    }
    setOrbitDistance(distance){
        this.sphere.position.x = distance;
        this.sphere.position.y = 0;
        this.sphere.position.z = 0;
    }      
    createAtmosphericMesh(size, thickness){
        this.atmosphereMesh = BABYLON.Mesh.CreateSphere(this.name + "Sphere2", 26, size * thickness, this.scene, false, BABYLON.Mesh.BACKSIDE);   
        this.atmosphereMesh.parent = this.centerNode;     
    }

    focusCameraOnPlanet(){
        
        let fov = 60.;
        let angle = 25.;

        let target = new BABYLON.Vector3(this.size * 0.5, -2., 0);

        let matrix = BABYLON.Matrix.RotationAxis(BABYLON.Axis.Y, angle * (Math.PI/180.));
        let v2 = BABYLON.Vector3.TransformCoordinates(target, matrix);

        let vd = v2.cross(BABYLON.Axis.Y);
        vd.normalize();
        vd.negateInPlace();
        
        let dst = this.size * Math.tan((fov * 0.5) * (Math.PI/180.));

        vd.scaleInPlace(dst * 2.4);

        let worldMatrix = this.centerNode.getWorldMatrix();
        let global_position = BABYLON.Vector3.TransformCoordinates(this.sphere.position, worldMatrix);

        v2.addInPlace(global_position);
        vd.addInPlace(global_position);

        this.scene.activeCamera.target = v2;
        this.scene.activeCamera.setPosition(vd);
        this.scene.activeCamera.fov = fov * (Math.PI/180.);

    }

    setVisible(visibility){
        this.sphere.visibility = visibility;
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