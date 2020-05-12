import VueRouter from 'vue-router'

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
    meta: { userAuthenticated: true },
    children: [
      {
        path: '/signIn',
        name: 'SignIn',
        component: SignIn,
        meta: { userAuthenticated: true }
      },
      {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { userAuthenticated: true }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

router.beforeEach((to, from, next) => {
  const userUnauthorised = localStorage.user === 'null' || localStorage.user === undefined
  if (to.meta.requiresAuth && userUnauthorised) {
    next({ path: '/auth' })
  } else if (to.meta.userAuthenticated && !userUnauthorised) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
