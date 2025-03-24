<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Limitadores de Habilidades</h3>
      <button
        @click="abrirDialogoLimitador"
        class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
      >
        Añadir Limitador
      </button>
    </div>

    <!-- Tabla de Limitadores -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Limitación</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nivel</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Motivo</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="limitador in limitadores" :key="limitador.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{{ limitador.limitacion }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex space-x-1">
                <div
                  v-for="n in 5"
                  :key="n"
                  class="w-3 h-3 rounded-full border-2"
                  :class="[
                    n <= limitador.nivel
                      ? 'bg-indigo-600 border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500'
                      : 'bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600'
                  ]"
                ></div>
              </div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{{ limitador.motivo }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                @click="editarLimitador(limitador)"
                class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3"
              >
                Editar
              </button>
              <button
                @click="eliminarLimitador(limitador.id)"
                class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Diálogo de Limitador -->
    <div v-if="mostrarDialogo" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {{ limitadorEnEdicion.id ? 'Editar' : 'Nuevo' }} Limitador
        </h3>
        <div class="space-y-4">
          <div>
            <label for="limitacion" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Limitación</label>
            <input
              type="text"
              id="limitacion"
              v-model="limitadorEnEdicion.limitacion"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nivel</label>
            <div class="mt-2 flex space-x-2">
              <button
                v-for="n in 5"
                :key="n"
                @click="limitadorEnEdicion.nivel = n"
                class="w-4 h-4 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                :class="[
                  n <= limitadorEnEdicion.nivel
                    ? 'bg-indigo-600 border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500'
                    : 'bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600'
                ]"
              >
                <span class="sr-only">Nivel {{ n }}</span>
              </button>
            </div>
          </div>
          <div>
            <label for="motivo" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Motivo</label>
            <textarea
              id="motivo"
              v-model="limitadorEnEdicion.motivo"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
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
            @click="guardarLimitador"
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

const limitadores = computed(() => store.state.morfo.morfoSeleccionado?.limitadoresHabilidades || [])

const limitadorEnEdicionInicial = {
  limitacion: '',
  nivel: 1,
  motivo: ''
}

const limitadorEnEdicion = ref({ ...limitadorEnEdicionInicial })

const abrirDialogoLimitador = () => {
  limitadorEnEdicion.value = { ...limitadorEnEdicionInicial }
  mostrarDialogo.value = true
}

const editarLimitador = (limitador) => {
  limitadorEnEdicion.value = { ...limitador }
  mostrarDialogo.value = true
}

const cerrarDialogo = () => {
  mostrarDialogo.value = false
  limitadorEnEdicion.value = { ...limitadorEnEdicionInicial }
}

const guardarLimitador = () => {
  if (limitadorEnEdicion.value.limitacion.trim()) {
    const morfoActualizado = JSON.parse(JSON.stringify(store.state.morfo.morfoSeleccionado))
    
    if (!morfoActualizado.limitadoresHabilidades) {
      morfoActualizado.limitadoresHabilidades = []
    }

    const limitador = {
      id: limitadorEnEdicion.value.id || Date.now().toString(),
      limitacion: limitadorEnEdicion.value.limitacion,
      nivel: limitadorEnEdicion.value.nivel,
      motivo: limitadorEnEdicion.value.motivo
    }

    if (limitadorEnEdicion.value.id) {
      const index = morfoActualizado.limitadoresHabilidades.findIndex(l => l.id === limitadorEnEdicion.value.id)
      if (index !== -1) {
        morfoActualizado.limitadoresHabilidades[index] = limitador
      }
    } else {
      morfoActualizado.limitadoresHabilidades.push(limitador)
    }

    store.dispatch('morfo/actualizarMorfo', morfoActualizado)
    cerrarDialogo()
  }
}

const eliminarLimitador = (id) => {
  const morfoActualizado = JSON.parse(JSON.stringify(store.state.morfo.morfoSeleccionado))
  if (!morfoActualizado.limitadoresHabilidades) {
    morfoActualizado.limitadoresHabilidades = []
  }
  morfoActualizado.limitadoresHabilidades = morfoActualizado.limitadoresHabilidades.filter(l => l.id !== id)
  store.dispatch('morfo/actualizarMorfo', morfoActualizado)
}
</script> 