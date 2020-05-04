<template>
    <router-view></router-view>
</template>

<script>
  import database from "./firebase";

  export default {
    name: "App",
    data: function () {
      return {
        authUser: null
      }
    },
    beforeCreate() {
      database.auth().onAuthStateChanged(user => {
        this.authUser = user
        if (!this.authUser && this.$router.currentRoute.path === '/') {
          this.$router.push({path: 'auth'})
        }
      })
    }
  }

</script>

<style lang="scss">
  body {
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
    display: flex;
    justify-content: center;
    height: 100vh;
    margin: 0;
    text-align: center;
    font-family: Bahnschrift;
    color: #fff;
  }
</style>
