<template>
  <div
    class="relative min-h-[100px] p-4"
    :class="[
      `col-span-${element.settings?.width || 6}`,
      { 'border-2 border-dashed border-gray-300 rounded-lg': !isPreviewMode }
    ]"
    @dragover.prevent="handleDragOver"
    @drop.prevent="handleDrop"
  >
    <!-- Column Content -->
    <template v-if="element.settings?.elements && element.settings.elements.length > 0">
      <component
        v-for="(el, index) in element.settings.elements"
        :key="index"
        :is="getElementComponent(el.type)"
        :element="el"
        :is-preview-mode="isPreviewMode"
        @select="$emit('select', el)"
        @update="updateElement(index, $event)"
      />
    </template>

    <!-- Add Element Button -->
    <div
      v-if="!isPreviewMode"
      class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
    >
      <button
        @click="addElement"
        class="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        title="Add Element"
      >
        <svg class="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import HeadingElement from './HeadingElement.vue'
import ButtonElement from './ButtonElement.vue'
import GalleryElement from './GalleryElement.vue'
import AnchorElement from './AnchorElement.vue'

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

const emit = defineEmits(['select', 'update', 'add-element'])

const getElementComponent = (type) => {
  const components = {
    heading: HeadingElement,
    button: ButtonElement,
    gallery: GalleryElement,
    anchor: AnchorElement
  }
  return components[type]
}

const addElement = () => {
  emit('add-element')
}

const updateElement = (index, updatedElement) => {
  const element = { ...props.element }
  element.settings.elements[index] = updatedElement
  emit('update', element)
}

const handleDragOver = (event) => {
  event.dataTransfer.dropEffect = 'copy'
}

const handleDrop = (event) => {
  const elementData = JSON.parse(event.dataTransfer.getData('application/json'))
  const element = { ...props.element }
  
  if (!element.settings.elements) {
    element.settings.elements = []
  }
  
  element.settings.elements.push({
    ...elementData,
    id: Date.now().toString()
  })
  
  emit('update', element)
}
</script> 