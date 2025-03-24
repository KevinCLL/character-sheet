<template>
  <div class="space-y-6">
    <div v-for="(grupo, index) in grupos" :key="index" class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">{{ grupo.nombre }}</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="habilidad in grupo.habilidades" :key="habilidad.id" class="space-y-2">
          <div class="flex items-center justify-between">
            <label :for="habilidad.id" class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ habilidad.nombre }}
            </label>
            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ habilidad.valor }}</span>
          </div>
          <input
            :id="habilidad.id"
            type="range"
            min="0"
            max="5"
            v-model.number="habilidad.valor"
            @change="actualizarHabilidad(habilidad)"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div class="flex justify-between px-2">
            <span class="text-xs text-gray-500 dark:text-gray-400">0</span>
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

const props = defineProps({
  tipo: {
    type: String,
    required: true,
    validator: (value) => ['mentales', 'sociales', 'fisicas'].includes(value)
  }
})

const grupos = computed(() => store.state.ego.habilidades[props.tipo])

const actualizarHabilidad = (habilidad) => {
  store.commit('ego/ACTUALIZAR_HABILIDAD', {
    tipo: props.tipo,
    id: habilidad.id,
    valor: habilidad.valor
  })
}
</script>

<style scoped>
</style> 