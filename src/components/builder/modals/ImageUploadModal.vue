<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="close"></div>

    <!-- Modal -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative w-full max-w-4xl bg-white rounded-lg shadow-xl">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b">
          <h3 class="text-lg font-medium text-gray-900">Upload Images</h3>
          <button
            @click="close"
            class="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
          >
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="p-4">
          <!-- Upload Area -->
          <div
            class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
            :class="{ 'border-blue-500 bg-blue-50': isDragging }"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
          >
            <input
              type="file"
              ref="fileInput"
              class="hidden"
              accept="image/*"
              multiple
              @change="handleFileSelect"
            />
            <div class="space-y-4">
              <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div class="text-sm text-gray-600">
                <button
                  type="button"
                  class="text-blue-600 hover:text-blue-500 font-medium"
                  @click="triggerFileSelect"
                >
                  Upload a file
                </button>
                or drag and drop
              </div>
              <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>

          <!-- Preview Grid -->
          <div v-if="previewImages.length > 0" class="mt-6">
            <h4 class="text-sm font-medium text-gray-900 mb-4">Selected Images</h4>
            <div class="grid grid-cols-4 gap-4">
              <div
                v-for="(image, index) in previewImages"
                :key="index"
                class="relative group aspect-square"
              >
                <img
                  :src="image.url"
                  :alt="image.alt"
                  class="w-full h-full object-cover rounded-lg"
                />
                <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <button
                    @click="removePreviewImage(index)"
                    class="p-2 bg-white rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <svg class="w-4 h-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-end gap-3 p-4 border-t">
          <button
            @click="close"
            class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
          >
            Cancel
          </button>
          <button
            @click="uploadImages"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
            :disabled="previewImages.length === 0"
          >
            Upload {{ previewImages.length }} Image{{ previewImages.length !== 1 ? 's' : '' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'upload'])

const fileInput = ref(null)
const isDragging = ref(false)
const previewImages = ref([])

const close = () => {
  previewImages.value = []
  emit('close')
}

const triggerFileSelect = () => {
  fileInput.value.click()
}

const handleFileSelect = (event) => {
  const files = event.target.files
  if (!files.length) return
  processFiles(files)
}

const handleDrop = (event) => {
  isDragging.value = false
  const files = event.dataTransfer.files
  if (!files.length) return
  processFiles(files)
}

const processFiles = (files) => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (!file.type.startsWith('image/')) continue

    const reader = new FileReader()
    reader.onload = (e) => {
      previewImages.value.push({
        url: e.target.result,
        alt: file.name,
        file: file
      })
    }
    reader.readAsDataURL(file)
  }
}

const removePreviewImage = (index) => {
  previewImages.value.splice(index, 1)
}

const uploadImages = () => {
  emit('upload', previewImages.value)
  close()
}
</script> 