<template>
  <div class="mb-6">
    <h3 class="text-lg font-semibold mb-2">LÍMITES DE APLICACIÓN</h3>
    <h4 class="font-medium text-gray-700 mb-2">Limitación de Habilidades Físicas:</h4>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <div v-for="skill in physicalSkillNames" :key="skill" class="flex items-center">
        <label class="text-sm font-medium text-gray-700 min-w-36">{{ skill }}:</label>
        <input
          type="number"
          :value="getSkillLimit(skill)"
          @input="updateLimit(skill, $event.target.value)"
          min="0"
          max="5"
          class="w-16 px-2 py-1 border border-gray-300 rounded text-center"
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Get default physical skill names if needed
const defaultPhysicalSkillNames = [
  'Atletismo',
  'Pelea',
  'Conducir',
  'Armas de Fuego',
  'Hurto',
  'Sigilo',
  'Supervivencia',
  'Armas Blancas'
];

// Get physical skills from the EGO to determine which limits to show
const physicalSkillNames = computed(() => {
  // First try to get names from skills array, fallback to default list
  try {
    if (Array.isArray(store.state.ego.skills.physical)) {
      const names = store.state.ego.skills.physical
        .filter(skill => skill && skill.name) // Filter out any undefined or empty-named skills
        .map(skill => skill.name);
      
      // If we got valid names, use them
      if (names.length > 0) {
        return names;
      }
    }
  } catch (error) {
    console.warn("Error accessing physical skills, using default list", error);
  }
  
  // Fallback to default list
  return defaultPhysicalSkillNames;
});

// Get current limit for a skill
function getSkillLimit(skillName) {
  return store.getters.activeMorfo.skillLimits[skillName] || 0;
}

// Update the limit in the store
function updateLimit(skillName, value) {
  const limitValue = parseInt(value) || 0;
  
  // Create a copy of the current skillLimits
  const newSkillLimits = { ...store.getters.activeMorfo.skillLimits };
  newSkillLimits[skillName] = limitValue;
  
  store.commit('updateMorfo', { 
    morfoId: store.state.activeMorfoId,
    path: 'skillLimits', 
    value: newSkillLimits
  });
}
</script>