<template>
  <div
    :style="element.style"
    class="min-h-[100px] border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer"
    @dragover.prevent
    @drop="handleDrop"
  >
    <div v-if="!element.children?.length" class="text-center text-gray-400">
      Drop elements here
    </div>
    <template v-else>
      <div
        v-for="child in element.children"
        :key="child.id"
        class="relative group"
      >
        <DynamicRenderer
          :element="child"
          @update="updateChild"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import { useBuilderStore } from '../../store/builderStore'
import DynamicRenderer from '../DynamicRenderer.vue'

const props = defineProps({
  element: {
    type: Object,
    required: true
  }
})

const store = useBuilderStore()

const handleDrop = (event) => {
  const elementData = JSON.parse(event.dataTransfer.getData('element'))
  store.addElement(elementData, props.element.id)
}

const updateChild = (childId, updates) => {
  const child = props.element.children.find(c => c.id === childId)
  if (child) {
    Object.assign(child, updates)
  }
}
</script> 