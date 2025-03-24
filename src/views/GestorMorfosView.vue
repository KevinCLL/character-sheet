<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Gestor de MORFOs</h2>
      <button
        @click="abrirDialogoNuevoMorfo"
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
      >
        Nuevo MORFO
      </button>
    </div>

    <!-- Lista de MORFOs -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="morfo in morfos"
        :key="morfo.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
      >
        <div class="p-6">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">{{ morfo.nombre }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ morfo.tipo }}</p>
            </div>
            <div class="flex space-x-2">
              <button
                @click="editarMorfo(morfo)"
                class="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <span class="sr-only">Editar</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                @click="eliminarMorfo(morfo.id)"
                class="text-gray-400 hover:text-red-600 dark:hover:text-red-400"
              >
                <span class="sr-only">Eliminar</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-sm text-gray-700 dark:text-gray-300">
              <span class="font-medium">Universo:</span> {{ morfo.universo }}
            </div>
            <div class="mt-2 flex items-center space-x-2">
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Salud Base:</span>
              <span class="text-sm text-gray-900 dark:text-white">{{ morfo.salud.base }}</span>
            </div>
          </div>
          <div class="mt-4 grid grid-cols-3 gap-2">
            <div v-for="(valor, atributo) in morfo.atributosFísicos" :key="atributo" class="text-center">
              <div class="text-xs text-gray-500 dark:text-gray-400 capitalize">{{ atributo }}</div>
              <div class="text-sm font-medium text-gray-900 dark:text-white">{{ valor }}</div>
            </div>
          </div>
          <div class="mt-4">
            <button
              @click="seleccionarMorfo(morfo.id)"
              class="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 dark:text-indigo-400 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Seleccionar MORFO
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Diálogo de MORFO -->
    <div v-if="mostrarDialogo" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {{ morfoEnEdicion.id ? 'Editar' : 'Nuevo' }} MORFO
        </h3>
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="nombre" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
              <input
                type="text"
                id="nombre"
                v-model="morfoEnEdicion.nombre"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label for="tipo" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo</label>
              <input
                type="text"
                id="tipo"
                v-model="morfoEnEdicion.tipo"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label for="universo" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Universo</label>
              <input
                type="text"
                id="universo"
                v-model="morfoEnEdicion.universo"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label for="salud" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Salud Base</label>
              <input
                type="number"
                id="salud"
                v-model.number="morfoEnEdicion.salud.base"
                min="0"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          <div>
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Atributos Físicos</h4>
            <div class="grid grid-cols-3 gap-4">
              <div>
                <label for="fuerza" class="block text-sm text-gray-700 dark:text-gray-300">Fuerza</label>
                <input
                  type="number"
                  id="fuerza"
                  v-model.number="morfoEnEdicion.atributosFísicos.fuerza"
                  min="0"
                  max="5"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label for="destreza" class="block text-sm text-gray-700 dark:text-gray-300">Destreza</label>
                <input
                  type="number"
                  id="destreza"
                  v-model.number="morfoEnEdicion.atributosFísicos.destreza"
                  min="0"
                  max="5"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label for="resistencia" class="block text-sm text-gray-700 dark:text-gray-300">Resistencia</label>
                <input
                  type="number"
                  id="resistencia"
                  v-model.number="morfoEnEdicion.atributosFísicos.resistencia"
                  min="0"
                  max="5"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
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
            @click="guardarMorfo"
            class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>

    <!-- Ventajas y Desventajas -->
    <section v-if="morfoSeleccionado" class="mt-8">
      <VentajasDesventajas />
    </section>

    <!-- Limitadores de Habilidades -->
    <section v-if="morfoSeleccionado" class="mt-8">
      <LimitadoresHabilidades />
    </section>

    <!-- Características Duales -->
    <section v-if="morfoSeleccionado" class="mt-8">
      <CaracteristicasDualesMorfo />
    </section>

    <!-- Equipo -->
    <section v-if="morfoSeleccionado" class="mt-8">
      <EquipoMorfo />
    </section>

    <!-- Armas -->
    <section v-if="morfoSeleccionado" class="mt-8">
      <ArmasMorfo />
    </section>

    <!-- Notas -->
    <div v-if="morfoSeleccionado" class="space-y-8">
      <AtributosMorfo />
      <VentajasDesventajasMorfo />
      <ArmasMorfo />
      <LimitacionesHabilidades />
      <PoderesMorfo />
      <NotasMorfo />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import VentajasDesventajas from '@/components/morfo/VentajasDesventajas.vue'
