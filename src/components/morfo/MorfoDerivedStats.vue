<template>
  <div class="mb-6">
    <h3 class="text-lg font-semibold mb-2">ESTADÍSTICAS DERIVADAS</h3>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">Tamaño:</label>
        <input 
          type="number" 
          v-model="size" 
          class="w-full px-3 py-1 border border-gray-300 rounded-md"
        >
      </div>
      
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">Velocidad:</label>
        <div class="px-3 py-1 border border-gray-300 rounded-md bg-gray-100">
          {{ calculatedSpeed }}
        </div>
      </div>
      
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">Defensa:</label>
        <div class="px-3 py-1 border border-gray-300 rounded-md bg-gray-100">
          {{ calculatedDefense }}
        </div>
      </div>
      
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">Armadura:</label>
        <input 
          type="number" 
          v-model="armor" 
          class="w-full px-3 py-1 border border-gray-300 rounded-md"
        >
      </div>
      
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">Iniciativa:</label>
        <div class="px-3 py-1 border border-gray-300 rounded-md bg-gray-100">
          {{ calculatedInitiative }}
        </div>
      </div>
    </div>
    
    <!-- Health Track -->
    <div class="mb-4">
      <div class="flex items-center mb-1">
        <label class="text-sm font-medium text-gray-700 mr-2">Salud:</label>
        <div class="text-sm text-gray-500">
          (Automático: Resistencia + Tamaño = {{ calculatedHealthMax }})
        </div>
      </div>
      <div class="flex flex-wrap gap-1">
        <button
          v-for="dot in calculatedHealthMax"
          :key="dot"
          @click="updateHealth(dot)"
          class="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-xs"
          :class="{
            'bg-white': dot > health,
            'bg-black text-white': dot <= health
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

// Size with safety check
const size = computed({
  get: () => {
    const activeMorfo = store.getters.activeMorfo;
    return activeMorfo?.derivedStats?.size || 5;
  },
  set: (value) => {
    store.commit('updateMorfo', { 
      morfoId: store.state.activeMorfoId,
      path: 'derivedStats.size', 
      value: parseInt(value) || 5
    });
  }
});

// Armor with safety check
const armor = computed({
  get: () => {
    const activeMorfo = store.getters.activeMorfo;
    return activeMorfo?.derivedStats?.armor || 0;
  },
  set: (value) => {
    store.commit('updateMorfo', { 
      morfoId: store.state.activeMorfoId,
      path: 'derivedStats.armor', 
      value: parseInt(value) || 0
    });
  }
});

// Health with safety check
const health = computed({
  get: () => {
    const activeMorfo = store.getters.activeMorfo;
    return activeMorfo?.derivedStats?.health || 0;
  },
  set: (value) => {
    store.commit('updateMorfo', { 
      morfoId: store.state.activeMorfoId,
      path: 'derivedStats.health', 
      value
    });
  }
});

// Calculated stats with safety checks
const calculatedHealthMax = computed(() => {
  const activeMorfo = store.getters.activeMorfo;
  const stamina = activeMorfo?.attributes?.stamina || 1;
  const size = activeMorfo?.derivedStats?.size || 5;
  return stamina + size;
});

const calculatedSpeed = computed(() => {
  const strength = store.getters.effectiveAttributes?.strength || 1;
  const dexterity = store.getters.effectiveAttributes?.dexterity || 1;
  return strength + dexterity + 5;
});

const calculatedDefense = computed(() => {
  const wits = store.getters.effectiveAttributes?.wits || 1;
  const dexterity = store.getters.effectiveAttributes?.dexterity || 1;
  return Math.min(wits, dexterity);
});

const calculatedInitiative = computed(() => {
  const dexterity = store.getters.effectiveAttributes?.dexterity || 1;
  const composure = store.getters.effectiveAttributes?.composure || 1;
  return dexterity + composure;
});

// Update health
function updateHealth(value) {
  health.value = value;
}
</script>