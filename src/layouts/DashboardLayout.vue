<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-gray-900">Website Builder</h1>
            </div>
          </div>
          <div class="flex items-center">
            <div class="ml-3 relative">
              <div class="flex items-center space-x-4">
                <span class="text-gray-700">{{ store.user.username }}</span>
                <button
                  @click="handleLogout"
                  class="text-gray-700 hover:text-gray-900"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-white shadow h-screen">
        <nav class="mt-5 px-2">
          <router-link
            to="/dashboard"
            class="group flex items-center px-2 py-2 text-base font-medium rounded-md"
            :class="[$route.name === 'DashboardHome' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900']"
          >
            Dashboard
          </router-link>
          <router-link
            to="/dashboard/builder"
            class="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md"
            :class="[$route.name === 'Builder' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900']"
          >
            Custom Website
          </router-link>
          <div class="mt-1">
            <button
              @click="showNewPageModal = true"
              class="w-full flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              + New Page
            </button>
          </div>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-6">
        <router-view></router-view>
      </main>
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

const handleLogout = () => {
  store.logout()
  router.push('/')
}

const createNewPage = () => {
  if (newPageName.value.trim()) {
    const page = store.createPage(newPageName.value.trim())
    showNewPageModal.value = false
    newPageName.value = ''
    router.push(`/dashboard/builder?page=${page.id}`)
  }
}
</script> 