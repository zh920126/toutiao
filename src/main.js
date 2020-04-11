import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router/index.js'
// 引入初始化样式
import '@/styles/reset.less'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
