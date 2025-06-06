<template>
  <div class="h-screen flex bg-gray-100">
    <!-- Left Sidebar - Dark Theme -->
    <aside class="w-64 bg-gray-900 text-gray-100 flex flex-col border-r border-gray-800">
      <div class="p-6 border-b border-gray-800">
        <h1 class="text-xl font-bold tracking-tight">Elements</h1>
      </div>
      <div class="flex-1 overflow-y-auto p-4 space-y-2">
        <div
          v-for="component in availableComponents"
          :key="component.type"
          class="flex items-center gap-3 p-3 rounded-lg cursor-move hover:bg-gray-800 transition-colors select-none"
          :data-component-type="component.type"
          @mousedown="startDrag(component)"
        >
          <component :is="component.icon" class="w-5 h-5 text-gray-400" />
          <span class="text-sm font-medium">{{ component.label }}</span>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col items-center justify-start pt-12">
      <!-- Top Bar (minimal) -->
      <div class="w-full max-w-5xl flex items-center justify-between mb-8 px-2">
        <div class="text-2xl font-bold text-gray-800">Demo Site</div>
        <div class="flex gap-2">
          <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
          <button class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Preview</button>
        </div>
      </div>
      <!-- Canvas Area -->
      <div class="w-full max-w-5xl flex-1 flex flex-col items-center">
        <div
          class="w-full min-h-[300px] bg-white rounded-lg border-2 border-dashed border-pink-600 flex flex-col items-center justify-center relative"
        >
          <template v-if="rows.length === 0">
            <button
              @click="addSection"
              class="flex flex-col items-center justify-center gap-2 p-6 text-pink-700 hover:text-pink-900 focus:outline-none"
            >
              <span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-pink-100">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </span>
              <span class="font-semibold text-lg">Drag widget here</span>
              <span class="text-xs text-gray-400">or click to add a section</span>
            </button>
          </template>
          <template v-else>
            <Row
              v-for="row in rows"
              :key="row.id"
              :row="row"
              :is-preview-mode="isPreviewMode"
              @update:row="updateRow"
              @delete-row="deleteRow"
            />
          </template>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// Import your Row component and icons here
// import Row from './Row.vue'
// import { TextIcon, HeadingIcon, ImageIcon, ButtonIcon, VideoIcon, DividerIcon, FormIcon } from './icons'

const availableComponents = [
  { type: 'text', label: 'Text', icon: 'TextIcon' },
  { type: 'heading', label: 'Heading', icon: 'HeadingIcon' },
  { type: 'image', label: 'Image', icon: 'ImageIcon' },
  { type: 'button', label: 'Button', icon: 'ButtonIcon' },
  { type: 'video', label: 'Video', icon: 'VideoIcon' },
  { type: 'divider', label: 'Divider', icon: 'DividerIcon' },
  { type: 'form', label: 'Form', icon: 'FormIcon' }
]

const rows = ref([])
const isPreviewMode = ref(false)

const startDrag = (component) => {
  // Drag logic will be implemented with dnd-kit
}

const addSection = () => {
  // Add a new row/section to the canvas
  rows.value.push({ id: Date.now(), columns: [] })
}

const updateRow = (updatedRow) => {
  const index = rows.value.findIndex(row => row.id === updatedRow.id)
  if (index !== -1) rows.value[index] = updatedRow
}

const deleteRow = (rowId) => {
  rows.value = rows.value.filter(row => row.id !== rowId)
}
</script>

<style scoped>
/* Custom scrollbar for sidebar */
::-webkit-scrollbar {
  width: 8px;
  background: #23272f;
}
::-webkit-scrollbar-thumb {
  background: #2d323c;
  border-radius: 4px;
}
</style> 