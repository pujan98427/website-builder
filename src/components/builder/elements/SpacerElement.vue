<template>
  <BaseElement
    :element="element"
    :is-preview-mode="isPreviewMode"
    @select="$emit('select', element)"
  >
    <div
      class="w-full"
      :style="computedStyles"
    ></div>
  </BaseElement>
</template>

<script setup>
import { computed } from 'vue'
import BaseElement from './BaseElement.vue'

const props = defineProps({
  element: {
    type: Object,
    required: true
  },
  isPreviewMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select', 'update'])

const computedStyles = computed(() => ({
  height: `${props.element.settings?.height || 20}px`,
  backgroundColor: props.element.settings?.backgroundColor || 'transparent',
  borderTop: props.element.settings?.borderTop ? `1px solid ${props.element.settings.borderColor || '#e5e7eb'}` : 'none',
  borderBottom: props.element.settings?.borderBottom ? `1px solid ${props.element.settings.borderColor || '#e5e7eb'}` : 'none',
  margin: `${props.element.settings?.marginTop || 0}px ${props.element.settings?.marginRight || 0}px ${props.element.settings?.marginBottom || 0}px ${props.element.settings?.marginLeft || 0}px`
}))
</script> 