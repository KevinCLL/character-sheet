// components/avatar/AvatarEffectiveStats.vue
<template>
  <div class="effective-stats p-4 bg-white">
    <h2 class="text-xl font-bold text-gray-800 mb-4">HOJA DE RESUMEN DE AVATAR (FUNCIONAL)</h2>
    
    <div class="mb-4 p-4 bg-gray-50 rounded-lg">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <div class="font-medium text-sm text-gray-500">EGO:</div>
          <div class="text-lg font-bold">{{ egoName || '(Sin nombre)' }}</div>
        </div>
        <div>
          <div class="font-medium text-sm text-gray-500">MORFO:</div>
          <div class="text-lg font-bold">{{ morfoName || '(Sin nombre)' }}</div>
        </div>
        <div>
          <div class="font-medium text-sm text-gray-500">Concepto:</div>
          <div class="text-lg font-bold">{{ concept || '(Sin definir)' }}</div>
        </div>
      </div>
    </div>
    
    <!-- Effective Attributes -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2 border-b border-gray-200 pb-2">ATRIBUTOS EFECTIVOS</h3>
      
      <!-- Power Attributes -->
      <div class="mb-4">
        <h4 class="text-md font-semibold text-gray-700 mb-2">PODER</h4>
        <div class="grid grid-cols-3 gap-2">
          <div class="p-2 bg-gray-50 rounded">
            <div class="text-sm text-gray-500">Inteligencia:</div>
            <div class="text-lg font-bold">{{ effectiveAttributes.intelligence }}</div>
            <div class="text-xs text-gray-400">EGO</div>
          </div>
          <div class="p-2 bg-gray-50 rounded">
            <div class="text-sm text-gray-500">Fuerza:</div>
            <div class="text-lg font-bold">{{ effectiveAttributes.strength }}</div>
            <div class="text-xs text-gray-400">MORFO</div>
          </div>
          <div class="p-2 bg-gray-50 rounded">
            <div class="text-sm text-gray-500">Presencia:</div>
            <div class="text-lg font-bold">{{ effectiveAttributes.presence }}</div>
            <div class="text-xs text-gray-400">EGO</div>
          </div>
        </div>
      </div>
      
      <!-- Finesse Attributes -->
      <div class="mb-4">
        <h4 class="text-md font-semibold text-gray-700 mb-2">FINEZA</h4>
        <div class="grid grid-cols-3 gap-2">
          <div class="p-2 bg-gray-50 rounded">
            <div class="text-sm text-gray-500">Astucia:</div>
            <div class="text-lg font-bold">{{ effectiveAttributes.wits }}</div>
            <div class="text-xs text-gray-400">EGO</div>
          </div>
          <div class="p-2 bg-gray-50 rounded">
            <div class="text-sm text-gray-500">Destreza:</div>
            <div class="text-lg font-bold">{{ effectiveAttributes.dexterity }}</div>
            <div class="text-xs text-gray-400">MORFO</div>
          </div>
          <div class="p-2 bg-gray-50 rounded">
            <div class="text-sm text-gray-500">Manipulación:</div>
            <div class="text-lg font-bold">{{ effectiveAttributes.manipulation }}</div>
            <div class="text-xs text-gray-400">EGO</div>
          </div>
        </div>
      </div>
      
      <!-- Resistance Attributes -->
      <div class="mb-4">
        <h4 class="text-md font-semibold text-gray-700 mb-2">RESISTENCIA</h4>
        <div class="grid grid-cols-3 gap-2">
          <div class="p-2 bg-gray-50 rounded">
            <div class="text-sm text-gray-500">Resolución:</div>
            <div class="text-lg font-bold">{{ effectiveAttributes.resolve }}</div>
            <div class="text-xs text-gray-400">EGO</div>
          </div>
          <div class="p-2 bg-gray-50 rounded">
            <div class="text-sm text-gray-500">Resistencia:</div>
            <div class="text-lg font-bold">{{ effectiveAttributes.stamina }}</div>
            <div class="text-xs text-gray-400">MORFO</div>
          </div>
          <div class="p-2 bg-gray-50 rounded">
            <div class="text-sm text-gray-500">Compostura:</div>
            <div class="text-lg font-bold">{{ effectiveAttributes.composure }}</div>
            <div class="text-xs text-gray-400">EGO</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Effective Skills -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2 border-b border-gray-200 pb-2">HABILIDADES EFECTIVAS</h3>
      
      <!-- Mental Skills -->
      <div class="mb-4">
        <h4 class="text-md font-semibold text-gray-700 mb-2">MENTALES</h4>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1">
          <div v-for="(skill, index) in mentalSkillsList" :key="index" class="p-2 bg-gray-50 rounded mb-1">
            <div class="text-sm text-gray-500">{{ skill.name }}:</div>
            <div class="text-lg font-bold">{{ skill.value }}</div>
          </div>
        </div>
      </div>
      
      <!-- Physical Skills -->
      <div class="mb-4">
        <h4 class="text-md font-semibold text-gray-700 mb-2">FÍSICAS</h4>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1">
          <div v-for="(skill, index) in physicalSkillsList" :key="index" class="p-2 bg-gray-50 rounded mb-1">
            <div class="text-sm text-gray-500">{{ skill.name }}:</div>
            <div class="text-lg font-bold">{{ skill.value }}</div>
          </div>
        </div>
      </div>
      
      <!-- Social Skills -->
      <div class="mb-4">
        <h4 class="text-md font-semibold text-gray-700 mb-2">SOCIALES</h4>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1">
          <div v-for="(skill, index) in socialSkillsList" :key="index" class="p-2 bg-gray-50 rounded mb-1">
            <div class="text-sm text-gray-500">{{ skill.name }}:</div>
            <div class="text-lg font-bold">{{ skill.value }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Combined Dual Characteristics -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2 border-b border-gray-200 pb-2">CARACTERÍSTICAS DUALES COMBINADAS</h3>
      
      <!-- Personal -->
      <div class="mb-4 p-2 bg-gray-50 rounded">
        <h4 class="text-md font-semibold text-gray-700 mb-2">Personal (del EGO):</h4>
        <div class="flex items-center justify-between">
          <div class="text-green-600 font-medium">{{ personalDual.left }}</div>
          <div class="flex-grow mx-4 h-2 bg-gray-200 rounded overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-green-500 to-red-500"
              :style="{ width: `${personalDual.percentage}%` }"
            ></div>
          </div>
          <div class="text-red-600 font-medium">{{ personalDual.right }}</div>
        </div>
        <div class="flex justify-between mt-1">
          <div class="font-bold">{{ personalDual.leftValue }}</div>
          <div class="font-bold">{{ personalDual.rightValue }}</div>
        </div>
      </div>
      
      <!-- Moral -->
      <div class="mb-4 p-2 bg-gray-50 rounded">
        <h4 class="text-md font-semibold text-gray-700 mb-2">Moral (basada en Virtud/Vicio):</h4>
        <div class="flex items-center justify-between">
          <div class="text-green-600 font-medium">{{ moralDual.left || '(Virtud)' }}</div>
          <div class="flex-grow mx-4 h-2 bg-gray-200 rounded overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-green-500 to-red-500"
              :style="{ width: `${moralDual.percentage}%` }"
            ></div>
          </div>
          <div class="text-red-600 font-medium">{{ moralDual.right || '(Vicio)' }}</div>
        </div>
        <div class="flex justify-between mt-1">
          <div class="font-bold">{{ moralDual.leftValue }}</div>
          <div class="font-bold">{{ moralDual.rightValue }}</div>
        </div>
      </div>
      
      <!-- Splat -->
      <div class="mb-4 p-2 bg-gray-50 rounded">
        <h4 class="text-md font-semibold text-gray-700 mb-2">Splat (del MORFO):</h4>
        <div class="flex items-center justify-between">
          <div class="text-green-600 font-medium">{{ splatDual.left }}</div>
          <div class="flex-grow mx-4 h-2 bg-gray-200 rounded overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-green-500 to-red-500"
              :style="{ width: `${splatDual.percentage}%` }"
            ></div>
          </div>
          <div class="text-red-600 font-medium">{{ splatDual.right }}</div>
        </div>
        <div class="flex justify-between mt-1">
          <div class="font-bold">{{ splatDual.leftValue }}</div>
          <div class="font-bold">{{ splatDual.rightValue }}</div>
        </div>
      </div>
    </div>
    
    <!-- States and Derived Stats -->
    <div class="mb-4">
      <h3 class="text-lg font-semibold mb-2 border-b border-gray-200 pb-2">ESTADOS Y DERIVADOS</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="p-2 bg-gray-50 rounded">
          <div class="text-sm font-medium text-gray-500">Salud:</div>
          <div class="text-lg font-bold">{{ health }} / {{ maxHealth }}</div>
        </div>
        <div class="p-2 bg-gray-50 rounded">
          <div class="text-sm font-medium text-gray-500">Voluntad:</div>
          <div class="text-lg font-bold">{{ willpower }} / {{ willpowerMax }}</div>
        </div>
        <div class="p-2 bg-gray-50 rounded">
          <div class="text-sm font-medium text-gray-500">Integridad:</div>
          <div class="text-lg font-bold">{{ integrity }} / 10</div>
        </div>
        <div class="p-2 bg-gray-50 rounded">
          <div class="text-sm font-medium text-gray-500">Sincronización:</div>
          <div class="text-lg font-bold">{{ synchronization }} / 5</div>
        </div>
        <div class="p-2 bg-gray-50 rounded">
          <div class="text-sm font-medium text-gray-500">Defensa:</div>
          <div class="text-lg font-bold">{{ defense }}</div>
        </div>
        <div class="p-2 bg-gray-50 rounded">
          <div class="text-sm font-medium text-gray-500">Iniciativa:</div>
          <div class="text-lg font-bold">{{ initiative }}</div>
        </div>
        <div class="p-2 bg-gray-50 rounded">
          <div class="text-sm font-medium text-gray-500">Velocidad:</div>
          <div class="text-lg font-bold">{{ speed }}</div>
        </div>
        <div class="p-2 bg-gray-50 rounded">
          <div class="text-sm font-medium text-gray-500">Armadura:</div>
          <div class="text-lg font-bold">{{ armor }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Basic information
const egoName = computed(() => store.state.ego.name);
const morfoName = computed(() => store.state.morfo.name);
const concept = computed(() => store.state.avatar.concept);

// Effective Attributes
const effectiveAttributes = computed(() => store.getters.effectiveAttributes);

// Effective Skills
const effectiveSkills = computed(() => store.getters.effectiveSkills);

// Convert skills objects to arrays for easier rendering
const mentalSkillsList = computed(() => {
  return Object.entries(effectiveSkills.value.mental).map(([name, value]) => ({
    name,
    value
  }));
});

const physicalSkillsList = computed(() => {
  return Object.entries(effectiveSkills.value.physical).map(([name, value]) => ({
    name,
    value
  }));
});

const socialSkillsList = computed(() => {
  return Object.entries(effectiveSkills.value.social).map(([name, value]) => ({
    name,
    value
  }));
});

// Dual Characteristics
const personalDual = computed(() => {
  const value = store.state.ego.dualCharacteristics.personal.value;
  const percentage = value * 10; // 1-10 to percentage
  return {
    left: store.state.ego.dualCharacteristics.personal.left,
    right: store.state.ego.dualCharacteristics.personal.right,
    leftValue: 11 - value, // Inverse scale (10 - value + 1)
    rightValue: value,
    percentage
  };
});

const moralDual = computed(() => {
  const value = store.state.ego.dualCharacteristics.moral.value;
  const percentage = value * 10; // 1-10 to percentage
  return {
    left: store.state.ego.dualCharacteristics.moral.left,
    right: store.state.ego.dualCharacteristics.moral.right,
    leftValue: 11 - value, // Inverse scale
    rightValue: value,
    percentage
  };
});

const splatDual = computed(() => {
  const value = store.state.morfo.dualCharacteristic.value;
  const percentage = value * 10; // 1-10 to percentage
  return {
    left: store.state.morfo.dualCharacteristic.left,
    right: store.state.morfo.dualCharacteristic.right,
    leftValue: 11 - value, // Inverse scale
    rightValue: value,
    percentage
  };
});

// States and Derived
const health = computed(() => store.state.morfo.derivedStats.health);
const maxHealth = computed(() => store.getters.derivedStats.health);
const willpower = computed(() => store.state.avatar.willpower.current);
const willpowerMax = computed(() => store.state.avatar.willpower.max);
const integrity = computed(() => store.state.avatar.integrity.value);
const defense = computed(() => store.getters.derivedStats.defense);
const initiative = computed(() => store.getters.derivedStats.initiative);
const speed = computed(() => store.getters.derivedStats.speed);
const synchronization = computed(() => store.state.avatar.synchronization.value);
const armor = computed(() => store.state.morfo.derivedStats.armor);
</script>