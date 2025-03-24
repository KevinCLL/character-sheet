export default {
  namespaced: true,
  state: {
    atributos: {
      mentales: [
        { id: 'intelecto', nombre: 'Intelecto', valor: 1 },
        { id: 'astucia', nombre: 'Astucia', valor: 1 },
        { id: 'determinacion', nombre: 'Determinación', valor: 1 }
      ],
      sociales: [
        { id: 'presencia', nombre: 'Presencia', valor: 1 },
        { id: 'manipulacion', nombre: 'Manipulación', valor: 1 },
        { id: 'compostura', nombre: 'Compostura', valor: 1 }
      ],
      fisicos: [
        { id: 'fuerza', nombre: 'Fuerza', valor: 1 },
        { id: 'destreza', nombre: 'Destreza', valor: 1 },
        { id: 'resistencia', nombre: 'Resistencia', valor: 1 }
      ]
    },
    habilidades: {
      mentales: [
        {
          nombre: 'Académicas',
          habilidades: [
            { id: 'ciencias', nombre: 'Ciencias', valor: 0 },
            { id: 'humanidades', nombre: 'Humanidades', valor: 0 },
            { id: 'medicina', nombre: 'Medicina', valor: 0 }
          ]
        },
        {
          nombre: 'Técnicas',
          habilidades: [
            { id: 'informatica', nombre: 'Informática', valor: 0 },
            { id: 'ingenieria', nombre: 'Ingeniería', valor: 0 },
            { id: 'investigacion', nombre: 'Investigación', valor: 0 }
          ]
        }
      ],
      sociales: [
        {
          nombre: 'Comunicación',
          habilidades: [
            { id: 'empatia', nombre: 'Empatía', valor: 0 },
            { id: 'expresion', nombre: 'Expresión', valor: 0 },
            { id: 'persuasion', nombre: 'Persuasión', valor: 0 }
          ]
        },
        {
          nombre: 'Interacción',
          habilidades: [
            { id: 'intimidacion', nombre: 'Intimidación', valor: 0 },
            { id: 'liderazgo', nombre: 'Liderazgo', valor: 0 },
            { id: 'subterfugio', nombre: 'Subterfugio', valor: 0 }
          ]
        }
      ],
      fisicas: [
        {
          nombre: 'Combate',
          habilidades: [
            { id: 'armas_cc', nombre: 'Armas C/C', valor: 0 },
            { id: 'armas_fuego', nombre: 'Armas de Fuego', valor: 0 },
            { id: 'pelea', nombre: 'Pelea', valor: 0 }
          ]
        },
        {
          nombre: 'Movimiento',
          habilidades: [
            { id: 'atletismo', nombre: 'Atletismo', valor: 0 },
            { id: 'pilotaje', nombre: 'Pilotaje', valor: 0 },
            { id: 'sigilo', nombre: 'Sigilo', valor: 0 }
          ]
        }
      ]
    },
    méritos: [],
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
      state.habilidades[tipo].forEach(grupo => {
        const habilidad = grupo.habilidades.find(h => h.id === id)
        if (habilidad) {
          habilidad.valor = valor
        }
      })
    },
    ACTUALIZAR_CARACTERISTICA_DUAL(state, { tipo, campo, valor }) {
      if (tipo === 'personalidad') {
        state.característicasDuales.personalidad.valor1 = valor
      } else if (tipo === 'moral') {
        state.característicasDuales.moral.valorVirtud = valor
      }
    }
  },
  actions: {
    actualizarAtributo({ commit }, payload) {
      commit('ACTUALIZAR_ATRIBUTO', payload)
    },
    actualizarHabilidad({ commit }, payload) {
      commit('ACTUALIZAR_HABILIDAD', payload)
    },
    actualizarCaracteristicaDual({ commit }, payload) {
      commit('ACTUALIZAR_CARACTERISTICA_DUAL', payload)
    }
  },
  getters: {
    atributosPorTipo: (state) => (tipo) => state.atributos[tipo],
    habilidadesPorTipo: (state) => (tipo) => state.habilidades[tipo],
    caracteristicasDuales: (state) => state.característicasDuales
  }
} 