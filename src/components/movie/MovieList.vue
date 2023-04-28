<template>
  <div class="flex flex-wrap justify-center items-center py-4">
    <h2 class="w-full text-center text-2xl font-bold">Movie List</h2>
    <div
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 rounded-lg overflow-hidden shadow-lg p-4"
    >
      <!-- <router-link :to="{ name: 'movie-detail', params: { imdbID: movie.imdbID } }"> -->
      <div v-for="movie in movies" :key="movie.imdbID" class="bg-slate-100 p-1">
        <img :src="movie.Poster" alt="Movie Poster" class="w-full" />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{{ movie.Title }}</div>
          <!-- <p class="text-gray-700 text-base">{{ movie.Year }}</p> -->
        </div>
      </div>
      <!-- </router-link> -->
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, computed } from 'vue'
import { useMoviesStore } from '@/stores/movie'

export default defineComponent({
  name: 'MovieList',
  setup() {
    const moviesStore = useMoviesStore()

    const movies = computed(() => moviesStore.movies)

    onMounted(() => {
      moviesStore.fetchMovies()
    })

    console.log('moviesStore', moviesStore)

    return {
      movies
    }
  }
})
</script>
