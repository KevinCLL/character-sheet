// components/ego/EgoDualChars.vue
<template>
  <div class="mb-4">
    <h3 class="text-lg font-semibold mb-2">CARACTERÍSTICAS DUALES DEL EGO</h3>
    
    <!-- Personal Characteristic -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">Característica Personal:</label>
      <dual-characteristic 
        :left-label="personalDualLeft" 
        :right-label="personalDualRight" 
        :model-value="personalDualValue"
        @update:model-value="updatePersonalDualValue"
      />
    </div>
    
    <!-- Moral Characteristic -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">Característica Moral:</label>
      <div class="flex gap-2 mb-2">
        <input 
          type="text" 
          v-model="moralDualLeft" 
          class="w-1/2 px-3 py-1 border border-gray-300 rounded-md"
          placeholder="Virtud..."
        >
        <input 
          type="text" 
          v-model="moralDualRight" 
          class="w-1/2 px-3 py-1 border border-gray-300 rounded-md"
          placeholder="Vicio..."
        >
      </div>
      <dual-characteristic 
        :left-label="moralDualLeft || '(Valor)'" 
        :right-label="moralDualRight || '(Valor)'" 
        :model-value="moralDualValue"
        @update:model-value="updateMoralDualValue"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import DualCharacteristic from '../shared/DualCharacteristic.vue';

const store = useStore();

// Personal Dual Characteristic
const personalDualLeft = computed(() => store.state.ego.dualCharacteristics.personal.left);
const personalDualRight = computed(() => store.state.ego.dualCharacteristics.personal.right);
const personalDualValue = computed(() => store.state.ego.dualCharacteristics.personal.value);

function updatePersonalDualValue(value) {
  store.commit('updateEgo', { 
    path: 'dualCharacteristics.personal.value', 
    value 
  });
}

// Moral Dual Characteristic
const moralDualLeft = computed({
  get: () => store.state.ego.dualCharacteristics.moral.left,
  set: (value) => store.commit('updateEgo', { 
    path: 'dualCharacteristics.moral.left', 
    value 
  })
});

const moralDualRight = computed({
  get: () => store.state.ego.dualCharacteristics.moral.right,
  set: (value) => store.commit('updateEgo', { 
    path: 'dualCharacteristics.moral.right', 
    value 
  })
});

const moralDualValue = computed(() => store.state.ego.dualCharacteristics.moral.value);

function updateMoralDualValue(value) {
  store.commit('updateEgo', { 
    path: 'dualCharacteristics.moral.value', 
    value 
  });
}
</script>