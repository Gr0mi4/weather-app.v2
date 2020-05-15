<template>
  <header class="header">
    <h1 class="user-name" v-if="this.$store.state.user!==null">You are signed in as: {{this.$store.state.user.email}}</h1>
    <nav v-if="this.$store.state.user!==null" >
      <router-link class="button" to="/" exact>Home</router-link>
      <router-link class="button" to="/profile" exact>Profile</router-link>
      <button class="button" @click="signOut">Sign Out</button>
    </nav>
    <h1 v-if="this.errorText" class="error">{{this.errorText}}</h1>
  </header>
</template>

<script>
export default {
  name: 'ChangeUserWindow',
  data () {
    return {
      errorText: ''
    }
  },
  methods: {
    signOut () {
      this.$store.dispatch('signOut')
        .then(() => { this.$router.push('/auth') })
        .catch(error => { this.errorText = 'Sign out failed. ' + error.message })
    }
  }
}
</script>

<style lang="scss">
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: $secondary-color;
    color: $primary-color;
    transition: 1s;
    width: 100vw;

    & .user-name {
      font-size: 22px;
      padding: 0 0 0 20px;

      @media screen and (max-width: 802px) {
        font-size: 16px;
      }

      @media screen and (max-width: 502px) {
        font-size: 12px;
      }
    }

    @media screen and (max-width: 502px) {
      font-size: 10px;
    }

    .button {
      margin: 5px;
      padding: 8px;
      min-width: 0;
      border-radius: 5px;
      font-size: 22px;
      border: none;
      text-decoration: none;
      background-color: $primary-color;
      color: $secondary-color;

      @media screen and (max-width: 802px) {
        font-size: 16px;
        padding: 5px;
      }

      @media screen and (max-width: 595px) {
        font-size: 12px;
        padding: 3px;
      }

      &.router-link-active {
        background-color: $secondary-color;
        color: $primary-color;
        border: 2px solid $primary-color;

        &:focus {
          box-shadow: 0 0 4px 2px $primary-color;
        }
      }
    }
  }
</style>
