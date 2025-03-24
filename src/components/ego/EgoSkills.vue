<template>
  <div class="mb-6">
    <h3 class="text-lg font-semibold mb-2">HABILIDADES TEÓRICAS</h3>
    
    <!-- Mental Skills -->
    <div class="mb-4">
      <div class="flex justify-between items-center mb-2">
        <h4 class="font-medium text-gray-700">Mentales:</h4>
        <button 
          @click="addSkill('mental')" 
          class="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
        >
          + Añadir
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-4">
        <div v-for="(skill, index) in mentalSkills" :key="index" class="flex items-center">
          <div class="flex-grow flex items-center">
            <div class="w-32 mr-2">
              <input
                type="text"
                v-model="skill.name"
                class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Habilidad..."
              >
            </div>
            <div class="flex space-x-1">
              <button
                v-for="dot in 5"
                :key="dot"
                @click="updateSkillValue('mental', index, dot)"
                class="w-4 h-4 rounded-full border border-gray-500 focus:outline-none"
                :class="{
                  'bg-black': dot <= skill.value,
                  'bg-white': dot > skill.value
                }"
                type="button"
              ></button>
            </div>
            
            <input
              type="text"
              v-model="skill.specialty"
              class="ml-2 w-20 px-2 py-1 text-xs border border-gray-300 rounded"
              placeholder="Esp..."
            >
            
            <button 
              @click="removeSkill('mental', index)" 
              class="ml-1 text-red-500 hover:text-red-700 text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Physical Skills (Theory) -->
    <div class="mb-4">
      <div class="flex justify-between items-center mb-2">
        <h4 class="font-medium text-gray-700">Físicas (Conocimiento Teórico):</h4>
        <button 
          @click="addSkill('physical')" 
          class="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
        >
          + Añadir
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-4">
        <div v-for="(skill, index) in physicalSkills" :key="index" class="flex items-center">
          <div class="flex-grow flex items-center">
            <div class="w-32 mr-2">
              <input
                type="text"
                v-model="skill.name"
                class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Habilidad..."
              >
            </div>
            <div class="flex space-x-1">
              <button
                v-for="dot in 5"
                :key="dot"
                @click="updateSkillValue('physical', index, dot)"
                class="w-4 h-4 rounded-full border border-gray-500 focus:outline-none"
                :class="{
                  'bg-black': dot <= skill.value,
                  'bg-white': dot > skill.value
                }"
                type="button"
              ></button>
            </div>
            
            <input
              type="text"
              v-model="skill.specialty"
              class="ml-2 w-20 px-2 py-1 text-xs border border-gray-300 rounded"
              placeholder="Esp..."
            >
            
            <button 
              @click="removeSkill('physical', index)" 
              class="ml-1 text-red-500 hover:text-red-700 text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Social Skills -->
    <div class="mb-4">
      <div class="flex justify-between items-center mb-2">
        <h4 class="font-medium text-gray-700">Sociales:</h4>
        <button 
          @click="addSkill('social')" 
          class="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
        >
          + Añadir
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-4">
        <div v-for="(skill, index) in socialSkills" :key="index" class="flex items-center">
          <div class="flex-grow flex items-center">
            <div class="w-32 mr-2">
              <input
                type="text"
                v-model="skill.name"
                class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Habilidad..."
              >
            </div>
            <div class="flex space-x-1">
              <button
                v-for="dot in 5"
                :key="dot"
                @click="updateSkillValue('social', index, dot)"
                class="w-4 h-4 rounded-full border border-gray-500 focus:outline-none"
                :class="{
                  'bg-black': dot <= skill.value,
                  'bg-white': dot > skill.value
                }"
                type="button"
              ></button>
            </div>
            
            <input
              type="text"
              v-model="skill.specialty"
              class="ml-2 w-20 px-2 py-1 text-xs border border-gray-300 rounded"
              placeholder="Esp..."
            >
            
            <button 
              @click="removeSkill('social', index)" 
              class="ml-1 text-red-500 hover:text-red-700 text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Get skills from the store
const mentalSkills = computed(() => store.state.ego.skills.mental);
const physicalSkills = computed(() => store.state.ego.skills.physical);
const socialSkills = computed(() => store.state.ego.skills.social);

// Skill management functions
function addSkill(category) {
  store.dispatch('addSkill', { category });
}

function removeSkill(category, index) {
  store.dispatch('removeSkill', { category, index });
}

function updateSkillValue(category, index, value) {
  const currentValue = store.state.ego.skills[category][index].value;
  
  // If clicking the same dot, decrease by 1 (unless at 0)
  if (value === currentValue && currentValue > 0) {
    store.dispatch('updateSkill', { 
      category, 
      index, 
      field: 'value', 
      value: currentValue - 1 
    });
  } else {
    store.dispatch('updateSkill', { 
      category, 
      index, 
      field: 'value', 
      value 
    });
  }
}

// Update skill name
function updateSkillName(category, index, value) {
  store.dispatch('updateSkill', { 
    category, 
    index, 
    field: 'name', 
    value 
  });
}

// Update skill specialty
function updateSkillSpecialty(category, index, value) {
  store.dispatch('updateSkill', { 
    category, 
    index, 
    field: 'specialty', 
    value 
  });
}
</script>