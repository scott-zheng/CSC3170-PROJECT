import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import PersonalInfo from '../views/PersonalInfo.vue'
import Vendor from '../views/Vendor.vue'
import Search from '../views/Search.vue'
import VendorInfo from '../views/VendorInfo.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Main',
    component: Login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/personalinfo',
    name: 'PersonalInfo',
    component: PersonalInfo
  },
  {
    path: '/vendor',
    name: 'Vendor',
    component: Vendor
  },
  {
	path: '/search',
	name: 'Search',
	component: Search
  },
  {
	path: '/vendorinfo',
	name: 'VendorInfo',
	component: VendorInfo
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
