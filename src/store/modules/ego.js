export default {
  namespaced: true,
  state: {
    atributosMentales: {
      inteligencia: 0,
      astucia: 0,
      resolucion: 0
    },
    atributosSociales: {
      presencia: 0,
      manipulacion: 0,
      compostura: 0
    },
    habilidades: {
      mentales: [
        { nombre: "academicismo", nivel: 0, especialidades: [] },
        { nombre: "informatica", nivel: 0, especialidades: [] },
        { nombre: "investigacion", nivel: 0, especialidades: [] },
        { nombre: "medicina", nivel: 0, especialidades: [] },
        { nombre: "ocultismo", nivel: 0, especialidades: [] },
        { nombre: "politica", nivel: 0, especialidades: [] },
        { nombre: "ciencia", nivel: 0, especialidades: [] }
      ],
      sociales: [
        { nombre: "empatia", nivel: 0, especialidades: [] },
        { nombre: "persuasion", nivel: 0, especialidades: [] },
        { nombre: "intimidacion", nivel: 0, especialidades: [] },
        { nombre: "subterfugio", nivel: 0, especialidades: [] },
        { nombre: "callejeo", nivel: 0, especialidades: [] }
      ],
      fisicas: [
        { nombre: "atletismo", nivel: 0, especialidades: [] },
        { nombre: "pelea", nivel: 0, especialidades: [] },
        { nombre: "conducir", nivel: 0, especialidades: [] },
        { nombre: "armas", nivel: 0, especialidades: [] },
        { nombre: "sigilo", nivel: 0, especialidades: [] }
      ]
    },
    meritos: [],
    caracteristicasDuales: {
      personalidad: {
        nombre1: "Idealismo",
        valor1: 5,
        nombre2: "Cinismo",
        valor2: 5
      },
      moral: {
        virtud: "Valor",
        valorVirtud: 5,
        vicio: "Imprudencia",
        valorVicio: 5
      }
    }
  },
  mutations: {
    ACTUALIZAR_ATRIBUTO_MENTAL(state, { atributo, valor }) {
      state.atributosMentales[atributo] = valor
    },
    ACTUALIZAR_ATRIBUTO_SOCIAL(state, { atributo, valor }) {
      state.atributosSociales[atributo] = valor
    },
    ACTUALIZAR_HABILIDAD(state, { categoria, index, campo, valor }) {
      state.habilidades[categoria][index][campo] = valor
    },
    AGREGAR_ESPECIALIDAD(state, { categoria, index, especialidad }) {
      state.habilidades[categoria][index].especialidades.push(especialidad)
    },
    ELIMINAR_ESPECIALIDAD(state, { categoria, index, especialidadIndex }) {
      state.habilidades[categoria][index].especialidades.splice(especialidadIndex, 1)
    },
    AGREGAR_MERITO(state, merito) {
      state.meritos.push(merito)
    },
    ELIMINAR_MERITO(state, index) {
      state.meritos.splice(index, 1)
    },
    ACTUALIZAR_CARACTERISTICA_DUAL(state, { tipo, campo, valor }) {
      state.caracteristicasDuales[tipo][campo] = valor
    }
  },
  actions: {
    actualizarAtributoMental({ commit }, payload) {
      commit('ACTUALIZAR_ATRIBUTO_MENTAL', payload)
    },
    actualizarAtributoSocial({ commit }, payload) {
      commit('ACTUALIZAR_ATRIBUTO_SOCIAL', payload)
    },
    actualizarHabilidad({ commit }, payload) {
      commit('ACTUALIZAR_HABILIDAD', payload)
    },
    agregarEspecialidad({ commit }, payload) {
      commit('AGREGAR_ESPECIALIDAD', payload)
    },
    eliminarEspecialidad({ commit }, payload) {
      commit('ELIMINAR_ESPECIALIDAD', payload)
    },
    agregarMerito({ commit }, merito) {
      commit('AGREGAR_MERITO', merito)
    },
    eliminarMerito({ commit }, index) {
      commit('ELIMINAR_MERITO', index)
    },
    actualizarCaracteristicaDual({ commit }, payload) {
      commit('ACTUALIZAR_CARACTERISTICA_DUAL', payload)
    }
  },
  getters: {
    obtenerAtributosMentales: state => state.atributosMentales,
    obtenerAtributosSociales: state => state.atributosSociales,
    obtenerHabilidades: state => state.habilidades,
    obtenerMeritos: state => state.meritos,
    obtenerCaracteristicasDuales: state => state.caracteristicasDuales
  }
} 