
<template>
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">ESTADOS DEL AVATAR</h3>
      
      <!-- Willpower -->
      <div class="mb-4">
        <div class="flex justify-between mb-1">
          <label class="text-sm font-medium text-gray-700">Voluntad:</label>
          <div class="text-xs text-gray-500">
            Max: <input 
              type="number" 
              v-model="willpowerMax" 
              class="w-10 border border-gray-300 rounded text-center mx-1"
              min="1" 
              max="10"
            >
          </div>
        </div>
        <div class="flex flex-wrap gap-1">
          <button
            v-for="dot in willpowerMax"
            :key="dot"
            @click="updateWillpower(dot)"
            class="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-xs"
            :class="{
              'bg-white': dot > willpower,
              'bg-black text-white': dot <= willpower
            }"
            type="button"
          >
            {{ dot }}
          </button>
        </div>
      </div>
      
      <!-- Integrity -->
      <div class="mb-4">
        <div class="flex justify-between mb-1">
          <label class="text-sm font-medium text-gray-700">Integridad:</label>
        </div>
        <div class="flex flex-wrap gap-1">
          <button
            v-for="dot in 10"
            :key="dot"
            @click="updateIntegrity(dot)"
            class="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-xs"
            :class="{
              'bg-white': dot > integrity,
              'bg-black text-white': dot <= integrity
            }"
            type="button"
          >
            {{ dot }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  
  // Willpower
  const willpower = computed({
    get: () => store.state.avatar.willpower.current,
    set: (value) => store.commit('updateAvatar', { 
      path: 'willpower.current', 
      value: Math.min(value, store.state.avatar.willpower.max)
    })
  });
  
  const willpowerMax = computed({
    get: () => store.state.avatar.willpower.max,
    set: (value) => {
      const maxValue = parseInt(value) || 1;
      store.commit('updateAvatar', { path: 'willpower.max', value: maxValue });
      // Ensure current doesn't exceed max
      if (store.state.avatar.willpower.current > maxValue) {
        store.commit('updateAvatar', { path: 'willpower.current', value: maxValue });
      }
    }
  });
  
  // Integrity
  const integrity = computed({
    get: () => store.state.avatar.integrity.value,
    set: (value) => store.commit('updateAvatar', { path: 'integrity.value', value })
  });
  
  // Update functions
  function updateWillpower(value) {
    if (value === willpower.value) {
      willpower.value = value - 1 > 0 ? value - 1 : 0;
    } else {
      willpower.value = value;
    }
  }
  
  function updateIntegrity(value) {
    if (value === integrity.value) {
      integrity.value = value - 1 > 0 ? value - 1 : 0;
    } else {
      integrity.value = value;
    }
  }
  </script>