import Vue from 'vue';
import App from './App.vue';
import GSignInButton from 'vue-google-signin-button';
import 'bootstrap/dist/css/bootstrap.css';

Vue.use(GSignInButton);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
