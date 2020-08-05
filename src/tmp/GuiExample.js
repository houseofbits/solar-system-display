
import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import DiffuseTexture from './img/checker.png';
import NormalTexture from './img/normals.png';

export class GuiExample {
    constructor(engine, canvas) {

        this.scene = new BABYLON.Scene(engine);

        let arcCamera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), this.scene);
        arcCamera.setPosition(new BABYLON.Vector3(0, 1, 10));
        arcCamera.target = new BABYLON.Vector3(0, 1, 0);
        arcCamera.attachControl(canvas, false);  

        let sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, this.scene, false, BABYLON.Mesh.FRONTSIDE);
        sphere.position.y = 1;

        let textureMaterial = new BABYLON.StandardMaterial("textureMaterial", this.scene);
        textureMaterial.diffuseTexture = new BABYLON.Texture(DiffuseTexture, this.scene);
        textureMaterial.bumpTexture = new BABYLON.Texture(NormalTexture, this.scene);

        sphere.material = textureMaterial;

        let light = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 0), this.scene);
        light.intensity = 3;
        light.position = new BABYLON.Vector3(0, 50, 0);

        let advancedTexture = new GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        let rect1 = new GUI.Rectangle();
        rect1.width = "200px";
        rect1.height = "100px";
        rect1.color = "white";
        rect1.fontSize = 18;
        rect1.thickness = 0;
        rect1.linkOffsetY = -50;
        advancedTexture.addControl(rect1);
        rect1.linkWithMesh(sphere);   

        let label = new GUI.TextBlock();
        label.text = "Тест текстовых представлений";//"Pārbaudiet teksta attēlojumus";
        label.textWrapping = true;
        label.outlineWidth = "1px";
        label.outlineColor = "black";
        rect1.addControl(label);

    }
    getScene(){
        return this.scene;
    }
    render(){
        this.getScene().render();
    }
  }

