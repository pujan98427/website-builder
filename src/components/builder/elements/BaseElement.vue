<template>
  <div
    class="w-full h-full"
    :class="{ 'cursor-pointer hover:ring-2 hover:ring-blue-500 rounded-lg': !isPreviewMode }"
    @click="!isPreviewMode && $emit('select', element)"
  >
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  element: {
    type: Object,
    required: true
  },
  isPreviewMode: {
    type: Boolean,
    default: false
  }
})

defineEmits(['select', 'update'])
</script> 