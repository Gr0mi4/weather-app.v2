<template>
  <div class="inputs">
    <h1
       v-if='$store.state.userAdditionalInfo===null'
       class="input-header headline">{{$t('dataInput.enterCityNoUser')}}</h1>
    <h1
       v-if='$store.state.userAdditionalInfo'
       class="input-header headline"
    >{{$t('dataInput.enterCity', { userName: $store.getters.userName })}}</h1>
    <input
       id='city-input-field'
       class="input-field"
       type="text"
       :value="$store.state.city"
       @change="changeCityName"
    />
    <h1 class="service-headline headline">{{$t('dataInput.chooseWeatherService')}}</h1>
  </div>
</template>

<script>
export default {
  name: 'DataInput',

  data () {
    return {
      weatherServiceName: 'openWeather'
    }
  },

  methods: {
    changeCityName () {
      this.$store.commit('changeCityName', document.getElementById('city-input-field').value)
    }
  }
}
</script>

<style lang="scss">
  .service-choice {
    margin: 10px;
    input[type=radio] {
      display: none;
    }

    input[type=radio]:checked + label {
      background-color: $secondary-color;
      color: $primary-color;
    }
  }
</style>
