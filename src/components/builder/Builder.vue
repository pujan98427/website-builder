<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Builder Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center gap-4">
            <h1 class="text-2xl font-semibold text-gray-900">Page Builder</h1>
            <span class="text-sm text-gray-500">/{{ pageId }}</span>
          </div>
          <div class="flex items-center gap-4">
            <button
              @click="savePage"
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Page
            </button>
            <button
              @click="previewPage"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Preview
            </button>
            <button
              @click="goToPages"
              class="px-4 py-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Back to Pages
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Builder Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex gap-8">
        <!-- Sidebar -->
        <div
          v-if="!isPreviewMode"
          class="w-64 flex-shrink-0"
        >
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Elements</h2>
            <div class="space-y-2">
              <div
                v-for="element in elements"
                :key="element.type"
                class="p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
                draggable="true"
                @dragstart="handleDragStart($event, element)"
              >
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm">
                    <component :is="element.icon" class="w-5 h-5 text-gray-600" />
                  </div>
                  <span class="text-sm font-medium text-gray-700">{{ element.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Builder Area -->
        <div class="flex-1">
          <!-- Rows -->
          <div class="space-y-8">
            <!-- Existing Rows -->
            <div
              v-for="(row, rowIndex) in pageContent.rows"
              :key="rowIndex"
              class="relative group"
            >
              <Row
                :columns="row.columns"
                :is-preview-mode="isPreviewMode"
                :row-index="rowIndex"
                @update="(event) => updateRow(rowIndex, event)"
                @select="selectElement"
                @delete-column="(index) => deleteColumn(rowIndex, index)"
                @duplicate="() => duplicateRow(rowIndex)"
                @add-column="() => addColumn(rowIndex)"
                @add-row-top="(columns) => addRowTop(rowIndex, columns)"
                @add-row-bottom="(columns) => addRowBelow(rowIndex, columns)"
                @delete="() => deleteRow(rowIndex)"
              />
            </div>

            <!-- Add Row Below (shown when there are no rows) -->
            <div
              v-if="!isPreviewMode && pageContent.rows.length === 0"
              class="mt-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <h3 class="text-sm font-medium text-gray-900 mb-3">Add Row Below</h3>
              <div class="grid grid-cols-3 gap-4">
                <button
                  v-for="columns in [1, 2, 3]"
                  :key="columns"
                  @click="createInitialRow(columns)"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePagesStore } from '@/store/pages'
import Row from './Row.vue'
import HeadingElement from './elements/HeadingElement.vue'
import ButtonElement from './elements/ButtonElement.vue'
import GalleryElement from './elements/GalleryElement.vue'

const route = useRoute()
const router = useRouter()
const pagesStore = usePagesStore()

const isPreviewMode = ref(false)
const pageContent = ref({
  rows: []
})

const pageId = computed(() => route.params.id || 'home')

const elements = [
  {
    type: 'heading',
    label: 'Heading',
    icon: 'svg',
    defaultSettings: {
      text: 'New Heading',
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
  },
  {
    type: 'button',
    label: 'Button',
    icon: 'svg',
    defaultSettings: {
      text: 'Click me',
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
  },
  {
    type: 'gallery',
    label: 'Gallery',
    icon: 'svg',
    defaultSettings: {
      columns: 3,
      gap: 16,
      images: [],
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
]

onMounted(() => {
  // Load page content from store
  pageContent.value = pagesStore.loadPage(pageId.value)
})

const togglePreview = () => {
  isPreviewMode.value = !isPreviewMode.value
}

const createInitialRow = (columns) => {
  pageContent.value.rows = [{
    columns: Array(columns).fill().map(() => ({ elements: [] }))
  }]
  savePage()
}

const addRow = (columns) => {
  pageContent.value.rows.push({
    columns: Array(columns).fill().map(() => ({ elements: [] }))
  })
  savePage()
}

const addRowBelow = (index, columns) => {
  console.log('addRowBelow received:', { index, columns, type: typeof columns })
  if (typeof columns !== 'number' || columns <= 0) {
    console.error('Invalid column count:', columns)
    return
  }
  
  // Create new state without modifying the original
  const newRows = [...pageContent.value.rows]
  const newRow = {
    columns: Array(columns).fill().map(() => ({ elements: [] }))
  }
  newRows.splice(index + 1, 0, newRow)
  
  // Update state in a single operation
  pageContent.value = {
    ...pageContent.value,
    rows: newRows
  }
  
  // Save after state update
  nextTick(() => {
    savePage()
  })
}

const deleteRow = (index) => {
  if (confirm('Are you sure you want to delete this row?')) {
    const newRows = [...pageContent.value.rows]
    newRows.splice(index, 1)
    pageContent.value = {
      ...pageContent.value,
      rows: newRows
    }
    savePage()
  }
}

const deleteColumn = (rowIndex, columnIndex) => {
  if (pageContent.value.rows[rowIndex].columns.length > 1) {
    if (confirm('Are you sure you want to delete this column?')) {
      const newRows = [...pageContent.value.rows]
      newRows[rowIndex].columns.splice(columnIndex, 1)
      pageContent.value = {
        ...pageContent.value,
        rows: newRows
      }
      savePage()
    }
  } else {
    alert('Cannot delete the last column. Delete the entire row instead.')
  }
}

const updateRow = (index, updatedRow) => {
  const newRows = [...pageContent.value.rows]
  newRows[index] = updatedRow
  pageContent.value = {
    ...pageContent.value,
    rows: newRows
  }
  savePage()
}

const selectElement = (element) => {
  // Handle element selection
}

const handleDragStart = (event, element) => {
  const elementData = {
    type: element.type,
    defaultSettings: {
      ...element.defaultSettings,
      text: element.type === 'heading' ? 'New Heading' : 
            element.type === 'button' ? 'Click me' : '',
      level: element.type === 'heading' ? '1' : undefined,
      variant: element.type === 'button' ? 'primary' : undefined,
      size: element.type === 'button' ? 'medium' : undefined,
      columns: element.type === 'gallery' ? 3 : undefined,
      gap: element.type === 'gallery' ? 16 : undefined,
      images: element.type === 'gallery' ? [] : undefined,
      color: element.type === 'heading' ? '#000000' : undefined,
      fontSize: element.type === 'heading' ? 24 : undefined,
      fontSizeUnit: element.type === 'heading' ? 'px' : undefined,
      alignment: element.type === 'heading' ? 'left' : undefined
    }
  }
  event.dataTransfer.setData('application/json', JSON.stringify(elementData))
  event.dataTransfer.effectAllowed = 'copy'
}

const savePage = () => {
  pagesStore.savePage(pageId.value, pageContent.value)
}

const previewPage = () => {
  const baseUrl = window.location.origin
  window.open(`${baseUrl}/${pageId.value}`, '_blank')
}

const goToPages = () => {
  router.push('/pages')
}

const duplicateRow = (index) => {
  const newRows = [...pageContent.value.rows]
  const rowToDuplicate = { ...newRows[index] }
  newRows.splice(index + 1, 0, rowToDuplicate)
  pageContent.value = {
    ...pageContent.value,
    rows: newRows
  }
  savePage()
}

const addColumn = (rowIndex) => {
  const newRows = [...pageContent.value.rows]
  if (!newRows[rowIndex].columns) {
    newRows[rowIndex].columns = []
  }
  newRows[rowIndex].columns.push({ elements: [] })
  pageContent.value = {
    ...pageContent.value,
    rows: newRows
  }
  savePage()
}

const addRowTop = (index, columns) => {
  console.log('addRowTop received:', { index, columns, type: typeof columns })
  if (typeof columns !== 'number' || columns <= 0) {
    console.error('Invalid column count:', columns)
    return
  }
  
  // Create new state without modifying the original
  const newRows = [...pageContent.value.rows]
  const newRow = {
    columns: Array(columns).fill().map(() => ({ elements: [] }))
  }
  newRows.splice(index, 0, newRow)
  
  // Update state in a single operation
  pageContent.value = {
    ...pageContent.value,
    rows: newRows
  }
  
  // Save after state update
  nextTick(() => {
    savePage()
  })
}
</script> 