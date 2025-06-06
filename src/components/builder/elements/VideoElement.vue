<template>
  <BaseElement
    :element="element"
    :is-preview-mode="isPreviewMode"
    @select="$emit('select', element)"
  >
    <div class="w-full h-full relative" :style="containerStyles">
      <video
        v-if="element.settings?.src"
        :src="element.settings.src"
        :poster="element.settings?.poster"
        :controls="element.settings?.controls"
        :autoplay="element.settings?.autoplay"
        :loop="element.settings?.loop"
        :muted="element.settings?.muted"
        class="w-full h-full"
        :style="videoStyles"
      ></video>
      <div
        v-else-if="!isPreviewMode"
        class="absolute inset-0 flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 cursor-pointer"
        @click="openVideoUpload"
      >
        <div class="text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <p class="mt-1 text-sm text-gray-600">Click to upload a video</p>
        </div>
      </div>
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

const videoStyles = computed(() => ({
  objectFit: props.element.settings?.objectFit || 'cover',
  borderRadius: props.element.settings?.borderRadius ? `${props.element.settings.borderRadius}px` : '0'
}))

const openVideoUpload = () => {
  // Create a file input element
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'video/*'
  
  // Handle file selection
  input.onchange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const updatedElement = {
          ...props.element,
          settings: {
            ...props.element.settings,
            src: e.target.result
          }
        }
        emit('update', updatedElement)
      }
      reader.readAsDataURL(file)
    }
  }
  
  // Trigger file selection
  input.click()
}
</script> 