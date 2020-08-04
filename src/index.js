import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {ShadowsExample} from './ShadowsExample.js';
import {GuiExample} from './GuiExample.js';
import {ShaderTest} from './ShaderTest.js';
import {EarthModel} from './EarthModel.js';

let canvas = document.getElementById('renderCanvas');
let engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
let scene = new BABYLON.Scene(engine);

scene.clearColor = new BABYLON.Color3(0, 0, 0.1);

//let shadowExample = new ShadowsExample(engine, canvas);
//let guiExample = new GuiExample(engine, canvas);
//let shaderTest = new ShaderTest(engine, canvas);
let earthModel = new EarthModel(engine, scene, canvas);

engine.runRenderLoop(function(){
    //shadowExample.render();
    //guiExample.render();
    //shaderTest.render();
    earthModel.render();
});

window.addEventListener('resize', function(){
    engine.resize();
});

