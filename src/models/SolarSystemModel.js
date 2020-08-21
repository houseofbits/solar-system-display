import * as BABYLON from 'babylonjs';
import SunModel from './SunModel.js';
import MercuryModel from './MercuryModel.js';
import VenusModel from './VenusModel.js';
import EarthModel from './EarthModel.js';
import MarsModel from './MarsModel.js';
import JupiterModel from './JupiterModel.js';
import SaturnModel from './SaturnModel.js';
import UranusModel from './UranusModel.js';
import NeptuneModel from './NeptuneModel.js';
import SpaceModel from './SpaceModel.js';
import AsteroidBeltModel from './AsteroidBeltModel.js';

export default 
class SolarSystemModel {
    constructor(canvas) {

        this.canvas = canvas;
        this.engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
        this.scene = new BABYLON.Scene(this.engine);

        this.scene.clearColor = new BABYLON.Color3(0, 0, 0.1);

        let arcCamera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0,0,0, new BABYLON.Vector3(0, 0, 0), this.scene);

        // arcCamera.setPosition(new BABYLON.Vector3(367, 0, -80));
        // arcCamera.target = new BABYLON.Vector3(367, 0, 0);
        // arcCamera.fov = 50. * (Math.PI/180.);   //Radians
        
        arcCamera.setPosition(new BABYLON.Vector3(280,138,-168));
        arcCamera.target = new BABYLON.Vector3(735,-353,332);          
        arcCamera.fov = 53. * (Math.PI/180.);

        //arcCamera.attachControl(this.canvas, false); 

        this.cameraTargetTarget = arcCamera.target.clone();
        this.cameraPositionTarget = arcCamera.position.clone();
        this.cameraFovDegTarget = arcCamera.fov * (180/Math.PI);

        this.models = {};

        this.models.spaceModel = new SpaceModel(this.engine, this.scene, this.canvas, 2000);
        this.models.spaceModel.setPosition(this.scene.activeCamera.target);

        this.models.sunModel = new SunModel(this.engine, this.scene, this.canvas, 532);

        this.models.mercuryModel = new MercuryModel(this.engine, this.scene, this.canvas, 14);
        this.models.mercuryModel.setOrbitDistance(292);
        this.models.mercuryModel.setAngle(4.0);
        
        this.models.venusModel = new VenusModel(this.engine, this.scene, this.canvas, 26);
        this.models.venusModel.setOrbitDistance(316);
        this.models.venusModel.setAngle(0.0);

        this.models.earthModel = new EarthModel(this.engine, this.scene, this.canvas, 39);
        this.models.earthModel.setOrbitDistance(360);
        this.models.earthModel.setAngle(-3.0);

        this.models.marsModel = new MarsModel(this.engine, this.scene, this.canvas, 27);
        this.models.marsModel.setOrbitDistance(405);
        this.models.marsModel.setAngle(-4.0);

        this.models.asteroidBelt = new AsteroidBeltModel(this.engine, this.scene, this.canvas, 450, 30);

        //Set up Asteroid belt
        
        this.models.jupiterModel = new JupiterModel(this.engine, this.scene, this.canvas, 105);
        this.models.jupiterModel.setOrbitDistance(516);
        this.models.jupiterModel.setAngle(-8.0);

        this.models.saturnModel = new SaturnModel(this.engine, this.scene, this.canvas, 75);
        this.models.saturnModel.setOrbitDistance(639);
        this.models.saturnModel.setAngle(-5.0);        

        this.models.uranusModel = new UranusModel(this.engine, this.scene, this.canvas, 51);
        this.models.uranusModel.setOrbitDistance(747);
        this.models.uranusModel.setAngle(-2.0);        

        this.models.neptuneModel = new NeptuneModel(this.engine, this.scene, this.canvas, 39);
        this.models.neptuneModel.setOrbitDistance(832);
        this.models.neptuneModel.setAngle(1.0);        

        //Set up Kuiper belt     
        
        this.models.asteroidBelt2 = new AsteroidBeltModel(this.engine, this.scene, this.canvas, 900, 100);

        this.selectedPlanet = null;

        this.transitionSpeed = 350.0;

        let self = this;
        this.engine.runRenderLoop(function(){
            self.renderLoop();
        }); 
        
        this.divFps = document.getElementById("fps");
        this.deltaTime = 0.0;

        this.scene._depthTexture = this.scene.enableDepthRenderer().getDepthMap();//.getInternalTexture();

        var parentr = this.scene;

        // BABYLON.Effect.ShadersStore['depthbufferPixelShader'] =
        // "#ifdef GL_ES\nprecision highp float;\n#endif\n\nvarying vec2 vUV;\nuniform sampler2D textureSampler;\n\nvoid main(void)\n{\nvec4 depth = texture2D(textureSampler, vUV);\ngl_FragColor = vec4(depth.r, depth.r, depth.r, 1.0);\n}";
    
