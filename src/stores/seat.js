import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import axios from 'axios'

export const useSeatStore = defineStore('seat', {
  state: () => ({
    seats: [],
    maxAvailableSeats: null
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

    selectSeat(id, imdbID, numSeats) {
      const seat = this.seats.find((seat) => seat.id === id)
      const selectedSeats = this.seats.filter((seat) => seat.isSelected)
      const countSelectedSeats = selectedSeats.filter((seat) => !seat.isBooked).length

      if (seat.isSelected && !seat.isBooked) {
        console.log('cancel seat : ' + seat.id)
        seat.isSelected = !seat.isSelected
        localStorage.setItem(imdbID, JSON.stringify(selectedSeats))
        return
      } 
      if (countSelectedSeats >= numSeats) {
        alert(`You can only select ${numSeats} seats`)
        return
      } else {
        seat.isSelected = !seat.isSelected
        localStorage.setItem(imdbID, JSON.stringify(selectedSeats))
        console.log('select seat : ' + seat.id)
      }
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
    },

    availableSeats() {
      let count = 0
      this.seats.forEach((seat) => {
        if (!seat.isBooked) {
          count++
        }
      })
      this.maxAvailableSeats = count
    },

    resetSeats(id) {
      const selectedSeats = JSON.parse(localStorage.getItem(id))
      this.seats.forEach((seat) => {
        if (!seat.isBooked && seat.isSelected) {
          seat.isSelected = false
          localStorage.setItem(id, JSON.stringify(selectedSeats))
        }
      })
    }
      
  }
})
