import Vue from 'vue'
import App from './App.vue'
import bProgress from 'bootstrap-vue/es/components/progress/progress';
import bFormSelect from 'bootstrap-vue/es/components/form-select/form-select';

Vue.component('b-form-select', bFormSelect);
Vue.component('b-progress', bProgress);



import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import AppMessage from './components/message.vue';
import AppStartScreen from './components/startScreen.vue';
import AppResultScreen from './components/resultScreen.vue';
import AppQuession from './components/quession.vue';



Vue.component('AppMessage', AppMessage);
Vue.component('AppQuession', AppQuession);
Vue.component('AppStartScreen', AppStartScreen);
Vue.component('AppResultScreen', AppResultScreen);

new Vue({
  el: '#app',
  render: h => h(App)
})
