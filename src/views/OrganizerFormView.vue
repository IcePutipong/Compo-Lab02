<script setup lang="ts">

import type { Organizer } from '@/type';
import { computed, ref } from 'vue';
import OrganizerService from '@/services/OrganizerService';
import { useRouter } from 'vue-router';
import { useMessangeStore } from '@/stores/message';
import ImageUpload from '@/components/ImageUpload.vue'

const store = useMessangeStore()

const organizer = ref<Organizer> ({
    id: 0,
    name: '',
    address: '',
    images: ''
})

const router = useRouter()
function saveOrganizer(){
    OrganizerService.getOrganizers(organizer.value)
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

const organizerImageProxy = computed({
		get() {
			if (!organizer.value.images) {
				return [];
			}
			return [organizer.value.images];
		},
		set(v: string[]) {
			organizer.value.images = v[0];
		},
	});
</script>

<template>
    <div>
        <h1>Add Organizer</h1>
        <form @submit.prevent="saveOrganizer">
            <label>Organizer Name</label>
            <input v-model="organizer.name" type="text" placeholder="Organizer Name" class="field"/>
            <h3>Address</h3>
            <input v-model="organizer.address" type="text" placeholder="Address" class="field"/>
            <ImageUpload v-model="organizerImageProxy" :max="1" />
            <button tyoe="submit">Submit</button>
        </form>
        <pre>{{ organizer }}</pre>
    </div>
</template>