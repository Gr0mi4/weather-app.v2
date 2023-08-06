const ru = {
  auth: {
    hello: 'Привет! Что бы узнать погоду, вы должны быть авторизованы. Пожалуйста зарегестрируйтесь либо войдите в свой аккаунт, чтобы использовать Weather-app.v2',
    signIn: 'Войти',
    register: 'Зарегистрироваться'
  },
  signIn: {
    emailEnter: 'Пожалуйста введите свой электронный адрес:',
    emailError: 'Электронный адрес введен неправильно',
    emailPlaceholder: 'чтонибудь@вашдомен.com',
    emailEmpty: 'Поле для ввода электронного адреса не заполнено',
    passwordEnter: 'Пожалуйста введите свой пароль:',
    passwordError: 'Введнный пароль содержит менее шести символов',
    passwordPlaceholder: 'Не менее шести(6) символов',
    passwordEmpty: 'Поле для ввода пароля не заполнено',
    userUnauthorised: 'Вход не удался. Причина: ',
    signIn: 'Войти'
  },
  register: {
    emailEnter: 'Пожалуйста введите свой электронный адрес:',
    emailError: 'Электронный адрес введен неправильно',
    emailPlaceholder: 'чтонибудь@вашдомен.com',
    emailEmpty: 'Поле для ввода электронного адреса не заполнено',
    passwordEnter: 'Пожалуйста введите свой пароль:',
    passwordError: 'Введнный пароль содержит менее шести символов',
    passwordPlaceholder: 'Не менее шести(6) символов',
    passwordEmpty: 'Поле для ввода пароля не заполнено',
    showAdditionalParams: 'Показать дополнгительные поля',
    hideAdditionalParams: 'Спрятать дополнительные поля',
    additionalParamsError: 'Разрешены только буквы',
    firstName: 'Имя',
    city: 'Город',
    country: 'Страна',
    birthDate: 'Дата рождения',
    birthDateError: 'Введена неверная дата',
    register: 'Зарегестрироваться',
    registerFailed: 'Регистрация не удалась. Причина: '
  },
  changeUserWindow: {
    youSignedInAs: 'Вы вошли как: ',
    home: 'Главная',
    profile: 'Профиль',
    signOut: 'Выйти',
    signOutFailed: 'Выйти не удалось'
  },
  dataInput: {
    enterCity: 'Привет {userName}! Пожалуйста введите свой город',
    enterCityNoUser: 'Пожалуйста введите свой город',
    chooseWeatherService: 'Выберите сервис для предоставления прогноза:'
  },
  showWeather: {
    showForecast: 'Показать прогноз',
    cityIncorrect: 'Название города не введено, либо такого города не существует',
    resultsFromCache: 'Результаты показаны из Кэш памяти. Такой же запрос бы сделан менее 2х часов назад',
    country: 'Страна',
    weatherCondition: 'Погодные условия',
    temperature: 'Температура',
    feelsLike: 'Ощущается как',
    humidity: 'Влажность',
    windSpeed: 'Скорость ветра'
  },
  profile: {
    userInfo: 'Пользовательская информация:',
    userInfoError: 'Простите, не найдено никакой информации о пользователе',
    prompt: 'Для изменения пользовательских данных просто нажмите на те данные которые хотите изменить!',
    userAge: 'Пользователю на данный момент {age} лет'
  },
  asideMenu: {
    today: 'Сегодня',
    tomorrow: 'Завтра',
    threeDays: '3 дня',
    sevenDays: '7 дней',
    signOut: 'Выйти',
    profile: 'Профиль'
  }
}

export default ru
