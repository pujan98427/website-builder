<template>
  <BaseElement
    :element="element"
    :is-preview-mode="isPreviewMode"
    @select="$emit('select', element)"
  >
    <div
      class="w-full flex items-center"
      :style="containerStyles"
    >
      <div
        class="flex-grow"
        :style="lineStyles"
      ></div>
      <div
        v-if="element.settings?.showText"
        class="px-4"
        :style="textStyles"
      >
        {{ element.settings?.text || 'Divider' }}
      </div>
      <div
        class="flex-grow"
        :style="lineStyles"
      ></div>
    </div>
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

const containerStyles = computed(() => ({
  padding: `${props.element.settings?.paddingTop || 0}px ${props.element.settings?.paddingRight || 0}px ${props.element.settings?.paddingBottom || 0}px ${props.element.settings?.paddingLeft || 0}px`
}))

const lineStyles = computed(() => ({
  height: `${props.element.settings?.height || 1}px`,
  backgroundColor: props.element.settings?.color || '#e5e7eb',
  borderStyle: props.element.settings?.style || 'solid',
  borderWidth: props.element.settings?.style === 'dashed' || props.element.settings?.style === 'dotted' ? '1px' : '0',
  borderColor: props.element.settings?.color || '#e5e7eb'
}))

const textStyles = computed(() => ({
  color: props.element.settings?.textColor || '#6b7280',
  fontSize: `${props.element.settings?.fontSize || 14}px`,
  fontFamily: props.element.settings?.fontFamily === 'sans' ? 'system-ui, -apple-system, sans-serif' :
              props.element.settings?.fontFamily === 'serif' ? 'Georgia, serif' :
              'monospace'
}))
</script> 