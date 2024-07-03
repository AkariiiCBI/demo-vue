
import { createWebHistory, createRouter } from 'vue-router';

import Base from '@/views/base.vue';
import List from '@/views/list.vue';
import Life from '@/views/life.vue';
import web3D from '@/views/web3D.vue';

// import Life from '@/views/life.vue';

const routes = [
  { path: '/', redirect: '/base' },
  { path: '/base', component: Base },
  { path: '/list', component: List },
  { path: '/web', component: web3D },
  { path: '/life', component: Life },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
