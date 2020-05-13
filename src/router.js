import VueRouter from 'vue-router'
import store from './store'

import Authentication from './components/Authentication'
import Home from './components/Home'
import SignIn from './components/Authentication/SignIn'
import Register from './components/Authentication/Register'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/auth',
    name: 'auth',
    component: Authentication,
    meta: { userMustBeAuthenticated: true },
    children: [
      {
        path: '/signIn',
        name: 'SignIn',
        component: SignIn,
        meta: { userMustBeAuthenticated: true }
      },
      {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { userMustBeAuthenticated: true }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

router.beforeEach((to, from, next) => {
  store.dispatch('checkAuthentication')
    .then((user) => {
      if (to.meta.requiresAuth && user === null) {
        next({ path: '/auth' })
      } else if (to.meta.userMustBeAuthenticated && user) {
        next({ path: '/' })
      } else {
        next()
      }
    })
})

export default router
