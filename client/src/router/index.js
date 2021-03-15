import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Orders from "@/views/Orders";
import AddOrder from "@/components/AddOrder";
import Login from "@/views/Login";
import EditOrder from "@/components/EditOrder";
import Products from "@/views/Products";
import AddProduct from "@/components/AddProduct";
import EditProduct from "@/components/EditProduct";
import Logout from "@/views/Logout";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/order/add',
    name: 'AddOrder',
    component: AddOrder
  },
  {
    path: '/order/:id',
    name: 'EditOrder',
    component: EditOrder
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/products/add',
    name: 'AddProduct',
    component: AddProduct
  },
  {
    path: '/products/:id',
    name: 'EditProduct',
    component: EditProduct
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
