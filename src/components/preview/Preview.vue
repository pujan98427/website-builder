<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Rows -->
      <div class="space-y-8">
        <div
          v-for="(row, rowIndex) in pageContent.rows"
          :key="rowIndex"
          class="grid"
          :style="{
            gridTemplateColumns: `repeat(${row.columns.length}, 1fr)`,
            gap: '1rem'
          }"
        >
          <div
            v-for="(column, colIndex) in row.columns"
            :key="colIndex"
            class="space-y-4"
          >
            <!-- Heading Element -->
            <div
              v-for="element in column.elements.filter(e => e.type === 'heading')"
              :key="element.id"
              :style="{
                color: element.settings.color,
                fontSize: `${element.settings.fontSize}${element.settings.fontSizeUnit}`,
                textAlign: element.settings.alignment,
                marginTop: `${element.settings.marginTop}px`,
                marginBottom: `${element.settings.marginBottom}px`,
                marginLeft: `${element.settings.marginLeft}px`,
                marginRight: `${element.settings.marginRight}px`,
                paddingTop: `${element.settings.paddingTop}px`,
                paddingBottom: `${element.settings.paddingBottom}px`,
                paddingLeft: `${element.settings.paddingLeft}px`,
                paddingRight: `${element.settings.paddingRight}px`
              }"
            >
              <component
                :is="`h${element.settings.level}`"
                class="whitespace-pre-wrap"
              >
                {{ element.settings.text }}
              </component>
            </div>

            <!-- Button Element -->
            <div
              v-for="element in column.elements.filter(e => e.type === 'button')"
              :key="element.id"
              :style="{
                marginTop: `${element.settings.marginTop}px`,
                marginBottom: `${element.settings.marginBottom}px`,
                marginLeft: `${element.settings.marginLeft}px`,
                marginRight: `${element.settings.marginRight}px`,
                paddingTop: `${element.settings.paddingTop}px`,
                paddingBottom: `${element.settings.paddingBottom}px`,
                paddingLeft: `${element.settings.paddingLeft}px`,
                paddingRight: `${element.settings.paddingRight}px`
              }"
            >
              <button
                :class="[
                  'px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2',
                  {
                    'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500': element.settings.variant === 'primary',
                    'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500': element.settings.variant === 'secondary',
                    'text-sm': element.settings.size === 'small',
                    'text-base': element.settings.size === 'medium',
                    'text-lg': element.settings.size === 'large'
                  }
                ]"
              >
                {{ element.settings.text }}
              </button>
            </div>

            <!-- Gallery Element -->
            <div
              v-for="element in column.elements.filter(e => e.type === 'gallery')"
              :key="element.id"
              :style="{
                marginTop: `${element.settings.marginTop}px`,
                marginBottom: `${element.settings.marginBottom}px`,
                marginLeft: `${element.settings.marginLeft}px`,
                marginRight: `${element.settings.marginRight}px`,
                paddingTop: `${element.settings.paddingTop}px`,
                paddingBottom: `${element.settings.paddingBottom}px`,
                paddingLeft: `${element.settings.paddingLeft}px`,
                paddingRight: `${element.settings.paddingRight}px`
              }"
            >
              <div
                class="grid gap-4"
                :style="{
                  gridTemplateColumns: `repeat(${element.settings.columns}, 1fr)`,
                  gap: `${element.settings.gap}px`
                }"
              >
                <div
                  v-for="(image, index) in element.settings.images"
                  :key="index"
                  class="relative aspect-square overflow-hidden rounded-lg"
                >
                  <img
                    :src="image.url"
                    :alt="image.alt || ''"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePagesStore } from '@/store/pages'

const route = useRoute()
const router = useRouter()
const pagesStore = usePagesStore()
const pageContent = ref({
  rows: []
})

onMounted(() => {
  const pageId = route.params.id
  const content = pagesStore.loadPage(pageId)
  
  if (!content || !content.rows || content.rows.length === 0) {
    // If page doesn't exist, redirect to pages list
    router.push('/pages')
    return
  }
  
  pageContent.value = content
})
</script> 