<template>
  <div>
    <component
      :is="`h${level}`"
      v-if="!editing"
      class="font-bold text-gray-800 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
      @click="editing = true"
    >
      {{ content }}
    </component>
    <input
      v-else
      v-model="localContent"
      @blur="saveEdit"
      @keyup.enter="saveEdit"
      class="font-bold text-gray-800 border-b border-pink-500 outline-none px-2 py-1 w-full"
      :placeholder="'Edit heading...'"
      autofocus
    />
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'
const props = defineProps({
  content: { type: String, default: 'Edit me' },
  level: { type: Number, default: 2 }
})
const emit = defineEmits(['update:content'])
const editing = ref(false)
const localContent = ref(props.content)

watch(() => props.content, (val) => {
  localContent.value = val
})

function saveEdit() {
  editing.value = false
  emit('update:content', localContent.value)
}
</script> 