import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {ShadowsExample} from './ShadowsExample.js';
import {GuiExample} from './GuiExample.js';

let canvas = document.getElementById('renderCanvas');

let engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});

let shadowExample = new ShadowsExample(engine, canvas);
let guiExample = new GuiExample(engine, canvas);

engine.runRenderLoop(function(){
    //shadowExample.render();
    guiExample.render();
});

window.addEventListener('resize', function(){
    engine.resize();
});

