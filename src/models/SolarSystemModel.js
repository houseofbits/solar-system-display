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

export default 
class SolarSystemModel {
    constructor(canvas) {

        this.canvas = canvas;
        this.engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
        this.scene = new BABYLON.Scene(this.engine);

        this.scene.clearColor = new BABYLON.Color3(0, 0, 0.1);

        let arcCamera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0,0,0, new BABYLON.Vector3(0, 0, 0), this.scene);
        arcCamera.setPosition(new BABYLON.Vector3(370, 80, -180));
        arcCamera.target = new BABYLON.Vector3(400, 0, 0);      
        arcCamera.fov = 77. * (Math.PI/180.);   //Radians
        arcCamera.attachControl(this.canvas, false); 

        this.models = {};

        this.models.sunModel = new SunModel(this.engine, this.scene, this.canvas, 532); //70

        this.models.mercuryModel = new MercuryModel(this.engine, this.scene, this.canvas, 14);
        this.models.mercuryModel.setPosition(292,0,0);
        
        this.models.venusModel = new VenusModel(this.engine, this.scene, this.canvas, 26);
        this.models.venusModel.setPosition(324,0,0);
        
        this.models.earthModel = new EarthModel(this.engine, this.scene, this.canvas, 39);
        this.models.earthModel.setPosition(367,0,0);
        
        this.models.marsModel = new MarsModel(this.engine, this.scene, this.canvas, 27);
        this.models.marsModel.setPosition(410,0,0);
        
        //Set up Asteroid belt
        
        this.models.jupiterModel = new JupiterModel(this.engine, this.scene, this.canvas, 105);
        this.models.jupiterModel.setPosition(516,0,0);
        
        this.models.saturnModel = new SaturnModel(this.engine, this.scene, this.canvas, 75);
        this.models.saturnModel.setPosition(639,0,0);
        
        this.models.uranusModel = new UranusModel(this.engine, this.scene, this.canvas, 51);
        this.models.uranusModel.setPosition(747,0,0);
        
        this.models.neptuneModel = new NeptuneModel(this.engine, this.scene, this.canvas, 39);
        this.models.neptuneModel.setPosition(832,0,0);
        
        //Set up Kuiper belt        

        let self = this;
        this.engine.runRenderLoop(function(){
            self.renderLoop();
        });        
    }

    renderLoop(){

        for (const key of Object.keys(this.models)) {
            this.models[key].update();
        }        
    
        this.scene.render();
    }

    action(){
        console.log("action");
    }
}

