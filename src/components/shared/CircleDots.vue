<template>
    <div class="flex items-center">
      <label v-if="label" class="min-w-24 text-sm font-medium text-gray-700">{{ label }}:</label>
      <div class="flex flex-wrap gap-1">
        <button
          v-for="dot in max"
          :key="dot"
          @click="updateValue(dot)"
          class="w-4 h-4 rounded-full border border-gray-500 focus:outline-none"
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
      default: ''
    },
    modelValue: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      default: 10
    }
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  function updateValue(value) {
    if (value === props.modelValue) {
      emit('update:modelValue', value - 1);
    } else {
      emit('update:modelValue', value);
    }
  }
  </script>