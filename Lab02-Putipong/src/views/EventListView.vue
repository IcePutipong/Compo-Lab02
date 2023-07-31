<template>
  <h1>Events for Good</h1>
  <main class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
    <RouterLink :to="{ name: 'EventList', query:{ page: page - 1}}" rel="prev" 
          v-if = "page != 1" id="page-prev"> Prev Page
    </RouterLink>
    <RouterLink :to="{ name: 'EventList', query:{ page: page + 1}}" rel="prev" 
          v-if = "hasNextPage" id="page-next"> Next Page
    </RouterLink>

  </main>
</template>

<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
import type { EventItem } from '@/type'
import { ref, type Ref, watchEffect, computed} from 'vue'
import EventService from '@/services/EventService'
import type { Axios, AxiosResponse } from 'axios';



const events: Ref<Array<EventItem>> = ref([])
const totalEvent = ref<number>(0)
const props = defineProps({
    page: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      required:true
    }

})


watchEffect(() =>{
  EventService.getEvent(props.size, props.page).then((response: AxiosResponse<EventItem[]>) => {
    events.value = response.data
    totalEvent.value = response.headers['x-total-count']
  })
})

const hasNextPage = computed(() =>{
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
