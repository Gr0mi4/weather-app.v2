import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyBWUO9Z7ZVDUC4xX7_QPQIp4KJnjqQ-Rno',
  authDomain: 'weather-app-v2-962a1.firebaseapp.com',
  databaseURL: 'https://weather-app-v2-962a1.firebaseio.com',
  projectId: 'weather-app-v2-962a1',
  storageBucket: 'weather-app-v2-962a1.appspot.com',
  messagingSenderId: '250942331411',
  appId: '1:250942331411:web:376e22413eb8a58a587de6',
  measurementId: 'G-FTB7JPHQKR'
}

const database = firebase.initializeApp(firebaseConfig)

export default database
