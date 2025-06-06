<template>
  <div
    class="w-full h-full"
    :class="{ 'cursor-pointer': !isPreviewMode }"
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