<script setup lang="ts">
import type { EventItem } from '@/type'
import { ref } from 'vue'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'
import { useMessangeStore } from '@/stores/message'
import BaseInput from '@/components/BaseInput.vue'
const store = useMessangeStore()

const event = ref<EventItem>({
  id: 0,
  category: '',
  title: '',
  description: '',
  location: '',
  date: '',
  time: '',
  organizer: {id: 1 , name: " "},
  petsAllowed: false
})

const router = useRouter()
function saveEvent() {
  EventService.saveEvent(event.value)
    .then((response) => {
      console.log(response.data)
      router.push({
        name: 'event-detail',
        params: { id: response.data.id }
      })
      store.updateMessage('You are successfully add a new event for ' + response.data.title)
      setTimeout(() => {
        store.resetMessage()
      }, 3000)
    })
    .catch(() => {
      router.push({ name: 'network-error' })
    })
}
</script>

<template>
  <div>
    <h1>Create an event</h1>
    <form @submit.prevent="saveEvent">
      <BaseInput v-model="event.category" type="text" label="Category"/>
      <h3>Name & describe your event</h3>

      <BaseInput v-model="event.title" type="text" label="Title"/>

      <BaseInput v-model="event.description" type="text" label="Description"/>

      <h3>Where is your event?</h3>

      <BaseInput v-model="event.location" type="text" label="Location"/>

      <label>Date</label>
      <input v-model="event.date" type="text" placeholder="Date" class="flield">

      <label>Time</label>
      <input v-model="event.time" type="text" placeholder="Time" class="flield">

      <label>Organizer</label>
      <input v-model="event.organizer" type="text" placeholder="Organizer" class="flield">

      <button type="submit">Submit</button>


    </form>

    <pre>{{ event }}</pre>
  </div>
</template>
