import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import RockVertexShader from '../resources/shaders/rock.vertex.fx';
import RockFragmentShader from '../resources/shaders/rock.fragment.fx';
import PlanetModel from './PlanetModel.js';
import Diffuse from '../resources/img/rock/rock_diffuse_sm.png'

export default
class AsteroidBeltModel extends PlanetModel{
    constructor(engine, scene, canvas, size, width) {
        super("asteroidBelt", scene, size);

        if(typeof BABYLON.Effect.ShadersStore["rockVertexShader"] == 'undefined')BABYLON.Effect.ShadersStore["rockVertexShader"] = RockVertexShader;
        if(typeof BABYLON.Effect.ShadersStore["rockFragmentShader"] == 'undefined')BABYLON.Effect.ShadersStore["rockFragmentShader"] = RockFragmentShader;

        this.shaderMaterial = new BABYLON.ShaderMaterial(name+"Shader", this.scene, 
            { vertex: "rock",fragment: "rock" },            
            {   
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            });

        this.shaderMaterial.setVector3("sunPosition", new BABYLON.Vector3(0,0,0));  
        this.shaderMaterial.setTexture("diffuseMap", new BABYLON.Texture(Diffuse, this.scene));    
        this.shaderMaterial.setVector3("cameraPosition", this.scene.activeCamera.position);        

        this.rockMesh = null;

        var parent = this;

        this.centerNode = new BABYLON.TransformNode(this.name + "Center"); 

        let orbit = size;

        this.meshInstances = [];

        BABYLON.SceneLoader.ImportMesh("", "./", "./objects/rock1.obj", this.scene, function (newMeshes) {
            parent.rockMesh = newMeshes[0];
            parent.rockMesh.material = parent.shaderMaterial;
            parent.rockMesh.isVisible = false;

            parent.rockMesh.isPickable = false; 

            for (let index = 0; index < 500; index++) {

                var newInstance = newMeshes[0].createInstance("i" + index);               
                let angle = (Math.random() * 360.0) * (Math.PI/180.);

                let pos = new BABYLON.Vector3(Math.cos(angle), 0, Math.sin(angle));
                let zvar = (width * 0.5) - (Math.random() * width);
                let scale = 0.05 + (Math.random() * 0.1);

                pos.normalize();
                pos.scaleInPlace(orbit + zvar);
                pos.y = -10 - (Math.random() * 20.0);

                newInstance.scaling = new BABYLON.Vector3(scale, scale, scale);
                newInstance.rotation.x = Math.random() * Math.PI;
                newInstance.rotation.y = Math.random() * Math.PI;
                newInstance.rotation.z = Math.random() * Math.PI;

                newInstance._rotationAxis = new BABYLON.Vector3(Math.random(), Math.random(), Math.random());
                newInstance._rotationAxis.normalize();
                newInstance._rotationSpeed = 0.1 + (Math.random() * 0.5);
                newInstance._orbitSpeed = 0.005 + (Math.random() * 0.02);

                newInstance.position = new BABYLON.Vector3(pos.x, pos.y, pos.z);
                newInstance.isPickable = false; 

                parent.meshInstances.push(newInstance);
            }
        });
    }
    setVisible(visible){
        if(this.rockMesh)this.rockMesh.visibility = visible;
    }
    setSimplifiedShader(set){

    }       
    update(dt){
        for (const key of Object.keys(this.meshInstances)) {
            let inst = this.meshInstances[key];
            inst.rotate(inst._rotationAxis, dt * inst._rotationSpeed, BABYLON.Space.LOCAL);
            inst.rotateAround(BABYLON.Vector3.Zero(), BABYLON.Vector3.Up(), dt * inst._orbitSpeed);
        }         
    }
  }

