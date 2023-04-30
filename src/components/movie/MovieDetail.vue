<template>
  <div class="movie-detail relative">
    <div class="flex items-center justify-center pt-4">
      <h2 class="text-2xl font-bold ml-2">Movie Detail</h2>
    </div>
    <div class="flex flex-col md:flex-row justify-start items-start">
      <span class="absolute top-5 left-2">
        <IconBack class="h-7 w-7" />
      </span>
      <div class="flex-grow px-2 py-4 sm:flex">
        <img
          :src="moviesById.Poster"
          alt="Movie Poster"
          class="w-full sm:object-contain"
        />
        <div class="sm:pl-4">
          <div class="font-bold text-xl mb-2">{{ moviesById.Title }}</div>
          <p class="text-gray-700 text-base">{{ moviesById.Plot }}</p>
          <div class="flex w-full justify-center md:justify-start pt-2">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              @click="goToSelectSeat()"
              >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, computed } from 'vue'
import { useMoviesStore } from '@/stores/movie'
import { useRoute } from 'vue-router'

import IconBack from '@/components/icon/IconBack.vue'

export default defineComponent({
  name: 'MovieDetail',
  setup() {
    const moviesStore = useMoviesStore()
    const moviesById = computed(() => moviesStore.movieById)

    const route = useRoute()
    const imdbID = computed(() => route.params.id)

    onMounted(() => {
      moviesStore.fetchMovieById(imdbID)
    })

    return {
      moviesById,
      imdbID
    }
  },
  components: {
    IconBack
  },
  methods: {
    goToSelectSeat() {
      this.$router.push({
        name: 'select-seat',
        params: {
          id: this.imdbID,
        }
      })
    }
  }
})
</script>
