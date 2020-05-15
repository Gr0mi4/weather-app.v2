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
             placeholder="Six(6) symbols at least"/>
      <h1 class="input error" v-if="this.$v.password.$error">Your password is less then 6 symbols</h1>
      <h1 class="user-info error" v-if="this.errorText">{{errorText}}</h1>
    </div>
      <input v-if="!this.$store.state.user" class="button" type="submit" value="Sign In" @click="signInUser"/>
  </form>
</template>

<script>
import { email, minLength, required } from 'vuelidate/lib/validators'

export default {
  name: 'SignIn',
  data () {
    return {
      login: '',
      password: '',
      errorText: ''
    }
  },
  methods: {
    signInUser () {
      if (!this.$v.login.$invalid && !this.$v.password.$invalid) {
        this.$store.dispatch({
          type: 'signInUser',
          login: this.login,
          password: this.password
        }).then(() => {
          this.errorText = ''
          this.$router.push('/')
        })
          .catch(error => { this.errorText = 'User unauthorised. ' + error.message })
      }
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
  }
}
</script>

<style lang="scss">
  .button {
    padding: 20px 40px;
    margin: 10px;
    font-size: 28px;

    @media screen and (max-width: 1024px) {
      font-size: 40px;
      padding: 20px 20px;
      margin: 20px 20px 40px;
      min-width: 250px;
    }

    @media screen and (max-width: 702px) {
      font-size: 30px;
      padding: 15px;
      margin: 15px 15px 30px;
      min-width: 200px;
    }

    @media screen and (max-width: 502px) {
      font-size: 25px;
      margin: 10px 10px 20px;
      min-width: 180px;
    }

    @media screen and (max-width: 380px) {
      font-size: 22px;
      margin: 5px 5px 15px;
      min-width: 150px;
    }

    @media screen and (max-width: 302px) {
      font-size: 16px;
      margin: 5px;
      min-width: 100px;
    }
  }
</style>
