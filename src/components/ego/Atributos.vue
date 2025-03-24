<template>
  <div class="space-y-8">
    <div class="border rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white">ATRIBUTOS</th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Mental</th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Físico</th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Social</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
          <tr>
            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white">Poder</td>
            <td class="px-3 py-4">
              <div class="flex space-x-1">
                <button
                  v-for="n in 5"
                  :key="n"
                  @click="actualizarAtributo('mentales', 'poder', n)"
                  class="w-4 h-4 rounded-full border-2 focus:outline-none"
                  :class="[
                    n <= atributosMentales.find(a => a.id === 'poder').valor
                      ? 'bg-black border-black dark:bg-white dark:border-white'
                      : 'bg-white border-black dark:bg-gray-900 dark:border-white'
                  ]"
                >
                  <span class="sr-only">Nivel {{ n }}</span>
                </button>
              </div>
            </td>
            <td class="px-3 py-4">
              <div class="flex space-x-1">
                <button
                  v-for="n in 5"
                  :key="n"
                  @click="actualizarAtributo('fisicos', 'poder', n)"
                  class="w-4 h-4 rounded-full border-2 focus:outline-none"
                  :class="[
                    n <= atributosFisicos.find(a => a.id === 'poder').valor
                      ? 'bg-black border-black dark:bg-white dark:border-white'
                      : 'bg-white border-black dark:bg-gray-900 dark:border-white'
                  ]"
                >
                  <span class="sr-only">Nivel {{ n }}</span>
                </button>
              </div>
            </td>
            <td class="px-3 py-4">
              <div class="flex space-x-1">
                <button
                  v-for="n in 5"
                  :key="n"
                  @click="actualizarAtributo('sociales', 'poder', n)"
                  class="w-4 h-4 rounded-full border-2 focus:outline-none"
                  :class="[
                    n <= atributosSociales.find(a => a.id === 'poder').valor
                      ? 'bg-black border-black dark:bg-white dark:border-white'
                      : 'bg-white border-black dark:bg-gray-900 dark:border-white'
                  ]"
                >
                  <span class="sr-only">Nivel {{ n }}</span>
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white">Destreza</td>
            <td class="px-3 py-4">
              <div class="flex space-x-1">
                <button
                  v-for="n in 5"
                  :key="n"
                  @click="actualizarAtributo('mentales', 'destreza', n)"
                  class="w-4 h-4 rounded-full border-2 focus:outline-none"
                  :class="[
                    n <= atributosMentales.find(a => a.id === 'destreza').valor
                      ? 'bg-black border-black dark:bg-white dark:border-white'
                      : 'bg-white border-black dark:bg-gray-900 dark:border-white'
                  ]"
                >
                  <span class="sr-only">Nivel {{ n }}</span>
                </button>
              </div>
            </td>
            <td class="px-3 py-4">
              <div class="flex space-x-1">
                <button
                  v-for="n in 5"
                  :key="n"
                  @click="actualizarAtributo('fisicos', 'destreza', n)"
                  class="w-4 h-4 rounded-full border-2 focus:outline-none"
                  :class="[
                    n <= atributosFisicos.find(a => a.id === 'destreza').valor
                      ? 'bg-black border-black dark:bg-white dark:border-white'
                      : 'bg-white border-black dark:bg-gray-900 dark:border-white'
                  ]"
                >
                  <span class="sr-only">Nivel {{ n }}</span>
                </button>
              </div>
            </td>
            <td class="px-3 py-4">
              <div class="flex space-x-1">
                <button
                  v-for="n in 5"
                  :key="n"
                  @click="actualizarAtributo('sociales', 'destreza', n)"
                  class="w-4 h-4 rounded-full border-2 focus:outline-none"
                  :class="[
                    n <= atributosSociales.find(a => a.id === 'destreza').valor
                      ? 'bg-black border-black dark:bg-white dark:border-white'
                      : 'bg-white border-black dark:bg-gray-900 dark:border-white'
                  ]"
                >
                  <span class="sr-only">Nivel {{ n }}</span>
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white">Resiliencia</td>
            <td class="px-3 py-4">
              <div class="flex space-x-1">
                <button
                  v-for="n in 5"
                  :key="n"
                  @click="actualizarAtributo('mentales', 'resiliencia', n)"
                  class="w-4 h-4 rounded-full border-2 focus:outline-none"
                  :class="[
                    n <= atributosMentales.find(a => a.id === 'resiliencia').valor
                      ? 'bg-black border-black dark:bg-white dark:border-white'
                      : 'bg-white border-black dark:bg-gray-900 dark:border-white'
                  ]"
                >
                  <span class="sr-only">Nivel {{ n }}</span>
                </button>
              </div>
            </td>
            <td class="px-3 py-4">
              <div class="flex space-x-1">
                <button
                  v-for="n in 5"
                  :key="n"
                  @click="actualizarAtributo('fisicos', 'resiliencia', n)"
                  class="w-4 h-4 rounded-full border-2 focus:outline-none"
                  :class="[
                    n <= atributosFisicos.find(a => a.id === 'resiliencia').valor
                      ? 'bg-black border-black dark:bg-white dark:border-white'
                      : 'bg-white border-black dark:bg-gray-900 dark:border-white'
                  ]"
                >
                  <span class="sr-only">Nivel {{ n }}</span>
                </button>
              </div>
            </td>
            <td class="px-3 py-4">
              <div class="flex space-x-1">
                <button
                  v-for="n in 5"
                  :key="n"
                  @click="actualizarAtributo('sociales', 'resiliencia', n)"
                  class="w-4 h-4 rounded-full border-2 focus:outline-none"
                  :class="[
                    n <= atributosSociales.find(a => a.id === 'resiliencia').valor
                      ? 'bg-black border-black dark:bg-white dark:border-white'
                      : 'bg-white border-black dark:bg-gray-900 dark:border-white'
                  ]"
                >
                  <span class="sr-only">Nivel {{ n }}</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const atributosMentales = computed(() => store.getters['ego/getAtributosMentales'])
const atributosSociales = computed(() => store.getters['ego/getAtributosSociales'])
const atributosFisicos = computed(() => store.getters['ego/getAtributosFisicos'])

const actualizarAtributo = (tipo, id, valor) => {
  store.dispatch('ego/actualizarAtributo', { tipo, id, valor })
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