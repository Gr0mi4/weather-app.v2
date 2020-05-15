<template>
  <div>
    <ChangeUserWindow/>
    <div class="user-info">
    <h1>User Info:</h1>
    <table class="data-table" id="data=table">
      <tr v-for="(value, key, index) in this.$store.state.userAdditionalInfo" class="data-list" :key="index">
        <td>{{key}} :</td>
        <td @click="changeFieldValue"> {{value}}</td>
      </tr>
    </table>
    <h1 v-if="this.$store.state.userAdditionalInfo===null">Sorry, no user information provided</h1>
    </div>
  </div>
</template>

<script>
import ChangeUserWindow from './Home/ChangeUserWindow'

export default {
  name: 'Profile',
  components: { ChangeUserWindow },
  methods: {
    changeFieldValue () {
      let propertyName = event.currentTarget.previousSibling.innerText
      propertyName = propertyName.replace(/ :/g, '')
      propertyName = propertyName.replace(/^[A-Z]/g, u => u.toLowerCase())
      const inputField = document.createElement('input')
      inputField.classList.add('input-field')
      inputField.id = 'input-field'
      inputField.value = event.currentTarget.innerText
      event.currentTarget.replaceWith(inputField)
      inputField.onblur = () => {
        this.$store.dispatch('changeUserData', {
          property: propertyName,
          value: inputField.value
        })
        const newItem = document.createElement('td')
        newItem.innerText = inputField.value
        inputField.replaceWith(newItem)
      }
    }
  }
}
</script>

<style lang="scss">
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $secondary-color;
    color: $primary-color;
    max-width: 70%;
    margin: 20px auto;
    border-radius: 40px;
    padding: 0 0 20px 0;

      & .data-list {
        display: flex;
        flex-direction: row;
        align-items: center;

        & td {
          list-style: none;
          font-size: 24px;
          text-transform: capitalize;
        }

        & td:first-child {
          text-align: left;
          margin: 0 auto;
          min-width: 140px;
        }

        & td:nth-child(2n) {
          text-align: center;
          margin: 0 auto;
          min-width: 140px;
        }

        .button {
          font-size: 24px;
          padding: 5px;
          margin: 0;
          min-width: 140px;
          max-width: 250px;
        }

        .input-field {
          border: 1px solid $primary-color;
          font-size: 24px;
          max-width: 140px;
          min-width: 100px;
          margin: 0 auto;
        }
      }
    }
</style>
