<template>
  <div class="space-y-8">
    <!-- Personalidad -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Personalidad</h3>
      <div class="flex items-center space-x-4">
        <div class="w-32 flex items-center justify-between">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Introvertido</span>
          <span class="text-sm font-medium text-gray-900 dark:text-white">{{ caracteristicasDuales.personalidad.valor1 }}</span>
        </div>
        <div class="flex-1 flex items-center justify-center space-x-1">
          <button
            v-for="n in 9"
            :key="n"
            @click="actualizarCaracteristicaDual('personalidad', 'valor1', n)"
            class="w-6 h-6 rounded-full border-2 focus:outline-none flex items-center justify-center relative"
            :class="[
              n === 5 ? 'border-gray-400' : 'border-gray-300',
              n <= caracteristicasDuales.personalidad.valor1
                ? n < 5 ? 'bg-white' : 'bg-black dark:bg-white'
                : 'bg-transparent'
            ]"
          >
            <template v-if="n === 1 || n === 5 || n === 9">
              <div class="absolute -bottom-6 text-xs text-gray-500">|</div>
            </template>
          </button>
        </div>
        <div class="w-32 flex items-center justify-between">
          <span class="text-sm font-medium text-gray-900 dark:text-white">{{ 10 - caracteristicasDuales.personalidad.valor1 }}</span>
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Extrovertido</span>
        </div>
      </div>
    </div>

    <!-- Moral -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Moral</h3>
      <div class="flex items-center space-x-4">
        <div class="w-32 flex items-center justify-between">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ caracteristicasDuales.moral.virtud }}</span>
          <span class="text-sm font-medium text-gray-900 dark:text-white">{{ caracteristicasDuales.moral.valorVirtud }}</span>
        </div>
        <div class="flex-1 flex items-center justify-center space-x-1">
          <button
            v-for="n in 9"
            :key="n"
            @click="actualizarCaracteristicaDual('moral', 'valorVirtud', n)"
            class="w-6 h-6 rounded-full border-2 focus:outline-none flex items-center justify-center relative"
            :class="[
              n === 5 ? 'border-gray-400' : 'border-gray-300',
              n <= caracteristicasDuales.moral.valorVirtud
                ? n < 5 ? 'bg-white' : 'bg-black dark:bg-white'
                : 'bg-transparent'
            ]"
          >
            <template v-if="n === 1 || n === 5 || n === 9">
              <div class="absolute -bottom-6 text-xs text-gray-500">|</div>
            </template>
          </button>
        </div>
        <div class="w-32 flex items-center justify-between">
          <span class="text-sm font-medium text-gray-900 dark:text-white">{{ 10 - caracteristicasDuales.moral.valorVirtud }}</span>
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ caracteristicasDuales.moral.vicio }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const caracteristicasDuales = computed(() => store.getters['ego/caracteristicasDuales'])

const actualizarCaracteristicaDual = (tipo, campo, valor) => {
  store.dispatch('ego/actualizarCaracteristicaDual', { tipo, campo, valor })
}
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