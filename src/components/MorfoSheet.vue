<template>
  <div class="space-y-6">
    <!-- Información básica -->
    <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Información del MORFO</h3>
          <p class="mt-1 text-sm text-gray-500">Información básica del cuerpo local.</p>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-4">
              <label for="morfo-type" class="block text-sm font-medium text-gray-700">Tipo de MORFO</label>
              <select
                id="morfo-type"
                v-model="morfoType"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="biologico">Biológico</option>
                <option value="sintetico">Sintético</option>
                <option value="hibrido">Híbrido</option>
              </select>
            </div>
            <div class="col-span-6 sm:col-span-2">
              <label for="durability" class="block text-sm font-medium text-gray-700">Durabilidad</label>
              <input
                type="number"
                id="durability"
                v-model="durability"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Atributos Físicos -->
    <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Atributos Físicos</h3>
          <p class="mt-1 text-sm text-gray-500">Características físicas del MORFO.</p>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="grid grid-cols-6 gap-6">
            <div v-for="(value, attr) in physicalAttributes" :key="attr" class="col-span-6 sm:col-span-3">
              <label :for="attr" class="block text-sm font-medium text-gray-700 capitalize">{{ attr }}</label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <input
                  type="range"
                  :id="attr"
                  v-model="physicalAttributes[attr]"
                  min="1"
                  max="5"
                  class="block w-full"
                />
                <span class="ml-3 text-sm text-gray-600">{{ physicalAttributes[attr] }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mejoras -->
    <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Mejoras</h3>
          <p class="mt-1 text-sm text-gray-500">Modificaciones y mejoras del MORFO.</p>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="space-y-4">
            <div v-for="(enhancement, index) in enhancements" :key="index" class="flex items-center space-x-4">
              <input
                type="text"
                v-model="enhancement.name"
                placeholder="Nombre de la mejora"
                class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <input
                type="text"
                v-model="enhancement.description"
                placeholder="Descripción"
                class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <button
                @click="removeEnhancement(index)"
                class="text-red-600 hover:text-red-800"
              >
                <span class="sr-only">Eliminar</span>
                ×
              </button>
            </div>
            <button
              @click="addEnhancement"
              type="button"
              class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              + Añadir Mejora
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'MorfoSheet',
  setup() {
    const store = useStore()
    const morfoType = ref('biologico')
    const durability = ref(1)
    
    const physicalAttributes = reactive({
      fuerza: 1,
      destreza: 1,
      resistencia: 1,
      agilidad: 1,
      velocidad: 1
    })

    const enhancements = ref([
      { name: 'Armadura', description: 'Protección contra daño físico' },
      { name: 'Sentidos Mejorados', description: 'Visión nocturna y térmica' }
    ])

    const addEnhancement = () => {
      enhancements.value.push({ name: '', description: '' })
    }

    const removeEnhancement = (index) => {
      enhancements.value.splice(index, 1)
    }

    return {
      morfoType,
      durability,
      physicalAttributes,
      enhancements,
      addEnhancement,
      removeEnhancement
    }
  }
}
</script> 