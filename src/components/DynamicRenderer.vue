
<script setup>
import { computed } from 'vue'
import HeaderElement from './elements/HeaderElement.vue'
import ParagraphElement from './elements/ParagraphElement.vue'
import ButtonElement from './elements/ButtonElement.vue'
import ImageElement from './elements/ImageElement.vue'
import ContainerElement from './elements/ContainerElement.vue'

const props = defineProps({
  element: {
    type: Object,
    required: true
  }
})

defineEmits(['update'])

const elementComponent = computed(() => {
  const components = {
    header: HeaderElement,
    paragraph: ParagraphElement,
    button: ButtonElement,
    image: ImageElement,
    container: ContainerElement
  }
  return components[props.element.type] || 'div'
})
</script> 

<template>
  <component
    :is="elementComponent"
    :element="element"
    :style="element.style"
    @update="$emit('update', element.id, $event)"
  />
</template>
