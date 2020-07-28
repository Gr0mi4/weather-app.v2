<template>
  <div class="languageMenu hidden" id="language-menu">
    <div class="languages">
      <h1 class="headline">Change Language:</h1>
      <button class="language button" @click="changeLanguage">En</button>
      <button class="language button" @click="changeLanguage">Ru</button>
    </div>
    <button class="show-hide button" @click="showHideLanguages"></button>
  </div>
</template>

<script>
export default {
  name: 'LanguageChange',

  created () {
    if (navigator.languages[0].substr(0, 2) === !this.$i18n.locale) {
      this.languageMenuHidden = false
    }
  },

  data () {
    return {
      languageMenuHidden: true
    }
  },

  methods: {
    changeLanguage () {
      this.$i18n.locale = `${event.currentTarget.innerText.toLowerCase()}`
    },
    showHideLanguages () {
      if (this.languageMenuHidden) {
        document.getElementById('language-menu').classList.remove('hidden')
        this.languageMenuHidden = false
      } else {
        document.getElementById('language-menu').classList.add('hidden')
        this.languageMenuHidden = true
      }
    }
  }
}
</script>

<style lang="scss">
  .languageMenu {
    background-color: $secondary-color;
    width: 18%;
    border-radius: 0 0 10px 10px;
    z-index: 1;
    transition: 0.5s;
    padding: 0.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    @include bigPhone {
      width: 23%;
    }

    @include middlePhone {
      width: 28%;
    }

    @include smallPhone {
      width: 40%;
    }
    .languages {
      flex-direction: column;

      .headline {
        font-size: 0.8rem;
        margin: 0;
        padding: 0;

        @include middlePhone {
          font-size: 0.6rem;
        }
      }

      .language.button {
        font-size: 1rem;
        padding: 0 0.5rem;
        border-radius: 1rem;
        margin: 0 0.2rem;

        @include bigPhone {
          font-size: 0.8rem;
        }
      }
    }

    .show-hide.button {
      border-radius: 0;
      padding: 0;
      margin: 0.3rem 0 0.3rem 0;
      border-width: 0 9px 10px 9px;
      background-color: $secondary-color;
      border-color: $primary-color transparent;
      box-shadow: none;

      @include middlePhone {
        border-width: 0 4.5px 5px 4.5px;
      }
    }

    &.hidden {
      transform: translateY(-42px);

      & .show-hide.button {
        transform: rotate(180deg);
      }
    }
  }
</style>
