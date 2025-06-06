<template>
  <div class="relative">
    <!-- Carousel Controls -->
    <div class="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <div class="flex gap-2">
        <button
          @click="addSlide"
          class="p-2 text-gray-400 hover:text-gray-600 bg-white rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Add Slide"
        >
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Carousel Content -->
    <div class="relative overflow-hidden rounded-lg">
      <!-- Slides -->
      <div 
        class="flex transition-transform duration-300 ease-in-out"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="w-full flex-shrink-0 relative group"
        >
          <!-- Slide Content -->
          <div class="relative">
            <img 
              :src="slide.image" 
              class="w-full h-[300px] object-cover"
              :alt="slide.title"
            />
            <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div class="text-center text-white p-4">
                <h3 class="text-2xl font-bold mb-2">{{ slide.title }}</h3>
                <p class="text-lg">{{ slide.description }}</p>
              </div>
            </div>
            
            <!-- Slide Controls -->
            <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                @click="removeSlide(index)"
                class="p-2 text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Arrows -->
      <button
        v-if="slides.length > 1"
        @click="prevSlide"
        class="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white"
      >
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        v-if="slides.length > 1"
        @click="nextSlide"
        class="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white"
      >
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Dots Navigation -->
      <div
        v-if="slides.length > 1"
        class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
      >
        <button
          v-for="(_, index) in slides"
          :key="index"
          @click="currentSlide = index"
          class="w-2 h-2 rounded-full transition-colors"
          :class="currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'"
        ></button>
      </div>
    </div>

    <!-- Add Slide Modal -->
    <div v-if="showAddSlideModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Add New Slide</h3>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Title</label>
              <input
                v-model="newSlide.title"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                v-model="newSlide.description"
                rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Image</label>
              <div
                class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                @click="triggerImageUpload"
              >
                <div class="space-y-1 text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label class="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>Upload an image</span>
                      <input
                        ref="imageInput"
                        type="file"
                        accept="image/*"
                        class="sr-only"
                        @change="handleImageUpload"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end gap-3">
          <button
            @click="showAddSlideModal = false"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            @click="saveSlide"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Slide
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const slides = ref([
  {
    title: 'Welcome to Our Website',
    description: 'Discover amazing features and services',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }
])

const currentSlide = ref(0)
const showAddSlideModal = ref(false)
const imageInput = ref(null)
const newSlide = ref({
  title: '',
  description: '',
  image: ''
})

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
}

const addSlide = () => {
  showAddSlideModal.value = true
  newSlide.value = {
    title: '',
    description: '',
    image: ''
  }
}

const removeSlide = (index) => {
  slides.value.splice(index, 1)
  if (currentSlide.value >= slides.value.length) {
    currentSlide.value = Math.max(0, slides.value.length - 1)
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
      newSlide.value.image = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const saveSlide = () => {
  if (newSlide.value.title && newSlide.value.image) {
    slides.value.push({ ...newSlide.value })
    showAddSlideModal.value = false
  }
}
</script> 