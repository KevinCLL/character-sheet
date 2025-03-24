<template>
  <div class="space-y-6">
    <div class="border rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Méritos</th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Nivel</th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Descripción</th>
            <th scope="col" class="px-3 py-3.5 text-right">
              <button
                @click="agregarNuevaFila"
                class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                + Nuevo Mérito
              </button>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
          <tr v-for="merito in meritos" :key="merito.id" class="group">
            <td class="whitespace-nowrap py-2 pl-8 pr-3">
              <input
                v-if="merito.editando"
                type="text"
                v-model="merito.nombre"
                @blur="guardarMerito(merito)"
                @keydown.enter.prevent="guardarMerito(merito)"
                class="w-full text-sm border-gray-300 rounded-md focus:border-gray-500 focus:ring-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                ref="nombreInput"
              />
              <span 
                v-else 
                @click="editarMerito(merito)"
                class="text-sm font-medium text-gray-900 dark:text-white cursor-pointer hover:text-gray-600 dark:hover:text-gray-300"
              >
                {{ merito.nombre }}
              </span>
            </td>
            <td class="px-3 py-2">
              <div class="flex space-x-1">
                <button
                  v-for="n in 5"
                  :key="n"
                  @click="actualizarNivelMerito(merito.id, n)"
                  class="w-4 h-4 rounded-full border focus:outline-none"
                  :class="[
                    n <= merito.nivel
                      ? 'bg-black border-black dark:bg-white dark:border-white'
                      : 'bg-white border-black dark:bg-gray-900 dark:border-white'
                  ]"
                >
                  <span class="sr-only">Nivel {{ n }}</span>
                </button>
              </div>
            </td>
            <td class="px-3 py-2">
              <textarea
                v-if="merito.editando"
                v-model="merito.descripcion"
                @blur="guardarMerito(merito)"
                @keydown.enter.prevent="guardarMerito(merito)"
                rows="1"
                class="w-full text-sm border-gray-300 rounded-md focus:border-gray-500 focus:ring-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              ></textarea>
              <span 
                v-else 
                @click="editarMerito(merito)"
                class="text-sm text-gray-900 dark:text-white cursor-pointer hover:text-gray-600 dark:hover:text-gray-300"
              >
                <template v-if="merito.descripcion">{{ merito.descripcion }}</template>
                <span v-else class="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400">+</span>
              </span>
            </td>
            <td class="px-3 py-2 text-right">
              <div class="invisible group-hover:visible flex justify-end space-x-2">
                <button
                  @click="eliminarMerito(merito.id)"
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
                v-model="nuevoMerito.nombre"
                @blur="guardarNuevoMerito"
                @keydown.enter.prevent="guardarNuevoMerito"
                placeholder="Nombre del mérito"
                class="w-full text-sm border-gray-300 rounded-md focus:border-gray-500 focus:ring-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                ref="nuevoNombreInput"
              />
            </td>
            <td class="px-3 py-2">
              <div class="flex space-x-1">
                <button
                  v-for="n in 5"
                  :key="n"
                  @click="nuevoMerito.nivel = n"
                  class="w-4 h-4 rounded-full border focus:outline-none"
                  :class="[
                    n <= nuevoMerito.nivel
                      ? 'bg-black border-black dark:bg-white dark:border-white'
                      : 'bg-white border-black dark:bg-gray-900 dark:border-white'
                  ]"
                >
                  <span class="sr-only">Nivel {{ n }}</span>
                </button>
              </div>
            </td>
            <td class="px-3 py-2">
              <textarea
                v-model="nuevoMerito.descripcion"
                @blur="guardarNuevoMerito"
                @keydown.enter.prevent="guardarNuevoMerito"
                placeholder="Descripción del mérito"
                rows="1"
                class="w-full text-sm border-gray-300 rounded-md focus:border-gray-500 focus:ring-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              ></textarea>
            </td>
            <td class="px-3 py-2 text-right">
              <button
                @click="cancelarNuevoMerito"
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
const meritosOriginales = computed(() => store.getters['ego/meritos'])
const meritos = ref(meritosOriginales.value.map(m => ({ ...m, editando: false })))

const mostrarNuevaFila = ref(false)
const nuevoMerito = ref({
  nombre: '',
  descripcion: '',
  nivel: 1
})

const nombreInput = ref(null)
const nuevoNombreInput = ref(null)

const agregarNuevaFila = () => {
  mostrarNuevaFila.value = true
  nextTick(() => {
    nuevoNombreInput.value?.focus()
  })
}

const cancelarNuevoMerito = () => {
  mostrarNuevaFila.value = false
  nuevoMerito.value = {
    nombre: '',
    descripcion: '',
    nivel: 1
  }
}

const guardarNuevoMerito = () => {
  setTimeout(() => {
    if (nuevoMerito.value.nombre.trim()) {
      store.dispatch('ego/agregarMerito', {
        id: Date.now().toString(),
        nombre: nuevoMerito.value.nombre,
        descripcion: nuevoMerito.value.descripcion,
        nivel: nuevoMerito.value.nivel
      })
      cancelarNuevoMerito()
    } else {
      cancelarNuevoMerito()
    }
  }, 0)
}

const editarMerito = (merito) => {
  merito.editando = true
  nextTick(() => {
    nombreInput.value?.focus()
  })
}

const guardarMerito = (merito) => {
  setTimeout(() => {
    if (merito.nombre.trim()) {
      store.dispatch('ego/actualizarMerito', {
        id: merito.id,
        nombre: merito.nombre,
        descripcion: merito.descripcion,
        nivel: merito.nivel
      })
      merito.editando = false
    } else {
      const meritoOriginal = meritosOriginales.value.find(m => m.id === merito.id)
      if (meritoOriginal) {
        merito.nombre = meritoOriginal.nombre
        merito.descripcion = meritoOriginal.descripcion
        merito.nivel = meritoOriginal.nivel
      }
      merito.editando = false
    }
  }, 0)
}

const actualizarNivelMerito = (id, nivel) => {
  const merito = meritos.value.find(m => m.id === id)
  if (merito) {
    merito.nivel = nivel
    store.dispatch('ego/actualizarMerito', {
      id: merito.id,
      nombre: merito.nombre,
      descripcion: merito.descripcion,
      nivel: merito.nivel
    })
  }
}

const eliminarMerito = (id) => {
  store.dispatch('ego/eliminarMerito', id)
}

watch(() => meritosOriginales.value, (newMeritos) => {
  meritos.value = newMeritos.map(m => ({ ...m, editando: false }))
}, { deep: true })
</script> 