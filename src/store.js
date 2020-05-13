import Vue from 'vue'
import Vuex from 'vuex'
import database from './firebase'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    user: null,
    city: 'Minsk',
    weatherService: 'openWeather'
  },
  mutations: {
    saveAuthenticatedUser (state, user) {
      this.state.user = user
    },
    changeCityName (state, city) {
      this.state.city = city
    },
    changeWeatherService (state, weatherService) {
      this.state.weatherService = weatherService
    }
  },
  actions: {
    registerNewUser (context, payload) {
      return new Promise((resolve, reject) => {
        database.auth().createUserWithEmailAndPassword(payload.login, payload.password)
          .then(resp => {
            context.commit('saveAuthenticatedUser', resp.user)
            resolve()
          }, error => {
            reject(error)
          })
      })
    },
    signInUser (context, payload) {
      return new Promise((resolve, reject) => {
        database.auth().signInWithEmailAndPassword(payload.login, payload.password)
          .then(resp => {
            context.commit('saveAuthenticatedUser', resp.user)
            resolve()
          }, error => {
            reject(error)
          })
      })
    },
    signOut (context) {
      return new Promise((resolve, reject) => {
        database.auth().signOut()
          .then(() => {
            context.commit('saveAuthenticatedUser', null)
            resolve()
          }, error => {
            reject(error)
          })
      })
    },
    checkAuthentication (context) {
      return new Promise((resolve) => {
        database.auth().onAuthStateChanged(user => {
          context.commit('saveAuthenticatedUser', user)
          resolve(user)
        })
      })
    }
  }
})

export default store
