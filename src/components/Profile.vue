<template>
  <div>
    <div class="user-info" id="user-info">
    <h1 class="table-header headline">{{$t('profile.userInfo')}}</h1>
    <table class="data-table" id="data-table">
      <tr
         v-for="(value, key, index) in $store.state.userAdditionalInfo"
         class="data-list"
         :key="index"
      >
        <td>{{key}} :</td>
        <td @click="changeFieldValue"> {{value}}</td>
      </tr>
    </table>
    <h1 v-if="$store.state.userAdditionalInfo===null">{{$t('profile.userInfoError')}}</h1>
    </div>
    <h3 class="headline">{{$t('profile.prompt')}}</h3>
  </div>
</template>

<script>
export default {
  name: 'Profile',

  data () {
    return {
      infoIsChanging: false
    }
  },

  methods: {
    changeFieldValue () {
      if (this.infoIsChanging === false) {
        this.infoIsChanging = true
        let propertyName = event.currentTarget.previousSibling.innerText
        propertyName = propertyName.replace(/ :/g, '')
        propertyName = propertyName.replace(/^[A-Z]/g, u => u.toLowerCase())
        const inputField = document.createElement('input')
        inputField.classList.add('input-field', 'temporary')
        inputField.value = event.currentTarget.innerText
        inputField.maxLength = 25
        event.currentTarget.append(inputField)
        inputField.focus()
        const sendNewValue = () => {
          this.$store.dispatch('changeUserData', {
            property: propertyName,
            value: inputField.value
          })
          inputField.remove()
          this.infoIsChanging = false
        }
        // inputField.addEventListener('keydown', event => event.key === 'Enter' ? sendNewValue() : null)
        inputField.addEventListener('blur', sendNewValue)
      }
    }
  }
}
</script>

<style lang="scss">
  .user-info {
    & .headline {
      margin-top: 20px;
      padding: 0;
    }

    .data-table {
      font-size: 2rem;
      margin: 15px auto;
      padding: 2.5rem;
      border: 2px solid $primary-color;
      border-radius: 2rem;
      background-color: $secondary-color;
      color: $tertiary-color;
      max-width: 80%;
      text-transform: capitalize;

      @include bigPhone {
        font-size: 1rem;
      }

      @include middlePhone {
        font-size: 0.8rem;
        padding: 0.5rem;
      }

      & td {
        position: relative;
        transition: border-color 0.4s;
        padding: 0 0.5rem;
        border: 2px solid $secondary-color;
        border-radius: 0.5rem;
      }

      & td:nth-child(2n) {
        &:hover {
          cursor: text;
          border-color: $primary-color
        }
      }

      & .temporary {
        position: absolute;
        padding: 0.3rem;
        top: 30px;
        left: 10px;
        z-index: 10;
        border: 1px solid $primary-color;
        border-radius: 0.5rem;
        outline: none;
        font-size: 1.5rem;
        text-align: center;
      }
    }

    .overlay {
      width: 100%;
      height: 100%;
      position: fixed;
      display: flex;
      top: 0;
      z-index: 5;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
</style>
