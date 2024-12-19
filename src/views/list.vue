<template>
  <div class="list-comp">
    <h1 class="text-center text-xl font-bold my-4">User List</h1>
    <div class="tool-bar flex justify-end mb-4">
      <button class="add-btn bg-gray-800 text-white py-2 px-4 rounded" @click="openAddDialog">新增</button>
    </div>

    <a-table :columns="columns" :dataSource="list" rowKey="id" bordered>
      <template #operation="{ index }">
        <a-space>
          <a-button class="bg-gray-500 text-white mr-2" type="primary" @click="openEditDialog(index)">
            弹窗编辑
          </a-button>
          <a-button class="bg-gray-500 text-white mr-2" type="danger" @click="deleteUser(index)">
            删除
          </a-button>
          <a-button class="bg-gray-500 text-white" @click="getYourName(list[index].id)">
            问名字
          </a-button>
        </a-space>
      </template>
    </a-table>

    <a-modal v-model:open="isEditing" title="编辑同学信息" ok-text="确认" cancel-text="取消" @ok="saveEdit" @cancel="cancelEdit">
      <a-form layout="vertical">
        <a-form-item label="学号">
          <a-input v-model:value="editForm.id" type="number" />
        </a-form-item>
        <a-form-item label="姓名">
          <a-input v-model:value="editForm.userName" />
        </a-form-item>
        <a-form-item label="年龄">
          <a-input v-model:value="editForm.age" type="number" />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal v-model:open="isAdding" title="新增同学" ok-text="确认" cancel-text="取消" @ok="saveAdd" @cancel="cancelAdd">
      <a-form layout="vertical">
        <a-form-item label="学号">
          <a-input v-model:value="newUser.id" type="number" />
        </a-form-item>
        <a-form-item label="姓名">
          <a-input v-model:value="newUser.userName" />
        </a-form-item>
        <a-form-item label="年龄">
          <a-input v-model:value="newUser.age" type="number" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>

  <div ref="chart" style="height: 500px;"></div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import * as echarts from 'echarts';

const userStore = useUserStore();
const { list, isEditing, editForm, isAdding, newUser } = storeToRefs(userStore);
const { deleteUser, openEditDialog, saveEdit, cancelEdit, openAddDialog, saveAdd, cancelAdd, getYourName } = userStore;

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    customRender: ({ index }) => index + 1
  },
  {
    title: '学号',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    key: 'userName'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '操作',
    key: 'operation',
    slots: { customRender: 'operation' }
  }
];
// 用于引用图表的 DOM 元素
const chart = ref(null);
// 初始化图表函数
const initChart = () => {
  const chartDom = chart.value;
  const myChart = echarts.init(chartDom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });

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
  initChart();
});

// 监听列表变化，更新图表
watch(list, () => {
  initChart();
});

</script>

<style scoped>
#chart {
  width: 100%;
  height: 100%;
}
</style>
