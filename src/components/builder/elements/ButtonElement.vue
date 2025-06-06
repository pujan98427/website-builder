<template>
  <div
    :class="[
      'relative group',
      { 'cursor-pointer hover:ring-2 hover:ring-blue-500 rounded-lg': !isPreviewMode }
    ]"
    @click="!isPreviewMode && $emit('select', element)"
  >
    <button
      :class="[
        'relative focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg',
        {
          'bg-blue-500 hover:bg-blue-600 text-white': element.settings.variant === 'primary',
          'bg-gray-200 hover:bg-gray-300 text-gray-800': element.settings.variant === 'secondary',
          'border-2 border-blue-500 text-blue-500 hover:bg-blue-50': element.settings.variant === 'outline',
          'px-4 py-2 text-sm': element.settings.size === 'small',
          'px-6 py-3 text-base': element.settings.size === 'medium',
          'px-8 py-4 text-lg': element.settings.size === 'large'
        }
      ]"
      :style="{
        marginTop: `${element.settings.marginTop}px`,
        marginBottom: `${element.settings.marginBottom}px`,
        marginLeft: `${element.settings.marginLeft}px`,
        marginRight: `${element.settings.marginRight}px`,
        paddingTop: `${element.settings.paddingTop}px`,
        paddingBottom: `${element.settings.paddingBottom}px`,
        paddingLeft: `${element.settings.paddingLeft}px`,
        paddingRight: `${element.settings.paddingRight}px`
      }"
      :contenteditable="!isPreviewMode"
      @input="updateText"
      @focus="!isPreviewMode && $emit('select', element)"
    >{{ element.settings.text || 'Click to edit button' }}</button>

    <!-- Element Controls -->
    <div
      v-if="!isPreviewMode"
      class="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <button
        @click.stop="$emit('select', element)"
        class="p-1 bg-white rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        title="Edit Button"
      >
        <svg class="w-4 h-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

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

onMounted(() => {
  // Initialize default settings if not present
  if (!props.element.settings) {
    const updatedElement = {
      ...props.element,
      settings: {
        text: 'Click to edit button',
        variant: 'primary',
        size: 'medium',
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0
      }
    }
    emit('update', updatedElement)
  }
})

const updateText = (event) => {
  const updatedElement = {
    ...props.element,
    settings: {
      ...props.element.settings,
      text: event.target.textContent
    }
  }
  emit('update', updatedElement)
}
</script>

<style scoped>
button[contenteditable]:focus {
  outline: none;
  border: 1px dashed #3b82f6;
}
</style> 