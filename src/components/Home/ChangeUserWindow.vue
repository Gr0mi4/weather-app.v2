<template>
  <header class="header">
    <h3 class="date">{{ $d(new Date()) }}</h3>
    <div class="user">
      <h1
         class="user-name"
         v-if="this.$store.state.user!==null"
      >{{$t('changeUserWindow.youSignedInAs')}}{{this.$store.state.user.email}}</h1>
    </div>
    <language-change/>
    <h1 v-if="this.errorText" class="error">{{this.errorText}}</h1>
  </header>
</template>

<script>
import LanguageChange from './ChangeUserWindow/LanguageChange'
export default {
  name: 'ChangeUserWindow',

  components: { LanguageChange },

  data () {
    return {
      errorText: ''
    }
  },

  methods: {
    signOut () {
      this.$store.dispatch('signOut')
        .then(() => { this.$router.push('/auth') })
        .catch(error => { this.errorText = this.$t('changeUserWindow.signOutFailed') + error.message })
    }
  }
}
</script>

<style lang="scss">
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;

    & .date {
      color: $primary-color;
      margin: 0;
      font-size: 1rem;
      background-color: $secondary-color;
      align-self: normal;
      z-index: 10;
    }

    .user {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      background-color: $secondary-color;
      color: $primary-color;
      width: 100vw;
      z-index: 10;

      & .user-name {
        font-size: 1.5rem;
        padding: 0 0 0 20px;

        @include tablet {
          font-size: 1.2rem;
        }

        @include middlePhone {
          font-size: 1rem;
          padding: 0;
        }

        @include smallPhone {
          font-size: 0.8rem;
        }
      }

      .navigation {
        display: flex;
        flex-direction: row;

        @include middlePhone {
          flex-direction: column;
        }

        & .button {
          font-size: 1.5rem;
          padding: 0.3rem 1rem;
          border-radius: 1rem;
          margin: 0.3rem;

          @include bigPhone {
            font-size: 1rem;
            margin: 0.2rem;
            padding: 0.3rem 1rem;
          }

          @include middlePhone {
            font-size: 0.7rem;
            margin: 0.1rem;
            padding: 0.3rem 0.7rem;
          }

          @include smallPhone {
            margin: 0.1rem;
            padding: 0.15rem 0.5rem;
          }
        }
      }
    }
  }
</style>
