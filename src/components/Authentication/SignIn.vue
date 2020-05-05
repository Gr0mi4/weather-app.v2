<template>
    <form @submit.prevent>
      <div class="inputs">
        <label>Please type your email here:</label>
        <input type="text" id="login-input" v-model="login" placeholder="smth@youremailservice.com"/>
        <label>Please type your password here:</label>
        <input type="password" id="password-input" v-model="password" placeholder="From six symbols"/>
        <h1 class="user-info" v-if="this.authUser===null">You are not signed in</h1>
        <h1 class="user-info" v-if="this.authUser">You are signed in as {{authUser.email}}</h1>
        <h1 class="user-info error" v-if="this.errorText">{{errorText}}</h1>
      </div>
      <div class="action-buttons">
        <input v-if="!this.authUser" class="button" type="submit" value="Sign In" @click="signInUser"/>
        <input v-if="this.authUser" class="button" type="submit" value="Sign Out" @click="signOut"/>
      </div>
      <router-link v-if="this.authUser" class="link" to="/">Back to the weather</router-link>
    </form>
</template>

<script>
import database from '../../firebase'

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
      database.auth().signInWithEmailAndPassword(this.login, this.password)
        .then(() => { this.errorText = '' })
        .catch(error => { this.errorText = 'User unauthorised. ' + error.message })
    },
    signOut () {
      database.auth().signOut()
    }
  },
  created () {
    database.auth().onAuthStateChanged(user => {
      this.authUser = user
    })
  }
}
</script>

<style>

</style>
