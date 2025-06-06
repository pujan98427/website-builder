<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">Pages</h1>
        <button
          @click="createNewPage"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create New Page
        </button>
      </div>

      <!-- Pages Table -->
      <div class="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Page Name
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                URL
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Modified
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="page in pages" :key="page.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ page.name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">/{{ page.id }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ formatDate(page.lastModified) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end gap-2">
                  <button
                    @click="previewPage(page.id)"
                    class="text-blue-600 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
                    title="Preview"
                  >
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    @click="editPage(page.id)"
                    class="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-md"
                    title="Edit"
                  >
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    @click="deletePage(page.id)"
                    class="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-md"
                    title="Delete"
                  >
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePagesStore } from '@/store/pages'

const router = useRouter()
const pagesStore = usePagesStore()

const pages = ref([])

onMounted(() => {
  loadPages()
})

const loadPages = () => {
  const pagesData = JSON.parse(localStorage.getItem('pages') || '{}')
  pages.value = Object.entries(pagesData).map(([id, content]) => ({
    id,
    name: id.charAt(0).toUpperCase() + id.slice(1),
    lastModified: content.lastModified || new Date().toISOString()
  }))
}

const createNewPage = () => {
  const pageId = prompt('Enter page name (e.g., about, contact):')
  if (pageId) {
    const sanitizedId = pageId.toLowerCase().replace(/[^a-z0-9-]/g, '-')
    router.push(`/builder/${sanitizedId}`)
  }
}

const editPage = (pageId) => {
  router.push(`/builder/${pageId}`)
}

const previewPage = (pageId) => {
  router.push(`/${pageId}`)
}

const deletePage = (pageId) => {
  if (confirm(`Are you sure you want to delete the page "${pageId}"?`)) {
    pagesStore.deletePage(pageId)
    loadPages()
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString()
}
</script> 