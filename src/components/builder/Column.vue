<template>
  <div 
    :class="`flex-1 min-h-[100px] relative group`"
    :style="{ flex: `0 0 ${(span / 12) * 100}%` }"
    draggable="true"
    @dragstart="handleDragStart"
    @dragover.prevent
    @drop="handleDrop"
  >
    <!-- Column Controls -->
    <div class="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <div class="flex gap-2">
        <!-- Element Type Selector -->
        <div class="relative">
          <button
            @click="showElementTypeMenu = !showElementTypeMenu"
            class="p-2 text-gray-400 hover:text-gray-600 bg-white rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Change Element Type"
          >
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <!-- Element Type Menu -->
          <div v-if="showElementTypeMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
            <div class="py-1">
              <div class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Basic</div>
              <button
                v-for="type in basicElements"
                :key="type.value"
                @click="changeElementType(type.value)"
                class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                {{ type.label }}
              </button>
              <div class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Advanced</div>
              <button
                v-for="type in advancedElements"
                :key="type.value"
                @click="changeElementType(type.value)"
                class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                {{ type.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- Style Editor -->
        <div class="relative">
          <button
            @click="showStyleEditor = !showStyleEditor"
            class="p-2 text-gray-400 hover:text-gray-600 bg-white rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Edit Styles"
          >
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </button>
          <!-- Style Editor Panel -->
          <div v-if="showStyleEditor" class="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-10">
            <div class="p-4">
              <!-- Typography -->
              <div class="mb-4">
                <h4 class="text-sm font-medium text-gray-900 mb-2">Typography</h4>
                <div class="space-y-2">
                  <select v-model="styles.fontFamily" class="w-full text-sm border-gray-300 rounded-md">
                    <option value="sans">Sans Serif</option>
                    <option value="serif">Serif</option>
                    <option value="mono">Monospace</option>
                  </select>
                  <div class="flex gap-2">
                    <input v-model="styles.fontSize" type="number" class="w-20 text-sm border-gray-300 rounded-md" placeholder="Size" />
                    <select v-model="styles.fontWeight" class="flex-1 text-sm border-gray-300 rounded-md">
                      <option value="normal">Normal</option>
                      <option value="bold">Bold</option>
                      <option value="light">Light</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Colors -->
              <div class="mb-4">
                <h4 class="text-sm font-medium text-gray-900 mb-2">Colors</h4>
                <div class="space-y-2">
                  <div class="flex items-center gap-2">
                    <label class="text-sm text-gray-600">Text:</label>
                    <input v-model="styles.color" type="color" class="w-8 h-8 rounded-md" />
                  </div>
                  <div class="flex items-center gap-2">
                    <label class="text-sm text-gray-600">Background:</label>
                    <input v-model="styles.backgroundColor" type="color" class="w-8 h-8 rounded-md" />
                  </div>
                </div>
              </div>

              <!-- Spacing -->
              <div class="mb-4">
                <h4 class="text-sm font-medium text-gray-900 mb-2">Spacing</h4>
                <div class="grid grid-cols-2 gap-2">
                  <div>
                    <label class="text-sm text-gray-600">Padding:</label>
                    <input v-model="styles.padding" type="number" class="w-full text-sm border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label class="text-sm text-gray-600">Margin:</label>
                    <input v-model="styles.margin" type="number" class="w-full text-sm border-gray-300 rounded-md" />
                  </div>
                </div>
              </div>

              <!-- Border -->
              <div class="mb-4">
                <h4 class="text-sm font-medium text-gray-900 mb-2">Border</h4>
                <div class="space-y-2">
                  <div class="flex gap-2">
                    <input v-model="styles.borderWidth" type="number" class="w-20 text-sm border-gray-300 rounded-md" placeholder="Width" />
                    <select v-model="styles.borderStyle" class="flex-1 text-sm border-gray-300 rounded-md">
                      <option value="solid">Solid</option>
                      <option value="dashed">Dashed</option>
                      <option value="dotted">Dotted</option>
                    </select>
                  </div>
                  <div class="flex items-center gap-2">
                    <label class="text-sm text-gray-600">Color:</label>
                    <input v-model="styles.borderColor" type="color" class="w-8 h-8 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Delete Button -->
        <button
          @click="$emit('delete')"
          class="p-2 text-gray-400 hover:text-red-600 bg-white rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
          title="Delete Column"
        >
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Column Content -->
    <div 
      class="h-full bg-white rounded-lg border border-gray-200 p-4"
      :class="{ 'border-blue-500 ring-2 ring-blue-500': isDragging }"
      :style="computedStyles"
    >
      <!-- Text Editor -->
      <EditableText
        v-if="elementType === 'text'"
        v-model="content"
        @update:modelValue="updateContent"
        @dragstart="handleContentDragStart"
        @dragover.prevent
        @drop="handleContentDrop"
      />

      <!-- Heading Editor -->
      <Heading
        v-else-if="elementType === 'heading'"
        v-model="content"
        :level="headingLevel"
        @update:modelValue="updateContent"
        @update:level="updateHeadingLevel"
        @dragstart="handleContentDragStart"
        @dragover.prevent
        @drop="handleContentDrop"
      />

      <!-- Image Editor -->
      <div v-else-if="elementType === 'image'" class="h-full">
        <div
          v-if="!content"
          class="h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4"
          @click="triggerImageUpload"
        >
          <div class="text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p class="mt-2 text-sm text-gray-500">Click to upload an image</p>
          </div>
        </div>
        <div v-else class="relative group">
          <img :src="content" class="w-full h-full object-cover rounded-lg" />
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
            <button
              @click="triggerImageUpload"
              class="p-2 text-white opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 rounded-md hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </button>
          </div>
        </div>
        <input
          ref="imageInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleImageUpload"
        />
      </div>

      <!-- Button Editor -->
      <div v-else-if="elementType === 'button'" class="h-full flex items-center justify-center">
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          :style="computedStyles"
        >
          {{ content || 'Click to edit button text' }}
        </button>
      </div>

      <!-- Form Editor -->
      <div v-else-if="elementType === 'form'" class="h-full">
        <form class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Message</label>
            <textarea class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" rows="3"></textarea>
          </div>
          <button type="submit" class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Submit
          </button>
        </form>
      </div>

      <!-- Gallery Editor -->
      <div v-else-if="elementType === 'gallery'" class="h-full">
        <div class="grid grid-cols-3 gap-4">
          <div
            v-for="(image, index) in galleryImages"
            :key="index"
            class="relative aspect-square"
          >
            <img :src="image" class="w-full h-full object-cover rounded-lg" />
            <button
              @click="removeGalleryImage(index)"
              class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div
            v-if="galleryImages.length < 9"
            class="aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
            @click="addGalleryImage"
          >
            <svg class="w-8 h-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import EditableText from './EditableText.vue'
import Heading from './Heading.vue'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  },
  span: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['delete', 'resize', 'move', 'content-move'])

