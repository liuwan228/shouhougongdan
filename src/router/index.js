import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import SelectPro from '../views/selectProw.vue'

const HomeView = () => import('../views/HomeView.vue')
const SelectPro = () => import('../views/selectPro.vue')
const OrderList = () => import('../views/orderList.vue')
const OrderNewPro = () => import('../views/orderNewPro.vue')
const SubQues = () => import('../views/subQues.vue')
const OrderDetail = () => import('../views/orderDetail.vue')
const Login = () => import('../views/login.vue')

Vue.use(VueRouter)
const routes = [{
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/prolist',
    name: '产品类型',
    component: SelectPro,
  },
  {
    path: '/orderlist',
    name: '登记产品列表',
    component: OrderList,
  },
  {
    path: '/ordernewpro',
    name: '登记新产品',
    component: OrderNewPro,
  },
  {
    path: '/subques',
    name: '提交问题',
    component: SubQues,
  },
  {
    path: '/detail',
    name: '详情页',
    component: OrderDetail,
  },

]


const router = new VueRouter({
  mode: 'hash',
  routes,
})

export default router