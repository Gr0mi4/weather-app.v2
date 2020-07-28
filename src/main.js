import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate/src'
import VueI18n from 'vue-i18n'
import messages from './translation/messages'
import dateTimeFormats from './translation/dateTimeFormats'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.use(VueI18n)
Vue.config.productionTip = false

const i18n = new VueI18n({
  fallbackLocale: 'en',
  dateTimeFormats,
  locale: navigator.languages[0].substr(0, 2),
  messages
})

store.dispatch('checkAuthentication')
  .then((user) => { if (user) { store.dispatch('getUserAdditionalInfo') } })
  .then(() => {
    new Vue({
      i18n,
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  })