// Element Types
const basicElements = [
  { label: 'Text', value: 'text' },
  { label: 'Heading', value: 'heading' },
  { label: 'Image', value: 'image' },
  { label: 'Button', value: 'button' }
]

const advancedElements = [
  { label: 'Form', value: 'form' },
  { label: 'Gallery', value: 'gallery' },
  { label: 'Video', value: 'video' },
  { label: 'Map', value: 'map' }
]

// State
const showElementTypeMenu = ref(false)
const showStyleEditor = ref(false)
const elementType = ref('text')
const content = ref('')
const headingLevel = ref(2)
const isDragging = ref(false)
const imageInput = ref(null)
const galleryImages = ref([])

// Styles
const styles = ref({
  fontFamily: 'sans',
  fontSize: 16,
  fontWeight: 'normal',
  color: '#000000',
  backgroundColor: '#ffffff',
  padding: 16,
  margin: 0,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '#e5e7eb'
})

// Computed Styles
const computedStyles = computed(() => ({
  fontFamily: styles.value.fontFamily === 'sans' ? 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' :
              styles.value.fontFamily === 'serif' ? 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' :
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: `${styles.value.fontSize}px`,
  fontWeight: styles.value.fontWeight,
  color: styles.value.color,
  backgroundColor: styles.value.backgroundColor,
  padding: `${styles.value.padding}px`,
  margin: `${styles.value.margin}px`,
  borderWidth: `${styles.value.borderWidth}px`,
  borderStyle: styles.value.borderStyle,
  borderColor: styles.value.borderColor
}))

// Methods
const changeElementType = (type) => {
  elementType.value = type
  showElementTypeMenu.value = false
  // Reset content when changing element type
  content.value = ''
  galleryImages.value = []
}

const updateContent = (value) => {
  content.value = value
}

const updateHeadingLevel = (level) => {
  headingLevel.value = level
}

const handleDragStart = (e) => {
  isDragging.value = true
  e.dataTransfer.setData('text/plain', JSON.stringify({
    type: 'column',
    id: props.id
  }))
}

const handleDrop = (e) => {
  isDragging.value = false
  const data = JSON.parse(e.dataTransfer.getData('text/plain'))
  if (data.type === 'column') {
    emit('move', {
      sourceId: data.id,
      targetId: props.id
    })
  }
}

const handleContentDragStart = (e) => {
  e.dataTransfer.setData('text/plain', JSON.stringify({
    type: 'content',
    id: props.id,
    content: content.value
  }))
}

const handleContentDrop = (e) => {
  const data = JSON.parse(e.dataTransfer.getData('text/plain'))
  if (data.type === 'content') {
    emit('content-move', {
      sourceId: data.id,
      targetId: props.id
    })
  }
}

const triggerImageUpload = () => {
  imageInput.value.click()
}

const handleImageUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (elementType.value === 'gallery') {
        galleryImages.value.push(e.target.result)
      } else {
        content.value = e.target.result
      }
    }
    reader.readAsDataURL(file)
  }
}

const addGalleryImage = () => {
  triggerImageUpload()
}

const removeGalleryImage = (index) => {
  galleryImages.value.splice(index, 1)
}
</script> 