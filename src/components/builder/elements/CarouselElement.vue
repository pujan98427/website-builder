<template>
  <BaseElement
    :element="element"
    :is-preview-mode="isPreviewMode"
    @select="$emit('select', element)"
  >
    <div class="w-full h-full relative" :style="containerStyles">
      <div
        class="w-full h-full overflow-hidden"
        :style="carouselStyles"
      >
        <div
          class="flex transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <div
            v-for="(slide, index) in element.settings?.slides || []"
            :key="index"
            class="w-full h-full flex-shrink-0"
          >
            <img
              v-if="slide.type === 'image'"
              :src="slide.src"
              :alt="slide.alt || ''"
              class="w-full h-full object-cover"
            />
            <div
              v-else-if="slide.type === 'content'"
              class="w-full h-full flex items-center justify-center"
              :style="contentStyles"
            >
              <div class="text-center">
                <h2
                  v-if="slide.title"
                  class="text-2xl font-bold mb-2"
                  :style="{ color: slide.titleColor || '#000000' }"
                >
                  {{ slide.title }}
                </h2>
                <p
                  v-if="slide.description"
                  class="text-lg"
                  :style="{ color: slide.descriptionColor || '#666666' }"
                >
                  {{ slide.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Navigation buttons -->
      <button
        v-if="!isPreviewMode || element.settings?.showControls"
        class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 shadow-lg"
        @click="prevSlide"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        v-if="!isPreviewMode || element.settings?.showControls"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 shadow-lg"
        @click="nextSlide"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <!-- Indicators -->
      <div
        v-if="!isPreviewMode || element.settings?.showIndicators"
        class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
      >
        <button
          v-for="(_, index) in element.settings?.slides || []"
          :key="index"
          class="w-2 h-2 rounded-full"
          :class="currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'"
          @click="currentSlide = index"
        ></button>
      </div>
    </div>
  </BaseElement>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
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

const currentSlide = ref(0)
let autoplayInterval = null

const containerStyles = computed(() => ({
  padding: `${props.element.settings?.paddingTop || 0}px ${props.element.settings?.paddingRight || 0}px ${props.element.settings?.paddingBottom || 0}px ${props.element.settings?.paddingLeft || 0}px`
}))

const carouselStyles = computed(() => ({
  borderRadius: props.element.settings?.borderRadius ? `${props.element.settings.borderRadius}px` : '0',
  backgroundColor: props.element.settings?.backgroundColor || 'transparent'
}))

const contentStyles = computed(() => ({
  backgroundColor: props.element.settings?.contentBackgroundColor || 'transparent',
  padding: `${props.element.settings?.contentPaddingTop || 0}px ${props.element.settings?.contentPaddingRight || 0}px ${props.element.settings?.contentPaddingBottom || 0}px ${props.element.settings?.contentPaddingLeft || 0}px`
}))

const nextSlide = () => {
  const slides = props.element.settings?.slides || []
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const prevSlide = () => {
  const slides = props.element.settings?.slides || []
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
}

onMounted(() => {
  if (props.element.settings?.autoplay && !props.isPreviewMode) {
    autoplayInterval = setInterval(() => {
      nextSlide()
    }, props.element.settings.autoplayInterval || 5000)
  }
})

onUnmounted(() => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
  }
})
</script> 