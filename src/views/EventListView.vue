<template>
  <br>
  <h1 class="text-center font-bold font-mono text-emerald-500">Events for Good</h1>
  <br>
  
  <main class="flex flex-col items-center">
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
    <RouterLink :to="{ name: 'EventList', query: { page: page - 1 } }" rel="prev" v-if="page != 1" id="page-prev" class="font-mono">
      Prev Page
    </RouterLink>
    <RouterLink :to="{ name: 'EventList', query: { page: page + 1 } }" rel="prev" v-if="hasNextPage" id="page-next" class="font-mono">
      Next Page
    </RouterLink>
  </main>
</template>

<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
import type { EventItem } from '@/type'
import { ref, type Ref, computed } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import EventService from '@/services/EventService'
import type { AxiosResponse } from 'axios'
import router from '@/router'


const events: Ref<Array<EventItem>> = ref([])
const totalEvent = ref<number>(0)
const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    required: true
  }
})

// eslint-disable-next-line vue/no-setup-props-destructure
EventService.getEvent(3, props.page).then((response: AxiosResponse<EventItem[]>) => {
    events.value = response.data
    totalEvent.value = response.headers['x-total-count']
  }).catch(()=>{
    router.push({ name: 'NetworkError'})
  })

  onBeforeRouteUpdate((to, from, next) =>{
    const toPage = Number(to.query.page)
    ///????????
    EventService.getEvent(3, toPage).then((response: AxiosResponse<EventItem[]>) =>{
      events.value = response.data
      totalEvent.value = response.headers['x-total-count']
      next()
    }).catch(() => {
      next({ name: 'NetworkError'})
    })
  })
    

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvent.value / 3)
  return props.page.valueOf() < totalPages
})
</script>


