export const calculadorService = {
  calcularSalud(ego, morfo) {
    const saludBase = morfo ? morfo.salud.base : 0
    const resistencia = ego.atributosFisicos.resistencia || 0
    return saludBase + resistencia
  },

  calcularDefensa(ego) {
    const destreza = ego.atributosFisicos.destreza || 0
    const resistencia = ego.atributosFisicos.resistencia || 0
    return destreza + resistencia
  },

  calcularIniciativa(ego) {
    const destreza = ego.atributosFisicos.destreza || 0
    const resolucion = ego.atributosMentales.resolucion || 0
    return destreza + resolucion
  },

  calcularVelocidad(ego) {
    const fuerza = ego.atributosFisicos.fuerza || 0
    const destreza = ego.atributosFisicos.destreza || 0
    const resistencia = ego.atributosFisicos.resistencia || 0
    return fuerza + destreza + resistencia
  },

  calcularHabilidadEfectiva(habilidad, limitadores) {
    const limitador = limitadores[habilidad.nombre]
    if (!limitador) return habilidad.nivel

    const maximo = limitador.maximoPermitido
    const modificador = limitador.modificador
    return Math.min(habilidad.nivel, maximo) + modificador
  },

  calcularCaracteristicasDuales(ego, morfo) {
    const caracteristicas = []

    // Características del EGO
    if (ego.caracteristicasDuales.personalidad) {
      caracteristicas.push({
        tipo: 'personalidad',
        nombre1: ego.caracteristicasDuales.personalidad.nombre1,
        valor1: ego.caracteristicasDuales.personalidad.valor1,
        nombre2: ego.caracteristicasDuales.personalidad.nombre2,
        valor2: ego.caracteristicasDuales.personalidad.valor2
      })
    }

    if (ego.caracteristicasDuales.moral) {
      caracteristicas.push({
        tipo: 'moral',
        nombre1: ego.caracteristicasDuales.moral.virtud,
        valor1: ego.caracteristicasDuales.moral.valorVirtud,
        nombre2: ego.caracteristicasDuales.moral.vicio,
        valor2: ego.caracteristicasDuales.moral.valorVicio
      })
    }

    // Características del MORFO
    if (morfo && morfo.caracteristicaDual) {
      caracteristicas.push({
        tipo: 'morfologica',
        nombre1: morfo.caracteristicaDual.nombre1,
        valor1: morfo.caracteristicaDual.valor1,
        nombre2: morfo.caracteristicaDual.nombre2,
        valor2: morfo.caracteristicaDual.valor2
      })
    }

    return caracteristicas
  },

  calcularRecursosEspirituales(avatar) {
    const recursos = { ...avatar.recursosEspirituales }

    // Ajustar recursos según poderes
    avatar.poderesYRecursos.forEach(poder => {
      if (poder.recursoVinculado) {
        const recurso = poder.recursoVinculado
        recursos[recurso.nombre] = {
          maximo: recurso.maximo,
          actual: recurso.actual
        }
      }
    })

    return recursos
  },

  calcularEstadisticasCompletas(ego, morfo, avatar) {
    return {
      salud: {
        maximo: this.calcularSalud(ego, morfo),
        actual: 0 // Este valor se maneja en el juego
      },
      defensa: this.calcularDefensa(ego),
      iniciativa: this.calcularIniciativa(ego),
      velocidad: this.calcularVelocidad(ego),
      caracteristicasDuales: this.calcularCaracteristicasDuales(ego, morfo),
      recursosEspirituales: this.calcularRecursosEspirituales(avatar)
    }
  }
} 