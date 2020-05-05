<template>
    <router-view></router-view>
</template>

<script>
import database from './firebase'
import router from './router'

export default {
  name: 'App',
  // data: function () {
  //   return {
  //     authUser: null
  //   }
  // },
  beforeCreate () {
    database.auth().onAuthStateChanged(user => {
      this.authUser = user
    })
  }
}

router.beforeEach((to, from, next) => {
  console.log('yes')
  if (this.authUser) { console.log(this.authUser) }
  next()
})

</script>

<style lang="scss">
  body {
    background-image: $primary-background-gradient;
    display: flex;
    justify-content: center;
    height: 100vh;
    margin: 0;
    text-align: center;
    font-family: Bahnschrift;
    color: $secondary-color;
  }
</style>
