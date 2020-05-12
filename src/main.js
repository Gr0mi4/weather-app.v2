import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate/src'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
