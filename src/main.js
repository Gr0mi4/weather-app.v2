import Vue from 'vue'
import App from './App.vue'
import Input from './components/DataInput'

Vue.config.productionTip = false;
Vue.component('Input', Input);

new Vue({
  render: h => h(App),
}).$mount('#app')
