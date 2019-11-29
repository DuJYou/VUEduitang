import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Movie from '../views/Movie.vue'
// import MovieAdd from '../views/MovieAdd.vue'
Vue.use(VueRouter)
const routes = [{
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },

  {
    path: '/Movie',
    name: 'Movie',
    component: Movie,
   
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router