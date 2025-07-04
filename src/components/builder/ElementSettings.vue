<template>
  <div class="fixed right-0 top-0 h-full w-80 bg-white shadow-lg border-l z-[999999] border-gray-200 overflow-y-auto">
    <div class="p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-medium text-gray-900">Element Settings</h3>
        <button
          @click="$emit('close')"
          class="p-2 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Basic Settings -->
      <div class="mb-8">
        <h4 class="text-sm font-medium text-gray-700 mb-4">Basic Settings</h4>
        
        <!-- Margin -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Margin</label>
          <div class="grid grid-cols-4 gap-4">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Top</label>
              <input
                type="number"
                v-model.number="localSettings.marginTop"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                @input="updateSettings"
              />
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Bottom</label>
              <input
                type="number"
                v-model.number="localSettings.marginBottom"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                @input="updateSettings"
              />
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Left</label>
              <input
                type="number"
                v-model.number="localSettings.marginLeft"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                @input="updateSettings"
              />
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Right</label>
              <input
                type="number"
                v-model.number="localSettings.marginRight"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                @input="updateSettings"
              />
            </div>
          </div>
        </div>

        <!-- Padding -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Padding</label>
          <div class="grid grid-cols-4 gap-4">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Top</label>
              <input
                type="number"
                v-model.number="localSettings.paddingTop"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                @input="updateSettings"
              />
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Bottom</label>
              <input
                type="number"
                v-model.number="localSettings.paddingBottom"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                @input="updateSettings"
              />
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Left</label>
              <input
                type="number"
                v-model.number="localSettings.paddingLeft"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                @input="updateSettings"
              />
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Right</label>
              <input
                type="number"
                v-model.number="localSettings.paddingRight"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                @input="updateSettings"
              />
            </div>
          </div>
        </div>

        <!-- Font Size -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
          <div class="flex gap-2">
            <input
              type="number"
              v-model.number="localSettings.fontSize"
              class="flex-1 max-w-[175px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              @input="updateSettings"
            />
            <select
              v-model="localSettings.fontSizeUnit"
              class="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              @change="updateSettings"
            >
              <option value="px">px</option>
              <option value="em">em</option>
              <option value="rem">rem</option>
            </select>
          </div>
        </div>

        <!-- Alignment -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Alignment</label>
          <div class="flex gap-2">
            <button
              v-for="align in ['left', 'center', 'right']"
              :key="align"
              @click="updateAlignment(align)"
              :class="[
                'flex-1 py-2 px-3 rounded-md border',
                localSettings.alignment === align
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              ]"
            >
              <svg
                v-if="align === 'left'"
                class="w-5 h-5 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h10M4 18h12" />
              </svg>
              <svg
                v-else-if="align === 'center'"
                class="w-5 h-5 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M6 12h12M8 18h8" />
              </svg>
              <svg
                v-else
                class="w-5 h-5 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M10 12h10M6 18h14" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Element Specific Settings -->
      <div class="mb-8">
        <h4 class="text-sm font-medium text-gray-700 mb-4">Element Settings</h4>

        <!-- Heading Settings -->
        <template v-if="element.type === 'heading'">
          <HeadingSettings 
            :settings="localSettings"
            @update="updateSettings"
          />
        </template>

        <!-- Button Settings -->
        <template v-if="element.type === 'button'">
          <ButtonSettings 
            :settings="localSettings"
            @update="updateSettings"
          />
        </template>

        <!-- Gallery Settings -->
        <template v-if="element.type === 'gallery'">
          <GallerySettings 
            :settings="localSettings"
            @update="updateSettings"
          />
        </template>

        <!-- Anchor Settings -->
        <template v-if="element.type === 'anchor'">
          <AnchorSettings 
            :settings="localSettings"
            @update="updateSettings"
          />
        </template>
      </div>

      <!-- Delete Button -->
      <button
        @click="$emit('delete')"
        class="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Delete Element
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import ButtonSettings from './settings/ButtonSettings.vue'
import HeadingSettings from './settings/HeadingSettings.vue'
import GallerySettings from './settings/GallerySettings.vue'
import AnchorSettings from './settings/AnchorSettings.vue'

const props = defineProps({
  element: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update', 'close', 'delete'])

const localSettings = ref({ ...props.element.settings })

watch(() => props.element, (newElement) => {
  localSettings.value = { ...newElement.settings }
}, { deep: true })

const updateSettings = () => {
  emit('update', {
    ...props.element,
    settings: { ...localSettings.value }
  })
}

const updateAlignment = (alignment) => {
  localSettings.value.alignment = alignment
  updateSettings()
}
</script> 