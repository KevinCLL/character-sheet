export default {
  namespaced: true,
  state: {
    identidad: {
      nombreReal: "",
      nombresSombra: [],
      concepto: "",
      faccion: "",
      otros: {}
    },
    historiaBiografica: "",
    eventosSignificativos: [],
    relaciones: [],
    objetivos: {
      cortoplazo: [],
      largoplazo: []
    }
  },
  mutations: {
    ACTUALIZAR_IDENTIDAD(state, { campo, valor }) {
      if (campo.includes('.')) {
        const [padre, hijo] = campo.split('.')
        state.identidad[padre][hijo] = valor
      } else {
        state.identidad[campo] = valor
      }
    },
    AGREGAR_NOMBRE_SOMBRA(state, nombre) {
      state.identidad.nombresSombra.push(nombre)
    },
    ELIMINAR_NOMBRE_SOMBRA(state, index) {
      state.identidad.nombresSombra.splice(index, 1)
    },
    ACTUALIZAR_HISTORIA(state, historia) {
      state.historiaBiografica = historia
    },
    AGREGAR_EVENTO(state, evento) {
      state.eventosSignificativos.push(evento)
    },
    ELIMINAR_EVENTO(state, index) {
      state.eventosSignificativos.splice(index, 1)
    },
    ACTUALIZAR_EVENTO(state, { index, evento }) {
      state.eventosSignificativos[index] = evento
    },
    AGREGAR_RELACION(state, relacion) {
      state.relaciones.push(relacion)
    },
    ELIMINAR_RELACION(state, index) {
      state.relaciones.splice(index, 1)
    },
    ACTUALIZAR_RELACION(state, { index, relacion }) {
      state.relaciones[index] = relacion
    },
    AGREGAR_OBJETIVO(state, { tipo, objetivo }) {
      state.objetivos[tipo].push(objetivo)
    },
    ELIMINAR_OBJETIVO(state, { tipo, index }) {
      state.objetivos[tipo].splice(index, 1)
    },
    ACTUALIZAR_OBJETIVO(state, { tipo, index, objetivo }) {
      state.objetivos[tipo][index] = objetivo
    }
  },
  actions: {
    actualizarIdentidad({ commit }, payload) {
      commit('ACTUALIZAR_IDENTIDAD', payload)
    },
    agregarNombreSombra({ commit }, nombre) {
      commit('AGREGAR_NOMBRE_SOMBRA', nombre)
    },
    eliminarNombreSombra({ commit }, index) {
      commit('ELIMINAR_NOMBRE_SOMBRA', index)
    },
    actualizarHistoria({ commit }, historia) {
      commit('ACTUALIZAR_HISTORIA', historia)
    },
    agregarEvento({ commit }, evento) {
      commit('AGREGAR_EVENTO', evento)
    },
    eliminarEvento({ commit }, index) {
      commit('ELIMINAR_EVENTO', index)
    },
    actualizarEvento({ commit }, payload) {
      commit('ACTUALIZAR_EVENTO', payload)
    },
    agregarRelacion({ commit }, relacion) {
      commit('AGREGAR_RELACION', relacion)
    },
    eliminarRelacion({ commit }, index) {
      commit('ELIMINAR_RELACION', index)
    },
    actualizarRelacion({ commit }, payload) {
      commit('ACTUALIZAR_RELACION', payload)
    },
    agregarObjetivo({ commit }, payload) {
      commit('AGREGAR_OBJETIVO', payload)
    },
    eliminarObjetivo({ commit }, payload) {
      commit('ELIMINAR_OBJETIVO', payload)
    },
    actualizarObjetivo({ commit }, payload) {
      commit('ACTUALIZAR_OBJETIVO', payload)
    }
  },
  getters: {
    obtenerIdentidad: state => state.identidad,
    obtenerHistoria: state => state.historiaBiografica,
    obtenerEventos: state => state.eventosSignificativos,
    obtenerRelaciones: state => state.relaciones,
    obtenerObjetivos: state => state.objetivos
  }
} 