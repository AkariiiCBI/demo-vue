<template>
    <div ref="babylonContainer" class="babylon-container"></div>
  </template>
  
  <script>
  import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3 } from '@babylonjs/core';
  import { SceneLoader } from '@babylonjs/loaders';
  
  export default {
    name: 'BabylonModel',
    mounted() {
      this.initBabylon();
    },
    methods: {
      initBabylon() {
        const canvas = this.$refs.babylonContainer;
        const engine = new Engine(canvas, true);
  
        const scene = new Scene(engine);
  
        const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2, 10, new Vector3(0, 0, 0), scene);
        camera.attachControl(canvas, true);
  
        new HemisphericLight("light", new Vector3(1, 1, 0), scene);
  
        // 使用 SceneLoader.Append 方法加载GLB模型
        SceneLoader.Append("./assets/library_draco.glb", "library_draco.glb", scene, function (scene) {
          scene.createDefaultEnvironment();
        });
  
        engine.runRenderLoop(() => {
          scene.render();
        });
  
        window.addEventListener('resize', () => {
          engine.resize();
        });
      }
    },
    beforeDestroy() {
      window.removeEventListener('resize', () => {
        engine.resize();
      });
    }
  }
  </script>
  
<style>
  .babylon-container {
    width: 100%;
    height: 100%;
  }
  </style>
  