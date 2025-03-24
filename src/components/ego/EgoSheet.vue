// components/ego/EgoSheet.vue
<template>
  <div class="ego-sheet">
    <h2 class="text-xl font-bold text-blue-800 mb-4">FICHA DEL EGO (MENTE VIAJERA)</h2>
    
    <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre del EGO:</label>
        <input 
          type="text" 
          v-model="egoName" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
      </div>
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">Edad Mental:</label>
        <input 
          type="text" 
          v-model="mentalAge" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
      </div>
    </div>

    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">ATRIBUTOS DEL EGO</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-y-2">
        <!-- Mental Attributes -->
        <div class="flex items-center">
          <label class="min-w-36 text-sm font-medium text-gray-700">Inteligencia:</label>
          <div class="flex space-x-1">
            <button
              v-for="dot in 5"
              :key="dot"
              @click="updateAttributeValue('intelligence', dot)"
              class="w-5 h-5 rounded-full border border-gray-500 focus:outline-none"
              :class="{
                'bg-black': dot <= intelligenceValue,
                'bg-white': dot > intelligenceValue
              }"
              type="button"
            ></button>
          </div>
        </div>
        
        <div class="flex items-center">
          <label class="min-w-36 text-sm font-medium text-gray-700">Astucia:</label>
          <div class="flex space-x-1">
            <button
              v-for="dot in 5"
              :key="dot"
              @click="updateAttributeValue('wits', dot)"
              class="w-5 h-5 rounded-full border border-gray-500 focus:outline-none"
              :class="{
                'bg-black': dot <= witsValue,
                'bg-white': dot > witsValue
              }"
              type="button"
            ></button>
          </div>
        </div>
        
        <div class="flex items-center">
          <label class="min-w-36 text-sm font-medium text-gray-700">Resolución:</label>
          <div class="flex space-x-1">
            <button
              v-for="dot in 5"
              :key="dot"
              @click="updateAttributeValue('resolve', dot)"
              class="w-5 h-5 rounded-full border border-gray-500 focus:outline-none"
              :class="{
                'bg-black': dot <= resolveValue,
                'bg-white': dot > resolveValue
              }"
              type="button"
            ></button>
          </div>
        </div>
        
        <!-- Social Attributes -->
        <div class="flex items-center">
          <label class="min-w-36 text-sm font-medium text-gray-700">Presencia:</label>
          <div class="flex space-x-1">
            <button
              v-for="dot in 5"
              :key="dot"
              @click="updateAttributeValue('presence', dot)"
              class="w-5 h-5 rounded-full border border-gray-500 focus:outline-none"
              :class="{
                'bg-black': dot <= presenceValue,
                'bg-white': dot > presenceValue
              }"
              type="button"
            ></button>
          </div>
        </div>
        
        <div class="flex items-center">
          <label class="min-w-36 text-sm font-medium text-gray-700">Manipulación:</label>
          <div class="flex space-x-1">
            <button
              v-for="dot in 5"
              :key="dot"
              @click="updateAttributeValue('manipulation', dot)"
              class="w-5 h-5 rounded-full border border-gray-500 focus:outline-none"
              :class="{
                'bg-black': dot <= manipulationValue,
                'bg-white': dot > manipulationValue
              }"
              type="button"
            ></button>
          </div>
        </div>
        
        <div class="flex items-center">
          <label class="min-w-36 text-sm font-medium text-gray-700">Compostura:</label>
          <div class="flex space-x-1">
            <button
              v-for="dot in 5"
              :key="dot"
              @click="updateAttributeValue('composure', dot)"
              class="w-5 h-5 rounded-full border border-gray-500 focus:outline-none"
              :class="{
                'bg-black': dot <= compostureValue,
                'bg-white': dot > compostureValue
              }"
              type="button"
            ></button>
          </div>
        </div>
      </div>
    </div>

    <!-- Theoretical Skills -->
    <ego-skills />
    
    <!-- EGO Traits -->
    <div class="mb-6">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-lg font-semibold">RASGOS DEL EGO</h3>
        <button 
          @click="addTrait" 
          class="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
        >
          + Añadir Rasgo
        </button>
      </div>
      <div class="grid grid-cols-1 gap-y-2">
        <div v-for="(trait, index) in traits" :key="index" class="flex items-center">
          <div class="w-36 mr-2">
            <input 
              type="text" 
              v-model="trait.name" 
              class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              placeholder="Rasgo..."
            >
          </div>
          <div class="flex space-x-1">
            <button
              v-for="dot in 5"
              :key="dot"
              @click="updateTraitValue(index, dot)"
              class="w-5 h-5 rounded-full border border-gray-500 focus:outline-none"
              :class="{
                'bg-black': dot <= (trait.value || 0),
                'bg-white': dot > (trait.value || 0)
              }"
              type="button"
            ></button>
          </div>
          <button 
            @click="removeTrait(index)" 
            class="ml-2 text-red-500 hover:text-red-700"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
    
    <!-- Dual Characteristics -->
    <ego-dual-chars />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import EgoSkills from './EgoSkills.vue';
