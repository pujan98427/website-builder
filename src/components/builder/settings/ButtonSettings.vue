<template>
  <div class="space-y-6">
    <!-- Button Text -->
    <div>
      <label class="block text-sm font-medium text-gray-900 mb-2"
        >Button Text</label
      >
      <input
        type="text"
        v-model="localSettings.text"
        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        @input="updateSettings"
      />
    </div>

    <!-- Button Link -->
    <div>
      <label class="block text-sm font-medium text-gray-900 mb-2"
        >Button Link</label
      >
      <input
        type="text"
        v-model="localSettings.link"
        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="https://example.com"
        @input="updateSettings"
      />
    </div>

    <!-- Button Style -->
    <div>
      <h4 class="text-sm font-medium text-gray-900 mb-3">Button Style</h4>
      <div class="space-y-4">
        <!-- Variant -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">Variant</label>
          <select
            v-model="localSettings.variant"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            @change="updateSettings"
          >
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="outline">Outline</option>
            <option value="ghost">Ghost</option>
          </select>
        </div>

        <!-- Size -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">Size</label>
          <select
            v-model="localSettings.size"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            @change="updateSettings"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <!-- Full Width -->
        <div>
          <label class="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              v-model="localSettings.fullWidth"
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              @change="updateSettings"
            />
            Full Width
          </label>
        </div>
      </div>
    </div>

    <!-- Colors -->
    <div>
      <h4 class="text-sm font-medium text-gray-900 mb-3">Colors</h4>
      <div class="space-y-4">
        <!-- Background Color -->
        <div>
          <label class="block text-sm text-gray-600 mb-1"
            >Background Color</label
          >
          <div class="flex items-center gap-2">
            <input
              type="color"
              v-model="localSettings.backgroundColor"
              class="w-8 h-8 rounded-md cursor-pointer"
              @input="updateSettings"
            />
            <input
              type="text"
              v-model="localSettings.backgroundColor"
              class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              @input="updateSettings"
            />
          </div>
        </div>

        <!-- Text Color -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">Text Color</label>
          <div class="flex items-center gap-2">
            <input
              type="color"
              v-model="localSettings.textColor"
              class="w-8 h-8 rounded-md cursor-pointer"
              @input="updateSettings"
            />
            <input
              type="text"
              v-model="localSettings.textColor"
              class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              @input="updateSettings"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Typography -->
    <div>
      <h4 class="text-sm font-medium text-gray-900 mb-3">Typography</h4>
      <div class="space-y-4">
        <!-- Font Family -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">Font Family</label>
          <select
            v-model="localSettings.fontFamily"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            @change="updateSettings"
          >
            <option value="sans">Sans Serif</option>
            <option value="serif">Serif</option>
            <option value="mono">Monospace</option>
          </select>
        </div>

        <!-- Font Weight -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">Font Weight</label>
          <select
            v-model="localSettings.fontWeight"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            @change="updateSettings"
          >
            <option value="normal">Normal</option>
            <option value="medium">Medium</option>
            <option value="semibold">Semibold</option>
            <option value="bold">Bold</option>
          </select>
        </div>

        <!-- Letter Spacing -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">Letter Spacing</label>
          <input
            type="text"
            v-model="localSettings.letterSpacing"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            @input="updateSettings"
          />
        </div>
      </div>
    </div>

    <!-- Border -->
    <div>
      <h4 class="text-sm font-medium text-gray-900 mb-3">Border</h4>
      <div class="space-y-4">
        <!-- Border Radius -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">Border Radius</label>
          <div class="flex items-center gap-2">
            <input
              type="number"
              v-model="localSettings.borderRadius"
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              @input="updateSettings"
            />
            <span class="text-sm text-gray-500">px</span>
          </div>
        </div>

        <!-- Border Color -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">Border Color</label>
          <div class="flex items-center gap-2">
            <input
              type="color"
              v-model="localSettings.borderColor"
              class="w-8 h-8 rounded-md cursor-pointer"
              @input="updateSettings"
            />
            <input
              type="text"
              v-model="localSettings.borderColor"
              class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              @input="updateSettings"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Shadow -->
    <div>
      <label class="block text-sm font-medium text-gray-900 mb-2">Shadow</label>
      <select
        v-model="localSettings.shadow"
        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        @change="updateSettings"
      >
        <option value="none">None</option>
        <option value="sm">Small</option>
        <option value="md">Medium</option>
        <option value="lg">Large</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  settings: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update"]);

const localSettings = ref({
  text: "Button",
  link: "",
  variant: "primary",
  size: "medium",
  fullWidth: false,
  backgroundColor: "#3b82f6",
  textColor: "#ffffff",
  fontFamily: "sans",
  fontWeight: "medium",
  letterSpacing: "normal",
  borderRadius: 6,
  borderColor: "#3b82f6",
  shadow: "none",
  ...props.settings,
});

watch(
  () => props.settings,
  (newSettings) => {
    localSettings.value = { ...localSettings.value, ...newSettings };
  },
  { deep: true }
);

const updateSettings = () => {
  emit("update", { ...localSettings.value });
};
</script>
