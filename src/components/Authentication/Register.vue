<template>
  <form @submit.prevent>
    <div class="inputs">
      <label>Please type your email here:</label>
      <input type="text" id="login-input" v-model="login" placeholder="smth@youremailservice.com"/>
      <label>Please type your password here:</label>
      <input type="password" id="password-input" v-model="password" placeholder="From six symbols"/>
      <h1 class="user-info error" v-if="this.errorText">{{errorText}}</h1>
    </div>
    <input v-if="!this.authUser" class="button" type="submit" value="Register" @click="registerNewUser"/>
    <h1 v-if="this.authUser" class="headline">To register a new user please sign out</h1>
    <router-link v-if="this.authUser" class="link" to="/">Back to the weather</router-link>
  </form>
</template>

<script>
import database from '../../firebase'

export default {
  name: 'Register',
  data () {
    return {
      login: '',
      password: '',
      authUser: null,
      errorText: '',
      registrationSuccessful: false
    }
  },
  methods: {
    registerNewUser () {
      database.auth().createUserWithEmailAndPassword(this.login, this.password)
        .then(() => { this.errorText = '' })
        .catch(error => { this.errorText = 'Registration failed. ' + error.message })
    }
  },
  created () {
    database.auth().onAuthStateChanged(user => {
      this.authUser = user
    })
  }
}
</script>

<style lang="scss">
  .success-message {
    background-color: $secondary-color;
    padding: 10px;
    max-width: 500px;
    margin: 0 auto;
    color: $primary-color;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
