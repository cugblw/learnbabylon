import {
  Scene,
  Engine,
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
//   Color3,
  Color4,
} from "@babylonjs/core";

export class BasicScene {
  scene: Scene;
  engine: Engine;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);
    scene.clearColor = new Color4(0, 0.3, 0);
    const camera = new FreeCamera("camera", new Vector3(0, 1, -5), this.scene);
    camera.attachControl(this.canvas, true);

    const hemiLight = new HemisphericLight(
      "hemiLight",
      new Vector3(0, 1, 0),
      this.scene
      );
      
      hemiLight.intensity = 0.5;

      const ground = MeshBuilder.CreateGround("ground", {width:10, height:10}, this.scene);

      const sphere = MeshBuilder.CreateSphere("sphere", {diameter:1}, this.scene);
      sphere.position = new Vector3(0, 1, 0);

    return scene;
  }
}
