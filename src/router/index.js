import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from 'pages/index.vue'
import Other from 'pages/other.vue'
import Wallpaper from 'components/wallpaper.vue'
import Buddha from 'components/buddha.vue'
import Expression from 'components/expression.vue'
import Word from 'components/word.vue'
import Cartoon from 'components/cartoon.vue'
import Idol from 'components/idol.vue'
import Movie from 'components/movie.vue'
import Cindex from 'components/cindex.vue'
import Category from 'components/category.vue'
import Details from 'components/communal/details.vue'
import User from 'components/communal/user.vue'
import Album from 'components/communal/album.vue'
import AlbumList from 'components/communal/album_list.vue'
import Atlas from 'components/communal/atlas.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/index'
  },

  {
    path: '/index',
    name: 'index',
    component: Index,
    children: [{
      path: '/index',
      name: 'cindex',
      component: Cindex
    }, {
      path: '/details/:id',
      name: 'details',
      component: Details
    }]
  },
  {
    path: '/other',
    name: 'other',
    component: Other,
    children: [


      {
        path: '/wallpaper',
        name: 'wallpaper',
        component: Wallpaper,
        children: [{
          path: '/details/:id',
          name: 'details',
          component: Details
        }, ]
      },
      {
        path: '/buddha',
        name: 'buddha',
        component: Buddha
      },
      {
        path: '/expression',
        name: 'expression',
        component: Expression
      },
      {
        path: '/word',
        name: 'word',
        component: Word
      },
      {
        path: '/cartoon',
        name: 'cartoon',
        component: Cartoon
      },
      {
        path: '/idol',
        name: 'idol',
        component: Idol
      },
      {
        path: '/movie',
        name: 'movie',
        component: Movie
      },

      {
        path: '/category',
        name: 'category',
        component: Category
      },
      {
        path: '/details/:id',
        name: 'details',
        component: Details
      },
      {
        path: '/user/:id',
        name: 'user',
        component: User
      },
      {
        path: '/album/:id',
        name: 'album',
        component: Album,
        
      },
      {
        path: '/atlas/:id',
        name: 'atlas',
        component: Atlas
      },
      {
        path: '/albumList/:id',
          name: 'albumList',
          component: AlbumList,
      },


    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// const User = {
//   template: '...',
//   watch: {
//     '$route' (to, from) {
//       // 对路由变化作出响应...
//     }
//   }
// }
export default router