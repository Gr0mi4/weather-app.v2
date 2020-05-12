<template>
  <div>
  <router-view></router-view>
  </div>
</template>

<script>
import database from './firebase'

export default {
  name: 'App',
  beforeCreate () {
    database.auth().onAuthStateChanged(user => {
      this.$store.commit('saveAuthenticatedUser', user)
      localStorage.user = user
    })
  }
}
</script>
