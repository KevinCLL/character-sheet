<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Poderes</h3>
      <button
        @click="abrirDialogoPoder"
        class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
      >
        Añadir Poder
      </button>
    </div>

    <!-- Lista de Poderes -->
    <div class="space-y-4">
      <div
        v-for="poder in poderes"
        :key="poder.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4"
      >
        <div class="flex justify-between items-start">
          <div>
            <h4 class="text-sm font-medium text-gray-900 dark:text-white">{{ poder.nombre }}</h4>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ poder.descripcion }}</p>
          </div>
          <div class="flex space-x-2">
            <button
              @click="editarPoder(poder)"
              class="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <span class="sr-only">Editar</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              @click="eliminarPoder(poder.id)"
              class="text-gray-400 hover:text-red-600 dark:hover:text-red-400"
            >
              <span class="sr-only">Eliminar</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Niveles -->
        <div v-if="poder.niveles && poder.niveles.length" class="mt-4">
          <div class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Niveles:</div>
          <div class="space-y-2">
            <div
              v-for="nivel in poder.niveles"
              :key="nivel.nivel"
              class="flex items-center space-x-2"
            >
              <div class="flex space-x-1">
                <div
                  v-for="n in 5"
                  :key="n"
                  class="w-3 h-3 rounded-full border-2"
                  :class="[
                    n <= nivel.nivel
                      ? 'bg-indigo-600 border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500'
                      : 'bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600'
                  ]"
                ></div>
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ nivel.descripcion }}</span>
            </div>
          </div>
        </div>

        <!-- Requisitos -->
        <div v-if="poder.requisitos && poder.requisitos.length" class="mt-4">
          <div class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Requisitos:</div>
          <div class="flex flex-wrap gap-1">
            <span
              v-for="requisito in poder.requisitos"
              :key="requisito"
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            >
              {{ requisito }}
            </span>
          </div>
        </div>

        <!-- Efectos -->
        <div v-if="poder.efectos && poder.efectos.length" class="mt-4">
          <div class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Efectos:</div>
          <ul class="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <li v-for="(efecto, index) in poder.efectos" :key="index">{{ efecto }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Diálogo de Poder -->
    <div v-if="mostrarDialogo" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {{ poderEnEdicion.id ? 'Editar' : 'Nuevo' }} Poder
        </h3>
        <div class="space-y-4">
          <div>
            <label for="nombre" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
            <input
              type="text"
              id="nombre"
              v-model="poderEnEdicion.nombre"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label for="descripcion" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</label>
            <textarea
              id="descripcion"
              v-model="poderEnEdicion.descripcion"
              rows="2"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>

          <!-- Niveles -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Niveles</label>
            <div class="space-y-2">
              <div
                v-for="(nivel, index) in poderEnEdicion.niveles"
                :key="index"
                class="flex items-start space-x-2"
              >
                <div class="flex-none">
                  <div class="flex space-x-1">
                    <button
                      v-for="n in 5"
                      :key="n"
                      @click="nivel.nivel = n"
                      class="w-4 h-4 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      :class="[
                        n <= nivel.nivel
                          ? 'bg-indigo-600 border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500'
                          : 'bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600'
                      ]"
                    >
                      <span class="sr-only">Nivel {{ n }}</span>
                    </button>
                  </div>
                </div>
                <div class="flex-1">
                  <textarea
                    v-model="nivel.descripcion"
                    rows="2"
                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                    :placeholder="'Descripción del nivel ' + nivel.nivel"
                  ></textarea>
                </div>
                <button
                  @click="eliminarNivel(index)"
                  class="flex-none text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  <span class="sr-only">Eliminar</span>
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <button
                @click="añadirNivel"
                class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 dark:text-indigo-400 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Añadir Nivel
              </button>
            </div>
          </div>

          <!-- Requisitos -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Requisitos</label>
            <div class="space-y-2">
              <div
                v-for="(requisito, index) in poderEnEdicion.requisitos"
                :key="index"
                class="flex items-center space-x-2"
              >
                <input
                  type="text"
                  v-model="poderEnEdicion.requisitos[index]"
                  placeholder="Requisito"
                  class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <button
                  @click="eliminarRequisito(index)"
                  class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  <span class="sr-only">Eliminar</span>
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <button
                @click="añadirRequisito"
                class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 dark:text-indigo-400 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Añadir Requisito
              </button>
            </div>
          </div>

          <!-- Efectos -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Efectos</label>
            <div class="space-y-2">
              <div
                v-for="(efecto, index) in poderEnEdicion.efectos"
                :key="index"
                class="flex items-center space-x-2"
              >
                <input
                  type="text"
                  v-model="poderEnEdicion.efectos[index]"
                  placeholder="Efecto"
                  class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <button
                  @click="eliminarEfecto(index)"
                  class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  <span class="sr-only">Eliminar</span>
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <button
                @click="añadirEfecto"
                class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 dark:text-indigo-400 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Añadir Efecto
              </button>
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
const mostrarDialogo = ref(false)

