<template>
  <div class="grid-stack bg-white rounded-lg border-2 border-dashed border-pink-600 min-h-[300px]" ref="gridContainer">
    <div
      v-for="item in items"
      :key="item.id"
      class="grid-stack-item"
      :gs-x="item.x"
      :gs-y="item.y"
      :gs-w="item.w"
      :gs-h="item.h"
      :gs-id="item.id"
      :gs-no-resize="isPreviewMode"
      :gs-no-move="isPreviewMode"
    >
      <div class="grid-stack-item-content">
        <div class="relative group">
          <!-- Element Controls -->
          <div v-if="!isPreviewMode" class="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <div class="flex gap-2">
              <button
                @click="duplicateItem(item)"
                class="p-2 text-gray-400 hover:text-gray-600 bg-white rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Duplicate"
              >
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                @click="removeItem(item)"
                class="p-2 text-gray-400 hover:text-red-600 bg-white rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                title="Delete"
              >
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Element Content -->
          <component
            :is="getElementComponent(item.type)"
            :element="item"
            :is-preview-mode="isPreviewMode"
            @update="updateElement"
            @select="selectElement"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.min.css'

// Import all element components
import HeadingElement from './elements/HeadingElement.vue'
import TextElement from './elements/TextElement.vue'
import ButtonElement from './elements/ButtonElement.vue'
import ImageElement from './elements/ImageElement.vue'
import VideoElement from './elements/VideoElement.vue'
import CarouselElement from './elements/CarouselElement.vue'
import GalleryElement from './elements/GalleryElement.vue'
import DividerElement from './elements/DividerElement.vue'
import SpacerElement from './elements/SpacerElement.vue'
import FormElement from './elements/FormElement.vue'
import TableElement from './elements/TableElement.vue'
import SocialMediaElement from './elements/SocialMediaElement.vue'
import MapElement from './elements/MapElement.vue'
import IframeElement from './elements/IframeElement.vue'
import Row from './Row.vue'
import Column from './Column.vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  isPreviewMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update', 'select'])

const gridContainer = ref(null)
const grid = ref(null)
const isInitialized = ref(false)

// Watch for changes in items prop
watch(() => props.items, (newItems) => {
  if (grid.value && isInitialized.value) {
    console.log('Grid items changed:', newItems)
    grid.value.removeAll()
    grid.value.load(newItems)
  }
}, { deep: true })

// Initialize Gridstack
onMounted(() => {
  console.log('Initializing grid with items:', props.items)
  
  // Destroy existing grid if it exists
  if (grid.value) {
    grid.value.destroy()
  }

  grid.value = GridStack.init({
    column: 12,
    cellHeight: 60,
    animate: true,
    float: true,
    resizable: {
      handles: 'e,se,s,sw,w'
    },
    draggable: {
      handle: '.grid-stack-item-content'
    },
    // Enable drag and drop from outside
    acceptWidgets: true,
    // Enable nested grids
    nestedGrid: true,
    // Enable one column mode for mobile
    oneColumnMode: true,
    // Enable responsive mode
    responsive: true,
    // Disable static grid
    staticGrid: false,
    // Enable vertical margin
    verticalMargin: 10,
    // Enable horizontal margin
    margin: 10,
    // Enable auto position
    autoPosition: true,
    // Enable drag
    disableDrag: props.isPreviewMode,
    // Enable resize
    disableResize: props.isPreviewMode,
    // Enable one column mode
    disableOneColumnMode: false,
    // Enable float
    disableFloat: false,
    // Enable responsive
    disableResponsive: false,
    // Enable static grid
    disableStaticGrid: false,
    // Enable vertical margin
    disableVerticalMargin: false,
    // Enable horizontal margin
    disableMargin: false,
    // Enable auto position
    disableAutoPosition: false
  }, gridContainer.value)

  // Load initial items
  if (props.items && props.items.length > 0) {
    grid.value.load(props.items)
  }

  // Handle grid events
  grid.value.on('change', () => {
    const items = grid.value.save()
    console.log('Grid changed:', items)
    emit('update', items)
  })

  // Handle drag and drop events
  grid.value.on('dropped', (event, previousWidget, newWidget) => {
    console.log('Widget dropped:', newWidget)
    const items = grid.value.save()
    emit('update', items)
  })

  isInitialized.value = true
})

