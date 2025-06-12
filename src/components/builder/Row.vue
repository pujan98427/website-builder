<template>
  <div 
    class="relative w-full min-h-[300px] p-8 mb-12"
    :class="{ 'border-2 border-dashed border-gray-300 rounded-lg': !isPreviewMode }"
  >
    <!-- Row Controls -->
    <div class="absolute -left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
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
           @click="addColumn"
          class="p-2 text-gray-400 hover:text-gray-600 bg-white rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Add Column"
        >
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <button
          @click="deleteRow(rowIndex)"
          class="p-2 text-gray-400 hover:text-red-600 bg-white rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
          title="Delete Row"
        >
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
   <!-- Add row top Button -->
   <div
      v-if="!isPreviewMode"
      class="absolute top-0 z-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <button
        @click="showAddRowOptions = true; addRowPosition = 'top'"
        class="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 add-row-button"
        title="Add row"
      >
        <svg class="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>

    <!-- Add Row Options -->
    <div
      v-if="showAddRowOptions && !isPreviewMode"
      :class="[
        'absolute z-20 left-1/2 transform max-w-[720px] w-full -translate-x-1/2 add-row-options-panel',
      ]"
    >
      <div class="p-4 bg-white rounded-lg shadow-lg border border-gray-200">
        <h3 class="text-sm font-medium text-gray-900 mb-3">Add Row</h3>
        <div class="grid grid-cols-3 gap-4">
          <button
            v-for="columns in [1, 2, 3]"
            :key="columns"
            @click="() => handleAddRow(columns)"
            class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div class="flex gap-2">
              <div
                v-for="i in columns"
                :key="i"
                class="flex-1 h-12 bg-white rounded-md shadow-sm"
              ></div>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Row Content -->
    <div class="grid grid-cols-12 gap-4 " :style="{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }">
      <div
        v-for="(column, columnIndex) in columns"
        :key="columnIndex"
        class="relative min-h-[100px] p-4"
        :class="[
          `col-span-${column.width || 6}`,
          { 'border-2 border-dashed border-gray-300 rounded-lg': !isPreviewMode }
        ]"
        @dragover.prevent="handleDragOver"
        @drop.prevent="(event) => handleDrop(event, columnIndex)"
      >
        <!-- Empty Column Placeholder -->
        <div
          v-if="!column.elements || column.elements.length === 0"
          class="flex items-center justify-center h-full text-gray-500"
        >
          Drop elements here
        </div>
        <div v-else class="space-y-4">
          <div
            v-for="element in column.elements"
            :key="element.id"
            class="relative group/element"
          >
            <!-- Element Preview -->
            <div
              class="p-4  rounded-lg  border-gray-200 hover:border-blue-500 transition-colors"
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
              @click="handleElementSelect(element, columnIndex)"
            >
              <component
                :is="getElementComponent(element.type)"
                :element="element"
                :is-preview-mode="isPreviewMode"
                @select="(el) => handleElementSelect(el, columnIndex)"
              />
            </div>

            <!-- Element Controls -->
            <div
              class="absolute -top-2 -right-2 opacity-0 group-hover/element:opacity-100 transition-opacity"
            >
              <button
                @click="$emit('select', element)"
                class="p-1 bg-white rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Edit Element"
              >
                <svg class="w-4 h-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  

    <!-- Add row below Button -->
    <div
      v-if="!isPreviewMode"
      class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
    >
      <button
        @click="showAddRowOptions = true; addRowPosition = 'bottom'"
        class="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 add-row-button"
        title="Add row"
      >
        <svg class="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
import { ref, onMounted, watch, onUnmounted, nextTick } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import HeadingElement from './elements/HeadingElement.vue'
import ButtonElement from './elements/ButtonElement.vue'
import GalleryElement from './elements/GalleryElement.vue'
import AnchorElement from './elements/AnchorElement.vue'
import ElementSettings from './ElementSettings.vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  isPreviewMode: {
    type: Boolean,
    default: false
  },
  rowIndex: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['select', 'update', 'duplicate', 'delete', 'add-column', 'delete-column', 'add-row-top', 'add-row-bottom'])

const showAddRowOptions = ref(false)
const addRowPosition = ref(null) // 'top' or 'bottom'

const deleteRow = () => {
  emit('delete', props.rowIndex)
}

const selectedElement = ref(null)
const selectedColumnIndex = ref(null)
const selectedElementIndex = ref(null)

const getElementComponent = (type) => {
  const components = {
    heading: HeadingElement,
    button: ButtonElement,
    gallery: GalleryElement,
    anchor: AnchorElement
  }
  return components[type]
}

