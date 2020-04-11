import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router/index.js'
// 引入初始化样式
import Vant from 'vant'
import '@/styles/reset.less'
import 'vant/lib/index.css'
Vue.config.productionTip = false

Vue.use(Vant)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