onBeforeUnmount(() => {
  if (grid.value) {
    grid.value.destroy()
  }
})

const getElementComponent = (type) => {
  const components = {
    heading: HeadingElement,
    paragraph: TextElement,
    button: ButtonElement,
    image: ImageElement,
    video: VideoElement,
    carousel: CarouselElement,
    gallery: GalleryElement,
    divider: DividerElement,
    spacer: SpacerElement,
    form: FormElement,
    table: TableElement,
    'social-media': SocialMediaElement,
    map: MapElement,
    iframe: IframeElement,
    row: Row,
    column: Column
  }
  return components[type] || 'div'
}

const duplicateItem = (item) => {
  const newItem = {
    ...item,
    id: Date.now(),
    x: item.x + 1,
    y: item.y + 1
  }
  grid.value.addWidget(newItem)
}

const removeItem = (item) => {
  const node = grid.value.engine.nodes.find(n => n.id === item.id)
  if (node) {
    grid.value.removeWidget(node.el)
  }
}

const updateElement = (updatedElement) => {
  const items = grid.value.save()
  const index = items.findIndex(item => item.id === updatedElement.id)
  if (index !== -1) {
    items[index] = updatedElement
    emit('update', items)
  }
}

const selectElement = (element) => {
  emit('select', element)
}
</script>

<style>
.grid-stack {
  background: #ffffff;
}

.grid-stack-item-content {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: move;
}

.grid-stack-preview .grid-stack-item-content {
  cursor: default;
}

.grid-stack-preview .grid-stack-item .ui-resizable-handle {
  display: none;
}

/* Gridstack drag and drop styles */
.grid-stack > .grid-stack-item > .ui-resizable-handle {
  background-image: none;
}

.grid-stack > .grid-stack-item > .ui-resizable-handle.ui-resizable-se {
  background-image: none;
  width: 20px;
  height: 20px;
  right: 0;
  bottom: 0;
  cursor: se-resize;
}

.grid-stack > .grid-stack-item > .ui-resizable-handle.ui-resizable-e {
  right: 0;
  width: 20px;
  cursor: e-resize;
}

.grid-stack > .grid-stack-item > .ui-resizable-handle.ui-resizable-s {
  bottom: 0;
  height: 20px;
  cursor: s-resize;
}

.grid-stack > .grid-stack-item > .ui-resizable-handle.ui-resizable-w {
  left: 0;
  width: 20px;
  cursor: w-resize;
}

.grid-stack > .grid-stack-item > .ui-resizable-handle.ui-resizable-n {
  top: 0;
  height: 20px;
  cursor: n-resize;
}

.grid-stack > .grid-stack-item > .ui-resizable-handle.ui-resizable-ne {
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  cursor: ne-resize;
}

.grid-stack > .grid-stack-item > .ui-resizable-handle.ui-resizable-nw {
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  cursor: nw-resize;
}

.grid-stack > .grid-stack-item > .ui-resizable-handle.ui-resizable-sw {
  bottom: 0;
  left: 0;
  width: 20px;
  height: 20px;
  cursor: sw-resize;
}

/* Drag and drop visual feedback */
.grid-stack-item.ui-draggable-dragging {
  opacity: 0.8;
  z-index: 100;
}

.grid-stack-item.ui-draggable-dragging .grid-stack-item-content {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.grid-stack-item.ui-draggable-dragging::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px dashed #3b82f6;
  pointer-events: none;
}
</style> 