<template>
  <div class="space-y-6">
    <!-- Personalidad -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Personalidad</h3>
      <div class="space-y-4">
        <div class="flex items-center space-x-4">
          <span class="w-24 text-sm text-gray-700 dark:text-gray-300">{{ personalidad.nombre1 }}</span>
          <input
            type="range"
            min="0"
            max="10"
            v-model.number="valorPersonalidad1"
            class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <span class="w-24 text-sm text-right text-gray-700 dark:text-gray-300">{{ personalidad.nombre2 }}</span>
        </div>
        <div class="flex justify-between px-2">
          <span class="text-sm font-medium text-gray-900 dark:text-white">{{ valorPersonalidad1 }}</span>
          <span class="text-sm font-medium text-gray-900 dark:text-white">{{ 10 - valorPersonalidad1 }}</span>
        </div>
      </div>
    </div>

    <!-- Moral -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Moral</h3>
      <div class="space-y-4">
        <div class="flex items-center space-x-4">
          <span class="w-24 text-sm text-gray-700 dark:text-gray-300">{{ moral.virtud }}</span>
          <input
            type="range"
            min="0"
            max="10"
            v-model.number="valorVirtud"
            class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <span class="w-24 text-sm text-right text-gray-700 dark:text-gray-300">{{ moral.vicio }}</span>
        </div>
        <div class="flex justify-between px-2">
          <span class="text-sm font-medium text-gray-900 dark:text-white">{{ valorVirtud }}</span>
          <span class="text-sm font-medium text-gray-900 dark:text-white">{{ 10 - valorVirtud }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const personalidad = computed(() => store.state.ego.característicasDuales.personalidad)
const moral = computed(() => store.state.ego.característicasDuales.moral)

const valorPersonalidad1 = ref(personalidad.value.valor1)
const valorVirtud = ref(moral.value.valorVirtud)

watch(valorPersonalidad1, (newValue) => {
  store.commit('ego/ACTUALIZAR_CARACTERISTICA_DUAL', {
    tipo: 'personalidad',
    campo: 'valor1',
    valor: newValue
  })
})

watch(valorVirtud, (newValue) => {
  store.commit('ego/ACTUALIZAR_CARACTERISTICA_DUAL', {
    tipo: 'moral',
    campo: 'valorVirtud',
    valor: newValue
  })
})
</script>

<style scoped>
</style> 