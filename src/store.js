import Vue from 'vue'
import Vuex from 'vuex'
import database from './firebase'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    user: null,
    userAdditionalInfo: null,
    city: 'Minsk',
    weatherService: 'openWeather'
  },
  mutations: {
    saveAuthenticatedUser (state, user) {
      this.state.user = user
    },
    saveUserAdditionalInfo (state, userInfo) {
      this.state.userAdditionalInfo = userInfo
    },
    changeCityName (state, city) {
      this.state.city = city
    },
    changeWeatherService (state, weatherService) {
      this.state.weatherService = weatherService
    }
  },
  actions: {
    signInUser (context, payload) {
      return new Promise((resolve) => {
        database.auth().signInWithEmailAndPassword(payload.login, payload.password)
          .then(resp => {
            context.commit('saveAuthenticatedUser', resp.user)
            resolve(resp.user)
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
    },
    registerNewUser (context, payload) {
      return new Promise((resolve, reject) => {
        database.auth().createUserWithEmailAndPassword(payload.login, payload.password)
          .then(resp => {
            context.commit('saveAuthenticatedUser', resp.user)
            if (payload.additionalInfo) {
              database.database().ref('users/' + resp.user.uid).set({
                name: payload.additionalInfo.name,
                city: payload.additionalInfo.city,
                country: payload.additionalInfo.country,
                birthDate: payload.additionalInfo.birthDate
              })
              context.commit('saveUserAdditionalInfo', payload.additionalInfo)
            }
            resolve()
          }, error => {
            reject(error)
          })
      })
    },
    getUserAdditionalInfo (context) {
      database.database()
        .ref('users/' + this.state.user.uid)
        .on('value', (snapshot) => {
          context.commit('saveUserAdditionalInfo', snapshot.val())
        })
    }
  }
})

export default store
