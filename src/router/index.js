import Vue from 'vue'
import VueRouter from 'vue-router'

import loginUser from '../components/loginUser';
import userNotes from '../components/userNotes'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: loginUser
  },
  {
    path: '/user',
    component: userNotes
  }
]

// eslint-disable-next-line no-new
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
