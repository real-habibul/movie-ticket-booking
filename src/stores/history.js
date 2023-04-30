import { defineStore } from 'pinia'

export const useHistoryStore = defineStore('history', {
  state: () => ({
    history: []
  }),
  actions: {
    async initHistory() {
      const keys = Object.keys(localStorage)
        const movieDetails = []
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const movie = await this.fetchMovieById(key)
            const seats = JSON.parse(localStorage.getItem(key))

            movieDetails.push({
                movie,
                seats
            })
        }
      this.history = movieDetails
      console.log(this.history)
    },

    async fetchMovieById(id) {
      try {
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=31ccf49`)
        const data = await response.json()
        return data
      } catch (error) {
        console.error(error)
      }
    }
  }
})
