<template>
  <component
    :is="element.tag || 'h1'"
    :style="element.style"
    class="cursor-pointer"
  >
    {{ element.content || 'Header Text' }}
  </component>
</template>

<script setup>
defineProps({
  element: {
    type: Object,
    required: true
  }
})
</script> 