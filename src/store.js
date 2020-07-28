import Vue from 'vue'
import Vuex from 'vuex'
import myDatabase from './firebase'
import axios from 'axios'

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
    },
    changeWeatherService (state, weatherService) {
      this.state.weatherService = weatherService
    },
    saveGoods (state, goods) {
      this.state.goods = goods
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
    getGoods (context) {
      return new Promise((resolve, reject) => {
        myDatabase
          .storage()
          .ref('data.json')
          .getDownloadURL()
          .then(url => axios.get(url))
          .then((response) => context.commit('saveGoods', response.data))
          .then((response) => resolve(response))
          .catch(error => reject(error))
      })
    }
    // getGoodsFakeJSON (context) {
    //   return new Promise((resolve, reject) => {
    //     axios.post('https://app.fakejson.com/q', {
    //       token: 'PXxxYOJR-X_rpSsyvfPkYg',
    //       data: {
    //         _id: { $oid: 'stringCharacters|10' },
    //         title: 'productName',
    //         price: 'numberInt',
    //         size: 'functionArray|5|stringCharacters|1,2',
    //         images: ['http://speedhunters-wp-production.s3.amazonaws.com/wp-content/uploads/2020/05/25031651/Speedhunters_Eliza_Kirberger-29.jpg',
    //           'http://speedhunters-wp-production.s3.amazonaws.com/wp-content/uploads/2020/05/22054106/2010-Nurburgring-24H-for-Speedhunters-by-Paddy-McGrath-16-1200x800.jpg'],
    //         rating: 'numberInt|1,5',
    //         description: 'stringLong',
    //         tags: 'functionArray|2|stringWords|1',
    //         colors: 'functionArray|3|colorRGB',
    //         _repeat: '12'
    //       }
    //     }).then((response) => context.commit('saveGoods', response.data))
    //       .then((response) => resolve(response))
    //       .catch(error => reject(error))
    //   })
    // }
  }
})

export default store
