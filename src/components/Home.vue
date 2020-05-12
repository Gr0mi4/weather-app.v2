<template>
  <div>
    <ChangeUserWindow/>
    <DataInput id="input"/>
    <ShowWeather/>
  </div>
</template>

<script>
import DataInput from './Home/DataInput'
import ShowWeather from './Home/ShowWeather'
import ChangeUserWindow from './Home/ChangeUserWindow'

export default {
  name: 'Home',
  components: { ShowWeather, DataInput, ChangeUserWindow }
}
</script>
