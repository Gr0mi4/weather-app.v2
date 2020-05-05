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

      .button {
          min-width: 150px;
          padding: 10px;
          margin: 10px;
          color: $secondary-color;
          background-color: $primary-color;
          border-radius: 20px;
          font-size: 22px;
          transition: 0.5s;
          outline: none;
          border: none;
          text-decoration: none;

          @media screen and (max-width: 1024px) {
              font-size: 40px;
              padding: 20px;
              margin: 20px 20px 40px;
              min-width: 250px;
          }

          @media screen and (max-width: 702px) {
              font-size: 30px;
              padding: 15px;
              margin: 15px 15px 30px;
              min-width: 200px;
          }

          @media screen and (max-width: 502px) {
              font-size: 25px;
              margin: 10px 10px 20px;
              min-width: 180px;
          }

          @media screen and (max-width: 502px) {
              font-size: 22px;
              margin: 5px 5px 15px;
              min-width: 150px;
          }

          &:hover {
              cursor: pointer;
              transform: scale(1.03);
          }

          &:active {
              transform: scale(0.92);
          }

          &:focus {
              box-shadow: 0 0 4px 4px $secondary-color;
          }
      }
  }
</style>
