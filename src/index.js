import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {ShadowsExample} from './ShadowsExample.js';
import {GuiExample} from './GuiExample.js';
import {ShaderTest} from './ShaderTest.js';

import {EarthModel} from './EarthModel.js';
import {MarsModel} from './MarsModel.js';

let canvas = document.getElementById('renderCanvas');
let engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
let scene = new BABYLON.Scene(engine);

scene.clearColor = new BABYLON.Color3(0, 0, 0.1);

let arcCamera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);
arcCamera.setPosition(new BABYLON.Vector3(0, 1, 10));
arcCamera.target = new BABYLON.Vector3(0, 1, 0);
arcCamera.attachControl(canvas, false); 

//let shadowExample = new ShadowsExample(engine, canvas);
//let guiExample = new GuiExample(engine, canvas);
//let shaderTest = new ShaderTest(engine, canvas);

let earthModel = new EarthModel(engine, scene, canvas);
earthModel.setPosition(-3,0,0);

// let earthModel2 = new EarthModel(engine, scene, canvas);
// earthModel2.setPosition(3,0,0);

let marsModel = new MarsModel(engine, scene, canvas);
marsModel.setPosition(3,0,0);

engine.runRenderLoop(function(){
    //shadowExample.render();
    //guiExample.render();
    //shaderTest.render();
    
     earthModel.update();
    // earthModel2.update();
    marsModel.update();

    scene.render();
});

window.addEventListener('resize', function(){
    engine.resize();
});

