// components/history/HistorySheet.vue
<template>
  <div class="history-sheet">
    <h2 class="text-xl font-bold text-indigo-800 mb-4">HISTORIA DEL PERSONAJE</h2>
    
    <!-- Background -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">TRASFONDO</h3>
      <textarea 
        v-model="background" 
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 h-40"
        placeholder="Historia y origen del personaje..."
      ></textarea>
    </div>
    
    <!-- Relationships -->
    <div class="mb-6">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-lg font-semibold">RELACIONES</h3>
        <button 
          @click="addRelationship" 
          class="px-2 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700"
        >
          + Añadir Relación
        </button>
      </div>
      <div class="grid grid-cols-1 gap-4">
        <div v-for="(relationship, index) in relationships" :key="index" class="border border-gray-200 rounded p-3">
          <div class="flex justify-between items-start mb-2">
            <div class="flex-grow">
              <input 
                type="text" 
                v-model="relationship.name" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                placeholder="Nombre de la relación..."
              >
              <div class="flex items-center mb-2">
                <label class="text-sm font-medium text-gray-700 min-w-32">Tipo de relación:</label>
                <input 
                  type="text" 
                  v-model="relationship.type" 
                  class="flex-grow px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Amigo, Enemigo, Mentor..."
                >
              </div>
              <div class="mb-2">
                <label class="text-sm font-medium text-gray-700 mb-1 block">Intensidad:</label>
                <div class="flex space-x-1">
                  <button
                    v-for="dot in 5"
                    :key="dot"
                    @click="updateRelationshipIntensity(index, dot)"
                    class="w-5 h-5 rounded-full border border-gray-500 focus:outline-none"
                    :class="{
                      'bg-indigo-600': dot <= relationship.intensity,
                      'bg-white': dot > relationship.intensity
                    }"
                    type="button"
                  ></button>
                </div>
              </div>
            </div>
            <button 
              @click="removeRelationship(index)" 
              class="ml-2 text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
          <textarea 
            v-model="relationship.description" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24"
            placeholder="Descripción de la relación..."
          ></textarea>
        </div>
      </div>
    </div>
    
    <!-- Goals -->
    <div class="mb-6">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-lg font-semibold">OBJETIVOS</h3>
        <button 
          @click="addGoal" 
          class="px-2 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700"
        >
          + Añadir Objetivo
        </button>
      </div>
      <div class="grid grid-cols-1 gap-3">
        <div v-for="(goal, index) in goals" :key="index" class="flex items-start">
          <textarea 
            v-model="goal.description" 
            class="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-16"
            placeholder="Describe un objetivo del personaje..."
          ></textarea>
          <button 
            @click="removeGoal(index)" 
            class="ml-2 text-red-500 hover:text-red-700"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
    
    <!-- Additional Notes -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">NOTAS ADICIONALES</h3>
      <textarea 
        v-model="notes" 
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 h-40"
        placeholder="Cualquier otra información relevante sobre el personaje..."
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Background
const background = computed({
  get: () => store.state.history?.background || '',
  set: (value) => store.commit('updateHistory', { path: 'background', value })
});

// Relationships
const relationships = computed(() => store.state.history?.relationships || []);

function addRelationship() {
  store.dispatch('addRelationship');
}

function removeRelationship(index) {
  store.dispatch('removeRelationship', index);
}

function updateRelationshipIntensity(index, value) {
  const currentValue = store.state.history.relationships[index]?.intensity || 0;
  
  // If clicking the same dot, decrease by 1 (unless at 0)
  if (value === currentValue && currentValue > 0) {
    store.dispatch('updateRelationship', { 
      index, 
      field: 'intensity', 
      value: currentValue - 1 
    });
  } else {
    store.dispatch('updateRelationship', { 
      index, 
      field: 'intensity', 
      value 
    });
  }
}

// Goals
const goals = computed(() => store.state.history?.goals || []);

function addGoal() {
  store.dispatch('addGoal');
}

function removeGoal(index) {
  store.dispatch('removeGoal', index);
}

// Notes
const notes = computed({
  get: () => store.state.history?.notes || '',
  set: (value) => store.commit('updateHistory', { path: 'notes', value })
});
</script>