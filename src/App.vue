<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <div class="max-w-7xl mx-auto">
      <header class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800">EGO/MORFO/AVATAR Character Sheet</h1>
        <div class="flex mt-4 space-x-4">
          <button 
            @click="saveCharacter" 
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Save Character (JSON)
          </button>
          <label class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer">
            Load Character
            <input 
              type="file" 
              accept=".json" 
              class="hidden" 
              @change="loadCharacter"
            >
          </label>
        </div>
        <div v-if="error" class="mt-2 p-2 bg-red-100 text-red-700 rounded">
          {{ error }}
        </div>
      </header>

      <!-- Tab Navigation -->
      <div class="mb-6 border-b border-gray-200">
        <nav class="flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="py-4 px-1 border-b-2 font-medium text-sm"
            :class="[
              activeTab === tab.id
                ? 'border-' + tab.color + '-500 text-' + tab.color + '-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Tab Content -->
      <div class="bg-white rounded-lg shadow-md p-4">
        <!-- EGO Section -->
        <ego-sheet v-if="activeTab === 'ego'" />
        
        <!-- MORFO Section -->
        <morfo-sheet v-if="activeTab === 'morfo'" />
        
        <!-- AVATAR Section -->
        <avatar-sheet v-if="activeTab === 'avatar'" />
        
        <!-- Character Summary Section -->
        <character-summary v-if="activeTab === 'summary'" />
        
        <!-- History Section -->
        <history-sheet v-if="activeTab === 'history'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

// Lazy loading de componentes
const EgoSheet = defineAsyncComponent(() => import('./components/ego/EgoSheet.vue'));
const MorfoSheet = defineAsyncComponent(() => import('./components/morfo/MorfoSheet.vue'));
const AvatarSheet = defineAsyncComponent(() => import('./components/avatar/AvatarSheet.vue'));
const CharacterSummary = defineAsyncComponent(() => import('./components/summary/CharacterSummary.vue'));
const HistorySheet = defineAsyncComponent(() => import('./components/history/HistorySheet.vue'));

const store = useStore();
const activeTab = ref('ego');
const error = ref(null);

// Define tabs
const tabs = [
  { id: 'ego', name: 'EGO (Mente Viajera)', color: 'blue' },
  { id: 'morfo', name: 'MORFO (Cuerpo Local)', color: 'green' },
  { id: 'avatar', name: 'AVATAR (Combinación)', color: 'purple' },
  { id: 'summary', name: 'Hoja de Resumen', color: 'gray' },
  { id: 'history', name: 'Historia', color: 'indigo' }
];

// Save character data as JSON file
const saveCharacter = () => {
  try {
    const characterData = store.state;
    const filename = `${characterData.ego.name || 'character'}.json`;
    const jsonString = JSON.stringify(characterData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const link = document.createElement('a');
    
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  } catch (err) {
    error.value = 'Error al guardar el personaje';
    console.error('Error saving character:', err);
  }
};

// Load character data from JSON file
const loadCharacter = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  try {
    const data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          resolve(JSON.parse(e.target.result));
        } catch (err) {
          reject(new Error('Archivo JSON inválido'));
        }
      };
      reader.onerror = () => reject(new Error('Error al leer el archivo'));
      reader.readAsText(file);
    });

    await store.dispatch('loadCharacter', data);
    await saveToLocalStorage(data);
    error.value = null;
  } catch (err) {
    error.value = err.message || 'Error al cargar el personaje';
    console.error('Error loading character:', err);
  }
};

// LocalStorage functions with error handling
const saveToLocalStorage = async (data) => {
  try {
    localStorage.setItem('characterData', JSON.stringify(data));
  } catch (err) {
    console.error('Error saving to localStorage:', err);
    throw new Error('Error al guardar en el almacenamiento local');
  }
};

const loadFromLocalStorage = async () => {
  try {
    const savedData = localStorage.getItem('characterData');
    if (savedData) {
      const data = JSON.parse(savedData);
      if (data && data.ego) {
        await store.dispatch('loadCharacter', data);
      }
    }
  } catch (err) {
    console.error('Error loading from localStorage:', err);
    localStorage.removeItem('characterData');
    throw new Error('Error al cargar desde el almacenamiento local');
  }
};

// Watch for store changes to save to localStorage with debounce
let saveTimeout;
watch(() => store.state, (newState) => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    saveToLocalStorage(newState).catch(err => {
      console.error('Error saving state:', err);
    });
  }, 500); // Debounce de 500ms
}, { deep: true });

// Load from localStorage when component mounts
onMounted(async () => {
  try {
    await loadFromLocalStorage();
  } catch (err) {
    error.value = err.message;
    console.error('Error on mount:', err);
  }
});
</script>