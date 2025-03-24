export default {
  namespaced: true,
  state: {
    atributos: {
      mentales: [
        { id: 'poder', nombre: 'Poder', valor: 3 },
        { id: 'destreza', nombre: 'Destreza', valor: 3 },
        { id: 'resiliencia', nombre: 'Resiliencia', valor: 3 }
      ],
      sociales: [
        { id: 'poder', nombre: 'Poder', valor: 3 },
        { id: 'destreza', nombre: 'Destreza', valor: 3 },
        { id: 'resiliencia', nombre: 'Resiliencia', valor: 3 }
      ],
      fisicos: [
        { id: 'poder', nombre: 'Poder', valor: 3 },
        { id: 'destreza', nombre: 'Destreza', valor: 3 },
        { id: 'resiliencia', nombre: 'Resiliencia', valor: 3 }
      ]
    },
    habilidades: {
      mentales: [
        {
          nombre: 'Mentales',
          habilidades: []
        }
      ],
      sociales: [
        {
          nombre: 'Sociales',
          habilidades: []
        }
      ],
      fisicas: [
        {
          nombre: 'Físicas',
          habilidades: []
        }
      ]
    },
    meritos: [],
    defectos: [],
    característicasDuales: {
      personalidad: {
        nombre1: 'Introvertido',
        nombre2: 'Extrovertido',
        valor1: 5
      },
      moral: {
        virtud: 'Compasión',
        vicio: 'Crueldad',
        valorVirtud: 5
      }
    }
  },
  mutations: {
    ACTUALIZAR_ATRIBUTO(state, { tipo, id, valor }) {
      const atributo = state.atributos[tipo].find(a => a.id === id)
      if (atributo) {
        atributo.valor = valor
      }
    },
    ACTUALIZAR_HABILIDAD(state, { tipo, id, valor }) {
      const tipoHabilidad = tipo === 'fisicos' ? 'fisicas' : tipo
      state.habilidades[tipoHabilidad][0].habilidades.forEach(habilidad => {
        if (habilidad.id === id) {
          habilidad.valor = valor
        }
      })
    },
    AGREGAR_HABILIDAD(state, { tipo, nombre }) {
      const tipoHabilidad = tipo === 'fisicos' ? 'fisicas' : tipo
      const id = nombre.toLowerCase().replace(/\s+/g, '_')
      state.habilidades[tipoHabilidad][0].habilidades.push({
        id,
        nombre,
        valor: 0,
        especializaciones: []
      })
    },
    ELIMINAR_HABILIDAD(state, { tipo, id }) {
      const tipoHabilidad = tipo === 'fisicos' ? 'fisicas' : tipo
      state.habilidades[tipoHabilidad][0].habilidades = 
        state.habilidades[tipoHabilidad][0].habilidades.filter(h => h.id !== id)
    },
    ACTUALIZAR_CARACTERISTICA_DUAL(state, { tipo, campo, valor }) {
      if (tipo === 'personalidad') {
        state.característicasDuales.personalidad.valor1 = valor
      } else if (tipo === 'moral') {
        state.característicasDuales.moral.valorVirtud = valor
      }
    },
    AGREGAR_MERITO(state, merito) {
      state.meritos.push(merito)
    },
    ACTUALIZAR_NIVEL_MERITO(state, { id, nivel }) {
      const merito = state.meritos.find(m => m.id === id)
      if (merito) {
        merito.nivel = nivel
      }
    },
    ELIMINAR_MERITO(state, id) {
      state.meritos = state.meritos.filter(m => m.id !== id)
    },
    AGREGAR_ESPECIALIZACION(state, { tipo, habilidadId, especializacion }) {
      const tipoHabilidad = tipo === 'fisicos' ? 'fisicas' : tipo
      const habilidad = state.habilidades[tipoHabilidad][0].habilidades.find(h => h.id === habilidadId)
      if (habilidad && habilidad.valor >= 3) {
        habilidad.especializaciones.push(especializacion)
      }
    },
    ELIMINAR_ESPECIALIZACION(state, { tipo, habilidadId, especializacion }) {
      const tipoHabilidad = tipo === 'fisicos' ? 'fisicas' : tipo
      const habilidad = state.habilidades[tipoHabilidad][0].habilidades.find(h => h.id === habilidadId)
      if (habilidad) {
        habilidad.especializaciones = habilidad.especializaciones.filter(e => e !== especializacion)
      }
    },
    AGREGAR_DEFECTO(state, defecto) {
      state.defectos.push(defecto)
    },
    ELIMINAR_DEFECTO(state, id) {
      state.defectos = state.defectos.filter(d => d.id !== id)
    }
  },
  actions: {
    actualizarAtributo({ commit }, { tipo, id, valor }) {
      commit('ACTUALIZAR_ATRIBUTO', { tipo, id, valor })
    },
    actualizarHabilidad({ commit }, payload) {
      commit('ACTUALIZAR_HABILIDAD', payload)
    },
    agregarHabilidad({ commit }, payload) {
      commit('AGREGAR_HABILIDAD', payload)
    },
    eliminarHabilidad({ commit }, payload) {
      commit('ELIMINAR_HABILIDAD', payload)
    },
    actualizarCaracteristicaDual({ commit }, payload) {
      commit('ACTUALIZAR_CARACTERISTICA_DUAL', payload)
    },
    agregarMerito({ commit }, merito) {
      commit('AGREGAR_MERITO', merito)
    },
    actualizarNivelMerito({ commit }, { id, nivel }) {
      commit('ACTUALIZAR_NIVEL_MERITO', { id, nivel })
    },
    eliminarMerito({ commit }, id) {
      commit('ELIMINAR_MERITO', id)
    },
    agregarEspecializacion({ commit }, payload) {
      commit('AGREGAR_ESPECIALIZACION', payload)
    },
    eliminarEspecializacion({ commit }, payload) {
      commit('ELIMINAR_ESPECIALIZACION', payload)
    },
    agregarDefecto({ commit }, defecto) {
      commit('AGREGAR_DEFECTO', defecto)
    },
    eliminarDefecto({ commit }, id) {
      commit('ELIMINAR_DEFECTO', id)
    }
  },
  getters: {
    getAtributos: state => state.atributos,
    getAtributosMentales: state => state.atributos.mentales,
    getAtributosSociales: state => state.atributos.sociales,
    getAtributosFisicos: state => state.atributos.fisicos,
    habilidadesPorTipo: (state) => (tipo) => {
      const tipoHabilidad = tipo === 'fisicos' ? 'fisicas' : tipo
      return state.habilidades[tipoHabilidad] || []
    },
    caracteristicasDuales: (state) => state.característicasDuales,
    meritos: state => state.meritos,
    defectos: state => state.defectos
  }
} 