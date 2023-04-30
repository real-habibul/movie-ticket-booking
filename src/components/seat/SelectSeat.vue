<template>
  <div class="select-seat relative">
    <div class="flex items-center justify-center pt-4">
      <h2 class="text-2xl font-bold ml-2">Select Seat</h2>
    </div>
    <div class="flex flex-col md:flex-row justify-start items-start">
      <span class="absolute top-5 left-2">
        <IconBack class="h-7 w-7" />
      </span>
      <div class="flex-grow px-2 py-4">
        <div
          class="main-screen py-2 px-4 rounded w-full text-center border border-solid border-gray-400"
        >
          Screen
        </div>
        <div class="grid grid-cols-5 gap-4 justify-center items-center mt-4">
          <div v-for="seat in seats" :key="seat.id" @click="selectSeat(seat.id)">
            <div
              :class="{
                'bg-green-500': seat.isBooked,
                'bg-blue-500': seat.isSelected
              }"
              class="seat py-2 px-4 rounded w-20 text-center border border-solid border-gray-400 m-auto"
            >
              {{ seat.id }}
            </div>
          </div>
        </div>
        <div class="w-full flex justify-center items-center mt-4">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            @click="goToPayment()"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useSeatStore } from '@/stores/seat'
import { useRoute, useRouter } from 'vue-router'

import IconBack from '@/components/icon/IconBack.vue'

export default defineComponent({
  name: 'SelectSeat',
  setup() {
    const seatStore = useSeatStore()
    seatStore.initSeats()

    const route = useRoute()
    const router = useRouter()

    const imdbID = computed(() => route.params.id)

    const seats = seatStore.seats

    const selectSeat = (id) => {
      seatStore.selectSeat(id, imdbID.value)
    }

    const goToPayment = () => {
      try {
        const selectedSeats = seats.filter((seat) => seat.isSelected)
        seatStore.setBookingMovie(imdbID.value, selectedSeats)

        router.push({ name: 'movie-list' })
      } catch (error) {
        console.log(error)
      }
    }

    return {
      seats,
      selectSeat,
      goToPayment
    }
  },
  components: {
    IconBack
  }
})
</script>
