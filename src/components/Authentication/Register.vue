<template>
  <div class="registration">
    <form @submit.prevent class="register-form">
      <div class="inputs">
        <label>Please type your email here:</label>
        <input class="input-field" type="text" id="login-input" v-model="login"
               @blur="this.$v.login.$touch"
               placeholder="smth@youremailservice.com"/>
        <p class="input error" v-if="this.$v.login.$error">Entered email is not valid</p>
        <label>Please type your password here:</label>
        <input class="input-field" type="password" id="password-input" v-model="password"
               @blur="this.$v.password.$touch"
               placeholder="From six symbols"/>
        <p class="input error" v-if="this.$v.password.$error">Your password is less then 6 symbols</p>
        <h1 class="user-info error" v-if="this.errorText">{{errorText}}</h1>
      </div>
      <button v-if="!showAdditionalParams" class="button" @click="showAdditionalParams=true">Show additional
        parameters
      </button>
      <div v-if="showAdditionalParams" class="inputs additional">
        <label>First Name</label>
        <input class="input-field"
               type="text"
               v-model="userName"
               @input="this.$v.userName.$touch"/>
        <p class="input error" v-if="this.$v.userName.$error">Only english letters allowed</p>
        <label>City</label>
        <input class="input-field"
               type="text"
               v-model="userCity"
               @input="this.$v.userCity.$touch"/>
        <p class="input error" v-if="this.$v.userCity.$error">Only english letters allowed</p>
        <label>Country</label>
        <input class="input-field"
               type="text"
               v-model="userCountry"
               @input="this.$v.userCountry.$touch"/>
        <p class="input error" v-if="this.$v.userCountry.$error">Only english letters allowed</p>
        <label>Birth Date</label>
        <input class="input-field"
               type="date"
               v-model="userBirthDate"
               @input="this.$v.userBirthDate.$touch"/>
        <p class="input error" v-if="this.$v.userBirthDate.$error">Invalid date</p>
        <button class="button" @click="showAdditionalParams=false">Hide additional parameters</button>
      </div>
      <input v-if="!this.authUser" class="button" type="submit" value="Register" @click="registerNewUser"/>
    </form>
    <h1 v-if="this.authUser" class="headline">To register a new user please sign out</h1>
    <router-link v-if="this.authUser" class="link" to="/">Back to the weather</router-link>
  </div>
</template>

<script>
import database from '../../firebase'
import { required, email, minLength, alpha } from 'vuelidate/lib/validators'

export default {
  name: 'Register',
  data () {
    return {
      login: '',
      password: '',
      authUser: null,
      userName: null,
      userCity: null,
      userCountry: null,
      userBirthDate: null,
      errorText: '',
      showAdditionalParams: false
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
    },
    userName: {
      alpha
    },
    userCity: {
      alpha
    },
    userCountry: {
      alpha
    },
    userBirthDate: {
      minDate: value => new Date(`'${value}'`) > new Date('1920-01-01'),
      maxDate: value => new Date(`'${value}'`) < new Date('2017-01-01')
    }
  },
  methods: {
    registerNewUser () {
      if (!this.$v.login.$invalid && !this.$v.password.$invalid) {
        database.auth().createUserWithEmailAndPassword(this.login, this.password)
          .then(() => { this.errorText = '' })
          .catch(error => { this.errorText = 'Registration failed. ' + error.message })
      }
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
  .registration {
    display: flex;
    flex-direction: column;
    align-items: center;

    .register-form {
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
    }
    .input.error {
      font-size: 16px;
      margin: 0;
      margin-block-start: 0;
      margin-block-end: 10px;

    }
  }
</style>
