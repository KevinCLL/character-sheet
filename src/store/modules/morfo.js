export default {
  namespaced: true,
  state: {
    morfos: [],
    morfoSeleccionado: null
  },
  mutations: {
    SET_MORFO_SELECCIONADO(state, morfo) {
      state.morfoSeleccionado = morfo
    },
    CARGAR_MORFOS(state, morfos) {
      state.morfos = morfos
    },
    ACTUALIZAR_MORFO(state, morfo) {
      const index = state.morfos.findIndex(m => m.id === morfo.id)
      if (index !== -1) {
        state.morfos.splice(index, 1, morfo)
        if (state.morfoSeleccionado?.id === morfo.id) {
          state.morfoSeleccionado = morfo
        }
      }
    }
  },
  actions: {
    agregarMorfo({ commit, state }, morfo) {
      const nuevoMorfo = {
        id: Date.now().toString(),
        ventajasFisicas: [],
        desventajasFisicas: [],
        limitadoresHabilidades: [],
        caracteristicasDuales: [],
        poderes: [],
        equipo: [],
        armas: [],
        habilidades: [],
        notas: [],
        estadisticas: [],
        ...morfo
      }
      state.morfos.push(nuevoMorfo)
      localStorage.setItem('morfos', JSON.stringify(state.morfos))
    },
    actualizarMorfo({ commit, state }, morfo) {
      commit('ACTUALIZAR_MORFO', morfo)
      localStorage.setItem('morfos', JSON.stringify(state.morfos))
    },
    eliminarMorfo({ commit, state }, id) {
      state.morfos = state.morfos.filter(m => m.id !== id)
      if (state.morfoSeleccionado?.id === id) {
        state.morfoSeleccionado = null
      }
      localStorage.setItem('morfos', JSON.stringify(state.morfos))
    },
    cargarMorfos({ commit }) {
      const morfosGuardados = localStorage.getItem('morfos')
      if (morfosGuardados) {
        commit('CARGAR_MORFOS', JSON.parse(morfosGuardados))
      }
    },
    seleccionarMorfo({ commit, state }, id) {
      const morfo = state.morfos.find(m => m.id === id)
      commit('SET_MORFO_SELECCIONADO', morfo || null)
    }
  },
  getters: {
    getMorfoById: (state) => (id) => {
      return state.morfos.find(m => m.id === id)
    },
    getMorfoSeleccionado: (state) => {
      return state.morfoSeleccionado
    },
    getMorfosDisponibles: (state) => {
      return state.morfos
    }
  }
} 