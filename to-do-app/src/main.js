import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import App from './App.vue'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import FullCalendar from 'vue-full-calendar'

Vue.use(FullCalendar)


Vue.config.productionTip = false
Vue.use(BootstrapVue);
new Vue({
  render: h => h(App)
}).$mount('#app')
