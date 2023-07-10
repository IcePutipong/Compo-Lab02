<template>
  <h1>Events for Good</h1>
  <main class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
  </main>
</template>

<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
import type { EventItem } from '@/type'
import { ref, type Ref } from 'vue'
import EventService from '@/services/EventService'

const events: Ref<Array<EventItem>> = ref([])
EventService.getEvent().then( (res) => {
    events.value =res.data
})


// EventService.getEvent().then( (res) => {
//     events.value =res.data
// })

</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
