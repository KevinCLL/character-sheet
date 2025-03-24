<template>
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">EQUIPO</h3>
      <div class="overflow-x-auto mb-4">
        <table class="min-w-full border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              <th class="px-4 py-2 border-b border-r border-gray-300 text-left">Equipo</th>
              <th class="px-4 py-2 border-b border-r border-gray-300 text-center w-20">Durab.</th>
              <th class="px-4 py-2 border-b border-r border-gray-300 text-center w-20">Estruc.</th>
              <th class="px-4 py-2 border-b border-r border-gray-300 text-center w-20">Tamaño</th>
              <th class="px-4 py-2 border-b border-gray-300 text-center w-20">Coste</th>
              <th class="px-4 py-2 border-b border-gray-300 w-16"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in equipment" :key="index" class="border-b border-gray-300">
              <td class="px-4 py-2 border-r border-gray-300">
                <input 
                  type="text" 
                  v-model="item.name" 
                  class="w-full px-2 py-1 border-0"
                  placeholder="Nombre del equipo"
                >
              </td>
              <td class="px-4 py-2 border-r border-gray-300">
                <input 
                  type="number" 
                  v-model="item.durability" 
                  class="w-full px-2 py-1 border-0 text-center"
                >
              </td>
              <td class="px-4 py-2 border-r border-gray-300">
                <input 
                  type="number" 
                  v-model="item.structure" 
                  class="w-full px-2 py-1 border-0 text-center"
                >
              </td>
              <td class="px-4 py-2 border-r border-gray-300">
                <input 
                  type="number" 
                  v-model="item.size" 
                  class="w-full px-2 py-1 border-0 text-center"
                >
              </td>
              <td class="px-4 py-2 border-r border-gray-300">
                <input 
                  type="text" 
                  v-model="item.cost" 
                  class="w-full px-2 py-1 border-0 text-center"
                >
              </td>
              <td class="px-4 py-2 text-center">
                <button 
                  @click="removeEquipment(index)" 
                  class="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button 
          @click="addEquipment" 
          class="mt-2 px-4 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
        >
          + Añadir Equipo
        </button>
      </div>
      
      <h3 class="text-lg font-semibold mb-2">ARMAS</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              <th class="px-4 py-2 border-b border-r border-gray-300 text-left">Arma/Ataque</th>
              <th class="px-4 py-2 border-b border-r border-gray-300 text-center w-16">Daño</th>
              <th class="px-4 py-2 border-b border-r border-gray-300 text-center w-16">Alcance</th>
              <th class="px-4 py-2 border-b border-r border-gray-300 text-center w-16">Cargador</th>
              <th class="px-4 py-2 border-b border-r border-gray-300 text-center w-16">Inic.</th>
              <th class="px-4 py-2 border-b border-r border-gray-300 text-center w-16">Fuerza</th>
              <th class="px-4 py-2 border-b border-r border-gray-300 text-center w-16">Tamaño</th>
              <th class="px-4 py-2 border-b border-gray-300 w-16"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(weapon, index) in weapons" :key="index" class="border-b border-gray-300">
              <td class="px-4 py-2 border-r border-gray-300">
                <input 
                  type="text" 
                  v-model="weapon.name" 
                  class="w-full px-2 py-1 border-0"
                  placeholder="Nombre del arma"
                >
              </td>
              <td class="px-4 py-2 border-r border-gray-300">
                <input 
                  type="text" 
                  v-model="weapon.damage" 
                  class="w-full px-2 py-1 border-0 text-center"
                >
              </td>
              <td class="px-4 py-2 border-r border-gray-300">
                <input 
                  type="text" 
                  v-model="weapon.range" 
                  class="w-full px-2 py-1 border-0 text-center"
                >
              </td>
              <td class="px-4 py-2 border-r border-gray-300">
                <input 
                  type="text" 
                  v-model="weapon.capacity" 
                  class="w-full px-2 py-1 border-0 text-center"
                >
              </td>
              <td class="px-4 py-2 border-r border-gray-300">
                <input 
                  type="text" 
                  v-model="weapon.initiative" 
                  class="w-full px-2 py-1 border-0 text-center"
                >
              </td>
              <td class="px-4 py-2 border-r border-gray-300">
                <input 
                  type="text" 
                  v-model="weapon.strength" 
                  class="w-full px-2 py-1 border-0 text-center"
                >
              </td>
              <td class="px-4 py-2 border-r border-gray-300">
                <input 
                  type="text" 
                  v-model="weapon.size" 
                  class="w-full px-2 py-1 border-0 text-center"
                >
              </td>
              <td class="px-4 py-2 text-center">
                <button 
                  @click="removeWeapon(index)" 
                  class="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button 
          @click="addWeapon" 
          class="mt-2 px-4 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
        >
          + Añadir Arma
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  
  // Equipment
  const equipment = computed(() => {
    return store.state.morfo.equipment.map((item, index) => {
      return {
        name: computed({
          get: () => item.name || '',
          set: (value) => updateEquipmentField(index, 'name', value)
        }),
        durability: computed({
          get: () => item.durability || '',
          set: (value) => updateEquipmentField(index, 'durability', value)
        }),
        structure: computed({
          get: () => item.structure || '',
          set: (value) => updateEquipmentField(index, 'structure', value)
        }),
        size: computed({
          get: () => item.size || '',
          set: (value) => updateEquipmentField(index, 'size', value)
        }),
        cost: computed({
          get: () => item.cost || '',
          set: (value) => updateEquipmentField(index, 'cost', value)
        })
      };
    });
  });
  
  // Weapons
  const weapons = computed(() => {
    return store.state.morfo.weapons.map((weapon, index) => {
      return {
        name: computed({
          get: () => weapon.name || '',
          set: (value) => updateWeaponField(index, 'name', value)
        }),
        damage: computed({
          get: () => weapon.damage || '',
          set: (value) => updateWeaponField(index, 'damage', value)
        }),
        range: computed({
          get: () => weapon.range || '',
          set: (value) => updateWeaponField(index, 'range', value)
        }),
        capacity: computed({
          get: () => weapon.capacity || '',
          set: (value) => updateWeaponField(index, 'capacity', value)
        }),
        initiative: computed({
          get: () => weapon.initiative || '',
          set: (value) => updateWeaponField(index, 'initiative', value)
        }),
        strength: computed({
          get: () => weapon.strength || '',
          set: (value) => updateWeaponField(index, 'strength', value)
        }),
        size: computed({
          get: () => weapon.size || '',
          set: (value) => updateWeaponField(index, 'size', value)
        })
      };
    });
  });
  
  // Equipment CRUD
  function updateEquipmentField(index, field, value) {
    const newEquipment = [...store.state.morfo.equipment];
    if (!newEquipment[index]) {
      newEquipment[index] = {};
    }
    newEquipment[index][field] = value;
    store.commit('updateMorfo', { path: 'equipment', value: newEquipment });
  }
  
  function addEquipment() {
    const newEquipment = [...store.state.morfo.equipment, {
      name: '',
      durability: '',
      structure: '',
      size: '',
      cost: ''
    }];
    store.commit('updateMorfo', { path: 'equipment', value: newEquipment });
  }
  
  function removeEquipment(index) {
    const newEquipment = [...store.state.morfo.equipment];
    newEquipment.splice(index, 1);
    store.commit('updateMorfo', { path: 'equipment', value: newEquipment });
  }
  
  // Weapons CRUD
  function updateWeaponField(index, field, value) {
    const newWeapons = [...store.state.morfo.weapons];
    if (!newWeapons[index]) {
      newWeapons[index] = {};
    }
    newWeapons[index][field] = value;
    store.commit('updateMorfo', { path: 'weapons', value: newWeapons });
  }
  
  function addWeapon() {
    const newWeapons = [...store.state.morfo.weapons, {
      name: '',
      damage: '',
      range: '',
      capacity: '',
      initiative: '',
      strength: '',
      size: ''
    }];
    store.commit('updateMorfo', { path: 'weapons', value: newWeapons });
  }
  
  function removeWeapon(index) {
    const newWeapons = [...store.state.morfo.weapons];
    newWeapons.splice(index, 1);
    store.commit('updateMorfo', { path: 'weapons', value: newWeapons });
  }
  </script>