<template>
  <button
    :style="element.style"
    class="cursor-pointer px-4 py-2 rounded-md"
  >
    {{ element.content || 'Button Text' }}
  </button>
</template>

<script setup>
defineProps({
  element: {
    type: Object,
    required: true
  }
})
</script> 