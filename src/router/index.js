import Vue from 'vue'
import VueRouter from 'vue-router'

import loginUser from '../components/loginUser';
import userNotes from '../components/userNotes';
import loginUser2 from '../components/loginUser2';

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: loginUser
  },
  {
    path: '/user',
    component: userNotes
  },
  {
    path: '/',
    component: loginUser2
  }
]

// eslint-disable-next-line no-new
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
