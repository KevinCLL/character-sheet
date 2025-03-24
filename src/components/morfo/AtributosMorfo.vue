<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Atributos</h3>
    </div>

    <!-- Atributos Físicos -->
    <div class="space-y-4">
      <div v-for="(valor, nombre) in atributosFisicos" :key="nombre" class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{{ nombre }}</span>
          <div class="flex space-x-2">
            <button
              v-for="n in 5"
              :key="n"
              @click="actualizarAtributo('atributosFisicos', nombre, n)"
              class="w-4 h-4 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              :class="[
                n <= valor
                  ? 'bg-indigo-600 border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500'
                  : 'bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600'
              ]"
            >
              <span class="sr-only">Nivel {{ n }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Atributos Sociales -->
    <div class="space-y-4">
      <div v-for="(valor, nombre) in atributosSociales" :key="nombre" class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{{ nombre }}</span>
          <div class="flex space-x-2">
            <button
              v-for="n in 5"
              :key="n"
              @click="actualizarAtributo('atributosSociales', nombre, n)"
              class="w-4 h-4 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              :class="[
                n <= valor
                  ? 'bg-indigo-600 border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500'
                  : 'bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600'
              ]"
            >
              <span class="sr-only">Nivel {{ n }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Atributos Mentales -->
    <div class="space-y-4">
      <div v-for="(valor, nombre) in atributosMentales" :key="nombre" class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{{ nombre }}</span>
          <div class="flex space-x-2">
            <button
              v-for="n in 5"
              :key="n"
              @click="actualizarAtributo('atributosMentales', nombre, n)"
              class="w-4 h-4 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              :class="[
                n <= valor
                  ? 'bg-indigo-600 border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500'
                  : 'bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600'
              ]"
            >
              <span class="sr-only">Nivel {{ n }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const atributosFisicos = computed(() => store.state.morfo.morfoSeleccionado?.atributosFisicos || {})
const atributosSociales = computed(() => store.state.morfo.morfoSeleccionado?.atributosSociales || {})
const atributosMentales = computed(() => store.state.morfo.morfoSeleccionado?.atributosMentales || {})

const actualizarAtributo = (tipo, nombre, valor) => {
  const morfoActualizado = JSON.parse(JSON.stringify(store.state.morfo.morfoSeleccionado))
  
  if (!morfoActualizado[tipo]) {
    morfoActualizado[tipo] = {}
  }
  
  morfoActualizado[tipo][nombre] = valor
  store.dispatch('morfo/actualizarMorfo', morfoActualizado)
}
</script> 