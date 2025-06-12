<template>
  <div
    :class="[
      'relative group',
      { 'cursor-pointer hover:ring-2 hover:ring-blue-500 rounded-lg': !isPreviewMode }
    ]"
    @click="!isPreviewMode && handleGalleryClick"
    @dragover.prevent="handleDragOver"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="handleDrop"
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
  >
    <div
      :class="[
        'grid gap-4',
        `grid-cols-${element.settings.columns}`,
        { 'border-2 border-dashed border-blue-500 bg-blue-50': isDragging }
      ]"
      :style="{ gap: `${element.settings.gap}px` }"
    >
      <!-- Default Gallery Items -->
      <template v-if="!element.settings.images || element.settings.images.length === 0">
        <div
          v-for="i in 3"
          :key="i"
          class="relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
        >
          <div class="absolute inset-0 flex items-center justify-center text-gray-400">
            <svg class="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </template>

      <!-- User Added Images -->
      <template v-else>
        <div
          v-for="(image, index) in element.settings.images"
          :key="index"
          class="relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
        >
          <img
            v-if="image.url"
            :src="image.url"
            :alt="image.alt"
            class="w-full h-full object-cover"
          />
          <div
            v-else
            class="absolute inset-0 flex items-center justify-center text-gray-400"
          >
            <svg class="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          <!-- Image Controls -->
          <div
            v-if="!isPreviewMode"
            class="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
          >
            <button
              @click.stop="openImageUploadModal(index)"
              class="p-2 bg-white rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Upload Image"
            >
              <svg class="w-5 h-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </button>
            <button
              @click.stop="removeImage(index)"
              class="p-2 bg-white rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
              title="Remove Image"
            >
              <svg class="w-5 h-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </template>

      <!-- Add Image Button -->
      <button
        v-if="!isPreviewMode && (!element.settings.images || element.settings.images.length < 12)"
        @click.stop="openImageUploadModal()"
        class="aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors flex items-center justify-center"
      >
        <svg class="w-12 h-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>

    <!-- Element Controls -->
    <div
      v-if="!isPreviewMode"
      class="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <button
        @click.stop="$emit('select', element)"
        class="p-1 bg-white rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        title="Edit Gallery"
      >
        <svg class="w-4 h-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
    </div>

    <!-- Image Upload Modal -->
    <ImageUploadModal
      :is-open="showImageUploadModal"
      @close="showImageUploadModal = false"
      @select="handleImageSelect"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ImageUploadModal from '../modals/ImageUploadModal.vue'

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

const showImageUploadModal = ref(false)
const currentImageIndex = ref(null)
const isDragging = ref(false)

onMounted(() => {
  // Initialize default settings if not present
  if (!props.element.settings) {
    const updatedElement = {
      ...props.element,
      settings: {
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
    emit('update', updatedElement)
  }
})

const handleGalleryClick = (event) => {
  // If clicking on a button or its children, don't open the modal
  if (event.target.closest('button')) {
    return
  }
  
  // If clicking on an image or its container, don't open the modal
  if (event.target.closest('.aspect-square')) {
    return
  }
  
  // Open the modal for adding new images
  openImageUploadModal()
}

const openImageUploadModal = (index = null) => {
  currentImageIndex.value = index
  showImageUploadModal.value = true
}

const handleImageSelect = (image) => {
  const updatedElement = {
    ...props.element,
    settings: {
      ...props.element.settings,
      images: currentImageIndex.value !== null
        ? props.element.settings.images.map((img, i) => i === currentImageIndex.value ? image : img)
        : [...(props.element.settings.images || []), image]
    }
  }
  emit('update', updatedElement)
  showImageUploadModal.value = false
}

const removeImage = (index) => {
  const updatedElement = {
    ...props.element,
    settings: {
      ...props.element.settings,
      images: props.element.settings.images.filter((_, i) => i !== index)
    }
  }
  emit('update', updatedElement)
}

const handleDragOver = (event) => {
  if (!props.isPreviewMode) {
    isDragging.value = true
  }
}

const handleDrop = async (event) => {
  isDragging.value = false
  if (props.isPreviewMode) return

  const files = Array.from(event.dataTransfer.files)
  const imageFiles = files.filter(file => file.type.startsWith('image/'))

  for (const file of imageFiles) {
    try {
      const image = await processFile(file)
      handleImageSelect(image)
    } catch (error) {
      console.error('Error processing file:', error)
    }
  }
}

const processFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      resolve({
        url: e.target.result,
        alt: file.name,
        id: Date.now() + Math.random().toString(36).substr(2, 9)
      })
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
</script>

<style scoped>
.grid {
  display: grid;
  gap: 1rem;
}

.aspect-square {
  aspect-ratio: 1/1;
}
</style> 