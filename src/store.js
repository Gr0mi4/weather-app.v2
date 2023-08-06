import Vue from 'vue'
import Vuex from 'vuex'
import myDatabase from './firebase'

Vue.use(Vuex)
const store = new Vuex.Store({

  state: {
    user: null,
    userAdditionalInfo: null,
    city: 'Minsk',
    weatherService: 'openWeather',
    goods: null
  },

  getters: {
    userName: state => {
      return state.userAdditionalInfo
        ? state.userAdditionalInfo.name
        : null
    },
    userBirthDate: state => {
      return state.userAdditionalInfo
        ? state.userAdditionalInfo.birthDate
        : null
    },
    userAge: state => {
      return state.userAdditionalInfo
        ? new Date() - new Date(state.userAdditionalInfo.birthDate)
        : null
    },
    getGoodById: state => id =>
      state.goods
        ? state.goods.find(item => item._id.$oid === id)
        : null

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
    }
  },

  actions: {
    signInUser (context, payload) {
      return new Promise((resolve, reject) => {
        myDatabase.auth().signInWithEmailAndPassword(payload.login, payload.password)
          .then(resp => {
            context.commit('saveAuthenticatedUser', resp.user)
            context.dispatch('getUserAdditionalInfo')
              .then(() => resolve(resp.user))
          },
          error => { reject(error) })
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
    },
    getYourLocation (context) {
      return new Promise((resolve, reject) => {
        fetch('https://api.geoapify.com/v1/ipinfo?&apiKey=dc3a3ecf3c9a4b0694db72018a135b77')
          .then(response => response.json())
          .then(data => {
            context.commit('changeCityName', data.city.name)
            resolve()
          })
          .catch((error) => {
            console.warn(error)
            reject(error)
          })
      })
    }
  }
})

export default store
