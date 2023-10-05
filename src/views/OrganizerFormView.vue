<script setup lang="ts">

import type { Organizer } from '@/type';
import { ref } from 'vue';
import OrganizerService from '@/services/OrganizerService';
import { useRouter } from 'vue-router';
import { useMessangeStore } from '@/stores/message';

const store = useMessangeStore()

const organizer = ref<Organizer> ({
    id: 0,
    name: '',
    address: ''
})

const router = useRouter()
function saveOrganizer(){
    OrganizerService.saveOrganizer(organizer.value)
    .then((response) =>{
        console.log(response.data)
        router.push({
            name: 'organizer-detail',
            params: { id: response.data.id}
        })
    }).catch(() => {
        router.push({ name: 'organizer'})
    })
}
</script>

<template>
    <div>
        <h1>Add Organizer</h1>
        <form @submit.prevent="saveOrganizer">
            <label>Organizer Name</label>
            <input v-model="organizer.name" type="text" placeholder="Organizer Name" class="field"/>
            <h3>Address</h3>
            <input v-model="organizer.address" type="text" placeholder="Address" class="field"/>
            <button tyoe="submit">Submit</button>
        </form>
        <pre>{{ organizer }}</pre>
    </div>
</template>