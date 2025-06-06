<script setup>
import { onMounted } from 'vue'
import { useBuilderStore } from './store/builderStore'
import DefaultLayout from './layouts/DefaultLayout.vue'

const store = useBuilderStore()

onMounted(() => {
  store.loadFromLocalStorage()
})
</script>

<template>
  <DefaultLayout>
    <router-view></router-view>
  </DefaultLayout>
</template>

<style>
@import './index.css';
</style>
