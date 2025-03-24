<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Poderes</h3>
      <button
        @click="abrirDialogoPoder"
        class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
      >
        Añadir Poder
      </button>
    </div>

    <div class="grid grid-cols-1 gap-6">
      <div
        v-for="poder in poderes"
        :key="poder.id"
        class="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
      >
        <div class="flex justify-between items-start">
          <div class="space-y-1">
            <h4 class="text-lg font-medium text-gray-900 dark:text-white">{{ poder.nombre }}</h4>
            <div class="flex space-x-2">
              <button
                v-for="n in 5"
                :key="n"
                @click="actualizarNivel(poder.id, n)"
                class="w-4 h-4 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                :class="[
                  n <= poder.nivel
                    ? 'bg-indigo-600 border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500'
                    : 'bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600'
                ]"
              >
                <span class="sr-only">Nivel {{ n }}</span>
              </button>
            </div>
          </div>
          <button
            @click="eliminarPoder(poder.id)"
            class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
          >
            <span class="sr-only">Eliminar</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="mt-4 space-y-4">
          <div>
            <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</h5>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ poder.descripcion }}</p>
          </div>

          <div>
            <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300">Requisitos</h5>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ poder.requisitos }}</p>
          </div>

          <div>
            <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300">Efectos</h5>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ poder.efectos }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Diálogo de Nuevo Poder -->
    <div v-if="mostrarDialogoPoder" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Nuevo Poder</h3>
        <div class="space-y-4">
          <div>
            <label for="nombre" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
            <input
              type="text"
              id="nombre"
              v-model="nuevoPoder.nombre"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nivel</label>
            <div class="mt-2 flex space-x-2">
              <button
                v-for="n in 5"
                :key="n"
                @click="nuevoPoder.nivel = n"
                class="w-4 h-4 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                :class="[
                  n <= nuevoPoder.nivel
                    ? 'bg-indigo-600 border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500'
                    : 'bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600'
                ]"
              >
                <span class="sr-only">Nivel {{ n }}</span>
              </button>
            </div>
          </div>

          <div>
            <label for="descripcion" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</label>
            <textarea
              id="descripcion"
              v-model="nuevoPoder.descripcion"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>

          <div>
            <label for="requisitos" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Requisitos</label>
            <textarea
              id="requisitos"
              v-model="nuevoPoder.requisitos"
              rows="2"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>

          <div>
            <label for="efectos" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Efectos</label>
            <textarea
              id="efectos"
              v-model="nuevoPoder.efectos"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button
            @click="cerrarDialogoPoder"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            @click="guardarPoder"
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
const mostrarDialogoPoder = ref(false)
const nuevoPoder = ref({
  nombre: '',
  nivel: 1,
  descripcion: '',
  requisitos: '',
  efectos: ''
})

// Computed properties
const poderes = computed(() => 
  store.state.morfo.morfoSeleccionado?.poderes || []
)

// Métodos
const abrirDialogoPoder = () => {
  nuevoPoder.value = {
    nombre: '',
    nivel: 1,
    descripcion: '',
    requisitos: '',
    efectos: ''
  }
  mostrarDialogoPoder.value = true
}

const cerrarDialogoPoder = () => {
  mostrarDialogoPoder.value = false
  nuevoPoder.value = {
    nombre: '',
    nivel: 1,
    descripcion: '',
    requisitos: '',
    efectos: ''
  }
}

const guardarPoder = () => {
  if (nuevoPoder.value.nombre.trim() && nuevoPoder.value.descripcion.trim()) {
    const morfoActualizado = JSON.parse(JSON.stringify(store.state.morfo.morfoSeleccionado))
    
    if (!morfoActualizado.poderes) {
      morfoActualizado.poderes = []
    }

    morfoActualizado.poderes.push({
      id: Date.now().toString(),
      nombre: nuevoPoder.value.nombre,
      nivel: nuevoPoder.value.nivel,
      descripcion: nuevoPoder.value.descripcion,
      requisitos: nuevoPoder.value.requisitos,
      efectos: nuevoPoder.value.efectos
    })

    store.dispatch('morfo/actualizarMorfo', morfoActualizado)
    cerrarDialogoPoder()
  }
}

const actualizarNivel = (id, nivel) => {
  const morfoActualizado = JSON.parse(JSON.stringify(store.state.morfo.morfoSeleccionado))
  const poder = morfoActualizado.poderes.find(p => p.id === id)
  if (poder) {
    poder.nivel = nivel
    store.dispatch('morfo/actualizarMorfo', morfoActualizado)
  }
}

const eliminarPoder = (id) => {
  const morfoActualizado = JSON.parse(JSON.stringify(store.state.morfo.morfoSeleccionado))
  morfoActualizado.poderes = morfoActualizado.poderes.filter(p => p.id !== id)
  store.dispatch('morfo/actualizarMorfo', morfoActualizado)
}
</script> 