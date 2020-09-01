import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'
Vue.use(firebase)

var firebaseConfig = {
  apiKey: "AIzaSyBVj4fo66q2DPnlOJWnw3wuDUbE5hLQTNA",
  authDomain: "proyecto-init-5807d.firebaseapp.com",
  databaseURL: "https://proyecto-init-5807d.firebaseio.com",
  projectId: "proyecto-init-5807d",
  storageBucket: "proyecto-init-5807d.appspot.com",
  messagingSenderId: "51213856978",
  appId: "1:51213856978:web:9db9dc49d9449a7cf73d0b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(){
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
})




