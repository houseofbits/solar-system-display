import * as BABYLON from 'babylonjs';
import GuiOverlay from './gui/GuiOverlay';
import React from 'react';
import ReactDOM from 'react-dom';
//import * as GUI from 'babylonjs-gui';

import SunModel from './models/SunModel.js';
import MercuryModel from './models/MercuryModel.js';
import VenusModel from './models/VenusModel.js';
import EarthModel from './models/EarthModel.js';
import MarsModel from './models/MarsModel.js';
import JupiterModel from './models/JupiterModel.js';
import SaturnModel from './models/SaturnModel.js';
import UranusModel from './models/UranusModel.js';
import NeptuneModel from './models/NeptuneModel.js';

import SolarSystemModel from './models/SolarSystemModel.js';

let canvas = document.getElementById('renderCanvas');

let solarSystemModel = new SolarSystemModel(canvas);

let engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
let scene = new BABYLON.Scene(engine);

scene.clearColor = new BABYLON.Color3(0, 0, 0.1);

let arcCamera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);
arcCamera.setPosition(new BABYLON.Vector3(60, 0, -70));
arcCamera.target = new BABYLON.Vector3(60, 0, 0);
arcCamera.attachControl(canvas, false); 

let sunModel = new SunModel(engine, scene, canvas, 70);

let mercuryModel = new MercuryModel(engine, scene, canvas, 4.8);
mercuryModel.setPosition(50,0,0);

let venusModel = new VenusModel(engine, scene, canvas, 12.1);
venusModel.setPosition(68,0,0);

let earthModel = new EarthModel(engine, scene, canvas, 12.7);
earthModel.setPosition(90,0,0);

let marsModel = new MarsModel(engine, scene, canvas, 6.7);
marsModel.setPosition(110,0,0);

//Asteroid belt

let jupiterModel = new JupiterModel(engine, scene, canvas, 6.7);
jupiterModel.setPosition(150,0,0);

let saturnModel = new SaturnModel(engine, scene, canvas, 6.7);
saturnModel.setPosition(170,0,0);

let uranusModel = new UranusModel(engine, scene, canvas, 6.7);
uranusModel.setPosition(190,0,0);

let neptuneModel = new NeptuneModel(engine, scene, canvas, 6.7);
neptuneModel.setPosition(210,0,0);

//Kuiper belt

engine.runRenderLoop(function(){

    earthModel.update();
    marsModel.update();
    sunModel.update();
    mercuryModel.update();
    venusModel.update();
    jupiterModel.update();
    saturnModel.update();
    uranusModel.update();
    neptuneModel.update();

    scene.render();
});

window.addEventListener('resize', function(){
    engine.resize();
});

ReactDOM.render(<GuiOverlay />, document.getElementById('gui'));

