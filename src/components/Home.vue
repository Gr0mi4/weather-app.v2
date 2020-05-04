<template>
  <div>
    <ChangeUserWindow/>
    <DataInput id="input"
               :city="city"
               :weather-service="weatherService"
               @weatherServiceChanged="weatherService=$event"
               @cityNameChanged="city = $event"/>
    <ShowWeather :city="city" :weatherService="weatherService"/>
  </div>
</template>

<script>
  import DataInput from "./Home/DataInput";
  import ShowWeather from "./Home/ShowWeather";
  import ChangeUserWindow from "./Home/ChangeUserWindow";

  export default {
    name: "Home",
    components: {ChangeUserWindow, ShowWeather, DataInput},
    data: function () {
      return {
        city: 'Minsk',
        weatherService: 'openWeather',
      }
    }
  }
</script>

<style>

</style>