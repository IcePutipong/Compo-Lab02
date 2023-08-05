<template>
  <br>
  <h1>Events for Good</h1>
  <br>
  
  <main class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
    <RouterLink :to="{ name: 'EventList', query: { page: page - 1 } }" rel="prev" v-if="page != 1" id="page-prev">
      Prev Page
    </RouterLink>
    <RouterLink :to="{ name: 'EventList', query: { page: page + 1 } }" rel="prev" v-if="hasNextPage" id="page-next">
      Next Page
    </RouterLink>
  </main>
</template>

<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
import type { EventItem } from '@/type'
import { ref, type Ref, watchEffect, computed } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import EventService from '@/services/EventService'
import NProgress from 'nprogress'
import { useRouter } from 'vue-router'
import type { Axios, AxiosResponse } from 'axios'
import router from '@/router'


const events: Ref<Array<EventItem>> = ref([])
const totalEvent = ref<number>(0)
const sizes = ref<number>(2)
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


NProgress.start()
EventService.getEvent(props.size, props.page).then((response: AxiosResponse<EventItem[]>) => {
    events.value = response.data
    totalEvent.value = response.headers['x-total-count']
  }).catch(()=>{
    router.push({ name: 'NetworkError'})
  }).finally(() =>{
    NProgress.done()
  })

  onBeforeRouteUpdate((to, from, next) =>{
    const toPage = Number(to.query.page)
    NProgress.start()
    ///????????
    EventService.getEvent(props.size, toPage).then((response: AxiosResponse<EventItem[]>) =>{
      events.value = response.data
      totalEvent.value = response.headers['x-total-count']
      next()
    }).catch(() => {
      next({ name: 'NetworkError'})
    }).finally(()=>{
      NProgress.done()
    })
  })
    

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvent.value / 2)
  return props.page.valueOf() < totalPages
})
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
