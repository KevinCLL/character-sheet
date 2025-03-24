<template>
  <div class="space-y-8">
    <!-- Ventajas -->
    <div>
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">Ventajas</h3>
        <button
          @click="abrirDialogoVentaja"
          class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Añadir Ventaja
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Nombre
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Nivel
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Descripción
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
            <tr v-for="ventaja in ventajas" :key="ventaja.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ ventaja.nombre }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex space-x-1">
                  <button
                    v-for="n in 5"
                    :key="n"
                    @click="actualizarNivelVentaja(ventaja.id, n)"
                    class="w-4 h-4 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    :class="[
                      n <= ventaja.nivel
                        ? 'bg-indigo-600 border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500'
                        : 'bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600'
                    ]"
                  >
                    <span class="sr-only">Nivel {{ n }}</span>
                  </button>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                {{ ventaja.descripcion }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="eliminarVentaja(ventaja.id)"
                  class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Desventajas -->
    <div>
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">Desventajas</h3>
        <button
          @click="abrirDialogoDesventaja"
          class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Añadir Desventaja
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Nombre
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Descripción
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
            <tr v-for="desventaja in desventajas" :key="desventaja.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ desventaja.nombre }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                {{ desventaja.descripcion }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="eliminarDesventaja(desventaja.id)"
                  class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Diálogo de Nueva Ventaja -->
    <div v-if="mostrarDialogoVentaja" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Nueva Ventaja</h3>
        <div class="space-y-4">
          <div>
            <label for="nombreVentaja" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
            <input
              type="text"
              id="nombreVentaja"
              v-model="nuevaVentaja.nombre"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nivel</label>
            <div class="mt-2 flex space-x-2">
              <button
                v-for="n in 5"
                :key="n"
                @click="nuevaVentaja.nivel = n"
                class="w-4 h-4 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                :class="[
                  n <= nuevaVentaja.nivel
                    ? 'bg-indigo-600 border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500'
                    : 'bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600'
                ]"
              >
                <span class="sr-only">Nivel {{ n }}</span>
              </button>
            </div>
          </div>

          <div>
            <label for="descripcionVentaja" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</label>
            <textarea
              id="descripcionVentaja"
              v-model="nuevaVentaja.descripcion"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button
            @click="cerrarDialogoVentaja"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            @click="guardarVentaja"
            class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>

    <!-- Diálogo de Nueva Desventaja -->
    <div v-if="mostrarDialogoDesventaja" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Nueva Desventaja</h3>
        <div class="space-y-4">
          <div>
            <label for="nombreDesventaja" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
            <input
              type="text"
              id="nombreDesventaja"
              v-model="nuevaDesventaja.nombre"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label for="descripcionDesventaja" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</label>
            <textarea
              id="descripcionDesventaja"
              v-model="nuevaDesventaja.descripcion"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button
            @click="cerrarDialogoDesventaja"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            @click="guardarDesventaja"
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
const mostrarDialogoVentaja = ref(false)
const mostrarDialogoDesventaja = ref(false)
const nuevaVentaja = ref({
  nombre: '',
  nivel: 1,
  descripcion: ''
})
const nuevaDesventaja = ref({
  nombre: '',
  descripcion: ''
})

// Computed properties
const ventajas = computed(() => 
  store.state.morfo.morfoSeleccionado?.ventajas || []
)

const desventajas = computed(() => 
  store.state.morfo.morfoSeleccionado?.desventajas || []
)

// Métodos para ventajas
const abrirDialogoVentaja = () => {
  nuevaVentaja.value = { nombre: '', nivel: 1, descripcion: '' }
  mostrarDialogoVentaja.value = true
}

const cerrarDialogoVentaja = () => {
  mostrarDialogoVentaja.value = false
  nuevaVentaja.value = { nombre: '', nivel: 1, descripcion: '' }
}

const guardarVentaja = () => {
  if (nuevaVentaja.value.nombre.trim() && nuevaVentaja.value.descripcion.trim()) {
    const morfoActualizado = JSON.parse(JSON.stringify(store.state.morfo.morfoSeleccionado))
    
    if (!morfoActualizado.ventajas) {
      morfoActualizado.ventajas = []
    }

    morfoActualizado.ventajas.push({
      id: Date.now().toString(),
      nombre: nuevaVentaja.value.nombre,
      nivel: nuevaVentaja.value.nivel,
      descripcion: nuevaVentaja.value.descripcion
    })

    store.dispatch('morfo/actualizarMorfo', morfoActualizado)
    cerrarDialogoVentaja()
  }
}

const actualizarNivelVentaja = (id, nivel) => {
  const morfoActualizado = JSON.parse(JSON.stringify(store.state.morfo.morfoSeleccionado))
  const ventaja = morfoActualizado.ventajas.find(v => v.id === id)
  if (ventaja) {
    ventaja.nivel = nivel
    store.dispatch('morfo/actualizarMorfo', morfoActualizado)
  }
}

const eliminarVentaja = (id) => {
  const morfoActualizado = JSON.parse(JSON.stringify(store.state.morfo.morfoSeleccionado))
  morfoActualizado.ventajas = morfoActualizado.ventajas.filter(v => v.id !== id)
  store.dispatch('morfo/actualizarMorfo', morfoActualizado)
}

// Métodos para desventajas
const abrirDialogoDesventaja = () => {
  nuevaDesventaja.value = { nombre: '', descripcion: '' }
  mostrarDialogoDesventaja.value = true
}

const cerrarDialogoDesventaja = () => {
  mostrarDialogoDesventaja.value = false
  nuevaDesventaja.value = { nombre: '', descripcion: '' }
}

const guardarDesventaja = () => {
  if (nuevaDesventaja.value.nombre.trim() && nuevaDesventaja.value.descripcion.trim()) {
    const morfoActualizado = JSON.parse(JSON.stringify(store.state.morfo.morfoSeleccionado))
    
    if (!morfoActualizado.desventajas) {
      morfoActualizado.desventajas = []
    }

    morfoActualizado.desventajas.push({
      id: Date.now().toString(),
      nombre: nuevaDesventaja.value.nombre,
      descripcion: nuevaDesventaja.value.descripcion
    })

    store.dispatch('morfo/actualizarMorfo', morfoActualizado)
    cerrarDialogoDesventaja()
  }
}

const eliminarDesventaja = (id) => {
  const morfoActualizado = JSON.parse(JSON.stringify(store.state.morfo.morfoSeleccionado))
  morfoActualizado.desventajas = morfoActualizado.desventajas.filter(d => d.id !== id)
  store.dispatch('morfo/actualizarMorfo', morfoActualizado)
}
</script> 