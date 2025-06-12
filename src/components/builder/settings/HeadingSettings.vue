<template>
  <div class="space-y-6">
    <!-- Heading Level -->
    <div>
      <label class="block text-sm font-medium text-gray-900 mb-2">Heading Level</label>
      <select
        v-model="localSettings.level"
        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        @change="updateSettings"
      >
        <option value="1">H1</option>
        <option value="2">H2</option>
        <option value="3">H3</option>
        <option value="4">H4</option>
        <option value="5">H5</option>
        <option value="6">H6</option>
      </select>
    </div>

    <!-- Text Content -->
    <div>
      <label class="block text-sm font-medium text-gray-900 mb-2">Text Content</label>
      <input
        type="text"
        v-model="localSettings.text"
        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        @input="updateSettings"
      />
    </div>

    <!-- Text Color -->
    <div>
      <label class="block text-sm font-medium text-gray-900 mb-2">Text Color</label>
      <div class="flex items-center gap-2">
        <input
          type="color"
          v-model="localSettings.color"
          class="w-8 h-8 rounded-md cursor-pointer"
          @input="updateSettings"
        />
        <input
          type="text"
          v-model="localSettings.color"
          class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          @input="updateSettings"
        />
      </div>
    </div>

    <!-- Typography -->
    <div>
      <h4 class="text-sm font-medium text-gray-900 mb-3">Typography</h4>
      <div class="space-y-4">
        <!-- Font Family -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">Font Family</label>
          <select
            v-model="localSettings.fontFamily"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            @change="updateSettings"
          >
            <option value="sans">Sans Serif</option>
            <option value="serif">Serif</option>
            <option value="mono">Monospace</option>
          </select>
        </div>

        <!-- Font Size -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">Font Size</label>
          <div class="flex items-center gap-2">
            <input
              type="number"
              v-model="localSettings.fontSize"
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              @input="updateSettings"
            />
            <span class="text-sm text-gray-500">px</span>
          </div>
        </div>

        <!-- Font Weight -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">Font Weight</label>
          <select
            v-model="localSettings.fontWeight"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            @change="updateSettings"
          >
            <option value="normal">Normal</option>
            <option value="medium">Medium</option>
            <option value="semibold">Semibold</option>
            <option value="bold">Bold</option>
          </select>
        </div>

        <!-- Line Height -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">Line Height</label>
          <input
            type="number"
            v-model="localSettings.lineHeight"
            step="0.1"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            @input="updateSettings"
          />
        </div>

        <!-- Letter Spacing -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">Letter Spacing</label>
          <input
            type="text"
            v-model="localSettings.letterSpacing"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            @input="updateSettings"
          />
        </div>
      </div>
    </div>

    <!-- Text Alignment -->
    <div>
      <label class="block text-sm font-medium text-gray-900 mb-2">Text Alignment</label>
      <div class="flex gap-2">
        <button
          v-for="align in ['left', 'center', 'right']"
          :key="align"
          class="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="localSettings.alignment === align ? 'bg-blue-100 text-blue-700' : 'text-gray-500'"
          @click="updateAlignment(align)"
        >
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              v-if="align === 'left'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h10M4 18h12"
            />
            <path
              v-else-if="align === 'center'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M6 12h12M8 18h8"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M10 12h10M12 18h8"
            />
          </svg>
        </button>
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
  level: '1',
  text: '',
  fontFamily: 'sans',
  fontSize: 24,
  fontWeight: 'bold',
  lineHeight: 1.2,
  letterSpacing: 'normal',
  alignment: 'left',
  color: '#000000',
  ...props.settings
})

watch(() => props.settings, (newSettings) => {
  localSettings.value = { ...localSettings.value, ...newSettings }
}, { deep: true })

const updateSettings = () => {
  emit('update', { ...localSettings.value })
}

const updateAlignment = (align) => {
  localSettings.value.alignment = align
  updateSettings()
}
</script> 