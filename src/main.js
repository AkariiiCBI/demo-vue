import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persistedstate';
import './style.css'; // 引入 TailwindCSS 样式表

const pinia = createPinia();
pinia.use(piniaPersist);

createApp(App).use(pinia).use(router).use(Antd).mount('#app');
