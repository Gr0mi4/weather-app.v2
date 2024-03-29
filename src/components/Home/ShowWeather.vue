<template>
  <div class="show-weather">
    <input
       class="submit-button button"
       type="submit"
       :value="$t('showWeather.showForecast')"
       @click="showForecast"
    />
    <h1 v-if="error" class="error">{{$t('showWeather.cityIncorrect')}}</h1>
    <div class="results" v-if='dataArrived && !error'>
      <h1 class="city-name">{{this.city}}</h1>
      <h2
         class="info-line"
         v-for="(value, key, index) in results"
         :key="index"
      >{{key}} : {{value}}</h2>
      <h3 v-if="resultsFromCache" class="cache-info">{{$t('showWeather.resultsFromCache')}}</h3>
    </div>
  </div>
</template>

<script>
import { OPEN_WEATHER_URL, OPEN_WEATHER_TODAY_FORECAST_API, OPEN_WEATHER_APP_ID } from '../../constants'
import { mapActions } from 'vuex'

export default {
  name: 'ShowWeather',

  created () {
    this.getYourLocation().then(() => {
      this.showOpenWeatherForecast()
    })
  },

  data () {
    return {
      results: {},
      dataArrived: false,
      timeStamp: undefined,
      error: false,
      usedService: null,
      resultsFromCache: false
    }
  },

  methods: {
    ...mapActions(['getYourLocation']),

    showOpenWeatherForecast () {
      if (this.checkResultsInCache()) {
        this.showResultsFromCache()
      } else {
        this.resultsFromCache = false
        const url = OPEN_WEATHER_URL + OPEN_WEATHER_TODAY_FORECAST_API + `${this.city}` + OPEN_WEATHER_APP_ID
        fetch(url).then(response => {
          if (response.status === 204 || response.status === 404) {
            this.error = true
          } else {
            response.json().then(result => {
              const forecastData = {
                [this.$t('showWeather.country')]: result.sys.country,
                [this.$t('showWeather.weatherCondition')]: result.weather[0].main,
                [this.$t('showWeather.temperature')]: this.convertKalvinToCelsius(result.main.temp),
                [this.$t('showWeather.feelsLike')]: this.convertKalvinToCelsius(result.main.feels_like),
                [this.$t('showWeather.humidity')]: result.main.humidity + ' %',
                [this.$t('showWeather.windSpeed')]: result.wind.speed + ' m/s'
              }
              this.results = forecastData
              this.dataArrived = true
              this.saveResultsInCache(forecastData)
            })
          }
        }
        )
      }
    },
    showForecast () {
      if (this.city === '') {
        this.error = true
        return
      }
      this.error = false
      this.timeStamp = Date.now()
      this.usedService = 'Open Weather'
      this.showOpenWeatherForecast()
    },
    convertKalvinToCelsius (degreesKalvin) {
      return Math.floor(degreesKalvin - 273.15) + String.fromCharCode(176) + ' C'
    },
    checkResultsInCache () {
      if (localStorage.city === undefined) {
        return false
      } else {
        return localStorage.city === this.city &&
               localStorage.usedService === this.usedService &&
               localStorage.timeStamp - this.timeStamp < 3600000 &&
               localStorage.lang === this.$i18n.locale
      }
    },
    saveResultsInCache (forecastData) {
      console.log('Записаны новые данные')
      localStorage.forecast = JSON.stringify(forecastData)
      localStorage.usedService = this.usedService
      localStorage.timeStamp = this.timeStamp
      localStorage.city = this.city
      localStorage.lang = this.$i18n.locale
    },
    showResultsFromCache () {
      this.dataArrived = true
      this.results = JSON.parse(localStorage.forecast)
      this.resultsFromCache = true
    }
  },

  computed: {
    city () {
      return this.$store.state.city
    }
  }
}
</script>

<style lang="scss">
  .results {
    margin: 15px auto;
    border: 2px solid $primary-color;
    border-radius: 10px;
    background-color: $secondary-color;
    color: $tertiary-color;
    max-width: 80%;
    min-width: 50vw;

    @include bigPhone {
      font-size: 1rem;
    }

    @include middlePhone {
      font-size: 0.8rem;
      padding: 0 0.5rem;
    }

    .info-line {
      margin: 0.5rem;
    }
  }
</style>
