import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '@/site/Welcome.vue';
import Login from '@/site/Login.vue';
import Register from '@/site/Register.vue';
import Create from '@/site/list/Create.vue';
import List from '@/site/list/List.vue';
import Show from '@/site/list/Show.vue';

const routes = [
  {
    meta: {
      title: 'Welcome'
    },
    path: "/",
    name: "welcome",
    component: Welcome,
    meta: { requiresAuth: false },
  },
  {
    meta: {
      title: 'List'
    },
    path: "/list",
    name: "list.index",
    component: List,
    meta: { requiresAuth: true },
  },
  {
    meta: {
      title: 'View List'
    },
    path: "/list/show/:list_id",
    name: "list.show",
    component: Show,
    meta: { requiresAuth: true },
  },
  {
    meta: {
      title: 'Create List'
    },
    path: "/list/create",
    name: "list.create",
    component: Create,
    meta: { requiresAuth: true },
  },
  {
    meta: {
      title: 'Login'
    },
    path: '/login',
    name: 'login',
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    meta: {
      title: 'Register'
    },
    path: '/register',
    name: 'register',
    component: Register,
    meta: { requiresAuth: false },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    //
    return { top: 0 };
  },
})

export default router;