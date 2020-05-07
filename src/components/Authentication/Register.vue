<template>
  <form @submit.prevent class="register-form">
    <div class="inputs">
      <label>Please type your email here:</label>
      <input class="input-field" type="text" id="login-input" v-model="login" placeholder="smth@youremailservice.com"/>
      <label>Please type your password here:</label>
      <input class="input-field" type="password" id="password-input" v-model="password" placeholder="From six symbols"/>
      <h1 class="user-info error" v-if="this.errorText">{{errorText}}</h1>
    </div>
    <button v-if="!showAdditionalParams" class="button" @click="showAdditionalParams=true">Show additional parameters</button>
    <div v-if="showAdditionalParams" class="inputs additional">
      <label>First Name</label>
      <input class="input-field" type="text"/>
      <label>City</label>
      <input class="input-field" type="text"/>
      <label>Country</label>
      <input class="input-field" type="text"/>
      <label>Date of birth</label>
      <input class="input-field" type="date"/>
      <button class="button" @click="showAdditionalParams=false">Hide additional parameters</button>
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
      showAdditionalParams: false
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
  .register-form {
    display: flex;
    flex-direction: column;
    align-items: center;

    .headline {
      @media screen and (max-width: 1024px) {
        font-size: 40px;
        padding: 10px;
      }

      @media screen and (max-width: 502px) {
        font-size: 26px;
        padding: 2px;
      }
    }

    .additional-inputs {
      display: flex;
      flex-direction: column;
    }
  }
</style>
