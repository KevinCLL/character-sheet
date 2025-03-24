export default {
  namespaced: true,
  state: {
    morfos: [],
    morfoActivo: null
  },
  mutations: {
    AGREGAR_MORFO(state, morfo) {
      state.morfos.push({
        id: crypto.randomUUID(),
        ...morfo,
        atributosFisicos: {
          fuerza: 0,
          destreza: 0,
          resistencia: 0
        },
        tamanio: 0,
        limitadoresHabilidades: {},
        ventajasFisicas: [],
        desventajasFisicas: [],
        salud: { base: 0 },
        caracteristicaDual: {
          nombre1: "Humanidad",
          valor1: 7,
          nombre2: "Corrupcion",
          valor2: 3
        }
      })
    },
    ELIMINAR_MORFO(state, morfoId) {
      state.morfos = state.morfos.filter(m => m.id !== morfoId)
      if (state.morfoActivo === morfoId) {
        state.morfoActivo = null
      }
    },
    ACTUALIZAR_MORFO(state, { morfoId, campo, valor }) {
      const morfo = state.morfos.find(m => m.id === morfoId)
      if (morfo) {
        if (campo.includes('.')) {
          const [padre, hijo] = campo.split('.')
          morfo[padre][hijo] = valor
        } else {
          morfo[campo] = valor
        }
      }
    },
    ESTABLECER_MORFO_ACTIVO(state, morfoId) {
      state.morfoActivo = morfoId
    },
    AGREGAR_LIMITADOR(state, { morfoId, habilidad, limitador }) {
      const morfo = state.morfos.find(m => m.id === morfoId)
      if (morfo) {
        morfo.limitadoresHabilidades[habilidad] = limitador
      }
    },
    ELIMINAR_LIMITADOR(state, { morfoId, habilidad }) {
      const morfo = state.morfos.find(m => m.id === morfoId)
      if (morfo) {
        delete morfo.limitadoresHabilidades[habilidad]
      }
    }
  },
  actions: {
    agregarMorfo({ commit }, morfo) {
      commit('AGREGAR_MORFO', morfo)
    },
    eliminarMorfo({ commit }, morfoId) {
      commit('ELIMINAR_MORFO', morfoId)
    },
    actualizarMorfo({ commit }, payload) {
      commit('ACTUALIZAR_MORFO', payload)
    },
    establecerMorfoActivo({ commit }, morfoId) {
      commit('ESTABLECER_MORFO_ACTIVO', morfoId)
    },
    agregarLimitador({ commit }, payload) {
      commit('AGREGAR_LIMITADOR', payload)
    },
    eliminarLimitador({ commit }, payload) {
      commit('ELIMINAR_LIMITADOR', payload)
    }
  },
  getters: {
    obtenerMorfos: state => state.morfos,
    obtenerMorfoActivo: state => state.morfos.find(m => m.id === state.morfoActivo),
    obtenerLimitadores: state => morfoId => {
      const morfo = state.morfos.find(m => m.id === morfoId)
      return morfo ? morfo.limitadoresHabilidades : {}
    }
  }
} 