<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="close"></div>

    <!-- Modal -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative w-full max-w-2xl bg-white rounded-lg shadow-xl">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b">
          <h3 class="text-lg font-semibold text-gray-900">Upload Images</h3>
          <button @click="close" class="text-gray-400 hover:text-gray-500">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Tabs -->
        <div class="border-b">
          <nav class="flex">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'px-4 py-2 text-sm font-medium',
                activeTab === tab.id
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              ]"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <!-- Content -->
        <div class="p-4">
          <!-- Upload Tab -->
          <div v-if="activeTab === 'upload'" class="space-y-4">
            <div
              class="border-2 border-dashed border-gray-300 rounded-lg p-8"
              :class="{ 'border-blue-500 bg-blue-50': isDragging }"
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="handleDrop"
            >
              <div class="text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <div class="mt-4">
                  <p class="text-sm text-gray-600">
                    Drag and drop your images here, or
                    <button
                      @click="triggerFileInput"
                      class="text-blue-500 hover:text-blue-600 font-medium"
                    >
                      browse
                    </button>
                  </p>
                  <p class="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              <input
                ref="fileInput"
                type="file"
                multiple
                accept="image/*"
                class="hidden"
                @change="handleFileSelect"
              >
            </div>

            <!-- Upload Progress -->
            <div v-if="uploadingImages.length > 0" class="space-y-4">
              <h4 class="text-sm font-medium text-gray-900">Uploading Images</h4>
              <div class="space-y-3">
                <div
                  v-for="(image, index) in uploadingImages"
                  :key="index"
                  class="bg-gray-50 rounded-lg p-3"
                >
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-600 truncate max-w-[200px]">{{ image.file.name }}</span>
                    <span class="text-sm font-medium" :class="{
                      'text-blue-600': image.status === 'uploading',
                      'text-green-600': image.status === 'completed',
                      'text-red-600': image.status === 'error'
                    }">
                      {{ image.status === 'uploading' ? `${image.progress}%` : image.status }}
                    </span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div
                      class="h-2 rounded-full transition-all duration-300"
                      :class="{
                        'bg-blue-600': image.status === 'uploading',
                        'bg-green-600': image.status === 'completed',
                        'bg-red-600': image.status === 'error'
                      }"
                      :style="{ width: `${image.progress}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Uploaded Images Tab -->
          <div v-if="activeTab === 'uploaded'" class="space-y-4">
            <div v-if="uploadedImages.length === 0" class="text-center py-8 text-gray-500">
              No images uploaded yet
            </div>
            <div v-else class="grid grid-cols-3 gap-4">
              <div
                v-for="image in uploadedImages"
                :key="image.id"
                class="relative group aspect-square"
              >
                <img
                  :src="image.url"
                  :alt="image.alt"
                  class="w-full h-full object-cover rounded-lg"
                />
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity rounded-lg flex items-center justify-center gap-2">
                  <button
                    @click="selectImage(image)"
                    class="opacity-0 group-hover:opacity-100 bg-white p-2 rounded-full hover:bg-gray-100"
                    title="Select Image"
                  >
                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                  <button
                    @click="removeImage(image.id)"
                    class="opacity-0 group-hover:opacity-100 bg-white p-2 rounded-full hover:bg-gray-100"
                    title="Remove Image"
                  >
                    <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex justify-end gap-2 p-4 border-t">
          <button
            @click="close"
            class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'select'])

const activeTab = ref('upload')
const isDragging = ref(false)
const fileInput = ref(null)
const uploadedImages = ref([])
const uploadingImages = ref([])

const STORAGE_KEY = 'gallery_uploaded_images'

const tabs = [
  { id: 'upload', name: 'Upload Image' },
  { id: 'uploaded', name: 'Uploaded Images' }
]

// Load images from localStorage on component mount
onMounted(() => {
  loadStoredImages()
})

const loadStoredImages = () => {
  const storedImages = localStorage.getItem(STORAGE_KEY)
  if (storedImages) {
    uploadedImages.value = JSON.parse(storedImages)
  }
}

const saveImagesToStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(uploadedImages.value))
}

const close = () => {
  emit('close')
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  handleFiles(files)
}

const handleDrop = (event) => {
  isDragging.value = false
  const files = Array.from(event.dataTransfer.files)
  handleFiles(files)
}

const simulateUpload = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    const imageData = {
      file,
      progress: 0,
      status: 'uploading'
    }
    
    uploadingImages.value.push(imageData)
    
    // Simulate upload progress
    const interval = setInterval(() => {
      imageData.progress += 10
      if (imageData.progress >= 100) {
        clearInterval(interval)
        imageData.status = 'completed'
        resolve()
      }
    }, 200)
    
    reader.onload = (e) => {
      const newImage = {
        url: e.target.result,
        alt: file.name,
        id: Date.now() + Math.random().toString(36).substr(2, 9) // Generate unique ID
      }
      uploadedImages.value.push(newImage)
      saveImagesToStorage() // Save to localStorage after adding new image
    }
    reader.readAsDataURL(file)
  })
}

const handleFiles = async (files) => {
  const imageFiles = files.filter(file => file.type.startsWith('image/'))
  
  for (const file of imageFiles) {
    try {
      await simulateUpload(file)
    } catch (error) {
      const imageData = uploadingImages.value.find(img => img.file === file)
      if (imageData) {
        imageData.status = 'error'
      }
    }
  }
  
  // Clear completed uploads after 2 seconds
  setTimeout(() => {
    uploadingImages.value = uploadingImages.value.filter(img => img.status === 'uploading')
  }, 2000)
}

const selectImage = (image) => {
  emit('select', image)
  close()
}

// Add function to remove image from storage
const removeImage = (imageId) => {
  uploadedImages.value = uploadedImages.value.filter(img => img.id !== imageId)
  saveImagesToStorage()
}
</script> 