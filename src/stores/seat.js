import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import axios from 'axios'

export const useSeatStore = defineStore('seat', {
  state: () => ({
    seats: []
  }),
  actions: {
    generateSeats() {
      this.seats = []
      const rows = ['A', 'B', 'C']
      const seatsPerRow = 5
      for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < seatsPerRow; j++) {
          let seat = {
            id: `${rows[i]}${j + 1}`,
            isBooked: false,
            isSelected: false
          }
          this.seats.push(seat)
        }
      }
    },

    initSeats() {
      this.generateSeats()
      this.fetchSeats()
    },

    selectSeat(id, imdbID) {
      const seat = this.seats.find((seat) => seat.id === id)
      seat.isSelected = !seat.isSelected
      const selectedSeats = this.seats.filter((seat) => seat.isSelected)
      localStorage.setItem(imdbID, JSON.stringify(selectedSeats))
    },

    async fetchSeats(id = null) {
      try {
        const route = useRoute()
        const idMovie = id ? id : route.params.id

        let apiFetchSeats = null
        let selectedSeats = []

        // if there's no api for get seats from server then use localStorage
        if (apiFetchSeats) {
          console.log('fetching seats from server')
          const response = await axios.post(apiFetchSeats, {
            params: {
              idMovie: idMovie
            }
          })
          this.bookSeats(response)
        } else {
          console.log('fetching seats from localStorage')
          if (JSON.parse(localStorage.getItem(idMovie))) {
            selectedSeats = JSON.parse(localStorage.getItem(idMovie))
          }
          this.bookSeats(selectedSeats)
        }
      } catch (error) {
        console.error(error)
      }
    },

    bookSeats(selectedSeats) {
      selectedSeats.forEach((seat) => {
        const seatIndex = this.seats.findIndex((s) => s.id === seat.id)
        this.seats[seatIndex] = seat
      })
    },

    setBookingMovie(id, selectedSeats) {
      selectedSeats.forEach((seat) => {
        const seatIndex = this.seats.findIndex((s) => s.id === seat.id)
        this.seats[seatIndex].isBooked = true

        localStorage.setItem(id, JSON.stringify(selectedSeats))
      })
      
    }
  }
})
