<template>
  <div class="space-y-6">
    <!-- Ventajas -->
    <div>
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">Ventajas Físicas</h3>
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
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nombre</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Descripción</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Coste</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="ventaja in ventajas" :key="ventaja.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">{{ ventaja.nombre }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-500 dark:text-gray-400">{{ ventaja.descripcion }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">{{ ventaja.coste }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="editarVentaja(ventaja)"
                  class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3"
                >
                  Editar
                </button>
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
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">Desventajas Físicas</h3>
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
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nombre</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Descripción</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Bonificación</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="desventaja in desventajas" :key="desventaja.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">{{ desventaja.nombre }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-500 dark:text-gray-400">{{ desventaja.descripcion }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">{{ desventaja.bonificacion }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="editarDesventaja(desventaja)"
                  class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3"
                >
                  Editar
                </button>
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

    <!-- Diálogo para Ventajas/Desventajas -->
    <div v-if="mostrarDialogo" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {{ esVentaja ? (edicionItem ? 'Editar Ventaja' : 'Nueva Ventaja') : (edicionItem ? 'Editar Desventaja' : 'Nueva Desventaja') }}
        </h3>
        <div class="space-y-4">
          <div>
            <label for="nombre" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
            <input
              type="text"
              id="nombre"
              v-model="nuevoItem.nombre"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label for="descripcion" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</label>
            <textarea
              id="descripcion"
              v-model="nuevoItem.descripcion"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>
          <div>
            <label :for="esVentaja ? 'coste' : 'bonificacion'" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ esVentaja ? 'Coste' : 'Bonificación' }}
            </label>
            <input
              type="number"
              :id="esVentaja ? 'coste' : 'bonificacion'"
              v-model.number="nuevoItem.valor"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
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
const esVentaja = ref(true)
const edicionItem = ref(null)
const nuevoItem = ref({
  nombre: '',
  descripcion: '',
  valor: 0
})

const ventajas = computed(() => store.state.morfo.morfoSeleccionado?.ventajasFisicas || [])
const desventajas = computed(() => store.state.morfo.morfoSeleccionado?.desventajasFisicas || [])

const abrirDialogoVentaja = () => {
  esVentaja.value = true
  edicionItem.value = null
  nuevoItem.value = { nombre: '', descripcion: '', valor: 0 }
  mostrarDialogo.value = true
}

const abrirDialogoDesventaja = () => {
  esVentaja.value = false
  edicionItem.value = null
  nuevoItem.value = { nombre: '', descripcion: '', valor: 0 }
  mostrarDialogo.value = true
}

const editarVentaja = (ventaja) => {
  esVentaja.value = true
  edicionItem.value = ventaja
  nuevoItem.value = {
    nombre: ventaja.nombre,
    descripcion: ventaja.descripcion,
    valor: ventaja.coste
  }
  mostrarDialogo.value = true
}

const editarDesventaja = (desventaja) => {
  esVentaja.value = false
  edicionItem.value = desventaja
  nuevoItem.value = {
    nombre: desventaja.nombre,
    descripcion: desventaja.descripcion,
    valor: desventaja.bonificacion
  }
  mostrarDialogo.value = true
}

const cerrarDialogo = () => {
  mostrarDialogo.value = false
  edicionItem.value = null
  nuevoItem.value = { nombre: '', descripcion: '', valor: 0 }
}

const guardarItem = () => {
  if (nuevoItem.value.nombre.trim()) {
    const item = {
      id: edicionItem.value?.id || Date.now().toString(),
      nombre: nuevoItem.value.nombre,
      descripcion: nuevoItem.value.descripcion,
      [esVentaja.value ? 'coste' : 'bonificacion']: nuevoItem.value.valor
    }

    const morfoActualizado = JSON.parse(JSON.stringify(store.state.morfo.morfoSeleccionado))
    if (esVentaja.value) {
      if (!morfoActualizado.ventajasFisicas) {
        morfoActualizado.ventajasFisicas = []
      }
      if (edicionItem.value) {
        const index = morfoActualizado.ventajasFisicas.findIndex(v => v.id === edicionItem.value.id)
        if (index !== -1) {
          morfoActualizado.ventajasFisicas.splice(index, 1, item)
        }
      } else {
        morfoActualizado.ventajasFisicas.push(item)
      }
    } else {
      if (!morfoActualizado.desventajasFisicas) {
        morfoActualizado.desventajasFisicas = []
      }
      if (edicionItem.value) {
        const index = morfoActualizado.desventajasFisicas.findIndex(d => d.id === edicionItem.value.id)
        if (index !== -1) {
          morfoActualizado.desventajasFisicas.splice(index, 1, item)
        }
      } else {
        morfoActualizado.desventajasFisicas.push(item)
      }
    }

    store.dispatch('morfo/actualizarMorfo', morfoActualizado)
    cerrarDialogo()
  }
}

const eliminarVentaja = (id) => {
  const morfoActualizado = JSON.parse(JSON.stringify(store.state.morfo.morfoSeleccionado))
  if (!morfoActualizado.ventajasFisicas) {
    morfoActualizado.ventajasFisicas = []
  }
  morfoActualizado.ventajasFisicas = morfoActualizado.ventajasFisicas.filter(v => v.id !== id)
  store.dispatch('morfo/actualizarMorfo', morfoActualizado)
}

const eliminarDesventaja = (id) => {
  const morfoActualizado = JSON.parse(JSON.stringify(store.state.morfo.morfoSeleccionado))
  if (!morfoActualizado.desventajasFisicas) {
    morfoActualizado.desventajasFisicas = []
  }
  morfoActualizado.desventajasFisicas = morfoActualizado.desventajasFisicas.filter(d => d.id !== id)
  store.dispatch('morfo/actualizarMorfo', morfoActualizado)
}
</script> 