<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="px-4 py-6 sm:px-0">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold text-gray-900">Pages</h1>
          <button
            @click="createNewPage"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create New Page
          </button>
        </div>
      </div>

      <!-- Pages Grid -->
      <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="page in pages"
          :key="page.id"
          class="bg-white overflow-hidden shadow rounded-lg"
        >
          <div class="p-6">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-gray-900">{{ page.name }}</h3>
              <div class="flex space-x-2">
                <button
                  @click="editPage(page)"
                  class="text-blue-600 hover:text-blue-900"
                >
                  Edit
                </button>
                <button
                  @click="deletePage(page.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </div>
            </div>
            <p class="mt-2 text-sm text-gray-500">
              Last modified: {{ formatDate(page.updatedAt) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBuilderStore } from '@/store/builderStore'

const router = useRouter()
const builderStore = useBuilderStore()
const pages = ref([])

onMounted(async () => {
  try {
    pages.value = await builderStore.getAllPages()
  } catch (error) {
    console.error('Error loading pages:', error)
  }
})

const createNewPage = async () => {
  try {
    const pageName = prompt('Enter page name:')
    if (!pageName) return

    const newPage = {
      id: Date.now().toString(),
      name: pageName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    await builderStore.createPage(newPage)
    pages.value = await builderStore.getAllPages()
    
    // Navigate to the builder with the new page ID
    router.push({
      path: '/dashboard/builder',
      query: { page: newPage.id }
    })
  } catch (error) {
    console.error('Error creating page:', error)
  }
}

const editPage = (page) => {
  router.push({
    path: '/dashboard/builder',
    query: { page: page.id }
  })
}

const deletePage = async (pageId) => {
  if (confirm('Are you sure you want to delete this page?')) {
    try {
      await builderStore.deletePage(pageId)
      pages.value = await builderStore.getAllPages()
    } catch (error) {
      console.error('Error deleting page:', error)
    }
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
/* Add hover effect for delete button */
.text-red-600:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease-in-out;
}
</style> 