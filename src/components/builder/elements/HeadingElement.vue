<template>
  <div
    :class="[
      'relative group',
      { 'cursor-pointer hover:ring-2 hover:ring-blue-500 rounded-lg': !isPreviewMode }
    ]"
    @click="!isPreviewMode && $emit('select', element)"
  >
    <component
      :is="`h${element.settings.level}`"
      :style="{
        color: element.settings.color,
        fontSize: `${element.settings.fontSize}${element.settings.fontSizeUnit}`,
        textAlign: element.settings.alignment,
        marginTop: `${element.settings.marginTop}px`,
        marginBottom: `${element.settings.marginBottom}px`,
        marginLeft: `${element.settings.marginLeft}px`,
        marginRight: `${element.settings.marginRight}px`,
        paddingTop: `${element.settings.paddingTop}px`,
        paddingBottom: `${element.settings.paddingBottom}px`,
        paddingLeft: `${element.settings.paddingLeft}px`,
        paddingRight: `${element.settings.paddingRight}px`
      }"
      class="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg whitespace-pre-wrap"
      :contenteditable="!isPreviewMode"
      @input="updateText"
      @focus="!isPreviewMode && $emit('select', element)"
      @click.stop
    >{{ element.settings.text || 'Click to edit heading' }}</component>

    <!-- Element Controls -->
    <div
      v-if="!isPreviewMode"
      class="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <button
        @click.stop="$emit('select', element)"
        class="p-1 bg-white rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        title="Edit Heading"
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
        text: 'Click to edit heading',
        level: '1',
        color: '#000000',
        fontSize: 24,
        fontSizeUnit: 'px',
        alignment: 'left',
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
[contenteditable]:focus {
  outline: none;
  border: 1px dashed #3b82f6;
  border-radius: 0.25rem;
  padding: 0.25rem;
}
</style> 