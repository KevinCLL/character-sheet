<template>
  <div class="space-y-6">
    <div class="border rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
              {{ tipo.charAt(0).toUpperCase() + tipo.slice(1) }}
              <span class="text-xs font-normal text-gray-500">(-3 sin entrenar)</span>
            </th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Nivel</th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Especializaciones</th>
            <th scope="col" class="px-3 py-3.5 text-right">
              <button
                @click="agregarNuevaFila"
                class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                + Nueva Habilidad
              </button>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
          <tr v-for="habilidad in habilidades" :key="habilidad.id" class="group">
            <td class="whitespace-nowrap py-2 pl-8 pr-3">
              <input
                v-if="habilidad.editando"
                type="text"
                v-model="habilidad.nombre"
                @blur="guardarHabilidad(habilidad)"
                @keydown.enter.prevent="guardarHabilidad(habilidad)"
                class="w-full text-sm border-gray-300 rounded-md focus:border-gray-500 focus:ring-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                ref="nombreInput"
              />
              <span 
                v-else 
                @click="editarHabilidad(habilidad)"
                class="text-sm font-medium text-gray-900 dark:text-white cursor-pointer hover:text-gray-600 dark:hover:text-gray-300"
              >
                {{ habilidad.nombre }}
              </span>
            </td>
            <td class="px-3 py-2">
              <div class="flex space-x-1">
                <button
                  v-for="n in 5"
                  :key="n"
                  @click="actualizarHabilidad(tipo, habilidad.id, n)"
                  class="w-4 h-4 rounded-full border focus:outline-none"
                  :class="[
                    n <= habilidad.valor
                      ? 'bg-black border-black dark:bg-white dark:border-white'
                      : 'bg-white border-black dark:bg-gray-900 dark:border-white'
                  ]"
                >
                  <span class="sr-only">Nivel {{ n }}</span>
                </button>
              </div>
            </td>
            <td class="px-3 py-2">
              <div v-if="habilidad.valor >= 3" class="flex items-center space-x-2">
                <div class="flex flex-wrap gap-2">
                  <div
                    v-for="(esp, index) in habilidad.especializaciones"
                    :key="index"
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {{ esp }}
                    <button
                      @click="eliminarEspecializacion(tipo, habilidad.id, esp)"
                      class="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <span class="sr-only">Eliminar</span>
                      ×
                    </button>
                  </div>
                </div>
                <input
                  v-if="habilidad.editandoEspecializacion"
                  type="text"
                  v-model="nuevaEspecializacion"
                  @blur="guardarEspecializacion(habilidad)"
                  @keydown.enter.prevent="guardarEspecializacion(habilidad)"
                  placeholder="Nueva especialización"
                  class="w-32 text-sm border-gray-300 rounded-md focus:border-gray-500 focus:ring-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <button
                  v-else
                  @click="editarEspecializacion(habilidad)"
                  class="text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  +
                </button>
              </div>
            </td>
            <td class="px-3 py-2 text-right">
              <div class="invisible group-hover:visible flex justify-end space-x-2">
                <button
                  @click="eliminarHabilidad(tipo, habilidad.id)"
                  class="text-sm text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200"
                >
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="mostrarNuevaFila">
            <td class="whitespace-nowrap py-2 pl-8 pr-3">
              <input
                type="text"
                v-model="nuevaHabilidad.nombre"
                @blur="guardarNuevaHabilidad"
                @keydown.enter.prevent="guardarNuevaHabilidad"
                placeholder="Nombre de la habilidad"
                class="w-full text-sm border-gray-300 rounded-md focus:border-gray-500 focus:ring-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                ref="nuevoNombreInput"
              />
            </td>
            <td class="px-3 py-2">
              <div class="flex space-x-1">
                <button
                  v-for="n in 5"
                  :key="n"
                  @click="nuevaHabilidad.valor = n"
                  class="w-4 h-4 rounded-full border focus:outline-none"
                  :class="[
                    n <= nuevaHabilidad.valor
                      ? 'bg-black border-black dark:bg-white dark:border-white'
                      : 'bg-white border-black dark:bg-gray-900 dark:border-white'
                  ]"
                >
                  <span class="sr-only">Nivel {{ n }}</span>
                </button>
              </div>
            </td>
            <td class="px-3 py-2"></td>
            <td class="px-3 py-2 text-right">
              <button
                @click="cancelarNuevaHabilidad"
                class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Cancelar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Diálogo Nueva Habilidad -->
    <div v-if="mostrarDialogoHabilidad" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Nueva Habilidad</h3>
        <div class="space-y-4">
          <div>
            <label for="nombreHabilidad" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
            <input
              type="text"
              id="nombreHabilidad"
              v-model="nuevaHabilidad"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
        <div class="mt-6 flex justify-end space-x-3">
          <button
            @click="cerrarDialogoHabilidad"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            @click="guardarHabilidad"
            class="px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md hover:bg-gray-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>

    <!-- Diálogo Nueva Especialización -->
    <div v-if="mostrarDialogo" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Nueva Especialización</h3>
        <div class="space-y-4">
          <div>
            <label for="especializacion" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
            <input
              type="text"
              id="especializacion"
              v-model="nuevaEspecializacion"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
            @click="guardarEspecializacion"
            class="px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md hover:bg-gray-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  tipo: {
    type: String,
    required: true
  }
})

