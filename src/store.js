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
    registerNewUser (commit, login) {
      database.auth().createUserWithEmailAndPassword(login, '123456')
        .then(database.auth.currentUser(user => {
          commit('saveAuthenticatedUser', user)
        }))
    }
  }
})

export default store
