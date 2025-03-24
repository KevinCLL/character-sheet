export default {
  namespaced: true,
  state: {
    identificacion: {
      nombre: "",
      jugador: "",
      cronica: ""
    },
    inventario: {
      equipo: [],
      armas: [],
      refugios: [],
      vehiculos: []
    },
    recursos: {
      contactos: [],
      aliados: [],
      otros: []
    },
    estadisticasCalculadas: {
      salud: {
        maximo: 0,
        actual: 0
      },
      defensa: 0,
      iniciativa: 0,
      velocidad: 0
    },
    caracteristicasDuales: []
  },
  mutations: {
    ACTUALIZAR_IDENTIFICACION(state, { campo, valor }) {
      state.identificacion[campo] = valor
    },
    AGREGAR_EQUIPO(state, item) {
      state.inventario.equipo.push(item)
    },
    ELIMINAR_EQUIPO(state, index) {
      state.inventario.equipo.splice(index, 1)
    },
    AGREGAR_ARMA(state, arma) {
      state.inventario.armas.push(arma)
    },
    ELIMINAR_ARMA(state, index) {
      state.inventario.armas.splice(index, 1)
    },
    AGREGAR_REFUGIO(state, refugio) {
      state.inventario.refugios.push(refugio)
    },
    ELIMINAR_REFUGIO(state, index) {
      state.inventario.refugios.splice(index, 1)
    },
    AGREGAR_VEHICULO(state, vehiculo) {
      state.inventario.vehiculos.push(vehiculo)
    },
    ELIMINAR_VEHICULO(state, index) {
      state.inventario.vehiculos.splice(index, 1)
    },
    AGREGAR_CONTACTO(state, contacto) {
      state.recursos.contactos.push(contacto)
    },
    ELIMINAR_CONTACTO(state, index) {
      state.recursos.contactos.splice(index, 1)
    },
    AGREGAR_ALIADO(state, aliado) {
      state.recursos.aliados.push(aliado)
    },
    ELIMINAR_ALIADO(state, index) {
      state.recursos.aliados.splice(index, 1)
    },
    ACTUALIZAR_ESTADISTICAS(state, { campo, valor }) {
      if (campo.includes('.')) {
        const [padre, hijo] = campo.split('.')
        state.estadisticasCalculadas[padre][hijo] = valor
      } else {
        state.estadisticasCalculadas[campo] = valor
      }
    },
    ACTUALIZAR_CARACTERISTICAS_DUALES(state, caracteristicas) {
      state.caracteristicasDuales = caracteristicas
    }
  },
  actions: {
    actualizarIdentificacion({ commit }, payload) {
      commit('ACTUALIZAR_IDENTIFICACION', payload)
    },
    agregarEquipo({ commit }, item) {
      commit('AGREGAR_EQUIPO', item)
    },
    eliminarEquipo({ commit }, index) {
      commit('ELIMINAR_EQUIPO', index)
    },
    agregarArma({ commit }, arma) {
      commit('AGREGAR_ARMA', arma)
    },
    eliminarArma({ commit }, index) {
      commit('ELIMINAR_ARMA', index)
    },
    agregarRefugio({ commit }, refugio) {
      commit('AGREGAR_REFUGIO', refugio)
    },
    eliminarRefugio({ commit }, index) {
      commit('ELIMINAR_REFUGIO', index)
    },
    agregarVehiculo({ commit }, vehiculo) {
      commit('AGREGAR_VEHICULO', vehiculo)
    },
    eliminarVehiculo({ commit }, index) {
      commit('ELIMINAR_VEHICULO', index)
    },
    agregarContacto({ commit }, contacto) {
      commit('AGREGAR_CONTACTO', contacto)
    },
    eliminarContacto({ commit }, index) {
      commit('ELIMINAR_CONTACTO', index)
    },
    agregarAliado({ commit }, aliado) {
      commit('AGREGAR_ALIADO', aliado)
    },
    eliminarAliado({ commit }, index) {
      commit('ELIMINAR_ALIADO', index)
    },
    actualizarEstadisticas({ commit }, payload) {
      commit('ACTUALIZAR_ESTADISTICAS', payload)
    },
    actualizarCaracteristicasDuales({ commit }, caracteristicas) {
      commit('ACTUALIZAR_CARACTERISTICAS_DUALES', caracteristicas)
    },
    calcularEstadisticas({ commit, rootState }) {
      const ego = rootState.ego
      const morfo = rootState.morfo.morfoActivo
      
      // Cálculo de salud
      const saludBase = morfo ? morfo.salud.base : 0
      const saludMaximo = saludBase + (ego.atributosFisicos.resistencia || 0)
      
      // Cálculo de defensa
      const defensa = (ego.atributosFisicos.destreza || 0) + 
                     (ego.atributosFisicos.resistencia || 0)
      
      // Cálculo de iniciativa
      const iniciativa = (ego.atributosFisicos.destreza || 0) + 
                        (ego.atributosMentales.resolucion || 0)
      
      // Cálculo de velocidad
      const velocidad = (ego.atributosFisicos.fuerza || 0) + 
                       (ego.atributosFisicos.destreza || 0) + 
                       (ego.atributosFisicos.resistencia || 0)
      
      commit('ACTUALIZAR_ESTADISTICAS', {
        campo: 'salud.maximo',
        valor: saludMaximo
      })
      
      commit('ACTUALIZAR_ESTADISTICAS', {
        campo: 'defensa',
        valor: defensa
      })
      
      commit('ACTUALIZAR_ESTADISTICAS', {
        campo: 'iniciativa',
        valor: iniciativa
      })
      
      commit('ACTUALIZAR_ESTADISTICAS', {
        campo: 'velocidad',
        valor: velocidad
      })
    }
  },
  getters: {
    obtenerIdentificacion: state => state.identificacion,
    obtenerInventario: state => state.inventario,
    obtenerRecursos: state => state.recursos,
    obtenerEstadisticas: state => state.estadisticasCalculadas,
    obtenerCaracteristicasDuales: state => state.caracteristicasDuales
  }
} 