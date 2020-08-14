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

export default 
class SolarSystemModel {
    constructor(canvas) {

        this.canvas = canvas;
        this.engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
        this.scene = new BABYLON.Scene(this.engine);

        this.scene.clearColor = new BABYLON.Color3(0, 0, 0.1);

        let arcCamera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0,0,0, new BABYLON.Vector3(0, 0, 0), this.scene);

        arcCamera.setPosition(new BABYLON.Vector3(0, 0, -480));
        arcCamera.target = new BABYLON.Vector3(0, 0, 0);
        arcCamera.fov = 77. * (Math.PI/180.);   //Radians
        
        arcCamera.setPosition(new BABYLON.Vector3(288,160,-152));
        arcCamera.target = new BABYLON.Vector3(680,-350,365);          
        arcCamera.fov = 50. * (Math.PI/180.);

        arcCamera.attachControl(this.canvas, false); 

        this.models = {};

        this.models.spaceModel = new SpaceModel(this.engine, this.scene, this.canvas, 2000);
        this.models.spaceModel.setPosition(this.scene.activeCamera.target);

        this.models.sunModel = new SunModel(this.engine, this.scene, this.canvas, 532);

        this.models.mercuryModel = new MercuryModel(this.engine, this.scene, this.canvas, 14);
        this.models.mercuryModel.setOrbitDistance(292);
        
        this.models.venusModel = new VenusModel(this.engine, this.scene, this.canvas, 26);
        this.models.venusModel.setOrbitDistance(324);
        
        this.models.earthModel = new EarthModel(this.engine, this.scene, this.canvas, 39);
        this.models.earthModel.setOrbitDistance(367);
        
        this.models.marsModel = new MarsModel(this.engine, this.scene, this.canvas, 27);
        this.models.marsModel.setOrbitDistance(410);
        
        //Set up Asteroid belt
        
        this.models.jupiterModel = new JupiterModel(this.engine, this.scene, this.canvas, 105);
        this.models.jupiterModel.setOrbitDistance(516);
        
        this.models.saturnModel = new SaturnModel(this.engine, this.scene, this.canvas, 75);
        this.models.saturnModel.setOrbitDistance(639);
        
        this.models.uranusModel = new UranusModel(this.engine, this.scene, this.canvas, 51);
        this.models.uranusModel.setOrbitDistance(747);
        
        this.models.neptuneModel = new NeptuneModel(this.engine, this.scene, this.canvas, 39);
        this.models.neptuneModel.setOrbitDistance(832);
        
        //Set up Kuiper belt        

        let self = this;
        this.engine.runRenderLoop(function(){
            self.renderLoop();
        });        
    }

    renderLoop(){
        
        this.models.spaceModel.setPosition(this.scene.activeCamera.target);

        for (const key of Object.keys(this.models)) {
            this.models[key].update();
        }        
    
        this.scene.render();
    }

    action(planetName){
        let model = this.getPlanetModel(planetName);
        if(model){
            for (const key of Object.keys(this.models)) {
                this.models[key].setVisible(false);
            }      
            model.setVisible(true);
            this.models.sunModel.setVisible(true);
            model.focusCameraOnPlanet();    
        }else{
            for (const key of Object.keys(this.models)) {
                this.models[key].setVisible(true);
            }  

            this.scene.activeCamera.setPosition(new BABYLON.Vector3(0, 0, -480));
            this.scene.activeCamera.target = new BABYLON.Vector3(0, 0, 0);   
            this.scene.activeCamera.fov = 77. * (Math.PI/180.);   //Radians            
        }
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
}

