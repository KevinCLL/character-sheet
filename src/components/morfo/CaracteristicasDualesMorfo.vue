<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Características Duales</h3>
      <button
        @click="abrirDialogoEdicion"
        class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
      >
        Editar Características
      </button>
    </div>

    <!-- Visualización de Características -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <div class="space-y-4">
        <div>
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ caracteristicaDual.nombre1 }}</span>
            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ caracteristicaDual.valor1 }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              class="bg-indigo-600 h-2.5 rounded-full"
              :style="{ width: `${(caracteristicaDual.valor1 / 10) * 100}%` }"
            ></div>
          </div>
        </div>
        <div>
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ caracteristicaDual.nombre2 }}</span>
            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ caracteristicaDual.valor2 }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              class="bg-indigo-600 h-2.5 rounded-full"
              :style="{ width: `${(caracteristicaDual.valor2 / 10) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Diálogo de Edición -->
    <div v-if="mostrarDialogo" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Editar Características Duales</h3>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="nombre1" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nombre Característica 1
              </label>
              <input
                type="text"
                id="nombre1"
                v-model="caracteristicasEditadas.nombre1"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label for="valor1" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Valor</label>
              <input
                type="number"
                id="valor1"
                v-model.number="caracteristicasEditadas.valor1"
                min="0"
                max="10"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="nombre2" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nombre Característica 2
              </label>
              <input
                type="text"
                id="nombre2"
                v-model="caracteristicasEditadas.nombre2"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label for="valor2" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Valor</label>
              <input
                type="number"
                id="valor2"
                v-model.number="caracteristicasEditadas.valor2"
                min="0"
                max="10"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
        </div>
        <div class="mt-6 flex justify-end space-x-3">
          <button
            @click="cerrarDialogo"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            @click="guardarCaracteristicas"
            class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const mostrarDialogo = ref(false)

const caracteristicaDual = computed(() => store.state.morfo.morfoSeleccionado?.caracteristicaDual || {
  nombre1: 'Humanidad',
  valor1: 7,
  nombre2: 'Corrupción',
  valor2: 3
})

const caracteristicasEditadas = ref({
  nombre1: '',
  valor1: 0,
  nombre2: '',
  valor2: 0
})

const abrirDialogoEdicion = () => {
  caracteristicasEditadas.value = { ...caracteristicaDual.value }
  mostrarDialogo.value = true
}

const cerrarDialogo = () => {
  mostrarDialogo.value = false
}

const guardarCaracteristicas = () => {
  const morfoActualizado = JSON.parse(JSON.stringify(store.state.morfo.morfoSeleccionado))
  morfoActualizado.caracteristicaDual = { ...caracteristicasEditadas.value }
  store.commit('morfo/ACTUALIZAR_MORFO', morfoActualizado)
  cerrarDialogo()
}
</script> 