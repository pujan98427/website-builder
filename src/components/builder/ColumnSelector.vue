<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Select Column Layout</h3>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <!-- Single Column -->
          <button
            @click="$emit('select', [12])"
            class="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div class="h-20 bg-gray-100 rounded flex items-center justify-center">
              <div class="w-full h-8 bg-gray-200 rounded"></div>
            </div>
            <p class="mt-2 text-sm text-gray-600">Single Column</p>
          </button>

          <!-- Two Columns -->
          <button
            @click="$emit('select', [6, 6])"
            class="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div class="h-20 bg-gray-100 rounded flex items-center justify-center gap-2">
              <div class="w-1/2 h-8 bg-gray-200 rounded"></div>
              <div class="w-1/2 h-8 bg-gray-200 rounded"></div>
            </div>
            <p class="mt-2 text-sm text-gray-600">Two Columns</p>
          </button>

          <!-- Three Columns -->
          <button
            @click="$emit('select', [4, 4, 4])"
            class="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div class="h-20 bg-gray-100 rounded flex items-center justify-center gap-2">
              <div class="w-1/3 h-8 bg-gray-200 rounded"></div>
              <div class="w-1/3 h-8 bg-gray-200 rounded"></div>
              <div class="w-1/3 h-8 bg-gray-200 rounded"></div>
            </div>
            <p class="mt-2 text-sm text-gray-600">Three Columns</p>
          </button>

          <!-- Four Columns -->
          <button
            @click="$emit('select', [3, 3, 3, 3])"
            class="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div class="h-20 bg-gray-100 rounded flex items-center justify-center gap-2">
              <div class="w-1/4 h-8 bg-gray-200 rounded"></div>
              <div class="w-1/4 h-8 bg-gray-200 rounded"></div>
              <div class="w-1/4 h-8 bg-gray-200 rounded"></div>
              <div class="w-1/4 h-8 bg-gray-200 rounded"></div>
            </div>
            <p class="mt-2 text-sm text-gray-600">Four Columns</p>
          </button>

          <!-- Left Sidebar -->
          <button
            @click="$emit('select', [4, 8])"
            class="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div class="h-20 bg-gray-100 rounded flex items-center justify-center gap-2">
              <div class="w-1/3 h-8 bg-gray-200 rounded"></div>
              <div class="w-2/3 h-8 bg-gray-200 rounded"></div>
            </div>
            <p class="mt-2 text-sm text-gray-600">Left Sidebar</p>
          </button>

          <!-- Right Sidebar -->
          <button
            @click="$emit('select', [8, 4])"
            class="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div class="h-20 bg-gray-100 rounded flex items-center justify-center gap-2">
              <div class="w-2/3 h-8 bg-gray-200 rounded"></div>
              <div class="w-1/3 h-8 bg-gray-200 rounded"></div>
            </div>
            <p class="mt-2 text-sm text-gray-600">Right Sidebar</p>
          </button>
        </div>
      </div>
      <div class="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end">
        <button
          @click="$emit('close')"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['select', 'close'])
</script> 