<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Equipo</h3>
      <button
        @click="abrirDialogoEquipo"
        class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
      >
        Añadir Equipo
      </button>
    </div>

    <!-- Tabla de Equipo -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Equipo</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Bonus</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tamaño</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Disponibilidad</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Descripción</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="item in equipo" :key="item.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900 dark:text-white">{{ item.nombre }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900 dark:text-white">{{ item.bonus }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900 dark:text-white">{{ item.tamaño }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900 dark:text-white">{{ item.disponibilidad }}</div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-gray-500 dark:text-gray-400">{{ item.descripcion }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                @click="editarItem(item)"
                class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3"
              >
                Editar
              </button>
              <button
                @click="eliminarItem(item.id)"
                class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Diálogo de Equipo -->
    <div v-if="mostrarDialogo" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {{ itemEnEdicion.id ? 'Editar' : 'Nuevo' }} Equipo
        </h3>
        <div class="space-y-4">
          <div>
            <label for="nombre" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
            <input
              type="text"
              id="nombre"
              v-model="itemEnEdicion.nombre"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label for="bonus" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Bonus</label>
            <input
              type="text"
              id="bonus"
              v-model="itemEnEdicion.bonus"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label for="tamaño" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tamaño</label>
            <input
              type="text"
              id="tamaño"
              v-model="itemEnEdicion.tamaño"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label for="disponibilidad" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Disponibilidad</label>
            <select
              id="disponibilidad"
              v-model="itemEnEdicion.disponibilidad"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="•">•</option>
              <option value="••">••</option>
              <option value="•••">•••</option>
            </select>
          </div>
          <div>
            <label for="descripcion" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</label>
            <textarea
              id="descripcion"
              v-model="itemEnEdicion.descripcion"
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
            @click="guardarItem"
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

const equipo = computed(() => store.state.morfo.morfoSeleccionado?.equipo || [])

const itemEnEdicionInicial = {
  nombre: '',
  bonus: '',
  tamaño: '',
  disponibilidad: '•',
  descripcion: ''
}

const itemEnEdicion = ref({ ...itemEnEdicionInicial })

const abrirDialogoEquipo = () => {
  itemEnEdicion.value = { ...itemEnEdicionInicial }
  mostrarDialogo.value = true
}

const editarItem = (item) => {
  itemEnEdicion.value = { ...item }
  mostrarDialogo.value = true
}

const cerrarDialogo = () => {
  mostrarDialogo.value = false
  itemEnEdicion.value = { ...itemEnEdicionInicial }
}

const guardarItem = () => {
  if (itemEnEdicion.value.nombre.trim()) {
    const morfoActualizado = JSON.parse(JSON.stringify(store.state.morfo.morfoSeleccionado))
    
    if (!morfoActualizado.equipo) {
      morfoActualizado.equipo = []
    }

    const item = {
      id: itemEnEdicion.value.id || Date.now().toString(),
      nombre: itemEnEdicion.value.nombre,
      bonus: itemEnEdicion.value.bonus,
      tamaño: itemEnEdicion.value.tamaño,
      disponibilidad: itemEnEdicion.value.disponibilidad,
      descripcion: itemEnEdicion.value.descripcion
    }

    if (itemEnEdicion.value.id) {
      const index = morfoActualizado.equipo.findIndex(e => e.id === itemEnEdicion.value.id)
      if (index !== -1) {
        morfoActualizado.equipo[index] = item
      }
    } else {
      morfoActualizado.equipo.push(item)
    }

    store.dispatch('morfo/actualizarMorfo', morfoActualizado)
    cerrarDialogo()
  }
}

const eliminarItem = (id) => {
  const morfoActualizado = JSON.parse(JSON.stringify(store.state.morfo.morfoSeleccionado))
  if (!morfoActualizado.equipo) {
    morfoActualizado.equipo = []
  }
  morfoActualizado.equipo = morfoActualizado.equipo.filter(e => e.id !== id)
  store.dispatch('morfo/actualizarMorfo', morfoActualizado)
}
</script> 