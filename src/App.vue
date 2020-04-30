<template>
    <div>
        <router-view>
        </router-view>
        <DataInput id="input"
                   :city="city"
                   :weather-service="weatherService"
                   @weatherServiceChanged="weatherService=$event"
                   @cityNameChanged="city = $event"/>
        <ShowWeather :city="city" :weatherService="weatherService"/>
    </div>
</template>

<script>
    import ShowWeather from "./components/ShowWeather";
    import DataInput from "./components/DataInput";

    export default {
        components: {ShowWeather, DataInput},
        data: function () {
            return {
                city: 'Minsk',
                weatherService: 'openWeather',
            }
        },
    }
</script>

<style>
    body {
        background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
        display: flex;
        justify-content: center;
        height: 100vh;
        margin: 0;
        text-align: center;
        font-family: Bahnschrift;
        color: #fff;
    }
</style>
