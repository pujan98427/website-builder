<template>
  <BaseElement
    :element="element"
    :is-preview-mode="isPreviewMode"
    @select="$emit('select', element)"
  >
    <form
      class="w-full"
      :style="formStyles"
      @submit.prevent="handleSubmit"
    >
      <div
        v-for="(field, index) in element.settings?.fields || []"
        :key="index"
        class="mb-4"
      >
        <label
          v-if="field.label"
          :for="field.id"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          {{ field.label }}
          <span v-if="field.required" class="text-red-500">*</span>
        </label>
        
        <!-- Text input -->
        <input
          v-if="field.type === 'text' || field.type === 'email' || field.type === 'tel' || field.type === 'number'"
          :type="field.type"
          :id="field.id"
          :name="field.name"
          :placeholder="field.placeholder"
          :required="field.required"
          :min="field.min"
          :max="field.max"
          :step="field.step"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :style="inputStyles"
        />
        
        <!-- Textarea -->
        <textarea
          v-else-if="field.type === 'textarea'"
          :id="field.id"
          :name="field.name"
          :placeholder="field.placeholder"
          :required="field.required"
          :rows="field.rows || 4"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :style="inputStyles"
        ></textarea>
        
        <!-- Select -->
        <select
          v-else-if="field.type === 'select'"
          :id="field.id"
          :name="field.name"
          :required="field.required"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :style="inputStyles"
        >
          <option value="" disabled selected>{{ field.placeholder || 'Select an option' }}</option>
          <option
            v-for="option in field.options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
        
        <!-- Checkbox -->
        <div
          v-else-if="field.type === 'checkbox'"
          class="flex items-center"
        >
          <input
            type="checkbox"
            :id="field.id"
            :name="field.name"
            :required="field.required"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            :for="field.id"
            class="ml-2 block text-sm text-gray-700"
          >
            {{ field.label }}
          </label>
        </div>
        
        <!-- Radio -->
        <div
          v-else-if="field.type === 'radio'"
          class="space-y-2"
        >
          <div
            v-for="option in field.options"
            :key="option.value"
            class="flex items-center"
          >
            <input
              type="radio"
              :id="`${field.id}-${option.value}`"
              :name="field.name"
              :value="option.value"
              :required="field.required"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label
              :for="`${field.id}-${option.value}`"
              class="ml-2 block text-sm text-gray-700"
            >
              {{ option.label }}
            </label>
          </div>
        </div>
      </div>
      
      <button
        type="submit"
        class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        :style="buttonStyles"
      >
        {{ element.settings?.submitText || 'Submit' }}
      </button>
    </form>
  </BaseElement>
</template>

<script setup>
import { computed } from 'vue'
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

const formStyles = computed(() => ({
  padding: `${props.element.settings?.paddingTop || 0}px ${props.element.settings?.paddingRight || 0}px ${props.element.settings?.paddingBottom || 0}px ${props.element.settings?.paddingLeft || 0}px`,
  backgroundColor: props.element.settings?.backgroundColor || 'transparent',
  borderRadius: props.element.settings?.borderRadius ? `${props.element.settings.borderRadius}px` : '0'
}))

const inputStyles = computed(() => ({
  backgroundColor: props.element.settings?.inputBackgroundColor || '#ffffff',
  color: props.element.settings?.inputTextColor || '#000000',
  fontSize: `${props.element.settings?.inputFontSize || 14}px`
}))

const buttonStyles = computed(() => ({
  backgroundColor: props.element.settings?.buttonBackgroundColor || '#3b82f6',
  color: props.element.settings?.buttonTextColor || '#ffffff',
  fontSize: `${props.element.settings?.buttonFontSize || 14}px`,
  borderRadius: props.element.settings?.buttonBorderRadius ? `${props.element.settings.buttonBorderRadius}px` : '4px'
}))

const handleSubmit = (event) => {
  if (props.isPreviewMode) {
    event.preventDefault()
    return
  }
  
  const formData = new FormData(event.target)
  const data = {}
  
  for (const [key, value] of formData.entries()) {
    data[key] = value
  }
  
  // Emit the form data
  emit('update', {
    ...props.element,
    formData: data
  })
}
</script> 