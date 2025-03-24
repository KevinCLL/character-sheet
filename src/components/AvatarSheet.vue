<template>
  <div class="space-y-6">
    <!-- Información básica -->
    <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Información del AVATAR</h3>
          <p class="mt-1 text-sm text-gray-500">Combinación de EGO y MORFO.</p>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6">
              <div class="bg-yellow-50 p-4 rounded-md">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h3 class="text-sm font-medium text-yellow-800">Nota sobre el AVATAR</h3>
                    <div class="mt-2 text-sm text-yellow-700">
                      <p>El AVATAR representa la fusión entre el EGO y el MORFO seleccionado. Los atributos y habilidades se calculan automáticamente basándose en ambos.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Atributos Combinados -->
    <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Atributos Combinados</h3>
          <p class="mt-1 text-sm text-gray-500">Atributos resultantes de la fusión.</p>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="grid grid-cols-2 gap-6">
            <!-- Atributos Mentales -->
            <div class="col-span-2 sm:col-span-1">
              <h4 class="text-base font-medium text-gray-900 mb-4">Atributos Mentales</h4>
              <div class="space-y-4">
                <div v-for="(value, attr) in mentalAttributes" :key="attr" class="flex items-center justify-between">
                  <span class="text-sm font-medium text-gray-700 capitalize">{{ attr }}</span>
                  <span class="text-sm text-gray-900">{{ value }}</span>
                </div>
              </div>
            </div>
            <!-- Atributos Físicos -->
            <div class="col-span-2 sm:col-span-1">
              <h4 class="text-base font-medium text-gray-900 mb-4">Atributos Físicos</h4>
              <div class="space-y-4">
                <div v-for="(value, attr) in physicalAttributes" :key="attr" class="flex items-center justify-between">
                  <span class="text-sm font-medium text-gray-700 capitalize">{{ attr }}</span>
                  <span class="text-sm text-gray-900">{{ value }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Habilidades y Mejoras -->
    <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Habilidades y Mejoras</h3>
          <p class="mt-1 text-sm text-gray-500">Capacidades disponibles en esta combinación.</p>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="grid grid-cols-2 gap-6">
            <!-- Habilidades -->
            <div class="col-span-2 sm:col-span-1">
              <h4 class="text-base font-medium text-gray-900 mb-4">Habilidades</h4>
              <div class="space-y-4">
                <div v-for="skill in skills" :key="skill.name" class="flex items-center justify-between">
                  <span class="text-sm font-medium text-gray-700">{{ skill.name }}</span>
                  <span class="text-sm text-gray-900">{{ skill.level }}</span>
                </div>
              </div>
            </div>
            <!-- Mejoras -->
            <div class="col-span-2 sm:col-span-1">
              <h4 class="text-base font-medium text-gray-900 mb-4">Mejoras Activas</h4>
              <div class="space-y-4">
                <div v-for="enhancement in activeEnhancements" :key="enhancement.name" class="text-sm">
                  <div class="font-medium text-gray-700">{{ enhancement.name }}</div>
                  <div class="text-gray-500">{{ enhancement.description }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'AvatarSheet',
  setup() {
    const store = useStore()

    // Estos valores deberían venir del store
    const mentalAttributes = computed(() => ({
      inteligencia: 3,
      astucia: 2,
      resolucion: 4,
      presencia: 3,
      manipulacion: 2,
      compostura: 3
    }))

    const physicalAttributes = computed(() => ({
      fuerza: 3,
      destreza: 4,
      resistencia: 3,
      agilidad: 4,
      velocidad: 3
    }))

    const skills = computed(() => [
      { name: 'Académicas', level: 3 },
      { name: 'Informática', level: 4 },
      { name: 'Artesanía', level: 2 },
      { name: 'Investigación', level: 3 },
      { name: 'Medicina', level: 2 }
    ])

    const activeEnhancements = computed(() => [
      { name: 'Armadura', description: 'Protección contra daño físico' },
      { name: 'Sentidos Mejorados', description: 'Visión nocturna y térmica' }
    ])

    return {
      mentalAttributes,
      physicalAttributes,
      skills,
      activeEnhancements
    }
  }
}
</script> 