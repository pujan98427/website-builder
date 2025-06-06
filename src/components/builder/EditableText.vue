<template>
  <div 
    class="relative group"
    @click="startEditing"
    @blur="stopEditing"
  >
    <!-- Display Mode -->
    <div 
      v-if="!isEditing" 
      class="min-h-[2em] p-2 rounded cursor-text hover:bg-gray-100"
      :class="{ 'border border-dashed border-gray-300': isEmpty }"
    >
      <div v-if="!isEmpty" class="text-gray-700" v-html="formattedText"></div>
      <p v-else class="text-gray-400 italic">Click to add text</p>
    </div>

    <!-- Edit Mode -->
    <div v-else class="relative">
      <textarea
        ref="textarea"
        v-model="localText"
        class="w-full p-2 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        :style="{ minHeight: '2em' }"
        @keydown.enter.prevent="stopEditing"
        @keydown.esc="cancelEditing"
      ></textarea>
      
      <!-- Formatting Toolbar -->
      <div class="absolute -top-8 left-0 bg-white shadow-lg rounded-lg p-1 flex gap-1">
        <!-- Text Style -->
        <div class="flex items-center gap-1 border-r pr-1">
          <button 
            @click="toggleFormat('bold')"
            class="p-1 hover:bg-gray-100 rounded"
            :class="{ 'bg-gray-100': isBold }"
            title="Bold"
          >
            <span class="font-bold">B</span>
          </button>
          <button 
            @click="toggleFormat('italic')"
            class="p-1 hover:bg-gray-100 rounded"
            :class="{ 'bg-gray-100': isItalic }"
            title="Italic"
          >
            <span class="italic">I</span>
          </button>
          <button 
            @click="toggleFormat('underline')"
            class="p-1 hover:bg-gray-100 rounded"
            :class="{ 'bg-gray-100': isUnderline }"
            title="Underline"
          >
            <span class="underline">U</span>
          </button>
        </div>

        <!-- Alignment -->
        <div class="flex items-center gap-1 border-r pr-1">
          <button 
            @click="setAlignment('left')"
            class="p-1 hover:bg-gray-100 rounded"
            :class="{ 'bg-gray-100': alignment === 'left' }"
            title="Align Left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h10M4 18h12" />
            </svg>
          </button>
          <button 
            @click="setAlignment('center')"
            class="p-1 hover:bg-gray-100 rounded"
            :class="{ 'bg-gray-100': alignment === 'center' }"
            title="Align Center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M6 12h12M8 18h8" />
            </svg>
          </button>
          <button 
            @click="setAlignment('right')"
            class="p-1 hover:bg-gray-100 rounded"
            :class="{ 'bg-gray-100': alignment === 'right' }"
            title="Align Right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M10 12h10M12 18h8" />
            </svg>
          </button>
        </div>

        <!-- Lists -->
        <div class="flex items-center gap-1 border-r pr-1">
          <button 
            @click="toggleList('bullet')"
            class="p-1 hover:bg-gray-100 rounded"
            :class="{ 'bg-gray-100': isBulletList }"
            title="Bullet List"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button 
            @click="toggleList('number')"
            class="p-1 hover:bg-gray-100 rounded"
            :class="{ 'bg-gray-100': isNumberList }"
            title="Numbered List"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20h14M7 12h14M7 4h14M3 20h.01M3 12h.01M3 4h.01" />
            </svg>
          </button>
        </div>

        <!-- Media -->
        <div class="flex items-center gap-1">
          <button 
            @click="insertImage"
            class="p-1 hover:bg-gray-100 rounded"
            title="Insert Image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Image Upload Modal -->
    <div v-if="showImageModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Insert Image</h3>
        <div class="space-y-4">
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <input
              type="file"
              ref="fileInput"
              accept="image/*"
              class="hidden"
              @change="handleImageUpload"
            >
            <button
              @click="$refs.fileInput.click()"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Choose Image
            </button>
            <p class="mt-2 text-sm text-gray-500">or drag and drop</p>
          </div>
          <div class="flex justify-end gap-2">
            <button
              @click="showImageModal = false"
              class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const isEditing = ref(false)
const localText = ref(props.modelValue)
const textarea = ref(null)
const showImageModal = ref(false)
const fileInput = ref(null)
const alignment = ref('left')
const isBulletList = ref(false)
const isNumberList = ref(false)

const isEmpty = computed(() => !localText.value.trim())
const formattedText = computed(() => {
  let text = localText.value
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/__(.*?)__/g, '<u>$1</u>')
    .replace(/\[img\](.*?)\[\/img\]/g, '<img src="$1" class="max-w-full h-auto rounded-lg my-2" />')
    .replace(/\[list\](.*?)\[\/list\]/g, '<ul class="list-disc pl-5">$1</ul>')
    .replace(/\[ol\](.*?)\[\/ol\]/g, '<ol class="list-decimal pl-5">$1</ol>')
    .replace(/\[li\](.*?)\[\/li\]/g, '<li>$1</li>')

  return `<div class="text-${alignment.value}">${text}</div>`
})

const isBold = ref(false)
const isItalic = ref(false)
const isUnderline = ref(false)

const startEditing = () => {
  isEditing.value = true
  nextTick(() => {
    textarea.value?.focus()
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

const toggleFormat = (format) => {
  const selection = window.getSelection()
  const text = localText.value
  const start = textarea.value.selectionStart
  const end = textarea.value.selectionEnd
  const selectedText = text.substring(start, end)

  let newText = text
  switch (format) {
    case 'bold':
      newText = text.substring(0, start) + `**${selectedText}**` + text.substring(end)
      break
    case 'italic':
      newText = text.substring(0, start) + `*${selectedText}*` + text.substring(end)
      break
    case 'underline':
      newText = text.substring(0, start) + `__${selectedText}__` + text.substring(end)
      break
  }

  localText.value = newText
  nextTick(() => {
    textarea.value?.focus()
    textarea.value?.setSelectionRange(start + 2, end + 2)
  })
}

watch(() => props.modelValue, (newValue) => {
  localText.value = newValue
})
</script> 