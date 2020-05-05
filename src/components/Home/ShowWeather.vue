<template>
  <div>
    <input class="submit-button" type="submit" value="Show Forecast" @click="showForecast"/>
    <h1 v-if="error" class="error">There is no city name entered or city name incorrect</h1>
    <div class="results" v-if='dataArrived && !error'>
      <h1 class="city-name">{{this.city}}</h1>
      <h2 class="info-line" v-for="(value, key, index) in results" :key="index">{{key}} : {{value}}</h2>
      <h3 v-if="resultsFromCache" class="cache-info">Results shown from cache. Same request was made less than 2 hours ago</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowWeather',
  props: ['city', 'weatherService'],
  data () {
    return {
      results: {},
      dataArrived: false,
      timeStamp: undefined,
      usedService: this.weatherService,
      error: false,
      resultsFromCache: false
    }
  },
  methods: {
    showOpenWeatherForecast () {
      if (this.checkResultsInCache()) {
        this.showResultsFromCache()
      } else {
        this.resultsFromCache = false
        const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + `${this.city}` + '&APPID=1d5b2747b9b459a833cca4a6207e9467'
        fetch(url).then(response => {
          if (response.status === 204 || response.status === 404) {
            this.error = true
          } else {
            response.json().then(result => {
              const forecastData = {
                Country: result.sys.country,
                'Weather Condition': result.weather[0].main,
                Temperature: this.convertKalvinToCelsius(result.main.temp),
                'Feels Like': this.convertKalvinToCelsius(result.main.feels_like),
                Humidity: result.main.humidity + ' %',
                'Wind Speed': result.wind.speed + ' m/s'
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
    showWeatherBitForecast () {
      if (this.checkResultsInCache()) {
        this.showResultsFromCache()
      } else {
        this.resultsFromCache = false
        const url = 'https://api.weatherbit.io/v2.0/current?city=' + `${this.city}` + '&key=0d3fd477f5b24855b51d98148f284919'
        fetch(url).then(response => {
          if (response.status === 204 || response.status === 404) {
            this.error = true
          } else {
            response.json().then(result => {
              const forecastData = {
                Country: result.data[0].country_code,
                'Weather Condition': result.data[0].weather.description,
                Temperature: Math.round(result.data[0].temp) + String.fromCharCode(176) + ' C',
                'Feels Like': Math.round(result.data[0].app_temp) + String.fromCharCode(176) + ' C',
                Humidity: result.data[0].rh + ' %',
                'Wind Speed': Math.round(result.data[0].wind_spd) + ' m/s'
              }
              this.results = forecastData
              this.dataArrived = true
              if (!this.checkResultsInCache()) {
                this.saveResultsInCache(forecastData)
              }
            }
            )
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
      if (this.weatherService === 'openWeather') {
        this.usedService = 'Open Weather'
        this.showOpenWeatherForecast()
      } else {
        this.usedService = 'Weather Bit'
        this.showWeatherBitForecast()
      }
    },
    convertKalvinToCelsius (degreesKalvin) {
      const degreesCelsius = Math.floor(degreesKalvin - 273.15) + String.fromCharCode(176) + ' C'
      return degreesCelsius
    },
    checkResultsInCache () {
      if (localStorage.city === undefined) {
        return false
      } else {
        return localStorage.city === this.city && localStorage.usedService === this.usedService && localStorage.timeStamp - this.timeStamp < 3600000
      }
    },
    saveResultsInCache (forecastData) {
      console.log('Записаны новые данные')
      localStorage.forecast = JSON.stringify(forecastData)
      localStorage.usedService = this.usedService
      localStorage.timeStamp = this.timeStamp
      localStorage.city = this.city
    },
    showResultsFromCache () {
      this.dataArrived = true
      this.results = JSON.parse(localStorage.forecast)
      this.resultsFromCache = true
    }
  }
}
</script>

<style lang="scss">
  .submit-button {
    border: none;
    border-radius: 20px;
    background-color: $primary-color;
    width: 250px;
    height: 50px;
    font-family: Bahnschrift;
    font-size: 26px;
    color: $secondary-color;
    transition: 0.5s;
    outline: none;

    &:hover {
      cursor: pointer;
    }

    &:active {
      transform: scale(0.95);
    }

    &:focus {
      box-shadow: 0 0 4px 4px $secondary-color;
    }

    @media screen and (max-width: 1024px) {
      font-size: 40px;
      width: 400px;
      height: 75px;
    }
    @media screen and (max-width: 702px) {
      font-size: 30px;
      width: 250px;
      height: 60px;
    }

    @media screen and (max-width: 502px) {
      font-size: 25px;
      width: 200px;
      height: 45px;
    }

    @media screen and (max-width: 380px) {
      font-size: 18px;
      width: 150px;
      height: 35px;
    }
  }

  .results {
    margin: 15px;
    border: 2px solid $primary-color;
    border-radius: 10px;
    background-color: $secondary-color;
    color: $tertiary-color;

    @media screen and (max-width: 1024px) {
      border-radius: 40px;
    }

    @media screen and (max-width: 702px) {
      border-radius: 30px;
    }

    .city-name {
      font-size: 32px;
      margin: 10px 0 5px 0;

      @media screen and (max-width: 1024px) {
        font-size: 45px;
      }

      @media screen and (max-width: 702px) {
        font-size: 35px;
      }

      @media screen and (max-width: 380px) {
        margin: 5px;
        font-size: 25px;
      }
    }

    .info-line {
      margin: 0;
      padding: 5px;
      font-size: 16px;

      @media screen and (max-width: 1024px) {
        font-size: 30px;
        padding: 0 0 5px 0;
      }
      @media screen and (max-width: 702px) {
        font-size: 28px;
        padding: 2px;
      }

      @media screen and (max-width: 380px) {
        font-size: 16px;
        padding: 2px;
      }
    }

    .cache-info {
      font-size: 12px;
      padding: 0 15px;
      margin: 5px;
      color: $primary-color;

      @media screen and (max-width: 1024px) {
        font-size: 18px;
      }

      @media screen and (max-width: 380px) {
        font-size: 12px;
      }
    }
  }

  .error {
    font-size: 26px;
    @media screen and (max-width: 502px) {
      font-size: 25px;
    }

    @media screen and (max-width: 380px) {
      font-size: 20px;
    }
  }
</style>
