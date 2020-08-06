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

        let arcCamera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), this.scene);
        arcCamera.setPosition(new BABYLON.Vector3(110, 0, -15));
        arcCamera.target = new BABYLON.Vector3(110, 0, 0);
        arcCamera.attachControl(this.canvas, false); 

        this.models = {};

        this.models.sunModel = new SunModel(this.engine, this.scene, this.canvas, 70);

        this.models.mercuryModel = new MercuryModel(this.engine, this.scene, this.canvas, 4.8);
        this.models.mercuryModel.setPosition(50,0,0);
        
        this.models.venusModel = new VenusModel(this.engine, this.scene, this.canvas, 12.1);
        this.models.venusModel.setPosition(68,0,0);
        
        // this.models.earthModel = new EarthModel(this.engine, this.scene, this.canvas, 12.7);
        // this.models.earthModel.setPosition(90,0,0);
        
        this.models.marsModel = new MarsModel(this.engine, this.scene, this.canvas, 6.7);
        this.models.marsModel.setPosition(110,0,0);
        
        //Set up Asteroid belt
        
        // this.models.jupiterModel = new JupiterModel(this.engine, this.scene, this.canvas, 6.7);
        // this.models.jupiterModel.setPosition(150,0,0);
        
        // this.models.saturnModel = new SaturnModel(this.engine, this.scene, this.canvas, 6.7);
        // this.models.saturnModel.setPosition(170,0,0);
        
        // this.models.uranusModel = new UranusModel(this.engine, this.scene, this.canvas, 6.7);
        // this.models.uranusModel.setPosition(190,0,0);
        
        // this.models.neptuneModel = new NeptuneModel(this.engine, this.scene, this.canvas, 6.7);
        // this.models.neptuneModel.setPosition(210,0,0);
        
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

