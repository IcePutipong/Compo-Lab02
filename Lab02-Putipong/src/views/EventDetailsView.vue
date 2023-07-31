<script setup lang="ts">
import {ref} from 'vue'
import  type   {Ref} from 'vue'
import   {type EventItem } from '@/type';
import EventService from '@/services/EventService';

const event = ref<EventItem | null> (null)
const props = defineProps({
    id: String
})

    EventService.getEventById(Number(props.id))
    .then((response) => {
        event.value = response.data
    }).catch(error => {
        console.log(error)
    })

</script>

<template>
    <div v-if="event">
        <h1>{{ event?.title }}</h1>
        <p>{{ event?.time }} on {{ event?.date }} @ {{ event?.location }}</p>
        <p>{{ event?.description }}</p>
    </div>
    
</template>