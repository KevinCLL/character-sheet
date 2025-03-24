<template>
  <div class="morfo-sheet">
    <h2 class="text-xl font-bold text-green-800 mb-4">FICHA DEL MORFO (CUERPO LOCAL)</h2>
    
    <!-- MORFO Selector -->
    <div class="mb-4 bg-gray-100 rounded-lg p-3">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <label class="text-sm font-medium text-gray-700 mr-2">MORFO Actual:</label>
          <select 
            v-model="selectedMorfoId" 
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option v-for="morfo in morfos" :key="morfo.id" :value="morfo.id">
              {{ morfo.name || `MORFO #${morfo.id}` }}
            </option>
          </select>
        </div>
        <div class="flex space-x-2">
          <button 
            @click="addNewMorfo" 
            class="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
            title="Añadir nuevo MORFO"
          >
            + MORFO
          </button>
          <button 
            v-if="morfos.length > 1"
            @click="deleteMorfo" 
            class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            title="Eliminar este MORFO"
          >
            - MORFO
          </button>
        </div>
      </div>
    </div>
    
    <div class="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre del MORFO:</label>
        <input 
          type="text" 
          v-model="morfoName" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
      </div>
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">Edad Física:</label>
        <input 
          type="text" 
          v-model="physicalAge" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
      </div>
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">Naturaleza:</label>
        <input 
          type="text" 
          v-model="nature" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Humano, Vampiro, Robot, etc."
        >
      </div>
    </div>

    <!-- Physical Attributes -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">ATRIBUTOS FÍSICOS</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-y-2">
        <!-- Strength -->
        <div class="flex items-center">
          <label class="min-w-36 text-sm font-medium text-gray-700">Fuerza:</label>
          <div class="flex space-x-1">
            <button
              v-for="dot in 5"
              :key="dot"
              @click="updateAttributeValue('strength', dot)"
              class="w-5 h-5 rounded-full border border-gray-500 focus:outline-none"
              :class="{
                'bg-black': dot <= strength,
                'bg-white': dot > strength
              }"
              type="button"
            ></button>
          </div>
        </div>
        
        <!-- Dexterity -->
        <div class="flex items-center">
          <label class="min-w-36 text-sm font-medium text-gray-700">Destreza:</label>
          <div class="flex space-x-1">
            <button
              v-for="dot in 5"
              :key="dot"
              @click="updateAttributeValue('dexterity', dot)"
              class="w-5 h-5 rounded-full border border-gray-500 focus:outline-none"
              :class="{
                'bg-black': dot <= dexterity,
                'bg-white': dot > dexterity
              }"
              type="button"
            ></button>
          </div>
        </div>
        
        <!-- Stamina -->
        <div class="flex items-center">
          <label class="min-w-36 text-sm font-medium text-gray-700">Resistencia:</label>
          <div class="flex space-x-1">
            <button
              v-for="dot in 5"
              :key="dot"
              @click="updateAttributeValue('stamina', dot)"
              class="w-5 h-5 rounded-full border border-gray-500 focus:outline-none"
              :class="{
                'bg-black': dot <= stamina,
                'bg-white': dot > stamina
              }"
              type="button"
            ></button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Skill Limits -->
    <morfo-limits />
    
    <!-- Derived Stats -->
    <morfo-derived-stats />
    
    <!-- Powers -->
    <div class="mb-6">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-lg font-semibold">PODERES INHERENTES DEL MORFO</h3>
        <button 
          @click="addPower" 
          class="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
        >
          + Añadir Poder
        </button>
      </div>
      <div class="grid grid-cols-1 gap-y-2">
        <div v-for="(power, index) in powers" :key="index" class="flex items-center">
          <div class="w-36 mr-2">
            <input 
              type="text" 
              v-model="power.name" 
              class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              placeholder="Poder..."
            >
          </div>
          <div class="flex space-x-1">
            <button
              v-for="dot in 5"
              :key="dot"
              @click="updatePowerValue(index, dot)"
              class="w-5 h-5 rounded-full border border-gray-500 focus:outline-none"
              :class="{
                'bg-black': dot <= power.value,
                'bg-white': dot > power.value
              }"
              type="button"
            ></button>
          </div>
          <button 
            @click="removePower(index)" 
            class="ml-2 text-red-500 hover:text-red-700"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
    
    <!-- Dual Characteristic -->
    <div class="mb-4">
      <h3 class="text-lg font-semibold mb-2">CARACTERÍSTICA DUAL DEL MORFO (SPLAT)</h3>
      <dual-characteristic 
        :left-label="morfoDualLeft" 
        :right-label="morfoDualRight" 
        :model-value="morfoDualValue"
        @update:model-value="updateMorfoDualValue"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import DualCharacteristic from '../shared/DualCharacteristic.vue';
