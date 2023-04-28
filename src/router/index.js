import { createRouter, createWebHistory } from 'vue-router'
// import MovieList from '../components/movie/MovieList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'movie-list',
      // component: MovieList
      component: () => import('../components/movie/MovieList.vue')
    }
  ]
})

export default router
