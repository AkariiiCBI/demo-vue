<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: Li Cheng
 * @Date: 2024-06-25 15:20:29
 * @LastEditors: Li Cheng
 * @LastEditTime: 2024-06-25 16:36:33
-->
<template>
  <h1>我是父亲页面</h1>
  <button @click="toSon">去子页面</button>
  <button @click="toBase">去 base</button>

  <RouterView />
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const toSon = () => {
  // 会替换掉整个路由 而不是去拼接
  // 所以会找不到页面
  // router.push('/son');
  // 正确做法
  router.push({ path: '/fa/son', query: { firstName: '张' } });
};

const toBase = () => {
  router.push('/base');
};
</script>

<style scoped></style>
