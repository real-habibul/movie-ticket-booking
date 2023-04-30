import { defineStore } from 'pinia'
import axios from 'axios'

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: [],
    movieById: []
  }),

  actions: {
    async fetchMovies() {
      try {
        const response = await fetch('https://www.omdbapi.com/?s=Guardians&apikey=31ccf49')
        const data = await response.json()
        if (data.Search) {
          this.movies = data.Search.slice(0, 10)
        }
      } catch (error) {
        console.error(error)
      }
    },

    async fetchMovieById(id) {
      try {
        const response = await axios.get('https://www.omdbapi.com/', {
          params: {
            i: id.value,
            apikey: '31ccf49'
          }
        })
        this.movieById = response.data
      } catch (error) {
        console.error(error)
      }
    }
  }
})
