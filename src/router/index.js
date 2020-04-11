// 引入vue
import Vue from 'vue'
// 引入vuerouter
import VueRouter from 'vue-router'
// 创建路由对象

// 引入组件
import Login from '@/views/login.vue'
import Register from '@/views/register.vue'
import Personal from '@/views/personal.vue'
// 将路由挂载在vue实例上
Vue.use(VueRouter)
const router = new VueRouter({
  // 配置路由信息routes
  routes: [
    // 配置详细的路由信息
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'Register',
      path: '/register',
      component: Register
    },
    {
      name: 'Personal',
      path: '/personal/:id',
      component: Personal
    }
  ]
})
// 向外暴露
export default router
