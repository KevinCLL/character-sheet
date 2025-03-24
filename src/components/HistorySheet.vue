<template>
  <div class="space-y-6">
    <!-- Historia del Personaje -->
    <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Historia del Personaje</h3>
          <p class="mt-1 text-sm text-gray-500">Trasfondo y experiencias del EGO.</p>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="space-y-6">
            <div>
              <label for="background" class="block text-sm font-medium text-gray-700">Trasfondo</label>
              <div class="mt-1">
                <textarea
                  id="background"
                  v-model="background"
                  rows="4"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe el origen y trasfondo del personaje..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Eventos Importantes -->
    <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Eventos Importantes</h3>
          <p class="mt-1 text-sm text-gray-500">Momentos clave en la vida del personaje.</p>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="space-y-4">
            <div v-for="(event, index) in events" :key="index" class="relative flex items-start py-4">
              <div class="min-w-0 flex-1">
                <div class="text-sm font-medium text-gray-900">
                  <input
                    type="text"
                    v-model="event.title"
                    class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                    placeholder="Título del evento"
                  />
                </div>
                <div class="mt-1">
                  <textarea
                    v-model="event.description"
                    rows="2"
                    class="block w-full border-0 p-0 text-gray-500 placeholder-gray-500 focus:ring-0 sm:text-sm"
                    placeholder="Descripción del evento..."
                  ></textarea>
                </div>
              </div>
              <div class="ml-4 flex-shrink-0">
                <button
                  @click="removeEvent(index)"
                  type="button"
                  class="inline-flex text-gray-400 hover:text-gray-500"
                >
                  <span class="sr-only">Eliminar evento</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <button
              @click="addEvent"
              type="button"
              class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              + Añadir Evento
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Relaciones -->
    <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Relaciones</h3>
          <p class="mt-1 text-sm text-gray-500">Conexiones y vínculos importantes.</p>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="space-y-4">
            <div v-for="(relation, index) in relations" :key="index" class="grid grid-cols-12 gap-4">
              <div class="col-span-4">
                <input
                  type="text"
                  v-model="relation.name"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Nombre"
                />
              </div>
              <div class="col-span-3">
                <select
                  v-model="relation.type"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="ally">Aliado</option>
                  <option value="rival">Rival</option>
                  <option value="mentor">Mentor</option>
                  <option value="family">Familia</option>
                  <option value="other">Otro</option>
                </select>
              </div>
              <div class="col-span-4">
                <input
                  type="text"
                  v-model="relation.details"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Detalles"
                />
              </div>
              <div class="col-span-1">
                <button
                  @click="removeRelation(index)"
                  type="button"
                  class="inline-flex items-center text-gray-400 hover:text-gray-500"
                >
                  <span class="sr-only">Eliminar relación</span>
                  ×
                </button>
              </div>
            </div>
            <button
              @click="addRelation"
              type="button"
              class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              + Añadir Relación
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'HistorySheet',
  setup() {
    const store = useStore()
    const background = ref('')
    
    const events = ref([
      {
        title: 'Primer Resleeving',
        description: 'Primera experiencia de transferencia a un nuevo MORFO.'
      }
    ])

    const relations = ref([
      {
        name: 'Dr. Sarah Chen',
        type: 'mentor',
        details: 'Mentora en tecnología de resleeves'
      }
    ])

    const addEvent = () => {
      events.value.push({
        title: '',
        description: ''
      })
    }

    const removeEvent = (index) => {
      events.value.splice(index, 1)
    }

    const addRelation = () => {
      relations.value.push({
        name: '',
        type: 'other',
        details: ''
      })
    }

    const removeRelation = (index) => {
      relations.value.splice(index, 1)
    }

    return {
      background,
      events,
      relations,
      addEvent,
      removeEvent,
      addRelation,
      removeRelation
    }
  }
}
</script> 