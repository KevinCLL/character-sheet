<template>
  <div class="mb-4">
    <div class="flex justify-between mb-1">
      <span class="text-sm font-medium text-green-600">{{ leftLabel }} ({{ 10 - modelValue }})</span>
      <span class="text-sm font-medium text-red-600">({{ modelValue }}) {{ rightLabel }}</span>
    </div>
    <div class="flex items-center space-x-2">
      <span class="text-green-600 text-xs">🟢</span>
      <div class="relative w-full h-4">
        <input
          type="range"
          min="0"
          max="10"
          :value="modelValue"
          @input="$emit('update:modelValue', parseInt($event.target.value))"
          class="w-full h-4 appearance-none rounded-lg bg-gray-200 cursor-pointer"
        />
        <div class="absolute pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-6 bg-gray-400"></div>
      </div>
      <span class="text-red-600 text-xs">🔴</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  leftLabel: {
    type: String,
    required: true
  },
  rightLabel: {
    type: String,
    required: true
  },
  modelValue: {
    type: Number,
    required: true
  }
});

defineEmits(['update:modelValue']);
</script>