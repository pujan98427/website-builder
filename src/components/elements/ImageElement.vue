<template>
  <div class="relative cursor-pointer">
    <img
      :src="element.content || 'https://via.placeholder.com/400x300'"
      :alt="element.alt || 'Image'"
      :style="element.style"
      class="max-w-full h-auto"
    />
    <div
      v-if="!element.content"
      class="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400"
    >
      Click to add image
    </div>
  </div>
</template>

<script setup>
defineProps({
  element: {
    type: Object,
    required: true
  }
})
</script> 