import LimitadoresHabilidades from '@/components/morfo/LimitadoresHabilidades.vue'
import CaracteristicasDualesMorfo from '@/components/morfo/CaracteristicasDualesMorfo.vue'
import EquipoMorfo from '@/components/morfo/EquipoMorfo.vue'
import ArmasMorfo from '@/components/morfo/ArmasMorfo.vue'
import NotasMorfo from '@/components/morfo/NotasMorfo.vue'
import PoderesMorfo from '@/components/morfo/PoderesMorfo.vue'
import AtributosMorfo from '@/components/morfo/AtributosMorfo.vue'
import VentajasDesventajasMorfo from '@/components/morfo/VentajasDesventajasMorfo.vue'
import LimitacionesHabilidades from '@/components/morfo/LimitacionesHabilidades.vue'

const store = useStore()
const morfos = computed(() => store.state.morfo.morfos)
const mostrarDialogo = ref(false)
const morfoSeleccionado = computed(() => store.state.morfo.morfoSeleccionado)

const morfoEnEdicionInicial = {
  nombre: '',
  tipo: '',
  universo: '',
  salud: {
    base: 0
  },
  atributosFísicos: {
    fuerza: 0,
    destreza: 0,
    resistencia: 0
  }
}

const morfoEnEdicion = ref({ ...morfoEnEdicionInicial })

const abrirDialogoNuevoMorfo = () => {
  morfoEnEdicion.value = { ...morfoEnEdicionInicial }
  mostrarDialogo.value = true
}

const editarMorfo = (morfo) => {
  morfoEnEdicion.value = { ...morfo }
  mostrarDialogo.value = true
}

const cerrarDialogo = () => {
  mostrarDialogo.value = false
}

const guardarMorfo = async () => {
  if (morfoEnEdicion.value.nombre.trim()) {
    const morfo = {
      nombre: morfoEnEdicion.value.nombre,
      tipo: morfoEnEdicion.value.tipo,
      universo: morfoEnEdicion.value.universo,
      salud: {
        base: morfoEnEdicion.value.salud.base
      },
      atributosFísicos: {
        fuerza: morfoEnEdicion.value.atributosFísicos.fuerza,
        destreza: morfoEnEdicion.value.atributosFísicos.destreza,
        resistencia: morfoEnEdicion.value.atributosFísicos.resistencia
      },
      ventajasFisicas: [],
      desventajasFisicas: [],
      limitadoresHabilidades: [],
      caracteristicasDuales: [],
      poderes: [],
      equipo: [],
      armas: [],
      habilidades: [],
      notas: [],
      estadisticas: []
    }

    if (morfoEnEdicion.value.id) {
      morfo.id = morfoEnEdicion.value.id
      await store.dispatch('morfo/actualizarMorfo', morfo)
    } else {
      await store.dispatch('morfo/agregarMorfo', morfo)
    }
    cerrarDialogo()
  }
}

const eliminarMorfo = (id) => {
  if (confirm('¿Estás seguro de que quieres eliminar este MORFO?')) {
    store.dispatch('morfo/eliminarMorfo', id)
  }
}

const seleccionarMorfo = (id) => {
  store.dispatch('morfo/seleccionarMorfo', id)
}
</script> 