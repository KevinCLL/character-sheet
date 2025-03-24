<template>
  <div class="space-y-6">
    <!-- Información básica -->
    <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Información del EGO</h3>
          <p class="mt-1 text-sm text-gray-500">Información básica de la mente viajera.</p>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-4">
              <label for="ego-name" class="block text-sm font-medium text-gray-700">Nombre del EGO</label>
              <input
                type="text"
                id="ego-name"
                v-model="egoName"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div class="col-span-6 sm:col-span-2">
              <label for="mental-age" class="block text-sm font-medium text-gray-700">Edad Mental</label>
              <input
                type="number"
                id="mental-age"
                v-model="mentalAge"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Atributos -->
    <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Atributos del EGO</h3>
          <p class="mt-1 text-sm text-gray-500">Características mentales fundamentales.</p>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="grid grid-cols-6 gap-6">
            <div v-for="(value, attr) in attributes" :key="attr" class="col-span-6 sm:col-span-3">
              <label :for="attr" class="block text-sm font-medium text-gray-700 capitalize">{{ attr }}</label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <input
                  type="range"
                  :id="attr"
                  v-model="attributes[attr]"
                  min="1"
                  max="5"
                  class="block w-full"
                />
                <span class="ml-3 text-sm text-gray-600">{{ attributes[attr] }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Habilidades -->
    <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Habilidades Teóricas</h3>
          <p class="mt-1 text-sm text-gray-500">Conocimientos y capacidades mentales.</p>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="space-y-4">
            <div v-for="(skill, index) in skills" :key="index" class="flex items-center space-x-4">
              <input
                type="text"
                v-model="skill.name"
                placeholder="Nombre de la habilidad"
                class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <input
                type="range"
                v-model="skill.level"
                min="1"
                max="5"
                class="w-32"
              />
              <span class="text-sm text-gray-600 w-8">{{ skill.level }}</span>
              <button
                @click="removeSkill(index)"
                class="text-red-600 hover:text-red-800"
              >
                <span class="sr-only">Eliminar</span>
                ×
              </button>
            </div>
            <button
              @click="addSkill"
              type="button"
              class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              + Añadir Habilidad
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'EgoSheet',
  setup() {
    const store = useStore()
    const egoName = ref('')
    const mentalAge = ref(0)
    
    const attributes = reactive({
      inteligencia: 1,
      astucia: 1,
      resolucion: 1,
      presencia: 1,
      manipulacion: 1,
      compostura: 1
    })

    const skills = ref([
      { name: 'Académicas', level: 1 },
      { name: 'Informática', level: 1 },
      { name: 'Artesanía', level: 1 },
      { name: 'Investigación', level: 1 },
      { name: 'Medicina', level: 1 }
    ])

    const addSkill = () => {
      skills.value.push({ name: '', level: 1 })
    }

    const removeSkill = (index) => {
      skills.value.splice(index, 1)
    }

    return {
      egoName,
      mentalAge,
      attributes,
      skills,
      addSkill,
      removeSkill
    }
  }
}
</script> 