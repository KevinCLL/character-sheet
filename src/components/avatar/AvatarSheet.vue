// components/avatar/AvatarSheet.vue
<template>
  <div class="avatar-sheet">
    <h2 class="text-xl font-bold text-purple-800 mb-4">FICHA DEL AVATAR (COMBINACIÓN)</h2>
    
    <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">Jugador:</label>
        <input 
          type="text" 
          v-model="player" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
      </div>
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">Concepto:</label>
        <input 
          type="text" 
          v-model="concept" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
      </div>
    </div>
    
    <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">Virtud:</label>
        <input 
          type="text" 
          v-model="virtue" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
      </div>
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">Vicio:</label>
        <input 
          type="text" 
          v-model="vice" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
      </div>
    </div>
    
    <!-- Avatar Stats -->
    <avatar-stats />
    
    <!-- Synchronization -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">NIVEL DE SINCRONIZACIÓN</h3>
      <div class="flex items-center mb-2">
        <label class="min-w-48 text-sm font-medium text-gray-700">Sincronización EGO/MORFO:</label>
        <div class="flex space-x-1">
          <button
            v-for="dot in 5"
            :key="dot"
            @click="updateSyncValue(dot)"
            class="w-5 h-5 rounded-full border border-gray-500 focus:outline-none"
            :class="{
              'bg-purple-600': dot <= syncValue,
              'bg-white': dot > syncValue
            }"
            type="button"
          ></button>
        </div>
      </div>
      <div class="mb-2">
        <label class="block text-sm font-medium text-gray-700 mb-1">Efecto:</label>
        <input 
          type="text" 
          v-model="syncEffect" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Efectos de la sincronización..."
        >
      </div>
    </div>
    
    <!-- Conditions -->
    <div class="mb-6">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-lg font-semibold">CONDICIONES</h3>
        <button 
          @click="addCondition" 
          class="px-2 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700"
        >
          + Añadir Condición
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div v-for="(condition, index) in conditions" :key="index" class="flex items-center">
          <input 
            type="text" 
            v-model="condition.value" 
            class="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            :placeholder="`Condición ${index + 1}...`"
          >
          <button 
            @click="removeCondition(index)" 
            class="ml-2 text-red-500 hover:text-red-700"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
    
    <!-- Notes -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">NOTAS DE AVATAR</h3>
      <textarea 
        v-model="notes" 
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
        placeholder="Notas adicionales sobre el Avatar..."
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import AvatarStats from './AvatarStats.vue';

const store = useStore();

// Player
const player = computed({
  get: () => store.state.avatar.player,
  set: (value) => store.commit('updateAvatar', { path: 'player', value })
});

// Concept
const concept = computed({
  get: () => store.state.avatar.concept,
  set: (value) => store.commit('updateAvatar', { path: 'concept', value })
});

// Virtue
const virtue = computed({
  get: () => store.state.avatar.virtue,
  set: (value) => store.commit('updateAvatar', { path: 'virtue', value })
});

// Vice
const vice = computed({
  get: () => store.state.avatar.vice,
  set: (value) => store.commit('updateAvatar', { path: 'vice', value })
});

// Synchronization
const syncValue = computed({
  get: () => store.state.avatar.synchronization.value,
  set: (value) => store.commit('updateAvatar', { path: 'synchronization.value', value })
});

const syncEffect = computed({
  get: () => store.state.avatar.synchronization.effect,
  set: (value) => store.commit('updateAvatar', { path: 'synchronization.effect', value })
});

function updateSyncValue(value) {
  if (value === syncValue.value) {
    syncValue.value = value - 1 > 0 ? value - 1 : 1;
  } else {
    syncValue.value = value;
  }
}

// Conditions
const conditions = computed(() => {
  return store.state.avatar.conditions.map((condition, index) => {
    return {
      value: computed({
        get: () => condition,
        set: (value) => {
          store.commit('updateConditions', {
            action: 'update',
            index,
            value
          });
        }
      })
    };
  });
});

// Add a new condition
function addCondition() {
  store.dispatch('addCondition');
}

// Remove a condition
function removeCondition(index) {
  store.dispatch('removeCondition', index);
}

// Notes
const notes = computed({
  get: () => store.state.avatar.notes,
  set: (value) => store.commit('updateAvatar', { path: 'notes', value })
});
</script>