<template>
  <router-view></router-view>
</template>

<script>
import database from './firebase'

export default {
  name: 'App',
  beforeCreate () {
    database.auth().onAuthStateChanged(user => {
      this.authUser = user
      localStorage.user = user
    })
  }
}

</script>
