<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBuilderStore } from '../store/builderStore'
import DynamicRenderer from '../components/DynamicRenderer.vue'
import ElementSettings from '../components/ElementSettings.vue'

const route = useRoute()
const store = useBuilderStore()

const selectedElement = ref(null)
const currentPageId = ref('')

const availableElements = [
  { type: 'header', label: 'Header' },
  { type: 'paragraph', label: 'Paragraph' },
  { type: 'button', label: 'Button' },
  { type: 'image', label: 'Image' },
  { type: 'container', label: 'Container' }
]

onMounted(() => {
  store.loadFromLocalStorage()
  if (route.query.page) {
    currentPageId.value = route.query.page
    store.setCurrentPage(route.query.page)
  }
})

const handleDragStart = (event, element) => {
  event.dataTransfer.setData('element', JSON.stringify(element))
}

const handleDrop = (event) => {
  const elementData = JSON.parse(event.dataTransfer.getData('element'))
  store.addElement(elementData)
}

const selectElement = (element) => {
  selectedElement.value = element
}

const updateElement = (elementId, updates) => {
  store.updateElement(elementId, updates)
}

const addRow = () => {
  store.addElement({
    type: 'container',
    style: {
      display: 'flex',
      gap: '1rem',
      padding: '1rem'
    }
  })
}
</script> 
<template>
  <div class="h-full flex">
    <!-- Left Toolbox -->
    <aside class="w-64 bg-white shadow-lg p-4 overflow-y-auto">
      <div v-if="!selectedElement">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Elements</h3>
        <div class="space-y-2">
          <div
            v-for="element in availableElements"
            :key="element.type"
            class="p-2 border rounded cursor-move hover:bg-gray-50"
            draggable="true"
            @dragstart="handleDragStart($event, element)"
          >
            {{ element.label }}
          </div>
        </div>
      </div>
      <div v-else>
        <button
          @click="selectedElement = null"
          class="mb-4 text-sm text-gray-600 hover:text-gray-900"
        >
          ← Back to Elements
        </button>
        <ElementSettings
          :element="selectedElement"
          @update="updateElement"
        />
      </div>
    </aside>

    <!-- Main Builder Area -->
    <main class="flex-1 bg-gray-50 p-6 overflow-y-auto">
      <div class="max-w-7xl mx-auto">
        <!-- Page Selector -->
        <div class="mb-6">
          <select
            v-model="currentPageId"
            class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option v-for="page in store.pages" :key="page.id" :value="page.id">
              {{ page.name }}
            </option>
          </select>
        </div>

        <!-- Builder Area -->
        <div
          class="min-h-[500px] bg-white rounded-lg shadow p-6"
          @dragover.prevent
          @drop="handleDrop"
        >
          <div v-if="!store.elements.length" class="text-center py-12">
            <button
              @click="addRow"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Add Row
            </button>
          </div>
          <template v-else>
            <div
              v-for="element in store.elements"
              :key="element.id"
              class="relative group"
              @click="selectElement(element)"
            >
              <DynamicRenderer
                :element="element"
                @update="updateElement"
              />
              <div
                v-if="selectedElement?.id === element.id"
                class="absolute inset-0 border-2 border-indigo-500 pointer-events-none"
              ></div>
            </div>
          </template>
        </div>
      </div>
    </main>
  </div>
</template>

