<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: Li Cheng
 * @Date: 2024-06-24 13:52:18
 * @LastEditors: Li Cheng
 * @LastEditTime: 2024-06-24 14:34:19
-->
<template>
  <p>原始价格：{{ originalPrice }}</p>
  <input v-model="originalPrice" />
  <p>折扣率: {{ discountRate * 100 }}%</p>
  <input v-model="discountRate" />
  <p>最终价格：{{ finalPrice }}</p>
</template>

<script setup>
import { ref, computed } from 'vue';

// 原始价格
const originalPrice = ref(100);
// 折扣率
const discountRate = ref(0.8);
// 最终价格
const finalPrice = computed(() => {
  return originalPrice.value * discountRate.value;
});
</script>

<style scoped></style>
