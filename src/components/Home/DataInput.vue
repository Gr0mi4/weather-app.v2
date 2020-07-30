<template>
  <div class="inputs">
    <h1
       v-if='$store.state.userAdditionalInfo===null'
       class="input-header headline">{{$t('dataInput.enterCityNoUser')}}</h1>
    <h1
       v-if='$store.state.userAdditionalInfo'
       class="input-header headline"
    >{{$t('dataInput.enterCity', { userName: $store.getters.userName })}}</h1>
    <h1>New stuff here!!!</h1>
    <input
       id='city-input-field'
       class="input-field"
       type="text"
       :value="$store.state.city"
       @change="changeCityName"
    />
    <h1 class="service-headline headline">{{$t('dataInput.chooseWeatherService')}}</h1>
    <div class="service-choice">
      <input
         type="radio"
         name="serviceName"
         id="openWeather"
         value="openWeather"
         v-model="weatherServiceName"
         @change="changeWeatherService"
      />
      <label
         class="checkbox-label button"
         for="openWeather"
         @click="changeWeatherService"
      >Open Weather</label>
      <input
         type="radio"
         name="serviceName"
         id="weatherBit"
         value="weatherBit"
         v-model="weatherServiceName"
         @change="changeWeatherService"/>
      <label
         class="checkbox-label button"
         for="weatherBit"
         @click="changeWeatherService"
      >Weather Bit</label>
    </div>
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
    },
    changeWeatherService () {
      this.$store.commit('changeWeatherService', this.weatherServiceName)
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
