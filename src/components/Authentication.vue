<template>
  <div class="authentication">
    <div class="authorization-choice">
      <h3 class="date">{{ $d(new Date()) }}</h3>
      <h1 class="headline">{{ $t('auth.hello')}}</h1>
      <router-link
         to="/signIn"
         class="button"
         replace
      >{{ $t('auth.signIn')}}</router-link>
      <router-link
         to="/register"
         class="button"
         replace
      >{{ $t('auth.register')}}</router-link>
    </div>
    <language-change/>
    <router-view></router-view>
  </div>
</template>

<script>
import LanguageChange from './Home/ChangeUserWindow/LanguageChange'
export default {
  name: 'Authentication',

  components: { LanguageChange }
}
</script>

<style lang="scss">
  .authentication {
    display: flex;
    flex-direction: column;
    align-items: center;

    .authorization-choice {
      padding: 0 0 20px 0;
      background-color: $secondary-color;
      width: 100vw;
      z-index: 10;

      & .date {
        color: $primary-color;
        margin: 0.5rem 0 0 0;
        font-size: 1rem;
      }

      & .headline {
        margin-bottom: 10px;
      }
    }
  }
</style>
