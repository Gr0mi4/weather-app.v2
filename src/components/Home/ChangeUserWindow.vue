<template>
  <div class="userInfo" v-if="this.authUser!==null">
    <h3>You are signed in as: {{this.authUser.email}}</h3>
    <router-link to="/auth" class="button">Change User</router-link>
  </div>
</template>

<script>
  import database from "./../../firebase";

  export default {
    name: "ChangeUserWindow",
    data: function () {
      return {
        authUser: null
      }
    },
    created() {
      database.auth().onAuthStateChanged(user => {
        this.authUser = user
      })
    }
  }
</script>

<style lang="scss">
  .userInfo {
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    color: #3460A4;
    border-radius: 0 0 20px 20px;
    transition: 1s;

    @media screen and (max-width: 502px) {
      font-size: 10px;
    }

    .button {
      margin: 5px;
      padding: 8px;
      min-width: 0;
      border-radius: 5px;
      font-size: 18px;
      border: none;
      text-decoration: none;
      background-color: #3460A4;
      color: #fff;

      @media screen and (max-width: 502px) {
        font-size: 14px;
        padding: 3px;
      }
    }
  }
</style>