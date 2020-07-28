<template>
  <form @submit.prevent>
    <div class="inputs">
      <label class="label" for="login-input">{{ $t('signIn.emailEnter') }}</label>
      <input
         class="input-field"
         type="text"
         id="login-input"
         v-model="login"
         @blur="this.$v.login.$touch"
         :placeholder="$t('signIn.emailPlaceholder')"
      />
      <h1 class="input error" v-if="this.$v.login.$error">{{ $t('signIn.emailError')}}</h1>
      <label class="label" for="password-input">{{ $t('signIn.passwordEnter')}}</label>
      <input
         class="input-field"
         type="password"
         id="password-input"
         v-model="password"
         @blur="this.$v.password.$touch"
         :placeholder="$t('signIn.passwordPlaceholder')"
      />
      <h1 class="input error" v-if="this.$v.password.$error">{{ $t('signIn.passwordError')}}</h1>
      <h1 class="user-info error" v-if="this.errorText">{{this.errorText}}</h1>
    </div>
      <input
         v-if="!this.$store.state.user"
         class="button"
         type="submit"
         :value="$t('signIn.signIn')"
         @click="signInUser"/>
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
          .catch(error => { this.errorText = this.$t('signIn.userUnauthorised') + error.message })
      } else {
        if (this.password === '') { this.errorText = this.$t('signIn.passwordEmpty') }
        if (this.login === '') { this.errorText = this.$t('signIn.emailEmpty') }
      }
    }
  }
}
</script>
