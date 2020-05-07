<template>
  <div>
    <div class="authorization-choice">
      <h1 class="headline">Hello! To see the weather you must be authorised. Please register or sign in to use
        Weather-app.v2</h1>
      <router-link to="/signIn" class="button" replace>Sign In/Out</router-link>
      <router-link to="/register" class="button" replace>Register</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Authentification'
}

</script>

<style lang="scss">
  .authorization-choice {
    margin: 0 20%;
    padding: 20px;
    background-color: $secondary-color;
    border-radius: 0 0 30px 30px;

    @media screen and (max-width: 1024px) {
      display: flex;
      flex-direction: column;
    }

    @media screen and (max-width: 702px) {
      padding: 0;
    }

    @media screen and (max-width: 502px) {
      font-size: 22px;
      padding: 5px 5px 15px;
    }

    .headline {
      font-size: 30px;
      padding: 0 0 25px;

      @media screen and (max-width: 1024px) {
        font-size: 26px;
        padding: 5px 5px 25px;
      }

      @media screen and (max-width: 702px) {
        font-size: 22px;
        padding: 5px 5px 15px;
      }

      @media screen and (max-width: 702px) {
        font-size: 18px;
        padding: 5px 5px 15px;
      }
    }

    .button {
      font-size: 30px;
      padding: 15px 25px;

      @media screen and (max-width: 1024px) {
        font-size: 25px;
        padding: 10px 20px;
        margin: 10px;
      }

      @media screen and (max-width: 702px) {
        font-size: 22px;
        padding: 5px 5px;
      }
    }

    .router-link-active {
      background-color: $secondary-color;
      color: $primary-color;
      border: 2px solid $primary-color;

      &:focus {
        box-shadow: 0 0 4px 2px $primary-color;
      }
    }
  }
  .headline {
    margin: 0;
    color: $primary-color;
    font-size: 40px;

    @media screen and (max-width: 1024px) {
      font-size: 60px;
    }

    @media screen and (max-width: 702px) {
      font-size: 50px;
    }

    @media screen and (max-width: 502px) {
      font-size: 40px;
    }

    @media screen and (max-width: 502px) {
      font-size: 35px;
    }
  }

  form{
    margin-top: 15px ;
  }

  .inputs {
    display: flex;
    flex-direction: column;
    align-items: center;

    & label {
      font-size: 20px;
      margin-bottom: 5px;

      @media screen and (max-width: 1024px) {
        font-size: 40px;
      }

      @media screen and (max-width: 702px) {
        font-size: 35px;
      }

      @media screen and (max-width: 502px) {
        font-size: 32px;
      }

      @media screen and (max-width: 380px) {
        font-size: 26px;
      }
    }

    .user-info {
      margin: 0;
      padding: 0;
      font-size: 25px;

      @media screen and (max-width: 1024px) {
        font-size: 40px;
      }

      @media screen and (max-width: 702px) {
        font-size: 35px;
      }

      @media screen and (max-width: 502px) {
        font-size: 32px;
      }

      @media screen and (max-width: 380px) {
        font-size: 26px;
      }
    }

    .error {
      color: red;
      font-size: 22px;
      margin: 0;

      @media screen and (max-width: 1024px) {
        font-size: 40px;
      }

      @media screen and (max-width: 702px) {
        font-size: 35px;
      }

      @media screen and (max-width: 702px) {
        font-size: 32px;
      }
    }
  }

  .action-buttons {
    margin: 0 0 20px;
  }

  .link {
    font-size: 25px;
    background-color: $secondary-color;
    padding: 20px;
    margin: 25px;
    border: 2px solid $primary-color;
    border-radius: 30px;
    text-decoration: none;
    color: $primary-color;
    outline: none;
    transition: 1s;

    @media screen and (max-width: 1024px) {
      font-size: 40px;
      padding: 40px;
    }

    @media screen and (max-width: 702px) {
      font-size: 30px;
      padding: 30px;
    }

    @media screen and (max-width: 502px) {
      font-size: 25px;
      padding: 25px;
    }

    @media screen and (max-width: 502px) {
      font-size: 20px;
      padding: 15px;
    }

    &:active {
      transform: scale(0.92);
    }

    &:hover {
      transform: scale(1.05);
    }

    &:focus {
      box-shadow: 0 0 4px 4px $secondary-color;
    }
  }
</style>
