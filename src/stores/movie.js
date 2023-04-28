import { defineStore } from 'pinia'

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: []
  }),

  actions: {
    async fetchMovies() {
      const response = await fetch('https://www.omdbapi.com/?s=batman&apikey=31ccf49')
      const data = await response.json()
      console.log('data', data)
      if (data.Search) {
        this.movies = data.Search.slice(0, 10)
      }
    }
  }
})
