<script setup lang="ts">
import type { PropType } from 'vue'
import { type EventItem } from '@/type'

defineProps({
    event: {
        type: Object as PropType<EventItem>,
        require: true
    }
})


</script>

<template>
    <div v-if="event">
        <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
        <p>{{ event.description }}</p>

    </div>
</template>