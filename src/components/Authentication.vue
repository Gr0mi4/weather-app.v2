<template>
  <div>
    <h1 class="headline">Please sign in to see the weather :</h1>
    <div class="inputs">
      <label>Please type your email</label>
      <input type="text" id="login-input" v-model="login" placeholder="smth@youremailservice.com"/>
      <label>Please type your password</label>
      <input type="password" id="password-input" v-model="password" placeholder="From six symbols"/>
      <h1 class="warning" v-if="this.authUser===null">You are not signed in</h1>
      <h1 class="warning" v-if="this.authUser">You are signed in as {{authUser.email}}</h1>
      <h1 class="warning error" v-if="this.errorText">{{errorText}}</h1>
    </div>
    <div class="action-buttons">
      <input v-if="!this.authUser" class="button" type="submit" value="Sign In" v-on:click="signInUser"/>
      <input v-if="this.authUser" class="button" type="submit" value="Sign Out" v-on:click="signOut"/>
      <input v-if="!this.authUser" class="button" type="submit" value="Register" v-on:click="registerNewUser"/>
    </div>
    <router-link v-if="this.authUser" class="link" to="/">Back to the weather</router-link>
  </div>
</template>

<script>
  import database from "./../firebase"

  export default {
    name: "Authentification",
    data: function () {
      return {
        login: '',
        password: '',
        authUser: null,
        errorText: ''
      }
    },
    methods: {
      registerNewUser() {
        database.auth().createUserWithEmailAndPassword(this.login, this.password)
           .then(() => this.errorText = '')
           .catch(error => this.errorText = 'Registration failed. ' + error.message)
      },
      signInUser() {
        database.auth().signInWithEmailAndPassword(this.login, this.password)
           .then(() => this.errorText = '')
           .catch(error => this.errorText = 'User unauthorised. ' + error.message)
      },
      signOut() {
        database.auth().signOut()
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
  .headline {
    margin: 0;
    color: #3460A4;
    font-size: 40px;
  }

  .inputs {
    display: flex;
    flex-direction: column;
    align-items: center;

    .warning {
      margin: 0;
      padding: 0;
      font-size: 25px;
    }

    .error {
      color: red;
      font-size: 22px;
    }
  }

  input {
    text-align: center;
    font-size: 28px;
    border: none;
    border-radius: 10px;
    margin-bottom: 20px;
    transition: box-shadow 0.4s;
    outline: none;
    min-width: 400px;
    padding: 5px;

  }

  .action-buttons {
    margin: 0 0 20px;
    .button {
      min-width: 150px;
      padding: 10px;
      margin: 10px;
      color: white;
      background-color: #3460A4;
      border-radius: 20px;
      font-size: 22px;
      transition: 0.5s;

      &:hover {
        cursor: pointer;
      }

      &:active {
        transform: scale(0.92);
      }
    }
  }

  .link {
    font-size: 25px;
    background-color: #fff;
    padding: 20px;
    border: 2px solid #3460A4;
    border-radius: 30px;
    text-decoration: none;
  }

</style>