        // var post_process = new BABYLON.PostProcess('depth_display', 'depthbuffer', null, null, 1.0, null, null, this.engine, true);
        // //post_process.activate(camera, depth_renderer.getDepthMap());
        // post_process.onApply = function(effect) {
        //     effect._bindTexture("textureSampler", parentr._depthTexture);
        // }
        
        // arcCamera.attachPostProcess(post_process);
        
    }

    renderLoop(){
        
        if(typeof this.divFps.innerHTML != 'undefined')this.divFps.innerHTML = this.engine.getFps().toFixed() + " fps";

        this.deltaTime = this.engine.getDeltaTime() / 1000.0;

        this.models.spaceModel.setPosition(this.scene.activeCamera.target);

        for (const key of Object.keys(this.models)) {
            this.models[key].update(this.deltaTime);
        }        
    
        this.scene.render();

        this.updateCamera();
    }

    updateCamera(){

        let velocity = this.deltaTime * this.transitionSpeed;

        let cameraFovDeg = this.scene.activeCamera.fov * (180/Math.PI);

        let posv = this.cameraPositionTarget.subtract(this.scene.activeCamera.position);
        let targetv = this.cameraTargetTarget.subtract(this.scene.activeCamera.target);
        let fovv = this.cameraFovDegTarget - cameraFovDeg;

        let posl = posv.length();
        let targetl = targetv.length();

        let stepsCount = Math.ceil(Math.max(posl, targetl, Math.abs(fovv)) / velocity);
        
        let transtitionActive = false;

        if(posl > 1.0){
            posv.normalize();
            let posStep = posl / stepsCount;
            posv.scaleInPlace(posStep);
            let pos2 = this.scene.activeCamera.position.clone();
            pos2.addInPlace(posv);
            this.scene.activeCamera.setPosition(pos2);
            transtitionActive = true;
        }

        if(targetl > 1.0){
            targetv.normalize();
            let targetStep = targetl / stepsCount;
            targetv.scaleInPlace(targetStep);
            let pos = this.scene.activeCamera.target.clone();
            pos.addInPlace(targetv);
            this.scene.activeCamera.target = pos;
            transtitionActive = true;
        }
        if(Math.abs(fovv) > 0.5){
            let fovStep = fovv / stepsCount;
            let resultfov = cameraFovDeg + fovStep;
            this.scene.activeCamera.fov = resultfov * (Math.PI/180.);
            transtitionActive = true;
        }

        if(!transtitionActive && this.selectedPlanet){
            let cameraConf = this.selectedPlanet.getCameraConfiguration(false);
            this.cameraPositionTarget = cameraConf.position;
            this.cameraTargetTarget = cameraConf.target;
            this.cameraFovDegTarget = cameraConf.fovDeg;
            this.transitionSpeed = this.selectedPlanet.transitionSpeed;
        }

        this.scene.activeCamera.update();
    }

    action(planetName){
        let model = this.getPlanetModel(planetName);
        if(model){
            this.selectedPlanet = model;
            let cameraConf = model.getCameraConfiguration(true);
            this.cameraPositionTarget = cameraConf.position;
            this.cameraTargetTarget = cameraConf.target;
            this.cameraFovDegTarget = cameraConf.fovDeg;

            for (const key of Object.keys(this.models)) {
                this.models[key].setOrbitLineVisible(false);
            }             

        }else{
            this.selectedPlanet = null;
            this.cameraPositionTarget = new BABYLON.Vector3(280,138,-168);
            this.cameraTargetTarget = new BABYLON.Vector3(735,-353,332);
            this.cameraFovDegTarget = 53.;                  
            
            for (const key of Object.keys(this.models)) {
                this.models[key].setOrbitLineVisible(true);
            }                         
        }
        this.transitionSpeed = 350.0;
    }

    getPlanetModel(name){
        if(name){
            let key = name.toLowerCase() + "Model";
            if(typeof this.models[key] != 'undefined'){
                return this.models[key];
            }
        }
        return null;
    }
    setDeveloperOption(name, value){
        if(name == "ateroids"){
            this.models.asteroidBelt.setVisible(value);
            this.models.asteroidBelt2.setVisible(value);
        }
        if(name == "sunrays"){
            this.models.sunModel.setRaysVisible(value);
        }
        if(name == "sun"){
            this.models.sunModel.setVisible(value);
        }        
        if(name == "space"){
            this.models.spaceModel.setVisible(value);
        } 
        if(name == "ring"){
            for (const key of Object.keys(this.models)) {
                this.models[key].setRingsVisible(value);
            } 
        }                        
    }
}

