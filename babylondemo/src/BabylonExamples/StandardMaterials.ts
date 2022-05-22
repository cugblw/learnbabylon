import {
    Scene,
    Engine,
    FreeCamera,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    //   Color3,
    Color4,
    StandardMaterial,
    Texture,
} from "@babylonjs/core";

export class StandardMaterials {
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
        // scene.clearColor = new Color4(0, 0.3, 0);
        const camera = new FreeCamera("camera", new Vector3(0, 1, -5), this.scene);
        camera.attachControl(this.canvas, true);
        camera.speed = 0.25;

        const hemiLight = new HemisphericLight("hemiLight", new Vector3(0, 1, 0), this.scene);

        hemiLight.intensity = 1;
        
        const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, this.scene);

        const ball = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, this.scene);
        ball.position = new Vector3(0, 1, 0);

        ground.material = this.CreateGroundMaterial();
        ball.material = this.CreateBallMaterial();
        
        return scene;
    }

    CreateGroundMaterial(): StandardMaterial {
        const groundMat = new StandardMaterial("groundMat", this.scene);
        const uvScale = 4;
        const textArray: Texture[] = [];

        const diffuseTexture = new Texture("textures/stone/cobblestone_05_diff_1k.jpg", this.scene);
        groundMat.diffuseTexture = diffuseTexture;
        textArray.push(diffuseTexture);

        const normalTexture = new Texture("textures/stone/cobblestone_05_nor_gl_1k.jpg", this.scene);

        groundMat.bumpTexture = normalTexture;
        textArray.push(normalTexture);

        const aoTexture = new Texture("textures/stone/cobblestone_05_ao_1k.jpg", this.scene);
        groundMat.ambientTexture = aoTexture;
        textArray.push(aoTexture);


        const specularTexture = new Texture("textures/stone/cobblestone_05_spec_1k.jpg", this.scene);
        groundMat.specularTexture = specularTexture;
        textArray.push(specularTexture);

        textArray.forEach((texture) => {
            texture.uScale = uvScale;
            texture.vScale = uvScale;
        });

        return groundMat;
    }

    CreateBallMaterial(): StandardMaterial {
        const ballMat = new StandardMaterial("ballMat", this.scene);
        const uvScale = 1.5;
        const textArray: Texture[] = [];

        const diffuseTexture = new Texture("textures/metal/metal_plate_diff_1k.jpg", this.scene);
        ballMat.diffuseTexture = diffuseTexture;
        textArray.push(diffuseTexture);

        const normalTexture = new Texture("textures/metal/metal_plate_nor_gl_1k.jpg", this.scene);

        ballMat.bumpTexture = normalTexture;
        ballMat.invertNormalMapX = true;
        ballMat.invertNormalMapY = true;
        textArray.push(normalTexture);

        const aoTexture = new Texture("textures/metal/metal_plate_ao_1k.jpg", this.scene);
        ballMat.ambientTexture = aoTexture;
        textArray.push(aoTexture);

        const specularTexture = new Texture("textures/metal/metal_plate_spec_1k.jpg", this.scene);
        ballMat.specularTexture = specularTexture;
        ballMat.specularPower = 1;
        textArray.push(specularTexture);

        textArray.forEach((texture) => {
            texture.uScale = uvScale;
            texture.vScale = uvScale;
        });

        return ballMat;
    }
}
