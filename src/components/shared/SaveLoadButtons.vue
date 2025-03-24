<template>
    <div class="flex space-x-2">
      <button
        @click="saveCharacter"
        class="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
      >
        Save
      </button>
      <label class="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition cursor-pointer">
        Load
        <input type="file" accept=".json" class="hidden" @change="loadCharacter">
      </label>
    </div>
  </template>
  
  <script setup>
  import { defineEmits } from 'vue';
  
  const emit = defineEmits(['save', 'load']);
  
  const saveCharacter = () => {
    emit('save');
  };
  
  const loadCharacter = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    emit('load', file);
  };
  </script>