const addColumn = () => {
  const updatedColumns = [...props.columns, { elements: [] }]
  
  nextTick(() => {
    emit('update', { columns: updatedColumns })
  })
}

const updateColumnWidths = () => {
  const totalColumns = props.columns.length
  if (totalColumns === 0) return

  const width = Math.floor(12 / totalColumns)
  
  // Check if any column needs width update
  const needsUpdate = props.columns.some(col => col.width !== width)
  if (!needsUpdate) return

  const updatedColumns = props.columns.map(col => ({
    ...col,
    width
  }))
  
  nextTick(() => {
    emit('update', { columns: updatedColumns })
  })
}

// Watch for changes in columns array
watch(() => props.columns, () => {
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
  
  const updatedColumns = [...props.columns]
  if (!updatedColumns[columnIndex].elements) {
    updatedColumns[columnIndex].elements = []
  }
  
  updatedColumns[columnIndex].elements.push(newElement)
  selectElement(columnIndex, updatedColumns[columnIndex].elements.length - 1, newElement)
  emit('update', { columns: updatedColumns })
}

const selectElement = (columnIndex, elementIndex, element) => {
  selectedColumnIndex.value = columnIndex
  selectedElementIndex.value = elementIndex
  selectedElement.value = { ...element }
}

const handleElementSelect = (element, columnIndex) => {
  selectedElement.value = element
  selectedColumnIndex.value = columnIndex
  selectedElementIndex.value = props.columns[columnIndex].elements.findIndex(el => el.id === element.id)
  emit('select', element)
}

const updateSelectedElement = (updates) => {
  if (selectedElement.value && selectedColumnIndex.value !== null && selectedElementIndex.value !== null) {
    const updatedColumns = [...props.columns]
    const column = updatedColumns[selectedColumnIndex.value]
    
    // Update the element in the column
    column.elements[selectedElementIndex.value] = {
      ...column.elements[selectedElementIndex.value],
      ...updates,
      settings: {
        ...column.elements[selectedElementIndex.value].settings,
        ...(updates.settings || {})
      }
    }
    
    // Emit the update with the new columns
    emit('update', { columns: updatedColumns })
  }
}

const deleteSelectedElement = () => {
  if (selectedElement.value && selectedColumnIndex.value !== null && selectedElementIndex.value !== null) {
    const updatedColumns = [...props.columns]
    const column = updatedColumns[selectedColumnIndex.value]
    
    // Remove the element from the column
    column.elements.splice(selectedElementIndex.value, 1)
    
    // Emit the update with the new columns
    emit('update', { columns: updatedColumns })
    
    // Clear selection
    selectedElement.value = null
    selectedColumnIndex.value = null
    selectedElementIndex.value = null
  }
}

const updateElement = (columnIndex, updatedElement) => {
  const updatedColumns = [...props.columns]
  const elementIndex = updatedColumns[columnIndex].elements.findIndex(e => e.id === updatedElement.id)
  
  if (elementIndex !== -1) {
    updatedColumns[columnIndex].elements[elementIndex] = updatedElement
    
    nextTick(() => {
      emit('update', { columns: updatedColumns })
    })
  }
}

const removeColumn = (index) => {
  const updatedColumns = [...props.columns]
  updatedColumns.splice(index, 1)
  updateColumnWidths()
  
  nextTick(() => {
    emit('update', { columns: updatedColumns })
  })
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

    // Select the newly added element to open its settings
    selectElement(columnIndex, updatedColumns[columnIndex].elements.length - 1, newElement)

    // Emit the update event with the new columns
    nextTick(() => {
      emit('update', { columns: updatedColumns })
    })
  } catch (error) {
    console.error('Error handling drop:', error)
  }
}

// Add click outside handler
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const handleClickOutside = (event) => {
  // Check if click is outside the add row options panel
  const addRowOptionsPanel = document.querySelector('.add-row-options-panel')
  const addRowButton = document.querySelector('.add-row-button')
  
  if (addRowOptionsPanel && !addRowOptionsPanel.contains(event.target) && 
      addRowButton && !addRowButton.contains(event.target)) {
    showAddRowOptions.value = false
  }
}

const handleAddRow = (columns) => {
  const columnCount = Number(columns)
  if (isNaN(columnCount) || columnCount <= 0) {
    console.error('Invalid column count:', columns)
    return
  }
  
  // Store position before resetting state
  const position = addRowPosition.value
  
  // Reset state immediately
  showAddRowOptions.value = false
  addRowPosition.value = null
  
  // Use nextTick to ensure state is reset before emitting
  nextTick(() => {
    if (position === 'top') {
      emit('add-row-top', columnCount)
    } else {
      emit('add-row-bottom', columnCount)
    }
  })
}
</script> 