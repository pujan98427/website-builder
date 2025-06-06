<template>
  <div class="space-y-4">
    <h3 class="text-lg font-medium text-gray-900">Element Settings</h3>

    <!-- Content Settings -->
    <div v-if="element.type === 'header'">
      <label class="block text-sm font-medium text-gray-700">Heading Level</label>
      <select
        v-model="localElement.tag"
        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="h1">H1</option>
        <option value="h2">H2</option>
        <option value="h3">H3</option>
        <option value="h4">H4</option>
        <option value="h5">H5</option>
        <option value="h6">H6</option>
      </select>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Content</label>
      <input
        v-model="localElement.content"
        type="text"
        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>

    <!-- Style Settings -->
    <div class="space-y-4">
      <h4 class="text-sm font-medium text-gray-900">Style</h4>

      <!-- Colors -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Text Color</label>
        <input
          v-model="localElement.style.color"
          type="color"
          class="mt-1 block w-full"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Background Color</label>
        <input
          v-model="localElement.style.backgroundColor"
          type="color"
          class="mt-1 block w-full"
        />
      </div>

      <!-- Typography -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Font Size</label>
        <input
          v-model="localElement.style.fontSize"
          type="text"
          placeholder="e.g., 16px"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Font Weight</label>
        <select
          v-model="localElement.style.fontWeight"
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="lighter">Lighter</option>
        </select>
      </div>

      <!-- Spacing -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Padding</label>
        <div class="grid grid-cols-2 gap-2">
          <input
            v-model="localElement.style.padding"
            type="text"
            placeholder="e.g., 1rem"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Margin</label>
        <div class="grid grid-cols-2 gap-2">
          <input
            v-model="localElement.style.margin"
            type="text"
            placeholder="e.g., 1rem"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <!-- Border -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Border</label>
        <div class="grid grid-cols-2 gap-2">
          <input
            v-model="localElement.style.border"
            type="text"
            placeholder="e.g., 1px solid #ccc"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  element: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update'])

const localElement = ref({
  ...props.element,
  style: { ...props.element.style }
})

watch(
  localElement,
  (newValue) => {
    emit('update', newValue)
  },
  { deep: true }
)
</script> 