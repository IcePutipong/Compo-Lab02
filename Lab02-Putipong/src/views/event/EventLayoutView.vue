<script setup lang="ts">
import { ref } from 'vue'
import { type EventItem } from '@/type'
import EventService from '@/services/EventService'
import {useRouter} from 'vue-router';
const event = ref<EventItem | null>(null)

const props = defineProps({
    id: String
})

const router = useRouter()
EventService.getEventById(Number(props.id)).then((response) =>{
    event.value = response.data
}).catch(error =>{
    console.log(error)
    if(error.response && error.response.status === 404){
        router.push({ name: '404-resource', params: { resource: 'event'} })
    } else {
        router.push({ name: 'network-error'})
    }
})
</script>
<template>
    <div v-if="event">
        <h1>{{ event.title }}</h1>
        <div id ="nav">
            <router-link :to="{ name: 'EventDetails', params: { id } }"
            > Details </router-link> 
            |
            <router-link :to="{ name: 'EventRegister', params: {id} }"
            > Register </router-link>
            |
            <router-link :to="{ name: 'EventEdit', params: {id} }"
            > Edit </router-link>

        </div>
        
        <RouterView :event="event"></RouterView>
    </div>
</template>