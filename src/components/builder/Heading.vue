<template>
  <div class="relative group">
    <!-- Heading Controls -->
    <div class="absolute -left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
      <div class="flex flex-col gap-2">
        <div class="bg-white shadow rounded-lg p-1">
          <select 
            v-model="level" 
            class="text-sm border-0 focus:ring-0"
            @change="$emit('update:level', level)"
          >
            <option value="h1">H1</option>
            <option value="h2">H2</option>
            <option value="h3">H3</option>
            <option value="h4">H4</option>
            <option value="h5">H5</option>
            <option value="h6">H6</option>
          </select>
        </div>
        <button @click="$emit('delete')" class="p-1 bg-white shadow rounded hover:bg-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Heading Content -->
    <div 
      class="relative"
      @click="startEditing"
      @blur="stopEditing"
    >
      <component 
        :is="level"
        v-if="!isEditing"
        class="text-gray-900 font-bold cursor-text hover:bg-gray-100 rounded px-2 py-1"
        :class="{
          'text-4xl': level === 'h1',
          'text-3xl': level === 'h2',
          'text-2xl': level === 'h3',
          'text-xl': level === 'h4',
          'text-lg': level === 'h5',
          'text-base': level === 'h6'
        }"
      >
        {{ text || 'Click to edit heading' }}
      </component>

      <input
        v-else
        ref="input"
        v-model="localText"
        class="w-full p-2 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        :class="{
          'text-4xl': level === 'h1',
          'text-3xl': level === 'h2',
          'text-2xl': level === 'h3',
          'text-xl': level === 'h4',
          'text-lg': level === 'h5',
          'text-base': level === 'h6'
        }"
        @keydown.enter.prevent="stopEditing"
        @keydown.esc="cancelEditing"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  level: {
    type: String,
    default: 'h2'
  }
})

const emit = defineEmits(['update:modelValue', 'update:level', 'delete'])

const isEditing = ref(false)
const localText = ref(props.modelValue)
const input = ref(null)
const level = ref(props.level)

const startEditing = () => {
  isEditing.value = true
  nextTick(() => {
    input.value?.focus()
  })
}

const stopEditing = () => {
  isEditing.value = false
  emit('update:modelValue', localText.value)
}

const cancelEditing = () => {
  localText.value = props.modelValue
  isEditing.value = false
}

watch(() => props.modelValue, (newValue) => {
  localText.value = newValue
})
</script> 