<template>
  <!-- setup using tailwind -->
  <div class="history relative">
    <div class="flex items-center justify-center pt-4">
      <h2 class="text-2xl font-bold ml-2">History</h2>
    </div>
    <div class="flex flex-col md:flex-row justify-start items-start">
      <span class="absolute top-5 left-2">
        <IconBack class="h-7 w-7" to="/" />
      </span>
    </div>
    <template v-if="loading">
      <div class="flex flex-col items-center justify-center">
        <div class="text-2xl font-bold">Loading history...</div>
      </div>
    </template>
    <template v-else-if="history.length === 0">
      <div class="flex flex-col items-center justify-center">
        <div class="text-2xl font-bold">No History</div>
        <div class="text-xl font-bold">Please Book a Movie</div>
      </div>
    </template>
    <template v-else v-for="listHistory in history" :key="listHistory.imdbID">
      <div class="px-2 py-4 flex flex-row">
        <img :src="listHistory.movie.Poster" alt="Movie Poster" class="object-contain h-40" />
        <div class="pl-4">
          <div class="font-bold text-2xl mb-2">{{ listHistory.movie.Title }}</div>
          <div class="text-gray-700 text-xl">
            <span> Seats : </span>
            <span
              v-for="(listSeat, index) in listHistory.seats"
              :key="listHistory.movie.imdbID + index"
            >
              {{ listSeat.id }} {{ index === listHistory.seats.length - 1 ? '' : ',' }}
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, onMounted, ref } from 'vue'
import { useHistoryStore } from '@/stores/history'

import IconBack from '@/components/icon/IconBack.vue'

export default defineComponent({
  name: 'History',
  setup() {
    const historyStore = useHistoryStore()

    const history = ref([])
    const loading = ref(true)
    const isMounted = ref(false)

    onBeforeMount(async () => {
      await historyStore.initHistory()
      history.value = historyStore.history
      loading.value = false
    })

    onMounted(() => {
      isMounted.value = true
    })

    return {
      history,
      loading,
      isMounted
    }
  },
  components: {
    IconBack
  }
})
</script>
