<template>
  <div class="flex flex-wrap justify-center items-center py-4">
    <h2 class="w-full text-center text-2xl font-bold">Movie List</h2>
    <div
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 rounded-lg overflow-hidden shadow-lg p-4"
    >
      <router-link
        v-for="movie in movies"
        :key="movie.imdbID"
        :to="{ name: 'movie-detail', params: { id: movie.imdbID } }"
      >
        <div class="bg-slate-100 p-1">
          <img :src="movie.Poster" alt="Movie Poster" class="w-full" />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{{ movie.Title }}</div>
          </div>
        </div>
      </router-link>
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

    return {
      movies
    }
  }
})
</script>
