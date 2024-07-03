<template>
    <div ref="tableContainer" class="table-container"></div>
</template>

<script>
import * as BABYLON from 'babylonjs';

export default {
    name: 'Table',
    mounted() {
        this.initBabylonJS();
    },
    methods: {
        initBabylonJS() {
            const canvas = document.createElement('canvas');
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            this.$refs.tableContainer.appendChild(canvas);

            const engine = new BABYLON.Engine(canvas, true);
            const scene = new BABYLON.Scene(engine);

            const camera = new BABYLON.ArcRotateCamera(
                'camera',
                Math.PI / 2,
                Math.PI / 4,
                5,
                BABYLON.Vector3.Zero(),
                scene
            );
            camera.attachControl(canvas, true);

            const light = new BABYLON.HemisphericLight(
                'light',
                new BABYLON.Vector3(0, 1, 0),
                scene
            );

            // 桌面
            const tabletop = BABYLON.MeshBuilder.CreateBox('tabletop', {
                width: 2,
                height: 0.1,
                depth: 2
            }, scene);
            tabletop.position.y = 0;  // 调整桌面位置，使其位于桌脚上方

            // 桌脚
            const legHeight = 1; // 调整桌脚的高度
            const legPositions = [
                [-0.95, -0.5, -0.95],
                [0.95, -0.5, -0.95],
                [-0.95, -0.5, 0.95],
                [0.95, -0.5, 0.95]
            ];

            legPositions.forEach(pos => {
                const leg = BABYLON.MeshBuilder.CreateBox('leg', {
                    width: 0.1,
                    height: legHeight,
                    depth: 0.1
                }, scene);
                leg.position = new BABYLON.Vector3(...pos);
            });

            engine.runRenderLoop(() => {
                scene.render();
            });

            window.addEventListener('resize', () => {
                engine.resize();
            });
        }
    }
};
</script>

<style scoped>
.table-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

canvas {
    display: block;
    width: 100%;
    height: 100%;
}
</style>