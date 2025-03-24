<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Notas</h3>
      <button
        @click="abrirDialogoNota"
        class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
      >
        Añadir Nota
      </button>
    </div>

    <!-- Lista de Notas -->
    <div class="space-y-3">
      <div
        v-for="nota in notas"
        :key="nota.id"
        class="flex items-start justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
      >
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-medium text-gray-900 dark:text-white">{{ nota.titulo }}</h4>
            <span class="text-xs text-gray-500 dark:text-gray-400">{{ formatearFecha(nota.fecha) }}</span>
          </div>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400 whitespace-pre-wrap">{{ nota.contenido }}</p>
          <div v-if="nota.etiquetas && nota.etiquetas.length" class="mt-2 flex flex-wrap gap-2">
            <span
              v-for="etiqueta in nota.etiquetas"
              :key="etiqueta"
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            >
              {{ etiqueta }}
            </span>
          </div>
        </div>
        <div class="flex space-x-2 ml-4">
          <button
            @click="editarNota(nota)"
            class="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <span class="sr-only">Editar</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            @click="eliminarNota(nota.id)"
            class="text-gray-400 hover:text-red-600 dark:hover:text-red-400"
          >
            <span class="sr-only">Eliminar</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Diálogo de Nota -->
    <div v-if="mostrarDialogo" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {{ notaEnEdicion.id ? 'Editar' : 'Nueva' }} Nota
        </h3>
        <div class="space-y-4">
          <div>
            <label for="titulo" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Título</label>
            <input
              type="text"
              id="titulo"
              v-model="notaEnEdicion.titulo"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label for="contenido" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Contenido</label>
            <textarea
              id="contenido"
              v-model="notaEnEdicion.contenido"
              rows="6"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>
          <div>
            <label for="etiquetas" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Etiquetas (separadas por comas)</label>
            <input
              type="text"
              id="etiquetas"
              v-model="etiquetasInput"
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
            @click="guardarNota"
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

const notas = computed(() => store.state.morfo.morfoSeleccionado?.notas || [])

const notaEnEdicionInicial = {
  titulo: '',
  contenido: '',
  fecha: new Date().toISOString(),
  etiquetas: []
}

const notaEnEdicion = ref({ ...notaEnEdicionInicial })
const etiquetasInput = ref('')

const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const abrirDialogoNota = () => {
  notaEnEdicion.value = { ...notaEnEdicionInicial }
  etiquetasInput.value = ''
  mostrarDialogo.value = true
}

const editarNota = (nota) => {
  notaEnEdicion.value = { ...nota }
  etiquetasInput.value = nota.etiquetas.join(', ')
  mostrarDialogo.value = true
}

const cerrarDialogo = () => {
  mostrarDialogo.value = false
  notaEnEdicion.value = { ...notaEnEdicionInicial }
  etiquetasInput.value = ''
}

const guardarNota = () => {
  if (notaEnEdicion.value.titulo.trim()) {
    const morfoActualizado = JSON.parse(JSON.stringify(store.state.morfo.morfoSeleccionado))
    
    // Procesar etiquetas
    notaEnEdicion.value.etiquetas = etiquetasInput.value
      .split(',')
      .map(e => e.trim())
      .filter(e => e.length > 0)
    
    if (notaEnEdicion.value.id) {
      // Actualizar nota existente
      const index = morfoActualizado.notas.findIndex(n => n.id === notaEnEdicion.value.id)
      if (index !== -1) {
        morfoActualizado.notas[index] = { ...notaEnEdicion.value }
      }
    } else {
      // Añadir nueva nota
      morfoActualizado.notas.push({
        id: Date.now().toString(),
        ...notaEnEdicion.value
      })
    }

    store.commit('morfo/ACTUALIZAR_MORFO', morfoActualizado)
    cerrarDialogo()
  }
}

const eliminarNota = (id) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
    const morfoActualizado = JSON.parse(JSON.stringify(store.state.morfo.morfoSeleccionado))
    morfoActualizado.notas = morfoActualizado.notas.filter(n => n.id !== id)
    store.commit('morfo/ACTUALIZAR_MORFO', morfoActualizado)
  }
}
</script> 