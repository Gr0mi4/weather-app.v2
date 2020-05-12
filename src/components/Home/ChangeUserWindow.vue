<template>
  <header class="header">
    <h1 class="user-name" v-if="this.authUser!==null">You are signed in as: {{this.authUser.email}}</h1>
    <nav v-if="this.authUser!==null" >
      <router-link class="button" to="/">Home</router-link>
      <button class="button" @click="signOut">Sign Out</button>
    </nav>
  </header>
</template>

<script>
import database from '../../firebase'

export default {
  name: 'ChangeUserWindow',
  computed: {
    authUser () {
      return this.$store.state.user
    }
  },
  methods: {
    signOut () {
      database.auth().signOut()
    }
  },
  watch: {
    authUser () {
      this.$router.push('/auth')
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

      @media screen and (max-width: 502px) {
        font-size: 14px;
        padding: 3px;
      }
    }
  }
</style>
