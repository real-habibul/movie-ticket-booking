import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'movie-list',
      component: () => import('../components/movie/MovieList.vue')
    },
    {
      path: '/movie-detail/:id',
      name: 'movie-detail',
      component: () => import('../components/movie/MovieDetail.vue')
    }
  ]
})

export default router
