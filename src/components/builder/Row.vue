<template>
  <div 
    class="relative w-full min-h-[300px] p-8 mb-12"
    :class="{ 'border-2 border-dashed border-gray-300 rounded-lg': !isPreviewMode }"
  >
    <!-- Row Controls -->
    <div class="absolute -left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
      <div class="flex flex-col gap-2">
        <button
          @click="$emit('duplicate')"
          class="p-2 text-gray-400 hover:text-gray-600 bg-white rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Duplicate Row"
        >
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        <button
          @click="$emit('add-column')"
          class="p-2 text-gray-400 hover:text-gray-600 bg-white rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Add Column"
        >
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <button
          @click="$emit('delete')"
          class="p-2 text-gray-400 hover:text-red-600 bg-white rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
          title="Delete Row"
        >
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Row Content -->
    <div class="grid gap-4" :style="{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }">
      <div
        v-for="(column, index) in columns"
        :key="index"
        class="relative group"
      >
        <!-- Column Controls -->
        <div
          v-if="!isPreviewMode"
          class="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <button
            @click="$emit('delete-column', index)"
            class="p-1 bg-white rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
            title="Delete Column"
          >
            <svg class="w-4 h-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        <!-- Drop Zone -->
        <div
          v-if="!isPreviewMode"
          class="min-h-[100px] p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors"
          @dragover.prevent="handleDragOver"
          @drop.prevent="handleDrop($event, index)"
        >
          <div
            v-if="!column.elements || column.elements.length === 0"
            class="flex items-center justify-center h-full text-gray-500"
          >
            Drop elements here
          </div>
          <div v-else class="space-y-4">
            <component
              v-for="element in column.elements"
              :key="element.id"
              :is="getElementComponent(element.type)"
              :element="element"
              :is-preview-mode="isPreviewMode"
              @select="$emit('select', element)"
              @update="updateElement(index, $event)"
            />
          </div>
        </div>

        <!-- Preview Mode -->
        <div
          v-else
          class="space-y-4"
        >
          <component
            v-for="element in column.elements"
            :key="element.id"
            :is="getElementComponent(element.type)"
            :element="element"
            :is-preview-mode="true"
          />
        </div>
      </div>
    </div>

    <!-- Add Column Button -->
    <div
      v-if="!isPreviewMode"
      class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
    >
      <button
        @click="addColumn"
        class="p-4 bg-white rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        title="Add Column"
      >
        <svg class="w-10 h-10 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>

    <!-- Element Settings Panel -->
    <ElementSettings
      v-if="selectedElement && !isPreviewMode"
      :element="selectedElement"
      @update="updateSelectedElement"
      @close="selectedElement = null"
      @delete="deleteSelectedElement"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import HeadingElement from './elements/HeadingElement.vue'
import ButtonElement from './elements/ButtonElement.vue'
import GalleryElement from './elements/GalleryElement.vue'
import ElementSettings from './ElementSettings.vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  isPreviewMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select', 'update', 'duplicate', 'delete', 'add-column', 'delete-column'])

const columns = ref([
  { elements: [] },
  { elements: [] }
])

const selectedElement = ref(null)
const selectedColumnIndex = ref(null)
const selectedElementIndex = ref(null)

const getElementComponent = (type) => {
  switch (type) {
    case 'heading':
      return HeadingElement
    case 'button':
      return ButtonElement
    case 'gallery':
      return GalleryElement
    default:
      return null
  }
}

const addColumn = () => {
  columns.value.push({
    elements: []
  })
  emit('update', { columns: columns.value })
}

const updateColumnWidths = () => {
  const totalColumns = columns.value.length
  if (totalColumns === 0) return

  const width = Math.floor(12 / totalColumns)
  columns.value.forEach(col => {
    col.width = width
  })
  emit('update', { columns: columns.value })
}

// Watch for changes in columns array
watch(columns, () => {
  updateColumnWidths()
}, { deep: true })

const addElement = (columnIndex) => {
  // Create a new heading element by default
  const newElement = {
    type: 'heading',
    id: Date.now().toString(),
    settings: {
      text: 'New Heading',
      level: '1',
      color: '#000000',
      fontSize: 24,
      fontSizeUnit: 'px',
      alignment: 'left',
      marginTop: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0
    }
  }
  
  if (!columns.value[columnIndex].elements) {
    columns.value[columnIndex].elements = []
  }
  
  columns.value[columnIndex].elements.push(newElement)
  selectElement(columnIndex, columns.value[columnIndex].elements.length - 1, newElement)
  emit('update', { columns: columns.value })
}

const selectElement = (columnIndex, elementIndex, element) => {
  selectedColumnIndex.value = columnIndex
  selectedElementIndex.value = elementIndex
  selectedElement.value = { ...element }
}

const updateSelectedElement = (updatedElement) => {
  if (selectedColumnIndex.value !== null && selectedElementIndex.value !== null) {
    columns.value[selectedColumnIndex.value].elements[selectedElementIndex.value] = updatedElement
    selectedElement.value = updatedElement
    emit('update', { columns: columns.value })
  }
}

const deleteSelectedElement = () => {
  if (selectedColumnIndex.value !== null && selectedElementIndex.value !== null) {
    columns.value[selectedColumnIndex.value].elements.splice(selectedElementIndex.value, 1)
    selectedElement.value = null
    selectedColumnIndex.value = null
    selectedElementIndex.value = null
    emit('update', { columns: columns.value })
  }
}

const updateElement = (columnIndex, updatedElement) => {
  const updatedColumns = [...props.columns]
  const elementIndex = updatedColumns[columnIndex].elements.findIndex(e => e.id === updatedElement.id)
  
  if (elementIndex !== -1) {
    updatedColumns[columnIndex].elements[elementIndex] = updatedElement
    emit('update', { columns: updatedColumns })
  }
}

const removeColumn = (index) => {
  columns.value.splice(index, 1)
  updateColumnWidths()
}

const handleDragOver = (event) => {
  event.dataTransfer.dropEffect = 'copy'
}

const handleDrop = (event, columnIndex) => {
  try {
    const elementData = JSON.parse(event.dataTransfer.getData('application/json'))
    
    // Create a new element with unique ID and default settings
    const newElement = {
      id: uuidv4(),
      type: elementData.type,
      settings: {
        ...elementData.defaultSettings,
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

    // Create a new array of columns with the updated column
    const updatedColumns = [...props.columns]
    if (!updatedColumns[columnIndex].elements) {
      updatedColumns[columnIndex].elements = []
    }
    updatedColumns[columnIndex].elements.push(newElement)

    // Emit the update event with the new columns
    emit('update', { columns: updatedColumns })
  } catch (error) {
    console.error('Error handling drop:', error)
  }
}
</script> 