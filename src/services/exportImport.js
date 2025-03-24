import { storageService } from './storage'

export const exportImportService = {
  exportarPersonaje(personaje) {
    return storageService.exportarPersonaje(personaje)
  },

  importarPersonaje(archivo) {
    return storageService.importarPersonaje(archivo)
  },

  validarVersion(personaje) {
    const versionActual = '1.0.0'
    const versionPersonaje = personaje.version || '1.0.0'
    
    if (versionPersonaje === versionActual) {
      return personaje
    }

    return this.migrarVersion(personaje, versionPersonaje, versionActual)
  },

  migrarVersion(personaje, versionOrigen, versionDestino) {
    const migraciones = {
      '1.0.0': (p) => p // Versión actual, no requiere migración
    }

    let personajeMigrado = { ...personaje }

    // Aplicar migraciones en orden
    Object.keys(migraciones).forEach(version => {
      if (this.compararVersiones(version, versionOrigen) > 0 && 
          this.compararVersiones(version, versionDestino) <= 0) {
        personajeMigrado = migraciones[version](personajeMigrado)
      }
    })

    personajeMigrado.version = versionDestino
    return personajeMigrado
  },

  compararVersiones(v1, v2) {
    const v1Parts = v1.split('.').map(Number)
    const v2Parts = v2.split('.').map(Number)

    for (let i = 0; i < 3; i++) {
      if (v1Parts[i] > v2Parts[i]) return 1
      if (v1Parts[i] < v2Parts[i]) return -1
    }

    return 0
  },

  generarRespaldo(personaje) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const nombreArchivo = `respaldo-personaje-${timestamp}.json`
    
    const respaldo = {
      version: '1.0.0',
      fecha: new Date().toISOString(),
      personaje: personaje
    }

    const blob = new Blob([JSON.stringify(respaldo, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = nombreArchivo
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  },

  cargarRespaldo(archivo) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const respaldo = JSON.parse(event.target.result)
          if (respaldo.version && respaldo.personaje) {
            const personajeMigrado = this.validarVersion(respaldo.personaje)
            resolve(personajeMigrado)
          } else {
            reject(new Error('Formato de respaldo inválido'))
          }
        } catch (error) {
          reject(error)
        }
      }
      reader.onerror = () => reject(new Error('Error al leer el archivo de respaldo'))
      reader.readAsText(archivo)
    })
  }
} 