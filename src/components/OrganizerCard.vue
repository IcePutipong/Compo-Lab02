<!-- 4.15 problem create this file-->
<template>
  <div class="mb-3 p-2 border-2 border-solid border-emerald-400 w-60 h-30 ">
    <span> {{ organizer?.name }} </span>
    <h4 class="text-center font-semibold">{{ organizer?.id }}</h4>
    <h4 class="text-center font-semibold">{{ organizer?.address }}</h4>
  </div>
</template>

<script setup lang="ts">
import type { Organizer } from '@/type'
import type { PropType } from 'vue'
const props = defineProps({
  organizer: {
    type: Object as PropType<Organizer>,
    require: true
  }
})
</script>

<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12 px 0 rgba(0, 0, 0, 0.2);
}
</style>
