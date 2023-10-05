<script setup lang="ts">
import type { EventItem } from '@/type'
import { ref } from 'vue'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'
import { useMessangeStore } from '@/stores/message'
const store = useMessangeStore()

const event = ref<EventItem>({
  id: 0,
  category: '',
  title: '',
  description: '',
  location: '',
  date: '',
  time: '',
  organizer: '',
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
      <label>Category</label>
      <input v-model="event.category" type="text" placeholder="Category" class="field" />
      <h3>Name & describe your event</h3>

      <label>Title</label>
      <input v-model="event.title" type="text" placeholder="Title" class="field" />

      <label>Description</label>
      <input v-model="event.description" type="text" placeholder="Description" class="field" />

      <h3>Where is your event?</h3>

      <label>Location</label>
      <input v-model="event.location" type="text" placeholder="Location" class="field" />

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
