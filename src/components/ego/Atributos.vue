<template>
  <div class="space-y-6">
    <!-- Atributos Mentales -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Atributos Mentales</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="atributo in atributosMentales" :key="atributo.id" class="space-y-2">
          <div class="flex items-center justify-between">
            <label :for="atributo.id" class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ atributo.nombre }}
            </label>
            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ atributo.valor }}</span>
          </div>
          <input
            :id="atributo.id"
            type="range"
            min="1"
            max="5"
            v-model.number="atributo.valor"
            @change="actualizarAtributo('mentales', atributo)"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div class="flex justify-between px-2">
            <span class="text-xs text-gray-500 dark:text-gray-400">1</span>
            <span class="text-xs text-gray-500 dark:text-gray-400">5</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Atributos Sociales -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Atributos Sociales</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="atributo in atributosSociales" :key="atributo.id" class="space-y-2">
          <div class="flex items-center justify-between">
            <label :for="atributo.id" class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ atributo.nombre }}
            </label>
            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ atributo.valor }}</span>
          </div>
          <input
            :id="atributo.id"
            type="range"
            min="1"
            max="5"
            v-model.number="atributo.valor"
            @change="actualizarAtributo('sociales', atributo)"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div class="flex justify-between px-2">
            <span class="text-xs text-gray-500 dark:text-gray-400">1</span>
            <span class="text-xs text-gray-500 dark:text-gray-400">5</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Atributos Físicos -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Atributos Físicos</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="atributo in atributosFisicos" :key="atributo.id" class="space-y-2">
          <div class="flex items-center justify-between">
            <label :for="atributo.id" class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ atributo.nombre }}
            </label>
            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ atributo.valor }}</span>
          </div>
          <input
            :id="atributo.id"
            type="range"
            min="1"
            max="5"
            v-model.number="atributo.valor"
            @change="actualizarAtributo('fisicos', atributo)"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div class="flex justify-between px-2">
            <span class="text-xs text-gray-500 dark:text-gray-400">1</span>
            <span class="text-xs text-gray-500 dark:text-gray-400">5</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const atributosMentales = computed(() => store.state.ego.atributos.mentales)
const atributosSociales = computed(() => store.state.ego.atributos.sociales)
const atributosFisicos = computed(() => store.state.ego.atributos.fisicos)

const actualizarAtributo = (tipo, atributo) => {
  store.commit('ego/ACTUALIZAR_ATRIBUTO', {
    tipo,
    id: atributo.id,
    valor: atributo.valor
  })
}
</script>

<style scoped>
</style> 