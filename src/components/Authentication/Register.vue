<template>
  <div class="registration">
    <form @submit.prevent class="register-form">
      <div class="inputs">
        <label>Please type your email here:</label>
        <input class="input-field" type="text" id="login-input" v-model="login"

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
               v-model="userName"/>
        <p class="input error" v-if="this.$v.userName.$invalid">Only letters allowed</p>
        <label>City</label>
        <input class="input-field"
               type="text"
               v-model="userCity"/>
        <p class="input error" v-if="this.$v.userCity.$invalid">Only letters allowed</p>
        <label>Country</label>
        <input class="input-field"
               type="text"
               v-model="userCountry"/>
        <p class="input error" v-if="this.$v.userCountry.$invalid">Only letters allowed</p>
        <label>Birth Date</label>
        <input class="input-field"
               type="date"
               @input="this.$v.userBirthDate.$touch"
               v-model="userBirthDate"/>
        <p class="input error" v-if="this.$v.userBirthDate.$error">Invalid date</p>
        <button class="button" @click="showAdditionalParams=false">Hide additional parameters</button>
      </div>
      <input v-if="!this.authUser" class="button" type="submit" value="Register" @click="registerNewUser"/>
    </form>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import { nonNumeric, minDate, maxDate } from '../../customValidators'
import { THREE_YEARS_IN_MS } from '../../constants'

export default {
  name: 'Register',
  data () {
    return {
      login: '',
      password: '',
      userName: null,
      userCity: null,
      userCountry: null,
      userBirthDate: null,
      errorText: '',
      showAdditionalParams: false
    }
  },
  computed: {
    authUser () {
      return this.$store.state.user
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
      nonNumeric
    },
    userCity: {
      nonNumeric
    },
    userCountry: {
      nonNumeric
    },
    userBirthDate: {
      minDate: value => minDate(value, '1920-01-01'),
      maxDate: value => maxDate(value, THREE_YEARS_IN_MS)
    }
  },
  methods: {
    registerNewUser () {
      if (!this.$v.login.$invalid && !this.$v.password.$invalid) {
        this.$store.dispatch({
          type: 'registerNewUser',
          login: this.login,
          password: this.password
        }).then(() => {
          this.errorText = ''
          this.$router.push('/')
        })
          .catch(error => { this.errorText = 'Registration failed. ' + error.message })
      }
    }
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
