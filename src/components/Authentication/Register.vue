<template>
  <div class="registration">
    <form @submit.prevent class="register-form">
      <div class="inputs">
        <label class="label" for="login-input">{{ $t('register.emailEnter') }}</label>
        <input
           class="input-field"
           type="text"
           id="login-input"
           v-model="login"
           :placeholder="$t('register.emailPlaceholder')"
        />
        <p class="input error" v-if="this.$v.login.$error">{{ $t('register.emailError')}}</p>
        <label class="label" for="password-input">{{ $t('register.passwordEnter')}}</label>
        <input
           class="input-field"
           type="password"
           id="password-input"
           v-model="password"
           @blur="this.$v.password.$touch"
           :placeholder="$t('register.passwordPlaceholder')"
        />
        <p class="input error" v-if="this.$v.password.$error">{{ $t('register.passwordError')}}</p>
        <h1 class="user-info error" v-if="this.errorText">{{ $t('register.passwordError')}}</h1>
      </div>
      <button
         v-if="!showAdditionalParams"
         class="button"
         @click="showAdditionalParams=true"
      >{{ $t('register.showAdditionalParams')}}</button>
      <div v-if="showAdditionalParams" class="inputs additional">
        <label class="label" for="user-first-name">{{ $t('register.firstName')}}</label>
        <input
           class="input-field"
           id="user-first-name"
           type="text"
           v-model="userName"
        />
        <p class="input error" v-if="this.$v.userName.$invalid">{{ $t('register.additionalParamsError')}}</p>
        <label class="label" for="user-city">{{ $t('register.city')}}</label>
        <input
           class="input-field"
           id="user-city"
           type="text"
           v-model="userCity"
        />
        <p class="input error" v-if="this.$v.userCity.$invalid">{{ $t('register.additionalParamsError')}}</p>
        <label class="label" for="user-country">{{ $t('register.country')}}</label>
        <input
           class="input-field"
           id="user-country"
           type="text"
           v-model="userCountry"
        />
        <p class="input error" v-if="this.$v.userCountry.$invalid">{{ $t('register.additionalParamsError')}}</p>
        <label class="label" for="user-birth-date">{{ $t('register.birthDate')}}</label>
        <input
           class="input-field"
           id="user-birth-date"
           type="date"
           @input="this.$v.userBirthDate.$touch"
           v-model="userBirthDate"
        />
        <p class="input error" v-if="this.$v.userBirthDate.$error">{{ $t('register.birthDateError')}}</p>
        <button class="button" @click="showAdditionalParams=false">{{ $t('register.hideAdditionalParams')}}</button>
      </div>
      <input
         v-if="!this.$store.state.user"
         class="button" type="submit"
         :value="$t('register.register')"
         @click="registerNewUser"/>
    </form>
  </div>
</template>

<script>
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'
import { nonNumeric, nonNumericOneWord, minDate, maxDate } from '../../customValidators'
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
      nonNumericOneWord,
      maxLength: maxLength(25)
    },
    userCity: {
      nonNumeric,
      maxLength: maxLength(25)
    },
    userCountry: {
      nonNumeric,
      maxLength: maxLength(25)
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
          password: this.password,
          additionalInfo: {
            name: this.userName,
            city: this.userCity,
            country: this.userCountry,
            birthDate: this.userBirthDate
          }
        }).then(() => {
          this.errorText = ''
          this.$router.push('/')
        })
          .catch(error => { this.errorText = this.$t('register.registerFailed') + error.message })
      } else {
        if (this.password === '') { this.errorText = this.$t('register.passwordEmpty') }
        if (this.login === '') { this.errorText = this.$t('register.emailEmpty') }
      }
    }
  }
}
</script>