const poderes = computed(() => store.state.morfo.morfoSeleccionado?.poderes || [])

const poderEnEdicionInicial = {
  nombre: '',
  descripcion: '',
  niveles: [],
  requisitos: [],
  efectos: []
}

const poderEnEdicion = ref({ ...poderEnEdicionInicial })

const abrirDialogoPoder = () => {
  poderEnEdicion.value = { ...poderEnEdicionInicial }
  mostrarDialogo.value = true
}

const editarPoder = (poder) => {
  poderEnEdicion.value = JSON.parse(JSON.stringify(poder))
  mostrarDialogo.value = true
}

const cerrarDialogo = () => {
  mostrarDialogo.value = false
  poderEnEdicion.value = { ...poderEnEdicionInicial }
}

const añadirRequisito = () => {
  poderEnEdicion.value.requisitos.push('')
}

const eliminarRequisito = (index) => {
  poderEnEdicion.value.requisitos.splice(index, 1)
}

const añadirEfecto = () => {
  poderEnEdicion.value.efectos.push('')
}

const eliminarEfecto = (index) => {
  poderEnEdicion.value.efectos.splice(index, 1)
}

const guardarPoder = () => {
  if (poderEnEdicion.value.nombre.trim()) {
    const morfoActualizado = JSON.parse(JSON.stringify(store.state.morfo.morfoSeleccionado))
    
    if (!morfoActualizado.poderes) {
      morfoActualizado.poderes = []
    }

    const poder = {
      id: poderEnEdicion.value.id || Date.now().toString(),
      nombre: poderEnEdicion.value.nombre,
      descripcion: poderEnEdicion.value.descripcion,
      niveles: poderEnEdicion.value.niveles || [],
      requisitos: poderEnEdicion.value.requisitos.filter(r => r.trim()),
      efectos: poderEnEdicion.value.efectos.filter(e => e.trim())
    }

    if (poderEnEdicion.value.id) {
      const index = morfoActualizado.poderes.findIndex(p => p.id === poderEnEdicion.value.id)
      if (index !== -1) {
        morfoActualizado.poderes[index] = poder
      }
    } else {
      morfoActualizado.poderes.push(poder)
    }

    store.dispatch('morfo/actualizarMorfo', morfoActualizado)
    cerrarDialogo()
  }
}

const eliminarPoder = (id) => {
  const morfoActualizado = JSON.parse(JSON.stringify(store.state.morfo.morfoSeleccionado))
  if (!morfoActualizado.poderes) {
    morfoActualizado.poderes = []
  }
  morfoActualizado.poderes = morfoActualizado.poderes.filter(p => p.id !== id)
  store.dispatch('morfo/actualizarMorfo', morfoActualizado)
}

const añadirNivel = () => {
  if (!poderEnEdicion.value.niveles) {
    poderEnEdicion.value.niveles = []
  }
  poderEnEdicion.value.niveles.push({
    nivel: 1,
    descripcion: ''
  })
}

const eliminarNivel = (index) => {
  poderEnEdicion.value.niveles.splice(index, 1)
}
</script> 