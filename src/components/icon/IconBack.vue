<template>
  <router-link v-if="$props.to" :to="$props.to">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-green-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
  </router-link>
  <button v-else @click.prevent="goBack()">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-green-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
  </button>
</template>

<script>
import router from '@/router'

export default {
  name: 'IconBack',
  props: {
    to: {
      type: String,
      default: null
    }
  },
  methods: {
    goBack() {
      router.go(-1)
    }
  }
}
</script>
