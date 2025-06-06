<template>
  <div class="space-y-6">
    <!-- Layout -->
    <div>
      <h4 class="text-sm font-medium text-gray-900 mb-3">Layout</h4>
      <div class="space-y-4">
        <!-- Columns -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">Columns</label>
          <select
            v-model="localSettings.columns"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            @change="updateSettings"
          >
            <option value="1">1 Column</option>
            <option value="2">2 Columns</option>
            <option value="3">3 Columns</option>
            <option value="4">4 Columns</option>
          </select>
        </div>

        <!-- Gap -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">Gap</label>
          <div class="flex items-center gap-2">
            <input
              type="number"
              v-model="localSettings.gap"
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              @input="updateSettings"
            />
            <span class="text-sm text-gray-500">px</span>
          </div>
        </div>

        <!-- Aspect Ratio -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">Aspect Ratio</label>
          <select
            v-model="localSettings.aspectRatio"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            @change="updateSettings"
          >
            <option value="1/1">1:1 (Square)</option>
            <option value="4/3">4:3</option>
            <option value="16/9">16:9</option>
            <option value="3/4">3:4</option>
            <option value="9/16">9:16</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Image Settings -->
    <div>
      <h4 class="text-sm font-medium text-gray-900 mb-3">Image Settings</h4>
      <div class="space-y-4">
        <!-- Object Fit -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">Object Fit</label>
          <select
            v-model="localSettings.objectFit"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            @change="updateSettings"
          >
            <option value="cover">Cover</option>
            <option value="contain">Contain</option>
            <option value="fill">Fill</option>
          </select>
        </div>

        <!-- Border Radius -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">Border Radius</label>
          <div class="flex items-center gap-2">
            <input
              type="number"
              v-model="localSettings.borderRadius"
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              @input="updateSettings"
            />
            <span class="text-sm text-gray-500">px</span>
          </div>
        </div>

        <!-- Max Images -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">Maximum Images</label>
          <input
            type="number"
            v-model="localSettings.maxImages"
            min="1"
            max="12"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            @input="updateSettings"
          />
        </div>
      </div>
    </div>

    <!-- Image List -->
    <div v-if="localSettings.images && localSettings.images.length > 0">
      <h4 class="text-sm font-medium text-gray-900 mb-3">Images</h4>
      <div class="space-y-2">
        <div
          v-for="(image, index) in localSettings.images"
          :key="index"
          class="flex items-center gap-2 p-2 bg-gray-50 rounded-md"
        >
          <img
            :src="image.url"
            :alt="image.alt"
            class="w-12 h-12 object-cover rounded"
          />
          <div class="flex-1 min-w-0">
            <input
              type="text"
              v-model="image.alt"
              class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Image alt text"
              @input="updateSettings"
            />
          </div>
          <button
            @click="removeImage(index)"
            class="p-1 text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
          >
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  settings: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update'])

const localSettings = ref({
  columns: 3,
  gap: 16,
  aspectRatio: '1/1',
  objectFit: 'cover',
  borderRadius: 0,
  maxImages: 12,
  images: [],
  ...props.settings
})

watch(() => props.settings, (newSettings) => {
  localSettings.value = { ...localSettings.value, ...newSettings }
}, { deep: true })

const updateSettings = () => {
  emit('update', { ...localSettings.value })
}

const removeImage = (index) => {
  localSettings.value.images.splice(index, 1)
  updateSettings()
}
</script> 