<template>
  <form @submit.prevent>
    <div class="inputs">
      <label>Please type your email here:</label>
      <input class="input-field" type="text" id="login-input" v-model="login"
             @blur="this.$v.login.$touch"
             placeholder="smth@youremailservice.com"/>
      <h1 class="input error" v-if="this.$v.login.$error">Entered email is not valid</h1>
      <label>Please type your password here:</label>
      <input class="input-field" type="password" id="password-input" v-model="password"
             @blur="this.$v.password.$touch"
             placeholder="From six symbols"/>
      <h1 class="input error" v-if="this.$v.password.$error">Your password is less then 6 symbols</h1>
      <h1 class="user-info error" v-if="this.errorText">{{errorText}}</h1>
      <h1 class="user-info" v-if="this.authUser===null">You are not signed in</h1>
      <h1 class="user-info" v-if="this.authUser">You are signed in as {{authUser.email}}</h1>
    </div>
    <div class="action-buttons">
      <input v-if="!this.authUser" class="button" type="submit" value="Sign In" @click="signInUser"/>
      <input v-if="this.authUser" class="button" type="submit" value="Sign Out" @click="this.signOut"/>
    </div>
    <router-link v-if="this.authUser" class="link" to="/">Back to the weather</router-link>
  </form>
</template>

<script>
import database from '../../firebase'
import { email, minLength, required } from 'vuelidate/lib/validators'

export default {
  name: 'SignIn',
  data () {
    return {
      login: '',
      password: '',
      authUser: null,
      errorText: ''
    }
  },
  methods: {
    signInUser () {
      if (!this.$v.login.$invalid && !this.$v.password.$invalid) {
        database.auth().signInWithEmailAndPassword(this.login, this.password)
          .then(() => { this.errorText = '' })
          .catch(error => { this.errorText = 'User unauthorised. ' + error.message })
      }
    },
    signOut () {
      database.auth().signOut()
    }
  },
  validations: {
    login: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  created () {
    console.log('yes')
    database.auth().onAuthStateChanged(user => {
      this.authUser = user
    })
  }
}
</script>

<style>
</style>
