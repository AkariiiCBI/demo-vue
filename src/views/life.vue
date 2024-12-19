<template>
  <div>
    <!-- <h1>3D展示</h1> -->
    <canvas ref="canvasRef" class="canvas"></canvas>
    <div ref="ageChartRef"
      style="position: absolute; left: 20px; top: 100px; width: 300px; height: 300px;background-color: rgba(255, 255, 255, 0.8);">
    </div>
  </div>

</template>

<script setup>
import { ref, reactive, onMounted, watch, onBeforeUnmount } from 'vue';
import * as BABYLON from '@babylonjs/core';
import "@babylonjs/loaders";
import "@babylonjs/inspector";
import { useUserStore } from '@/store/user';
import navList from "../utils/navList";
import * as echarts from 'echarts';
import { storeToRefs } from 'pinia';

let loopIndex = 0;
const userStore = useUserStore();
const { list } = storeToRefs(userStore);
const ageChartRef = ref(null);
// const pieChartRef=ref(null);
const canvasRef = ref(null);
const camera = ref(null);
const activeKey = ref(0);
const cacheName = reactive([]);

const showModel = ({ position, target }) => {
  animateCamera("position", new BABYLON.Vector3(...position), camera.value);
  animateCamera("target", new BABYLON.Vector3(...target), camera.value);
}

// 视角切换过程中的过渡动画
const animateCamera = (type, newPos, camera) => {
  const speed = 60;
  const frameCount = 240;

  const ease = new BABYLON.CubicEase();
  ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
  BABYLON.Animation.CreateAndStartAnimation(
    "animation",
    camera,
    type,
    speed,
    frameCount,
    camera[type],
    newPos,
    0,
    ease
  );
}

// 聚焦到某一个物体或区域的视角
const selectModel = (names, animation, scene) => {
  scene.meshes.forEach((mesh) => {
    if (cacheName.includes(mesh.name)) {
      mesh.material.albedoColor = scene.cacheMeshColor;
    }
    if (names.includes(mesh.name)) {
      scene.cacheMeshColor = mesh.material.albedoColor;
      cacheName.push(...names);
      mesh.material.albedoColor = new BABYLON.Color3(0, 221 / 255, 1);
      showModel(animation);
    }
  });
}


// 初始化引擎：生成3D视图所需的场景、素材、相机，并调用相关函数添加对应的元素：书桌、小圆桌、外部模型导入...
const initEngine = async () => {
  if (canvasRef.value) {
    const engine = new BABYLON.Engine(canvasRef.value, true);
    const scene = new BABYLON.Scene(engine);
    camera.value = new BABYLON.ArcRotateCamera(
      'camera',
      Math.PI / 10,
      Math.PI / 3,
      20,
      BABYLON.Vector3.Zero(),
      scene,
    )

    camera.value.attachControl(canvasRef.value)
    camera.value.lowerBetaLimit = 0;
    camera.value.upperBetaLimit = Math.PI / 2;
    camera.value.lowerRadiusLimit = 3;
    camera.value.upperRadiusLimit = 40;
    // camera.position = new BABYLON.Vector3(0, 6, -6)
    // const sphere = addSphere(scene);
    const light = new BABYLON.HemisphericLight(
      "HemisphericLight",
      new BABYLON.Vector3(0, 1, 0),
      this
    )

    light.intensity = 1
    // light.diffuse = new BABYLON.Color3(1, 0, 0);
    light.specular = new BABYLON.Color3(1, 1, 0);
    // light.groundColor = new BABYLON.Color3(0, 0, 0.4);

    // const desk = addDesk(scene);
    // addTable(scene);

    BABYLON.SceneLoader.Append('/model/', 'library_draco.glb', scene, (meshes) => {
      console.log(meshes)
      showModel(animation)
    })

    engine.runRenderLoop(() => {
      scene.render();
    })
    scene.debugLayer.show({
      embedMode: true,
    });

    window.addEventListener('resize', () => {
      engine.resize();
    })
    // autoPlay(scene);
  }
}

// 触发视角切换逻辑
const autoPlay = (scene) => {
  const play = () => {
    if (loopIndex >= navList.length) loopIndex = 0;
    activeKey.value = loopIndex;
    const { names, animation } = navList[loopIndex];
    // scene.value.selectModel(names, animation);
    selectModel(names, animation, scene);
    // showModel(animation)
    loopIndex++;
  };
  let timer = setInterval(play, 5000);
};

// 用于引用图表的 DOM 元素
const chart = ref(null);
// 初始化图表函数
const initChart = () => {
  const chartDom = chart.value;
  const myChart = echarts.init(ageChartRef.value);

  const option = {
    title: {
      text: '学生年龄分布'
    },
    xAxis: {
      type: 'category',
      data: list.value.map(user => user.userName)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: list.value.map(user => user.age),
        type: 'bar',
        itemStyle: {
          color: '#5c5c83'
        }
      }
    ]
  };

  myChart.setOption(option);
  // 监听窗口大小变化以调整图表大小
  window.addEventListener('resize', myChart.resize);
  // 在组件卸载前移除事件监听器并销毁图表实例
  onBeforeUnmount(() => {
    window.removeEventListener('resize', myChart.resize);
    if (myChart) {
      myChart.dispose();
    }
  });
};
// 组件挂载时初始化图表
onMounted(() => {
  initEngine();
  initChart();
});

// 监听列表变化，更新图表
watch(list, () => {
  initChart();
});



</script>

<style scoped>
.canvas {
  /* position: absolute; */
  width: 100%;
  height: 90vh;
}
</style>
