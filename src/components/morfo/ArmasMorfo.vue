<template>
  <div class="space-y-8">
    <!-- Armas Cuerpo a Cuerpo -->
    <div>
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">Armas Cuerpo a Cuerpo</h3>
        <button
          @click="abrirDialogoArma('cuerpo')"
          class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Añadir Arma
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
                Daño
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Iniciativa
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Fuerza
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Tamaño
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Disponibilidad
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Otros
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
            <tr v-for="arma in armasCuerpo" :key="arma.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ arma.nombre }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ arma.daño }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ arma.iniciativa }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ arma.fuerza }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ arma.tamaño }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ arma.disponibilidad }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                {{ arma.otros }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="eliminarArma(arma.id)"
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

    <!-- Armas a Distancia -->
    <div>
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">Armas a Distancia</h3>
        <button
          @click="abrirDialogoArma('distancia')"
          class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Añadir Arma
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
                Daño
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Alcance
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Cadencia
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Munición
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Disponibilidad
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Otros
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
            <tr v-for="arma in armasDistancia" :key="arma.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ arma.nombre }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ arma.daño }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ arma.alcance }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ arma.cadencia }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ arma.municion }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ arma.disponibilidad }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                {{ arma.otros }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="eliminarArma(arma.id)"
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

    <!-- Explosivos -->
    <div>
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">Explosivos</h3>
        <button
          @click="abrirDialogoArma('explosivo')"
          class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Añadir Explosivo
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
                Daño
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Radio
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Disponibilidad
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Otros
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
            <tr v-for="arma in explosivos" :key="arma.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ arma.nombre }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ arma.daño }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ arma.radio }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ arma.disponibilidad }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                {{ arma.otros }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="eliminarArma(arma.id)"
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

    <!-- Diálogo de Nueva Arma -->
    <div v-if="mostrarDialogoArma" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Nueva Arma</h3>
        <div class="space-y-4">
          <div>
            <label for="nombre" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
            <input
              type="text"
              id="nombre"
              v-model="nuevaArma.nombre"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label for="daño" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Daño</label>
            <input
              type="text"
              id="daño"
              v-model="nuevaArma.daño"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <!-- Campos específicos según el tipo -->
          <template v-if="tipoArmaSeleccionado === 'cuerpo'">
            <div>
              <label for="iniciativa" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Iniciativa</label>
              <input
                type="text"
                id="iniciativa"
                v-model="nuevaArma.iniciativa"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label for="fuerza" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Fuerza</label>
              <input
                type="text"
                id="fuerza"
                v-model="nuevaArma.fuerza"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label for="tamaño" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tamaño</label>
              <input
                type="text"
                id="tamaño"
                v-model="nuevaArma.tamaño"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </template>

          <template v-if="tipoArmaSeleccionado === 'distancia'">
            <div>
              <label for="alcance" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Alcance</label>
              <input
                type="text"
                id="alcance"
                v-model="nuevaArma.alcance"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label for="cadencia" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Cadencia</label>
              <input
                type="text"
                id="cadencia"
                v-model="nuevaArma.cadencia"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label for="municion" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Munición</label>
              <input
                type="text"
                id="municion"
                v-model="nuevaArma.municion"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </template>

          <template v-if="tipoArmaSeleccionado === 'explosivo'">
            <div>
              <label for="radio" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Radio</label>
              <input
                type="text"
                id="radio"
                v-model="nuevaArma.radio"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </template>

          <div>
            <label for="disponibilidad" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Disponibilidad</label>
            <input
              type="text"
              id="disponibilidad"
              v-model="nuevaArma.disponibilidad"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label for="otros" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Otros</label>
            <textarea
              id="otros"
              v-model="nuevaArma.otros"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button
            @click="cerrarDialogoArma"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            @click="guardarArma"
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
const mostrarDialogoArma = ref(false)
const tipoArmaSeleccionado = ref(null)
const nuevaArma = ref({
  nombre: '',
  daño: '',
  disponibilidad: '',
  otros: '',
  // Campos específicos por tipo
  iniciativa: '',
  fuerza: '',
  tamaño: '',
  alcance: '',
  cadencia: '',
  municion: '',
  radio: ''
})

// Computed properties para filtrar armas por tipo
const armasCuerpo = computed(() => 
  store.state.morfo.morfoSeleccionado?.armas?.filter(a => a.tipo === 'cuerpo') || []
)

const armasDistancia = computed(() => 
  store.state.morfo.morfoSeleccionado?.armas?.filter(a => a.tipo === 'distancia') || []
)

const explosivos = computed(() => 
  store.state.morfo.morfoSeleccionado?.armas?.filter(a => a.tipo === 'explosivo') || []
)

// Métodos
const abrirDialogoArma = (tipo) => {
  tipoArmaSeleccionado.value = tipo
  nuevaArma.value = {
    nombre: '',
    daño: '',
    disponibilidad: '',
    otros: '',
    iniciativa: '',
    fuerza: '',
    tamaño: '',
    alcance: '',
    cadencia: '',
    municion: '',
    radio: ''
  }
  mostrarDialogoArma.value = true
}

const cerrarDialogoArma = () => {
  mostrarDialogoArma.value = false
  tipoArmaSeleccionado.value = null
  nuevaArma.value = {
    nombre: '',
    daño: '',
    disponibilidad: '',
    otros: '',
    iniciativa: '',
    fuerza: '',
    tamaño: '',
    alcance: '',
    cadencia: '',
    municion: '',
    radio: ''
  }
}

const guardarArma = () => {
  if (nuevaArma.value.nombre.trim()) {
    const morfoActualizado = JSON.parse(JSON.stringify(store.state.morfo.morfoSeleccionado))
    
    if (!morfoActualizado.armas) {
      morfoActualizado.armas = []
    }

    const arma = {
      id: Date.now().toString(),
      tipo: tipoArmaSeleccionado.value,
      nombre: nuevaArma.value.nombre,
      daño: nuevaArma.value.daño,
      disponibilidad: nuevaArma.value.disponibilidad,
      otros: nuevaArma.value.otros
    }

    // Añadir campos específicos según el tipo
    if (tipoArmaSeleccionado.value === 'cuerpo') {
      arma.iniciativa = nuevaArma.value.iniciativa
      arma.fuerza = nuevaArma.value.fuerza
      arma.tamaño = nuevaArma.value.tamaño
    } else if (tipoArmaSeleccionado.value === 'distancia') {
      arma.alcance = nuevaArma.value.alcance
      arma.cadencia = nuevaArma.value.cadencia
      arma.municion = nuevaArma.value.municion
    } else if (tipoArmaSeleccionado.value === 'explosivo') {
      arma.radio = nuevaArma.value.radio
    }

    morfoActualizado.armas.push(arma)
    store.dispatch('morfo/actualizarMorfo', morfoActualizado)
    cerrarDialogoArma()
  }
}

const eliminarArma = (id) => {
  const morfoActualizado = JSON.parse(JSON.stringify(store.state.morfo.morfoSeleccionado))
  morfoActualizado.armas = morfoActualizado.armas.filter(a => a.id !== id)
  store.dispatch('morfo/actualizarMorfo', morfoActualizado)
}
</script> 