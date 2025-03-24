<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Limitaciones de Habilidades</h3>
      <button
        @click="abrirDialogoLimitacion"
        class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
      >
        Añadir Limitación
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Limitación
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Nivel
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Razón
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
          <tr v-for="limitacion in limitaciones" :key="limitacion.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
              {{ limitacion.nombre }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex space-x-1">
                <button
                  v-for="n in 5"
                  :key="n"
                  @click="actualizarNivel(limitacion.id, n)"
                  class="w-4 h-4 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  :class="[
                    n <= limitacion.nivel
                      ? 'bg-indigo-600 border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500'
                      : 'bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600'
                  ]"
                >
                  <span class="sr-only">Nivel {{ n }}</span>
                </button>
              </div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
              {{ limitacion.razon }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                @click="eliminarLimitacion(limitacion.id)"
                class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Diálogo de Nueva Limitación -->
    <div v-if="mostrarDialogoLimitacion" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Nueva Limitación</h3>
        <div class="space-y-4">
          <div>
            <label for="nombre" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Limitación</label>
            <input
              type="text"
              id="nombre"
              v-model="nuevaLimitacion.nombre"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nivel</label>
            <div class="mt-2 flex space-x-2">
              <button
                v-for="n in 5"
                :key="n"
                @click="nuevaLimitacion.nivel = n"
                class="w-4 h-4 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                :class="[
                  n <= nuevaLimitacion.nivel
                    ? 'bg-indigo-600 border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500'
                    : 'bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600'
                ]"
              >
                <span class="sr-only">Nivel {{ n }}</span>
              </button>
            </div>
          </div>

          <div>
            <label for="razon" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Razón</label>
            <textarea
              id="razon"
              v-model="nuevaLimitacion.razon"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button
            @click="cerrarDialogoLimitacion"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            @click="guardarLimitacion"
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

// Estado local
const mostrarDialogoLimitacion = ref(false)
const nuevaLimitacion = ref({
  nombre: '',
  nivel: 1,
  razon: ''
})

// Computed properties
const limitaciones = computed(() => 
  store.state.morfo.morfoSeleccionado?.limitaciones || []
)

// Métodos
const abrirDialogoLimitacion = () => {
  nuevaLimitacion.value = { nombre: '', nivel: 1, razon: '' }
  mostrarDialogoLimitacion.value = true
}

const cerrarDialogoLimitacion = () => {
  mostrarDialogoLimitacion.value = false
  nuevaLimitacion.value = { nombre: '', nivel: 1, razon: '' }
}

const guardarLimitacion = () => {
  if (nuevaLimitacion.value.nombre.trim() && nuevaLimitacion.value.razon.trim()) {
    const morfoActualizado = JSON.parse(JSON.stringify(store.state.morfo.morfoSeleccionado))
    
    if (!morfoActualizado.limitaciones) {
      morfoActualizado.limitaciones = []
    }

    morfoActualizado.limitaciones.push({
      id: Date.now().toString(),
      nombre: nuevaLimitacion.value.nombre,
      nivel: nuevaLimitacion.value.nivel,
      razon: nuevaLimitacion.value.razon
    })

    store.dispatch('morfo/actualizarMorfo', morfoActualizado)
    cerrarDialogoLimitacion()
  }
}

const actualizarNivel = (id, nivel) => {
  const morfoActualizado = JSON.parse(JSON.stringify(store.state.morfo.morfoSeleccionado))
  const limitacion = morfoActualizado.limitaciones.find(l => l.id === id)
  if (limitacion) {
    limitacion.nivel = nivel
    store.dispatch('morfo/actualizarMorfo', morfoActualizado)
  }
}

const eliminarLimitacion = (id) => {
  const morfoActualizado = JSON.parse(JSON.stringify(store.state.morfo.morfoSeleccionado))
  morfoActualizado.limitaciones = morfoActualizado.limitaciones.filter(l => l.id !== id)
  store.dispatch('morfo/actualizarMorfo', morfoActualizado)
}
</script> 