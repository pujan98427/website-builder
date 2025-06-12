<template>
  <div class="space-y-6">
    <!-- Link URL -->
    <div>
      <label class="block text-sm font-medium text-gray-900 mb-2">Link URL</label>
      <input
        type="text"
        v-model="localSettings.href"
        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="https://example.com"
        @input="updateSettings"
      />
    </div>

    <!-- Target -->
    <div>
      <label class="block text-sm font-medium text-gray-900 mb-2">Open Link In</label>
      <select
        v-model="localSettings.target"
        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        @change="updateSettings"
      >
        <option value="_self">Same Window</option>
        <option value="_blank">New Window</option>
        <option value="_parent">Parent Frame</option>
        <option value="_top">Full Window</option>
      </select>
    </div>

    <!-- Rel Attributes -->
    <div>
      <h4 class="text-sm font-medium text-gray-900 mb-3">Link Attributes</h4>
      <div class="space-y-3">
        <!-- No Follow -->
        <div>
          <label class="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              v-model="localSettings.noFollow"
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              @change="updateRelAttributes"
            />
            No Follow
          </label>
        </div>

        <!-- No Referrer -->
        <div>
          <label class="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              v-model="localSettings.noReferrer"
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              @change="updateRelAttributes"
            />
            No Referrer
          </label>
        </div>

        <!-- Sponsored -->
        <div>
          <label class="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              v-model="localSettings.sponsored"
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              @change="updateRelAttributes"
            />
            Sponsored
          </label>
        </div>

        <!-- UGC -->
        <div>
          <label class="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              v-model="localSettings.ugc"
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              @change="updateRelAttributes"
            />
            User Generated Content
          </label>
        </div>
      </div>
    </div>

    <!-- Additional Attributes -->
    <div>
      <h4 class="text-sm font-medium text-gray-900 mb-3">Additional Settings</h4>
      <div class="space-y-4">
        <!-- Title -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">Title (Tooltip)</label>
          <input
            type="text"
            v-model="localSettings.title"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter tooltip text"
            @input="updateSettings"
          />
        </div>

        <!-- Download -->
        <div>
          <label class="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              v-model="localSettings.download"
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              @change="updateSettings"
            />
            Download Link
          </label>
        </div>
      </div>
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
  href: "",
  target: "_self",
  noFollow: false,
  noReferrer: false,
  sponsored: false,
  ugc: false,
  title: "",
  download: false,
  rel: "",
  ...props.settings,
});

watch(
  () => props.settings,
  (newSettings) => {
    localSettings.value = { ...localSettings.value, ...newSettings };
  },
  { deep: true }
);

const updateRelAttributes = () => {
  const relAttributes = [];
  if (localSettings.value.noFollow) relAttributes.push("nofollow");
  if (localSettings.value.noReferrer) relAttributes.push("noreferrer");
  if (localSettings.value.sponsored) relAttributes.push("sponsored");
  if (localSettings.value.ugc) relAttributes.push("ugc");
  
  localSettings.value.rel = relAttributes.join(" ");
  updateSettings();
};

const updateSettings = () => {
  emit("update", { ...localSettings.value });
};
</script> 