import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import Input from './components/DataInput';
import {routes} from "./routes"

Vue.use(VueRouter);

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false;
Vue.component('Input', Input);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
