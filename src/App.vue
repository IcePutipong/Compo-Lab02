<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import { useMessangeStore } from './stores/message'
import { storeToRefs } from 'pinia'

const store = useMessangeStore()
const { message } = storeToRefs(store)
const sizes = ref<number>(2)
</script>

<template>
  <div>
    <img alt="logo" src="@/assets/logo.svg" class="mt-5 m-auto mb-10 object-center h-20 w-28" />
  </div>

  <header class="max-h-screen leading-normal">
    <h4 class="text-center font-bold font-mono text-emerald-500">Julaluck Yeta</h4>
    <nav class="sm:flex justify-center items-center ">
      <div class="space-x-2 font-mono">
        <RouterLink :to="{ name: 'EventList' }">Home</RouterLink>
        <RouterLink :to="{ name: 'about' }">About</RouterLink>
        <!-- 4.15 problem  in line 17-->
        <RouterLink :to="{ name: 'category' }">Category</RouterLink>
        <RouterLink :to="{ name: 'student' }">Student</RouterLink>
      </div>
    </nav>

    <div class="bg-emerald-300 transition duration-3000 m-2" v-if="message">
      <h4 class="text-center font-mono">{{ message }}</h4>
    </div>
  </header>
  <RouterView />
  <br />
</template>



