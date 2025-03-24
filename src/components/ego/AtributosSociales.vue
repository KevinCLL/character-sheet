<template>
  <div class="space-y-4">
    <h3 class="text-lg font-medium text-gray-900 dark:text-white">Atributos Sociales</h3>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div v-for="(valor, atributo) in atributosSociales" :key="atributo" class="space-y-2">
        <label :for="atributo" class="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
          {{ atributo }}
        </label>
        <div class="flex items-center space-x-2">
          <input
            type="number"
            :id="atributo"
            v-model.number="atributosSociales[atributo]"
            min="1"
            max="5"
            class="block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
            @change="actualizarAtributo(atributo)"
          />
          <div class="flex space-x-1">
            <div
              v-for="n in 5"
              :key="n"
              class="w-4 h-4 rounded-full border"
              :class="[
                n <= atributosSociales[atributo]
                  ? 'bg-indigo-600 border-indigo-600'
                  : 'bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600'
              ]"
              @click="setValor(atributo, n)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const atributosSociales = ref({
  presencia: 1,
  manipulación: 1,
  compostura: 1
})

onMounted(() => {
  // Cargar valores iniciales del store
  const valores = store.state.ego.atributosSociales
  if (valores) {
    atributosSociales.value = { ...valores }
  }
})

const actualizarAtributo = (atributo) => {
  // Asegurar que el valor esté entre 1 y 5
  if (atributosSociales.value[atributo] < 1) atributosSociales.value[atributo] = 1
  if (atributosSociales.value[atributo] > 5) atributosSociales.value[atributo] = 5
  
  store.commit('ego/ACTUALIZAR_ATRIBUTO_SOCIAL', {
    atributo,
    valor: atributosSociales.value[atributo]
  })
}

const setValor = (atributo, valor) => {
  atributosSociales.value[atributo] = valor
  actualizarAtributo(atributo)
}
</script> 