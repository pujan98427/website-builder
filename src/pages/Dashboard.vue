<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <!-- Pages List -->
      <div class="mt-8">
        <h2 class="text-lg font-medium text-gray-900">Your Pages</h2>
        <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="page in store.pages"
            :key="page.id"
            class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400"
          >
            <div class="flex-1 min-w-0">
              <router-link
                :to="{ name: 'Builder', query: { page: page.id }}"
                class="focus:outline-none"
              >
                <span class="absolute inset-0" aria-hidden="true" />
                <p class="text-sm font-medium text-gray-900">
                  {{ page.name }}
                </p>
              </router-link>
            </div>
            <div class="flex-shrink-0">
              <router-link
                :to="{ name: 'Preview', params: { pageId: page.id }}"
                class="text-sm text-indigo-600 hover:text-indigo-900"
              >
                Preview
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Create New Page Button -->
      <div class="mt-8">
        <button
          @click="showNewPageModal = true"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create New Page
        </button>
      </div>
    </div>

    <!-- New Page Modal -->
    <div v-if="showNewPageModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 max-w-sm w-full">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Create New Page</h3>
        <input
          v-model="newPageName"
          type="text"
          placeholder="Page Name"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <div class="mt-4 flex justify-end space-x-3">
          <button
            @click="showNewPageModal = false"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            Cancel
          </button>
          <button
            @click="createNewPage"
            class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBuilderStore } from '../store/builderStore'

const router = useRouter()
const store = useBuilderStore()

const showNewPageModal = ref(false)
const newPageName = ref('')

const createNewPage = () => {
  if (newPageName.value.trim()) {
    const page = store.createPage(newPageName.value.trim())
    showNewPageModal.value = false
    newPageName.value = ''
    router.push({ name: 'Builder', query: { page: page.id } })
  }
}
</script> 