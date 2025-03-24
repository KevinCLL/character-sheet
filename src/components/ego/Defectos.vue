<template>
  <div class="space-y-6">
    <div class="border rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Defectos</th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Descripción</th>
            <th scope="col" class="px-3 py-3.5 text-right">
              <button
                @click="agregarNuevaFila"
                class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                + Nuevo Defecto
              </button>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
          <tr v-for="defecto in defectos" :key="defecto.id" class="group">
            <td class="whitespace-nowrap py-2 pl-8 pr-3">
              <input
                v-if="defecto.editando"
                type="text"
                v-model="defecto.nombre"
                @blur="guardarDefecto(defecto)"
                @keydown.enter.prevent="guardarDefecto(defecto)"
                class="w-full text-sm border-gray-300 rounded-md focus:border-gray-500 focus:ring-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                ref="nombreInput"
              />
              <span 
                v-else 
                @click="editarDefecto(defecto)"
                class="text-sm font-medium text-gray-900 dark:text-white cursor-pointer hover:text-gray-600 dark:hover:text-gray-300"
              >
                {{ defecto.nombre }}
              </span>
            </td>
            <td class="px-3 py-2">
              <textarea
                v-if="defecto.editando"
                v-model="defecto.descripcion"
                @blur="guardarDefecto(defecto)"
                @keydown.enter.prevent="guardarDefecto(defecto)"
                rows="1"
                class="w-full text-sm border-gray-300 rounded-md focus:border-gray-500 focus:ring-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              ></textarea>
              <span 
                v-else 
                @click="editarDefecto(defecto)"
                class="text-sm text-gray-900 dark:text-white cursor-pointer hover:text-gray-600 dark:hover:text-gray-300"
              >
                <template v-if="defecto.descripcion">{{ defecto.descripcion }}</template>
                <span v-else class="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400">+</span>
              </span>
            </td>
            <td class="px-3 py-2 text-right">
              <div class="invisible group-hover:visible flex justify-end space-x-2">
                <button
                  @click="eliminarDefecto(defecto.id)"
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
                v-model="nuevoDefecto.nombre"
                @blur="guardarNuevoDefecto"
                @keydown.enter.prevent="guardarNuevoDefecto"
                placeholder="Nombre del defecto"
                class="w-full text-sm border-gray-300 rounded-md focus:border-gray-500 focus:ring-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                ref="nuevoNombreInput"
              />
            </td>
            <td class="px-3 py-2">
              <textarea
                v-model="nuevoDefecto.descripcion"
                @blur="guardarNuevoDefecto"
                @keydown.enter.prevent="guardarNuevoDefecto"
                placeholder="Descripción del defecto"
                rows="1"
                class="w-full text-sm border-gray-300 rounded-md focus:border-gray-500 focus:ring-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              ></textarea>
            </td>
            <td class="px-3 py-2 text-right">
              <button
                @click="cancelarNuevoDefecto"
                class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Cancelar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const defectosOriginales = computed(() => store.getters['ego/defectos'])
const defectos = ref(defectosOriginales.value.map(d => ({ ...d, editando: false })))

const mostrarNuevaFila = ref(false)
const nuevoDefecto = ref({
  nombre: '',
  descripcion: ''
})

const nombreInput = ref(null)
const nuevoNombreInput = ref(null)

const agregarNuevaFila = () => {
  mostrarNuevaFila.value = true
  nextTick(() => {
    nuevoNombreInput.value?.focus()
  })
}

const cancelarNuevoDefecto = () => {
  mostrarNuevaFila.value = false
  nuevoDefecto.value = {
    nombre: '',
    descripcion: ''
  }
}

const guardarNuevoDefecto = () => {
  setTimeout(() => {
    if (nuevoDefecto.value.nombre.trim()) {
      store.dispatch('ego/agregarDefecto', {
        id: Date.now().toString(),
        nombre: nuevoDefecto.value.nombre,
        descripcion: nuevoDefecto.value.descripcion
      })
      cancelarNuevoDefecto()
    } else {
      cancelarNuevoDefecto()
    }
  }, 0)
}

const editarDefecto = (defecto) => {
  defecto.editando = true
  nextTick(() => {
    nombreInput.value?.focus()
  })
}

const guardarDefecto = (defecto) => {
  setTimeout(() => {
    if (defecto.nombre.trim()) {
      store.dispatch('ego/actualizarDefecto', {
        id: defecto.id,
        nombre: defecto.nombre,
        descripcion: defecto.descripcion
      })
      defecto.editando = false
    } else {
      const defectoOriginal = defectosOriginales.value.find(d => d.id === defecto.id)
      if (defectoOriginal) {
        defecto.nombre = defectoOriginal.nombre
        defecto.descripcion = defectoOriginal.descripcion
      }
      defecto.editando = false
    }
  }, 0)
}

const eliminarDefecto = (id) => {
  store.dispatch('ego/eliminarDefecto', id)
}

watch(() => defectosOriginales.value, (newDefectos) => {
  defectos.value = newDefectos.map(d => ({ ...d, editando: false }))
}, { deep: true })
</script> 