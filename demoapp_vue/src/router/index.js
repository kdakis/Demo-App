import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

import Home from '../views/Home.vue'

import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import MyAccount from '../views/dashboard/MyAccount.vue'
import Devices from '../views/dashboard/Devices.vue'
import Device from '../views/dashboard/Device.vue'
import AddDevice from '../views/dashboard/AddDevice.vue'
import EditDevice from '../views/dashboard/EditDevice.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/log-in',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/my-account',
    name: 'MyAccount',
    component: MyAccount,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/devices',
    name: 'Devices',
    component: Devices,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/devices/add',
    name: 'AddDevice',
    component: AddDevice,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/devices/:id',
    name: 'Device',
    component: Device,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/devices/:id/edit',
    name: 'EditDevice',
    component: EditDevice,
    meta: {
      requireLogin: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next('/log-in')
  } else {
    next()
  }
})

export default router
