import Authentication from './components/Authentication'
import Home from './components/Home'
import VueRouter from 'vue-router'

const routes = [
  { path: '/auth', name: 'auth', component: Authentication },
  { path: '/', name: 'home', component: Home }
]

const router = new VueRouter({
  routes: routes
})

export default router
