import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Input from './components/Home/DataInput'
import Vuelidate from 'vuelidate/src'
import router from './router'

Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.config.productionTip = false
Vue.component('Input', Input)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
