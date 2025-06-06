<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8 flex justify-between items-center">
        <h1 class="text-2xl font-semibold text-gray-900">{{ currentPage?.name || 'Preview' }}</h1>
        <router-link
          :to="{ name: 'Builder', query: { page: $route.params.pageId }}"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Edit Page
        </router-link>
      </div>

      <!-- Preview Content -->
      <div class="prose max-w-none">
        <template v-if="currentPage?.elements">
          <div
            v-for="element in currentPage.elements"
            :key="element.id"
          >
            <DynamicRenderer
              :element="element"
            />
          </div>
        </template>
        <div v-else class="text-center text-gray-500 py-12">
          No content to preview
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBuilderStore } from '../store/builderStore'
import DynamicRenderer from '../components/DynamicRenderer.vue'

const route = useRoute()
const store = useBuilderStore()

const currentPage = computed(() => {
  return store.pages.find(p => p.id === route.params.pageId)
})

onMounted(() => {
  store.loadFromLocalStorage()
})
</script> 