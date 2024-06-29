<template>
  <div class="welcome-container">
    <h1>欢迎来到学生管理系统</h1>
    <p>点击下方按钮进入</p>
    <button @click="toggleMessage">{{ showMessage ? '隐藏' : '显示' }} 欢迎消息</button>
    <p v-if="showMessage">{{ welcomeMessage }}</p>
    <button @click="goToList">跳转到列表页</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const welcomeMessage = ref('这是一个简洁的欢迎页。');
const showMessage = ref(false);

function toggleMessage() {
  showMessage.value = !showMessage.value;
}

const router = useRouter();
function goToList() {
  router.push('/list');
}
</script>

<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f8ff;
  color: #333;
}

h1 {
  font-size: 3em;
  margin-bottom: 0.5em;
}

p {
  font-size: 1.5em;
}

button {
  margin-top: 1em;
  padding: 0.5em 1em;
  font-size: 1em;
  cursor: pointer;
  border: none;
  background-color: #767676;
  color: white;
  border-radius: 5px;
}

button:hover {
  background-color: #0f0f0f;
}
</style>
