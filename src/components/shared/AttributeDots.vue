<template>
  <div class="flex items-center">
    <label class="min-w-36 text-sm font-medium text-gray-700">{{ label }}:</label>
    <div class="flex space-x-1">
      <button
        v-for="dot in 5"
        :key="dot"
        @click="updateValue(dot)"
        class="w-5 h-5 rounded-full border border-gray-500 focus:outline-none"
        :class="{
          'bg-black': dot <= modelValue,
          'bg-white': dot > modelValue
        }"
        type="button"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  modelValue: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

function updateValue(value) {
  // If clicking the same dot, decrease by 1 (unless at 1)
  if (value === props.modelValue && props.modelValue > 1) {
    emit('update:modelValue', props.modelValue - 1);
  } else {
    emit('update:modelValue', value);
  }
}
</script>