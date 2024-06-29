<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: Li Cheng
 * @Date: 2024-06-25 14:36:24
 * @LastEditors: Li Cheng
 * @LastEditTime: 2024-06-25 16:25:10
-->
<template>
  <h1>{{ $route.meta.title }}</h1>
  <div>编号：{{ $route.params.id }}</div>
  <div>姓名：张三</div>
  <div>性别：男</div>
  <div>年龄：45</div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const userId = ref(route.params.id);

watchEffect(() => {
  // 请求用户数据
  // fetch(`/user/${userId.value}`).then;
});
</script>
