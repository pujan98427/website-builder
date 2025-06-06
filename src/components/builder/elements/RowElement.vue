<template>
  <BaseElement
    :element="element"
    :is-preview-mode="isPreviewMode"
    @select="$emit('select', element)"
  >
    <div class="relative w-full min-h-[100px] p-4" :style="containerStyles">
      <!-- Row Content -->
      <div class="grid grid-cols-12 gap-4 w-full">
        <template v-for="(column, index) in element.settings?.columns || []" :key="index">
          <div
            :class="[
              'relative min-h-[100px] p-4',
              `col-span-${column.width || 6}`,
              { 'border-2 border-dashed border-gray-300 rounded-lg': !isPreviewMode }
            ]"
            @dragover.prevent="handleDragOver($event, index)"
            @drop.prevent="handleDrop($event, index)"
          >
            <!-- Column Content -->
            <template v-if="column.elements && column.elements.length > 0">
              <component
                v-for="(el, elIndex) in column.elements"
                :key="elIndex"
                :is="getElementComponent(el.type)"
                :element="el"
                :is-preview-mode="isPreviewMode"
                @select="$emit('select', el)"
                @update="updateElement(elIndex, $event)"
              />
            </template>

            <!-- Add Element Button -->
            <div
              v-if="!isPreviewMode"
              class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
            >
              <button
                @click="addElement(index)"
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
      </div>

      <!-- Add Column Button -->
      <div
        v-if="!isPreviewMode"
        class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
      >
        <button
          @click="addColumn"
          class="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Add Column"
        >
          <svg class="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
  </BaseElement>
</template>

<script setup>
import { computed } from 'vue'
import BaseElement from './BaseElement.vue'
import HeadingElement from './HeadingElement.vue'
import ButtonElement from './ButtonElement.vue'
import GalleryElement from './GalleryElement.vue'

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
  margin: `${props.element.settings?.marginTop || 0}px ${props.element.settings?.marginRight || 0}px ${props.element.settings?.marginBottom || 0}px ${props.element.settings?.marginLeft || 0}px`,
  padding: `${props.element.settings?.paddingTop || 0}px ${props.element.settings?.paddingRight || 0}px ${props.element.settings?.paddingBottom || 0}px ${props.element.settings?.paddingLeft || 0}px`
}))

const getElementComponent = (type) => {
  const components = {
    heading: HeadingElement,
    button: ButtonElement,
    gallery: GalleryElement
  }
  return components[type]
}

const addColumn = () => {
  const updatedElement = { ...props.element }
  if (!updatedElement.settings) {
    updatedElement.settings = {}
  }
  if (!updatedElement.settings.columns) {
    updatedElement.settings.columns = []
  }

  // Calculate width for new column
  const totalColumns = updatedElement.settings.columns.length
  const newWidth = totalColumns === 0 ? 12 : 6

  // Adjust existing columns if needed
  if (totalColumns > 0) {
    updatedElement.settings.columns.forEach(col => {
      col.width = 6
    })
  }

  updatedElement.settings.columns.push({
    width: newWidth,
    elements: []
  })

  emit('update', updatedElement)
}

const addElement = (columnIndex) => {
  // This will be handled by the parent component
  emit('add-element', columnIndex)
}

const updateElement = (columnIndex, updatedElement) => {
  const element = { ...props.element }
  element.settings.columns[columnIndex].elements = element.settings.columns[columnIndex].elements.map(el => 
    el.id === updatedElement.id ? updatedElement : el
  )
  emit('update', element)
}

const handleDragOver = (event, columnIndex) => {
  event.dataTransfer.dropEffect = 'copy'
}

const handleDrop = (event, columnIndex) => {
  const elementData = JSON.parse(event.dataTransfer.getData('application/json'))
  const element = { ...props.element }
  
  if (!element.settings.columns[columnIndex].elements) {
    element.settings.columns[columnIndex].elements = []
  }
  
  element.settings.columns[columnIndex].elements.push({
    ...elementData,
    id: Date.now().toString()
  })
  
  emit('update', element)
}
</script>

<style scoped>
.grid {
  display: grid;
  gap: 1rem;
}
</style> 