export default {
  namespaced: true,
  state: {
    poderesYRecursos: [
      {
        tipo: "Magia",
        sistema: "Esferas",
        valores: {
          vida: 0,
          materia: 0,
          mente: 0,
          espiritu: 0,
          tiempo: 0,
          espacio: 0,
          fuerza: 0,
          muerte: 0,
          destino: 0
        },
        recursoVinculado: {
          nombre: "mana",
          maximo: 0,
          actual: 0
        }
      },
      {
        tipo: "Vampirico",
        sistema: "Disciplinas",
        valores: {
          presencia: 0,
          fortaleza: 0,
          celeridad: 0,
          animalismo: 0,
          auspex: 0,
          dominacion: 0,
          potestad: 0,
          sangre: 0,
          ocultacion: 0
        },
        recursoVinculado: {
          nombre: "vitae",
          maximo: 0,
          actual: 0
        }
      }
    ],
    recursosEspirituales: {
      fuerza_voluntad: {
        maximo: 0,
        actual: 0
      },
      sabiduria: 0,
      gnosis: 0
    }
  },
  mutations: {
    ACTUALIZAR_PODER(state, { tipo, sistema, campo, valor }) {
      const poder = state.poderesYRecursos.find(p => p.tipo === tipo && p.sistema === sistema)
      if (poder) {
        if (campo.includes('.')) {
          const [padre, hijo] = campo.split('.')
          poder[padre][hijo] = valor
        } else {
          poder[campo] = valor
        }
      }
    },
    AGREGAR_PODER(state, poder) {
      state.poderesYRecursos.push(poder)
    },
    ELIMINAR_PODER(state, { tipo, sistema }) {
      state.poderesYRecursos = state.poderesYRecursos.filter(
        p => !(p.tipo === tipo && p.sistema === sistema)
      )
    },
    ACTUALIZAR_RECURSO_ESPIRITUAL(state, { recurso, campo, valor }) {
      if (campo.includes('.')) {
        const [padre, hijo] = campo.split('.')
        state.recursosEspirituales[padre][hijo] = valor
      } else {
        state.recursosEspirituales[recurso] = valor
      }
    },
    ACTUALIZAR_RECURSO_VINCULADO(state, { tipo, sistema, campo, valor }) {
      const poder = state.poderesYRecursos.find(p => p.tipo === tipo && p.sistema === sistema)
      if (poder) {
        poder.recursoVinculado[campo] = valor
      }
    }
  },
  actions: {
    actualizarPoder({ commit }, payload) {
      commit('ACTUALIZAR_PODER', payload)
    },
    agregarPoder({ commit }, poder) {
      commit('AGREGAR_PODER', poder)
    },
    eliminarPoder({ commit }, payload) {
      commit('ELIMINAR_PODER', payload)
    },
    actualizarRecursoEspiritual({ commit }, payload) {
      commit('ACTUALIZAR_RECURSO_ESPIRITUAL', payload)
    },
    actualizarRecursoVinculado({ commit }, payload) {
      commit('ACTUALIZAR_RECURSO_VINCULADO', payload)
    }
  },
  getters: {
    obtenerPoderes: state => state.poderesYRecursos,
    obtenerRecursosEspirituales: state => state.recursosEspirituales,
    obtenerPoderPorTipo: state => (tipo, sistema) => 
      state.poderesYRecursos.find(p => p.tipo === tipo && p.sistema === sistema)
  }
} 