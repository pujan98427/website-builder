<template>
  <BaseElement
    :element="element"
    :is-preview-mode="isPreviewMode"
    @select="$emit('select', element)"
  >
    <div
      class="w-full"
      :style="computedStyles"
      :contenteditable="!isPreviewMode"
      @blur="updateContent"
      @input="debouncedUpdate"
      v-html="element.content"
    ></div>
  </BaseElement>
</template>

<script setup>
import { computed } from 'vue'
import { useDebounceFn } from '@vueuse/core'
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
  fontFamily: props.element.settings?.fontFamily === 'sans' ? 'system-ui, -apple-system, sans-serif' :
              props.element.settings?.fontFamily === 'serif' ? 'Georgia, serif' :
              'monospace',
  fontSize: `${props.element.settings?.fontSize || 16}px`,
  fontWeight: props.element.settings?.fontWeight || 'normal',
  color: props.element.settings?.color || '#000000',
  textAlign: props.element.settings?.textAlign || 'left',
  lineHeight: props.element.settings?.lineHeight || 1.5,
  padding: `${props.element.settings?.paddingTop || 0}px ${props.element.settings?.paddingRight || 0}px ${props.element.settings?.paddingBottom || 0}px ${props.element.settings?.paddingLeft || 0}px`
}))

const updateContent = (event) => {
  const updatedElement = {
    ...props.element,
    content: event.target.innerHTML
  }
  emit('update', updatedElement)
}

const debouncedUpdate = useDebounceFn(updateContent, 300)
</script> 