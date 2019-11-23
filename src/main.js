import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import '../node_modules/swiper/css/swiper.min.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.config.productionTip = false
import 'assets/reset.css'



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