import EgoDualChars from './EgoDualChars.vue';

const store = useStore();

// Ensure the ego structure exists before accessing attributes
const ensureEgoState = () => {
  // Check if the ego state is properly initialized
  if (!store.state.ego) {
    store.state.ego = {
      name: '',
      mentalAge: '',
      attributes: {
        intelligence: 1,
        wits: 1,
        resolve: 1,
        presence: 1,
        manipulation: 1,
        composure: 1
      },
      skills: {
        mental: [],
        physical: [],
        social: []
      },
      traits: [],
      dualCharacteristics: {
        personal: {
          left: 'Idealismo',
          right: 'Cinismo',
          value: 5
        },
        moral: {
          left: '',
          right: '',
          value: 5
        }
      }
    };
  }

  // Ensure attributes exist
  if (!store.state.ego.attributes) {
    store.state.ego.attributes = {
      intelligence: 1,
      wits: 1,
      resolve: 1,
      presence: 1,
      manipulation: 1,
      composure: 1
    };
  }
};

// Call the initialization function
ensureEgoState();

// Name
const egoName = computed({
  get: () => store.state.ego?.name || '',
  set: (value) => store.commit('updateEgo', { path: 'name', value })
});

// Mental Age
const mentalAge = computed({
  get: () => store.state.ego?.mentalAge || '',
  set: (value) => store.commit('updateEgo', { path: 'mentalAge', value })
});

// Attributes with safe fallback values
const intelligenceValue = computed(() => 
  store.state.ego?.attributes?.intelligence || 1
);

const witsValue = computed(() => 
  store.state.ego?.attributes?.wits || 1
);

const resolveValue = computed(() => 
  store.state.ego?.attributes?.resolve || 1
);

const presenceValue = computed(() => 
  store.state.ego?.attributes?.presence || 1
);

const manipulationValue = computed(() => 
  store.state.ego?.attributes?.manipulation || 1
);

const compostureValue = computed(() => 
  store.state.ego?.attributes?.composure || 1
);

// Update attribute values safely
function updateAttributeValue(attribute, value) {
  ensureEgoState();
  
  const currentValue = store.state.ego.attributes[attribute] || 1;
  
  // If clicking the same dot, decrease by 1 (unless at 1)
  if (value === currentValue && currentValue > 1) {
    store.commit('updateEgo', { 
      path: `attributes.${attribute}`, 
      value: currentValue - 1 
    });
  } else {
    store.commit('updateEgo', { 
      path: `attributes.${attribute}`, 
      value 
    });
  }
}

// Traits
const traits = computed(() => {
  if (!store.state.ego?.traits) {
    store.commit('updateEgo', { path: 'traits', value: [] });
    return [];
  }
  return store.state.ego.traits;
});

// Add a new trait
function addTrait() {
  store.dispatch('addTrait');
}

// Remove a trait
function removeTrait(index) {
  store.dispatch('removeTrait', index);
}

// Update trait value
function updateTraitValue(index, value) {
  // Ensure traits exist
  if (!store.state.ego.traits) {
    store.commit('updateEgo', { path: 'traits', value: [] });
    return;
  }
  
  // Create a copy of the traits array
  const newTraits = [...store.state.ego.traits];
  
  // Ensure the trait exists
  if (!newTraits[index]) {
    newTraits[index] = { name: '', value: 0 };
  }
  
  const currentValue = newTraits[index].value || 0;
  
  // If clicking the same dot, decrease by 1 (unless at 0)
  if (value === currentValue && currentValue > 0) {
    newTraits[index].value = currentValue - 1;
  } else {
    newTraits[index].value = value;
  }
  
  store.commit('updateEgo', { 
    path: 'traits', 
    value: newTraits
  });
}
</script>