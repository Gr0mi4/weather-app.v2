<template>
  <div>
    <DataInput/>
    <ShowWeather/>
  </div>
</template>

<script>
import ShowWeather from '../Home/ShowWeather'
import DataInput from '../Home/DataInput'

export default {
  name: 'WeatherToday',

  components: { ShowWeather, DataInput }
}
</script>

<style scoped>

</style>
