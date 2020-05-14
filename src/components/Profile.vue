<template>
  <div>
    <ChangeUserWindow/>
    <div class="user-info">
    <h1>User Info:</h1>
    <ul class="data-list" v-if="userInfo">
      <li v-for="(value, key, index) in userInfo" :key="index">{{key}} : {{value}}</li>
    </ul>
    <h1 v-if="userInfo===null">Sorry, no user information provided</h1>
    </div>
  </div>
</template>

<script>
import ChangeUserWindow from './Home/ChangeUserWindow'

export default {
  name: 'Profile',
  components: { ChangeUserWindow },
  computed: {
    userInfo () {
      return this.$store.state.userAdditionalInfo
    }
  }
}
</script>

<style lang="scss">
  .user-info {
    display: flex;
    flex-direction: column;
    background-color: $secondary-color;
    color: $primary-color;
    max-width: 70%;
    margin: 20px auto;
    border-radius: 40px;

    & .data-list {
      display: flex;
      flex-direction: column-reverse;

      & li {
        list-style: none;
        font-size: 22px;
        text-align: center;
        text-transform: capitalize;
      }
    }
  }
</style>
