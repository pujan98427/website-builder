<template>
  <BaseElement
    :element="element"
    :is-preview-mode="isPreviewMode"
    @select="$emit('select', element)"
  >
    <div class="w-full overflow-x-auto" :style="containerStyles">
      <table class="w-full" :style="tableStyles">
        <thead>
          <tr>
            <th
              v-for="(header, index) in element.settings?.headers || []"
              :key="index"
              class="px-4 py-2 text-left"
              :style="headerStyles"
            >
              <div
                v-if="!isPreviewMode"
                class="flex items-center space-x-2"
              >
                <input
                  type="text"
                  v-model="element.settings.headers[index]"
                  class="bg-transparent border-none focus:ring-0 p-0"
                  @blur="updateTable"
                />
                <button
                  class="text-gray-400 hover:text-gray-600"
                  @click="removeColumn(index)"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <span v-else>{{ header }}</span>
            </th>
            <th
              v-if="!isPreviewMode"
              class="px-4 py-2"
              :style="headerStyles"
            >
              <button
                class="text-gray-400 hover:text-gray-600"
                @click="addColumn"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in element.settings?.rows || []"
            :key="rowIndex"
            :style="rowStyles"
          >
            <td
              v-for="(cell, cellIndex) in row"
              :key="cellIndex"
              class="px-4 py-2"
              :style="cellStyles"
            >
              <div
                v-if="!isPreviewMode"
                class="flex items-center space-x-2"
              >
                <input
                  type="text"
                  v-model="element.settings.rows[rowIndex][cellIndex]"
                  class="bg-transparent border-none focus:ring-0 p-0 w-full"
                  @blur="updateTable"
                />
              </div>
              <span v-else>{{ cell }}</span>
            </td>
            <td
              v-if="!isPreviewMode"
              class="px-4 py-2"
              :style="cellStyles"
            >
              <button
                class="text-gray-400 hover:text-gray-600"
                @click="removeRow(rowIndex)"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </td>
          </tr>
          <tr v-if="!isPreviewMode">
            <td
              :colspan="(element.settings?.headers || []).length + 1"
              class="px-4 py-2 text-center"
              :style="cellStyles"
            >
              <button
                class="text-gray-400 hover:text-gray-600"
                @click="addRow"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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

const tableStyles = computed(() => ({
  borderCollapse: 'collapse',
  width: '100%',
  backgroundColor: props.element.settings?.backgroundColor || 'transparent',
  borderRadius: props.element.settings?.borderRadius ? `${props.element.settings.borderRadius}px` : '0'
}))

const headerStyles = computed(() => ({
  backgroundColor: props.element.settings?.headerBackgroundColor || '#f3f4f6',
  color: props.element.settings?.headerTextColor || '#1f2937',
  fontWeight: props.element.settings?.headerFontWeight || 'bold',
  borderBottom: `2px solid ${props.element.settings?.borderColor || '#e5e7eb'}`
}))

const rowStyles = computed(() => ({
  borderBottom: `1px solid ${props.element.settings?.borderColor || '#e5e7eb'}`,
  '&:hover': {
    backgroundColor: props.element.settings?.rowHoverBackgroundColor || '#f9fafb'
  }
}))

const cellStyles = computed(() => ({
  color: props.element.settings?.cellTextColor || '#374151',
  fontSize: `${props.element.settings?.cellFontSize || 14}px`
}))

const updateTable = () => {
  emit('update', props.element)
}

const addColumn = () => {
  const headers = [...(props.element.settings?.headers || [])]
  headers.push('New Column')
  
  const rows = (props.element.settings?.rows || []).map(row => [...row, ''])
  
  const updatedElement = {
    ...props.element,
    settings: {
      ...props.element.settings,
      headers,
      rows
    }
  }
  emit('update', updatedElement)
}

const removeColumn = (index) => {
  const headers = [...(props.element.settings?.headers || [])]
  headers.splice(index, 1)
  
  const rows = (props.element.settings?.rows || []).map(row => {
    const newRow = [...row]
    newRow.splice(index, 1)
    return newRow
  })
  
  const updatedElement = {
    ...props.element,
    settings: {
      ...props.element.settings,
      headers,
      rows
    }
  }
  emit('update', updatedElement)
}

const addRow = () => {
  const rows = [...(props.element.settings?.rows || [])]
  const newRow = Array((props.element.settings?.headers || []).length).fill('')
  rows.push(newRow)
  
  const updatedElement = {
    ...props.element,
    settings: {
      ...props.element.settings,
      rows
    }
  }
  emit('update', updatedElement)
}

const removeRow = (index) => {
  const rows = [...(props.element.settings?.rows || [])]
  rows.splice(index, 1)
  
  const updatedElement = {
    ...props.element,
    settings: {
      ...props.element.settings,
      rows
    }
  }
  emit('update', updatedElement)
}
</script> 