import MorfoLimits from './MorfoLimits.vue';
import MorfoDerivedStats from './MorfoDerivedStats.vue';

const store = useStore();

// All MORFOs and the selected one
const morfos = computed(() => store.state.morfos);
const selectedMorfoId = computed({
  get: () => store.state.activeMorfoId,
  set: (value) => store.dispatch('switchMorfo', parseInt(value))
});

// Name
const morfoName = computed({
  get: () => store.getters.activeMorfo.name,
  set: (value) => store.commit('updateMorfo', { 
    morfoId: store.state.activeMorfoId,
    path: 'name', 
    value 
  })
});

// Physical Age
const physicalAge = computed({
  get: () => store.getters.activeMorfo.physicalAge,
  set: (value) => store.commit('updateMorfo', { 
    morfoId: store.state.activeMorfoId,
    path: 'physicalAge', 
    value 
  })
});

// Nature
const nature = computed({
  get: () => store.getters.activeMorfo.nature,
  set: (value) => store.commit('updateMorfo', { 
    morfoId: store.state.activeMorfoId,
    path: 'nature', 
    value 
  })
});

// Attributes - directly access as simple values
const strength = computed(() => store.getters.activeMorfo.attributes.strength);
const dexterity = computed(() => store.getters.activeMorfo.attributes.dexterity);
const stamina = computed(() => store.getters.activeMorfo.attributes.stamina);

// Update attribute values
function updateAttributeValue(attribute, value) {
  const currentValue = store.getters.activeMorfo.attributes[attribute];
  
  // If clicking the same dot, decrease by 1 (unless at 1)
  if (value === currentValue && currentValue > 1) {
    store.commit('updateMorfo', { 
      morfoId: store.state.activeMorfoId,
      path: `attributes.${attribute}`, 
      value: currentValue - 1 
    });
  } else {
    store.commit('updateMorfo', { 
      morfoId: store.state.activeMorfoId,
      path: `attributes.${attribute}`, 
      value 
    });
  }
}

// Powers
const powers = computed(() => store.getters.activeMorfo.powers);

// Add a new power
function addPower() {
  const newPowers = [...store.getters.activeMorfo.powers, { name: '', value: 0 }];
  store.commit('updateMorfo', {
    morfoId: store.state.activeMorfoId,
    path: 'powers',
    value: newPowers
  });
}

// Remove a power
function removePower(index) {
  const newPowers = [...store.getters.activeMorfo.powers];
  newPowers.splice(index, 1);
  store.commit('updateMorfo', {
    morfoId: store.state.activeMorfoId,
    path: 'powers',
    value: newPowers
  });
}

// Update power value
function updatePowerValue(index, value) {
  const newPowers = [...store.getters.activeMorfo.powers];
  const currentValue = newPowers[index].value;
  
  // If clicking the same dot, decrease by 1 (unless at 0)
  if (value === currentValue && currentValue > 0) {
    newPowers[index].value = currentValue - 1;
  } else {
    newPowers[index].value = value;
  }
  
  store.commit('updateMorfo', {
    morfoId: store.state.activeMorfoId,
    path: 'powers',
    value: newPowers
  });
}

// Dual Characteristic
const morfoDualLeft = computed(() => store.getters.activeMorfo.dualCharacteristic.left);
const morfoDualRight = computed(() => store.getters.activeMorfo.dualCharacteristic.right);
const morfoDualValue = computed(() => store.getters.activeMorfo.dualCharacteristic.value);

function updateMorfoDualValue(value) {
  store.commit('updateMorfo', { 
    morfoId: store.state.activeMorfoId,
    path: 'dualCharacteristic.value', 
    value 
  });
}

// MORFO management
function addNewMorfo() {
  store.dispatch('addNewMorfo');
}

function deleteMorfo() {
  if (morfos.value.length > 1) {
    if (confirm("¿Estás seguro de que quieres eliminar este MORFO?")) {
      store.dispatch('deleteMorfo', store.state.activeMorfoId);
    }
  }
}
</script>