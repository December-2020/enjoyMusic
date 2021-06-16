import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import '@/assets/styles/reset.css'
import '@/assets/styles/animate4.1.min.css'
import '@/assets/styles/iconfont.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
