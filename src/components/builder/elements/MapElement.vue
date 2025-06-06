<template>
  <BaseElement
    :element="element"
    :is-preview-mode="isPreviewMode"
    @select="$emit('select', element)"
  >
    <div class="w-full h-full relative" :style="containerStyles">
      <iframe
        v-if="element.settings?.src"
        :src="element.settings.src"
        :title="element.settings?.title || 'Map'"
        class="w-full h-full"
        :style="mapStyles"
        frameborder="0"
        allowfullscreen
      ></iframe>
      <div
        v-else-if="!isPreviewMode"
        class="absolute inset-0 flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300"
      >
        <div class="text-center p-4">
          <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <p class="mt-1 text-sm text-gray-600">Enter map embed URL in settings</p>
          <input
            type="text"
            v-model="url"
            placeholder="Enter Google Maps embed URL..."
            class="mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            @keyup.enter="updateUrl"
          />
          <p class="mt-2 text-xs text-gray-500">
            To get the embed URL, go to Google Maps, search for a location, click Share, and select "Embed a map"
          </p>
        </div>
      </div>
    </div>
  </BaseElement>
</template>

<script setup>
import { computed, ref } from 'vue'
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

const url = ref(props.element.settings?.src || '')

const containerStyles = computed(() => ({
  padding: `${props.element.settings?.paddingTop || 0}px ${props.element.settings?.paddingRight || 0}px ${props.element.settings?.paddingBottom || 0}px ${props.element.settings?.paddingLeft || 0}px`
}))

const mapStyles = computed(() => ({
  border: props.element.settings?.border ? `1px solid ${props.element.settings.borderColor || '#e5e7eb'}` : 'none',
  borderRadius: props.element.settings?.borderRadius ? `${props.element.settings.borderRadius}px` : '0'
}))

const updateUrl = () => {
  const updatedElement = {
    ...props.element,
    settings: {
      ...props.element.settings,
      src: url.value
    }
  }
  emit('update', updatedElement)
}
</script> 