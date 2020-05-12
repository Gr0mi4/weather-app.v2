<template>
  <header class="header">
    <h1 v-if="authUser===!null">{{this.authUser.email}}</h1>
    <nav>
      <router-link class="nav-button" to="home">Home</router-link>
      <button class="nav-button"></button>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    authUser () {
      return this.$store.state.user
    }
  }
}
</script>

<style lang="scss">
.header {
  background-color: $secondary-color;
}
</style>
