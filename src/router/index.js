// 引入vue
import Vue from 'vue'
// 引入vuerouter
import VueRouter from 'vue-router'
// 创建路由对象

// 引入组件
import Login from '@/views/login.vue'
import Register from '@/views/register.vue'
import Personal from '@/views/personal.vue'
import EditProfile from '@/views/edit_profile.vue'
import Index from '@/views/index.vue'
import Search from '@/views/search.vue'
import Detail from '@/views/detail.vue'
import Myfollow from '@/views/myfollow.vue'
import Mystar from '@/views/myStar.vue'
import Comments from '@/views/comments.vue'
// 将路由挂载在vue实例上
Vue.use(VueRouter)
const router = new VueRouter({
  // 配置路由信息routes
  routes: [
    // 配置详细的路由信息
    {
      name: 'default',
      path: '/',
      redirect: { name: 'Index' }
    },
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
    },
    {
      name: 'EditProfile',
      path: '/edit_profile/:id',
      component: EditProfile
    },
    {
      name: 'Index',
      path: '/index',
      component: Index
    },
    {
      name: 'Search',
      path: '/search',
      component: Search
    },
    {
      name: 'Detail',
      path: '/detail/:id',
      component: Detail
    },
    {
      name: 'Myfollow',
      path: '/myfollow',
      component: Myfollow
    },
    {
      name: 'Mystar',
      path: '/mystar',
      component: Mystar
    },
    {
      name: 'Comments',
      path: '/comments/:id',
      component: Comments
    }
  ]
})

// 添加导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  // 对进入需要验证token的用户页面时,先验证token
  if (to.path.includes('/personal')) {
    const token = localStorage.getItem('toutiao-Authorization')
    if (token) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})
// 向外暴露
export default router
