<template>
  <BaseElement
    :element="element"
    :is-preview-mode="isPreviewMode"
    @select="$emit('select', element)"
  >
    <div class="w-full" :style="containerStyles">
      <div class="flex items-center justify-center space-x-4">
        <a
          v-for="platform in element.settings?.platforms || []"
          :key="platform.name"
          :href="platform.url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          :style="iconStyles"
        >
          <component
            :is="getIconComponent(platform.name)"
            class="w-6 h-6"
          />
        </a>
      </div>
    </div>
  </BaseElement>
</template>

<script setup>
import { computed } from 'vue'
import BaseElement from './BaseElement.vue'

const props = defineProps({
  element: {
    type: Object,
    required: true
  },
  isPreviewMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select', 'update'])

const containerStyles = computed(() => ({
  padding: `${props.element.settings?.paddingTop || 0}px ${props.element.settings?.paddingRight || 0}px ${props.element.settings?.paddingBottom || 0}px ${props.element.settings?.paddingLeft || 0}px`
}))

const iconStyles = computed(() => ({
  color: props.element.settings?.iconColor || '#6b7280',
  fontSize: `${props.element.settings?.iconSize || 24}px`
}))

const getIconComponent = (platform) => {
  switch (platform.toLowerCase()) {
    case 'facebook':
      return 'FacebookIcon'
    case 'twitter':
      return 'TwitterIcon'
    case 'instagram':
      return 'InstagramIcon'
    case 'linkedin':
      return 'LinkedInIcon'
    case 'youtube':
      return 'YouTubeIcon'
    case 'github':
      return 'GitHubIcon'
    default:
      return 'LinkIcon'
  }
}
</script>

<script>
// Social media icons components
const FacebookIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
    </svg>
  `
}

const TwitterIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/>
    </svg>
  `
}

const InstagramIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  `
}

const LinkedInIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  `
}

const YouTubeIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
    </svg>
  `
}

const GitHubIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  `
}

const LinkIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.188 8.719c.439.439.926.801 1.444 1.087 2.887 1.591 6.589.745 8.445-2.069l-2.246-2.245c-.644.564-1.442 1.003-2.294 1.292-.18.058-.38.086-.58.086-.401 0-.78-.156-1.061-.438-.281-.281-.438-.66-.438-1.061 0-.2.028-.4.086-.58.289-.852.728-1.65 1.292-2.294l-2.245-2.246c-2.814 1.856-3.66 5.558-2.069 8.445.286.518.648 1.005 1.087 1.444zm-1.189 1.942c-.501-.501-1.077-.844-1.699-1.031-2.504-.67-5.271.172-6.9 1.801-1.629 1.629-2.471 4.396-1.801 6.9.187.622.53 1.198 1.031 1.699.501.501 1.077.844 1.699 1.031 2.504.67 5.271-.172 6.9-1.801 1.629-1.629 2.471-4.396 1.801-6.9-.187-.622-.53-1.198-1.031-1.699zm7.188 7.188c-.501-.501-1.077-.844-1.699-1.031-2.504-.67-5.271.172-6.9 1.801-1.629 1.629-2.471 4.396-1.801 6.9.187.622.53 1.198 1.031 1.699.501.501 1.077.844 1.699 1.031 2.504.67 5.271-.172 6.9-1.801 1.629-1.629 2.471-4.396 1.801-6.9-.187-.622-.53-1.198-1.031-1.699z"/>
    </svg>
  `
}

export default {
  components: {
    FacebookIcon,
    TwitterIcon,
    InstagramIcon,
    LinkedInIcon,
    YouTubeIcon,
    GitHubIcon,
    LinkIcon
  }
}
</script> 