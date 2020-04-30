<template>
  <div class="input">
    <h1 class="input-header">Please enter your city</h1>
    <input id='city-input-field' class="input-field" type="text" :value="city" @change="changeCityName"/>
    <h1 class="service-headline">Please choose weather service:</h1>
    <div class="service-choice">
      <input type="radio" name="serviceName" id="openWeather" v-model="weatherServiceName" value="openWeather"
             @change="changeWeatherService"/>
      <label class="checkbox-label" for="openWeather" @click="changeWeatherService">Open Weather</label>
      <input type="radio" name="serviceName" id="weatherBit" v-model="weatherServiceName" value="weatherBit"
             @change="changeWeatherService"/>
      <label class="checkbox-label" for="weatherBit" @click="changeWeatherService">Weather Bit</label>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DataInput',
    data: function () {
      return {
        cityName: this.props,
        weatherServiceName: this.weatherService
      }
    },
    props: ['city', 'weatherService'],
    methods: {
      changeCityName() {
        this.cityName = document.getElementById('city-input-field').value;
        this.$emit('cityNameChanged', this.cityName)
      },
      changeWeatherService() {
        this.$emit('weatherServiceChanged', this.weatherServiceName);
      },
    }
  }

</script>

<style lang="scss">
  .input {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &-header {
      font-family: Bahnschrift;
      color: #3460A4;
      font-size: 42px;

      @media screen and (max-width: 1024px) {
        font-size: 60px;
        margin: 10px;
      }

      @media screen and (max-width: 702px) {
        font-size: 50px;
      }

      @media screen and (max-width: 502px) {
        font-size: 35px;
      }

      @media screen and (max-width: 380px) {
        font-size: 25px;
      }
    }

    &-field {
      font-size: 36px;
      border: none;
      border-radius: 10px;
      margin-bottom: 20px;
      text-align: center;
      transition: box-shadow 0.4s;
      outline: none;

      @media screen and (max-width: 1024px) {
        font-size: 50px;
      }

      @media screen and (max-width: 702px) {
        font-size: 40px;
      }

      @media screen and (max-width: 502px) {
        font-size: 30px;
      }

      @media screen and (max-width: 380px) {
        font-size: 22px;
        width: 225px;
      }

      &:focus {
        box-shadow: 0 0 4px 4px #fff;
      }
    }
  }

  .service {
    &-headline {
      margin: 0;
      color: #3460A4;
      font-size: 20px;

      @media screen and (max-width: 1024px) {
        font-size: 35px;
      }

      @media screen and (max-width: 702px) {
        font-size: 30px;
      }
      @media screen and (max-width: 502px) {
        font-size: 26px;
      }

      @media screen and (max-width: 380px) {
        font-size: 18px;
      }
    }

    &-choice {
      margin: 5px 15px 5px 15px;
      display: flex;
      flex-direction: row;

      .checkbox-label {
        display: block;
        width: 150px;
        padding: 10px;
        margin: 10px;
        background-color: #3460A4;
        border-radius: 20px;
        font-size: 18px;
        transition: 0.5s;

        @media screen and (max-width: 1024px) {
          font-size: 38px;
          width: 300px;
        }

        @media screen and (max-width: 702px) {
          font-size: 28px;
          width: 200px;
        }

        @media screen and (max-width: 502px) {
          font-size: 24px;
          width: 160px;
          padding: 5px;
        }

        @media screen and (max-width: 380px) {
          font-size: 16px;
          width: 110px;
        }

        &:hover {
          cursor: pointer;
        }
      }
    }
  }

    input[type=radio] {
      display: none;
    }

    input[type=radio]:checked + label {
      background: #fff;
      color: #3460A4;
    }
</style>