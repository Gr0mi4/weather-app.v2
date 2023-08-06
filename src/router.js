import VueRouter from 'vue-router'
import store from './store'
import Authentication from './components/Authentication'
import Home from './components/Home'
import SignIn from './components/Authentication/SignIn'
import Register from './components/Authentication/Register'
import Profile from './components/Profile'
import WeatherToday from './components/Pages/WeatherToday'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/weatherToday',
    component: Home,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/weatherToday',
        name: 'Weather Today',
        component: WeatherToday,
        meta: { requiresAuth: true }
      },
      {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    component: Authentication,
    meta: { userMustBeUnauthenticated: true },
    children: [
      {
        path: '/signIn',
        name: 'SignIn',
        component: SignIn,
        meta: { userMustBeUnauthenticated: true }
      },
      {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { userMustBeUnauthenticated: true }
      }
    ]
  }
]

const router = new VueRouter({
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && store.state.user === null) {
    next({ path: '/auth' })
  } else if (to.meta.userMustBeUnauthenticated && store.state.user) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
