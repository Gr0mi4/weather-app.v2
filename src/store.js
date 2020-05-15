import Vue from 'vue'
import Vuex from 'vuex'
import myDatabase from './firebase'

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
        myDatabase.auth().signInWithEmailAndPassword(payload.login, payload.password)
          .then(resp => {
            context.commit('saveAuthenticatedUser', resp.user)
            context.dispatch('getUserAdditionalInfo').then(() => resolve(resp.user))
          })
      })
    },
    signOut (context) {
      return new Promise((resolve, reject) => {
        myDatabase.auth().signOut()
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
        myDatabase.auth().onAuthStateChanged(user => {
          context.commit('saveAuthenticatedUser', user)
          resolve(user)
        })
      })
    },
    registerNewUser (context, payload) {
      return new Promise((resolve, reject) => {
        myDatabase.auth().createUserWithEmailAndPassword(payload.login, payload.password)
          .then(resp => {
            context.commit('saveAuthenticatedUser', resp.user)
            if (payload.additionalInfo) {
              payload.uid = resp.user.uid
              store.dispatch('loadUserAdditionalInfo', payload)
            }
            resolve()
          }, error => {
            reject(error)
          })
      })
    },
    getUserAdditionalInfo (context) {
      myDatabase.database()
        .ref('users/' + this.state.user.uid)
        .on('value', (snapshot) => {
          context.commit('saveUserAdditionalInfo', snapshot.val())
        })
    },
    loadUserAdditionalInfo (context, payload) {
      myDatabase.database().ref('users/' + payload.uid)
        .set({
          name: payload.additionalInfo.name,
          city: payload.additionalInfo.city,
          country: payload.additionalInfo.country,
          birthDate: payload.additionalInfo.birthDate
        }).then(() =>
          context.commit('saveUserAdditionalInfo', payload.additionalInfo)
        )
    },
    changeUserData (context, payload) {
      return new Promise((resolve, reject) => {
        myDatabase.database()
          .ref('users/' + store.state.user.uid)
          .child(`${payload.property}`).set(`${payload.value}`)
          .then(() => {
            context.dispatch('getUserAdditionalInfo').then(() =>
              resolve())
          })
          .catch((error) => { reject(error) })
      })
    }
  }
})

export default store
