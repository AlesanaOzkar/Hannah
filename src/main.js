import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'font-awesome/css/font-awesome.css'
//Importa VuePaginate
import VuePaginate from 'vue-paginate'
//Bootstrap
import BootstrapVue from 'bootstrap-vue'

import Datetime from 'vue-datetime'
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'

Vue.use(Datetime)
Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.use(VuePaginate)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