const store = useStore()
const grupos = computed(() => store.getters['ego/habilidadesPorTipo'](props.tipo))
const habilidadesOriginales = computed(() => grupos.value[0].habilidades)
const habilidades = ref(habilidadesOriginales.value.map(h => ({ ...h, editando: false, editandoEspecializacion: false })))

const mostrarNuevaFila = ref(false)
const nuevaHabilidad = ref({
  nombre: '',
  valor: 1,
  especializaciones: []
})
const nuevaEspecializacion = ref('')

const nombreInput = ref(null)
const nuevoNombreInput = ref(null)

const mostrarDialogo = ref(false)
const mostrarDialogoHabilidad = ref(false)

const agregarNuevaFila = () => {
  mostrarNuevaFila.value = true
  nextTick(() => {
    nuevoNombreInput.value?.focus()
  })
}

const cancelarNuevaHabilidad = () => {
  mostrarNuevaFila.value = false
  nuevaHabilidad.value = {
    nombre: '',
    valor: 1,
    especializaciones: []
  }
}

const guardarNuevaHabilidad = () => {
  setTimeout(() => {
    if (nuevaHabilidad.value.nombre.trim()) {
      store.dispatch('ego/agregarHabilidad', {
        tipo: props.tipo,
        nombre: nuevaHabilidad.value.nombre.trim(),
        valor: nuevaHabilidad.value.valor
      })
      cancelarNuevaHabilidad()
    } else {
      cancelarNuevaHabilidad()
    }
  }, 0)
}

const editarHabilidad = (habilidad) => {
  habilidad.editando = true
  nextTick(() => {
    nombreInput.value?.focus()
  })
}

const guardarHabilidad = (habilidad) => {
  setTimeout(() => {
    if (habilidad.nombre.trim()) {
      store.dispatch('ego/actualizarHabilidad', {
        tipo: props.tipo,
        id: habilidad.id,
        nombre: habilidad.nombre.trim(),
        valor: habilidad.valor
      })
      habilidad.editando = false
    } else {
      const habilidadOriginal = habilidadesOriginales.value.find(h => h.id === habilidad.id)
      if (habilidadOriginal) {
        habilidad.nombre = habilidadOriginal.nombre
        habilidad.valor = habilidadOriginal.valor
      }
      habilidad.editando = false
    }
  }, 0)
}

const actualizarHabilidad = (tipo, id, valor) => {
  const habilidad = habilidades.value.find(h => h.id === id)
  if (habilidad) {
    habilidad.valor = valor
    store.dispatch('ego/actualizarHabilidad', {
      tipo,
      id,
      nombre: habilidad.nombre,
      valor
    })
  }
}

const editarEspecializacion = (habilidad) => {
  habilidad.editandoEspecializacion = true
  nuevaEspecializacion.value = ''
}

const guardarEspecializacion = (habilidad) => {
  setTimeout(() => {
    if (nuevaEspecializacion.value.trim()) {
      store.dispatch('ego/agregarEspecializacion', {
        tipo: props.tipo,
        habilidadId: habilidad.id,
        especializacion: nuevaEspecializacion.value.trim()
      })
    }
    habilidad.editandoEspecializacion = false
    nuevaEspecializacion.value = ''
  }, 0)
}

const eliminarEspecializacion = (tipo, habilidadId, especializacion) => {
  store.dispatch('ego/eliminarEspecializacion', {
    tipo,
    habilidadId,
    especializacion
  })
}

const eliminarHabilidad = (tipo, id) => {
  store.dispatch('ego/eliminarHabilidad', { tipo, id })
}

const cerrarDialogoHabilidad = () => {
  mostrarDialogoHabilidad.value = false
}

const cerrarDialogo = () => {
  mostrarDialogo.value = false
}

watch(() => habilidadesOriginales.value, (newHabilidades) => {
  habilidades.value = newHabilidades.map(h => ({ ...h, editando: false, editandoEspecializacion: false }))
}, { deep: true })
</script>

<style>
input[type="range"]::-webkit-slider-thumb {
  width: 1rem;
  height: 1rem;
  background-color: rgb(79 70 229);
  border-radius: 9999px;
  appearance: none;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 1rem;
  height: 1rem;
  background-color: rgb(79 70 229);
  border-radius: 9999px;
  appearance: none;
  cursor: pointer;
}
</style> 