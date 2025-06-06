<template>
  <p
    :style="element.style"
    class="cursor-pointer"
  >
    {{ element.content || 'Paragraph text goes here. Click to edit.' }}
  </p>
</template>

<script setup>
defineProps({
  element: {
    type: Object,
    required: true
  }
})
</script> 