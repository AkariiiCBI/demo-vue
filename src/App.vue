<script setup>
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
import { useMouse } from "@/utils/hooks";
import { Modal } from 'ant-design-vue';

const userStore = useUserStore();
// 此时userStore 并不是响应式数据 需要变成响应式的
const { name } = storeToRefs(userStore);
// 方法不需要是响应式的 storeToRefs 不会去处理方法 需要去userStore结构
const { updateName } = userStore;

const type = ref('base');
const message = ref('你好👋');

const {x, y} = useMouse();
watch(type, (newType) => {
  console.log(`type is ${newType}`)
}, {immediate: true})
const userPath = ref('/user/456');

function warn(message, event) {
  console.log('event', event);
  // 这里可以访问原生事件
  if (event) {
    event.preventDefault();
  }
  alert(message);
}
</script>

<template>
    <div class="nav-wrapper">
      <div
        class="mr-10"
        :class="{active: type === item}"
        v-for="(item, index) in ['base', 'computed', 'list', 'hello', 'form', 'life', 'user', 'fa']"
        :key="`nav_${index}`"
        @click="type = item"
      >
        <RouterLink :to="`/${item}`">{{item}}</RouterLink>
      </div>
    </div>
  <!-- </div> -->

  <main>
    <router-view />
  </main>
</template>

<style scoped>
.active {
  color: #ff99cc;
}

.border-black {
  border: #000001 solid px;
}

.pd-20 {
  padding: 20px;
}

.mr-10 {
  display: inline-block;
  margin-right: 10px;
}
.nav-wrapper {
  height: 64px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
}
</style>
