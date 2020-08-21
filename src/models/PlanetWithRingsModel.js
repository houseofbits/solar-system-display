import * as BABYLON from 'babylonjs';
import PlanetModel from './PlanetModel.js';
import PlanetRingMaterial from './PlanetRingMaterial.js';
import RingRTTVertexShader from '../resources/shaders/ringrtt.vertex.fx';
import RingRTTFragmentShader from '../resources/shaders/ringrtt.fragment.fx';

export default
class PlanetWithRingsModel extends PlanetModel{
    constructor(engine, scene, canvas, size, name) {
        super(name, scene, size);
    }
    createRingsNode(scale, width, ringsMap){
        let vertexData = this.createRing(this.size * scale, width);
        this.ringMesh = new BABYLON.Mesh(this.name + "Ring", this.scene);
        this.ringMesh.rotation.x = Math.PI * 0.5;
        this.ringMesh.parent = this.centerNode;
        vertexData.applyToMesh(this.ringMesh);  

        this.planetRingMaterial = new PlanetRingMaterial(this.scene, this.name);
        this.planetRingMaterial.setDiffuseMap(ringsMap);
        this.ringMesh.material = this.planetRingMaterial.getMaterial();        
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

        this.createOrbitLine(distance);
    }     
    initRingRTT(ringsMap){

        if(typeof BABYLON.Effect.ShadersStore["ringrttVertexShader"] == 'undefined')BABYLON.Effect.ShadersStore["ringrttVertexShader"] = RingRTTVertexShader;
        if(typeof BABYLON.Effect.ShadersStore["ringrttFragmentShader"] == 'undefined')BABYLON.Effect.ShadersStore["ringrttFragmentShader"] = RingRTTFragmentShader;

        this.ringRttShaderMaterial = new BABYLON.ShaderMaterial(name+"RingRTTShader", this.scene, 
            { vertex: "ringrtt",fragment: "ringrtt" },            
            {   
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            });

        this.ringRttShaderMaterial.setVector3("sunPosition", new BABYLON.Vector3(0,0,0));  
        this.ringRttShaderMaterial.setVector3("cameraPosition", this.scene.activeCamera.position);
        this.ringRttShaderMaterial.setVector3("objectPosition", this.transformNode.position);
        this.ringRttShaderMaterial.setTexture("diffuseMap", new BABYLON.Texture(ringsMap, this.scene));  

        var renderTarget = new BABYLON.RenderTargetTexture("depth", 512., this.scene, true);
        this.scene.customRenderTargets.push(renderTarget);       
        renderTarget.renderList.push(this.ringMesh);

        renderTarget.activeCamera  = new BABYLON.ArcRotateCamera("RTTCamera", 0,0,0, new BABYLON.Vector3(0, 0, 0), this.scene);
        renderTarget.activeCamera.setPosition(new BABYLON.Vector3(0, 0, 0));
        renderTarget.activeCamera.target = new BABYLON.Vector3(639, 0, 0);
        renderTarget.activeCamera.fov = 15. * (Math.PI/180.);      

        let projMat = renderTarget.activeCamera.getProjectionMatrix();
        let viewMat = renderTarget.activeCamera.getViewMatrix();

        this.planetMaterial.shaderMaterial.setMatrix("shadowProjection", projMat);
        this.planetMaterial.shaderMaterial.setMatrix("shadowView", viewMat);
        this.planetMaterial.shaderMaterial.setTexture("shadowMap", renderTarget);     

        renderTarget.onBeforeRender = (e) => {
            this.scene.clearColor = new BABYLON.Color3(1., 1., 1.);
            for (const i in renderTarget.renderList) {
                renderTarget.renderList[i]._saved = renderTarget.renderList[i].material;
                renderTarget.renderList[i].material = this.ringRttShaderMaterial;
            }
        };
        renderTarget.onAfterRender = () => {
            this.scene.clearColor = new BABYLON.Color3(0, 0, 0.1);
            for (const i in renderTarget.renderList) {
                renderTarget.renderList[i].material = renderTarget.renderList[i]._saved;
            }
        };        
    }
}