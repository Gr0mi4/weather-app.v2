import Authentication from './components/Authentication'
import Home from './components/Home'
import VueRouter from 'vue-router'
import SignIn from './components/Authentication/SignIn'
import Register from './components/Authentication/Register'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/auth',
    name: 'auth',
    component: Authentication,
    children: [
      {
        path: '/signIn',
        name: 'SignIn',
        component: SignIn
      },
      {
        path: '/register',
        name: 'Register',
        component: Register
      }
    ]
  }
]

const router = new VueRouter({
  routes: routes
})
router.beforeEach((to, from, next) => {
  if ((localStorage.user === 'null' || localStorage.user === undefined) && to.name === 'home') {
    next({ name: 'auth' })
  } else {
    next()
  }
})

export default router
