<template>
  <div class="space-y-6">
    <!-- Resumen General -->
    <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Resumen del Personaje</h3>
          <p class="mt-1 text-sm text-gray-500">Vista general de todas las características.</p>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Nombre del EGO</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ characterName }}</dd>
            </div>
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Edad Mental</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ mentalAge }} años</dd>
            </div>
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Tipo de MORFO</dt>
              <dd class="mt-1 text-sm text-gray-900 capitalize">{{ morfoType }}</dd>
            </div>
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Durabilidad</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ durability }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- Estadísticas -->
    <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Estadísticas</h3>
          <p class="mt-1 text-sm text-gray-500">Valores derivados y calculados.</p>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <h4 class="text-sm font-medium text-gray-900">Salud</h4>
              <div class="mt-2 flex items-center space-x-2">
                <div class="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-green-500 h-2 rounded-full"
                    :style="{ width: `${(currentHealth / maxHealth) * 100}%` }"
                  ></div>
                </div>
                <span class="text-sm text-gray-600">{{ currentHealth }}/{{ maxHealth }}</span>
              </div>
            </div>
            <div>
              <h4 class="text-sm font-medium text-gray-900">Energía</h4>
              <div class="mt-2 flex items-center space-x-2">
                <div class="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-blue-500 h-2 rounded-full"
                    :style="{ width: `${(currentEnergy / maxEnergy) * 100}%` }"
                  ></div>
                </div>
                <span class="text-sm text-gray-600">{{ currentEnergy }}/{{ maxEnergy }}</span>
              </div>
            </div>
          </div>

          <!-- Estadísticas Derivadas -->
          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
            <div v-for="(stat, name) in derivedStats" :key="name" class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500 capitalize">{{ name }}</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ stat }}</dd>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Habilidades Destacadas -->
    <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Habilidades Destacadas</h3>
          <p class="mt-1 text-sm text-gray-500">Las habilidades más relevantes.</p>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div v-for="skill in topSkills" :key="skill.name" class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-700">{{ skill.name }}</span>
              <div class="flex items-center">
                <div class="flex">
                  <div
                    v-for="i in 5"
                    :key="i"
                    :class="[
                      i <= skill.level ? 'bg-yellow-400' : 'bg-gray-200',
                      'h-2 w-2 rounded-full mx-0.5'
                    ]"
                  ></div>
                </div>
                <span class="ml-2 text-sm text-gray-500">{{ skill.level }}</span>
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
  name: 'CharacterSummary',
  setup() {
    const store = useStore()

    // Estos valores deberían venir del store
    const characterName = computed(() => 'Nombre del Personaje')
    const mentalAge = computed(() => 25)
    const morfoType = computed(() => 'biológico')
    const durability = computed(() => 8)

    // Salud y Energía
    const maxHealth = computed(() => 100)
    const currentHealth = computed(() => 75)
    const maxEnergy = computed(() => 100)
    const currentEnergy = computed(() => 80)

    // Estadísticas derivadas
    const derivedStats = computed(() => ({
      'iniciativa': 7,
      'defensa': 3,
      'velocidad': 12,
      'resistencia física': 5,
      'resistencia mental': 4,
      'poder': 6
    }))

    // Habilidades destacadas
    const topSkills = computed(() => [
      { name: 'Académicas', level: 4 },
      { name: 'Informática', level: 5 },
      { name: 'Investigación', level: 3 },
      { name: 'Medicina', level: 3 },
      { name: 'Artesanía', level: 2 },
      { name: 'Combate', level: 2 }
    ])

    return {
      characterName,
      mentalAge,
      morfoType,
      durability,
      maxHealth,
      currentHealth,
      maxEnergy,
      currentEnergy,
      derivedStats,
      topSkills
    }
  }
}
</script> 