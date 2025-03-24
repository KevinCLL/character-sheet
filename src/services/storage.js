const STORAGE_KEY = 'character-sheet-data'
const BACKUP_PREFIX = 'character-sheet-backup-'

export const storageService = {
  guardarPersonaje(personaje) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(personaje))
      this.crearBackup(personaje)
      return true
    } catch (error) {
      console.error('Error al guardar el personaje:', error)
      return false
    }
  },

  cargarPersonaje() {
    try {
      const datos = localStorage.getItem(STORAGE_KEY)
      return datos ? JSON.parse(datos) : null
    } catch (error) {
      console.error('Error al cargar el personaje:', error)
      return null
    }
  },

  crearBackup(personaje) {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const backupKey = `${BACKUP_PREFIX}${timestamp}`
      localStorage.setItem(backupKey, JSON.stringify(personaje))
      this.limpiarBackupsAntiguos()
    } catch (error) {
      console.error('Error al crear backup:', error)
    }
  },

  limpiarBackupsAntiguos() {
    try {
      const backups = Object.keys(localStorage)
        .filter(key => key.startsWith(BACKUP_PREFIX))
        .sort()
      
      // Mantener solo los últimos 5 backups
      if (backups.length > 5) {
        backups.slice(0, backups.length - 5).forEach(key => {
          localStorage.removeItem(key)
        })
      }
    } catch (error) {
      console.error('Error al limpiar backups antiguos:', error)
    }
  },

  exportarPersonaje(personaje) {
    try {
      const blob = new Blob([JSON.stringify(personaje, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `personaje-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      return true
    } catch (error) {
      console.error('Error al exportar el personaje:', error)
      return false
    }
  },

  importarPersonaje(archivo) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const personaje = JSON.parse(event.target.result)
          // Validar estructura del personaje
          if (this.validarEstructuraPersonaje(personaje)) {
            resolve(personaje)
          } else {
            reject(new Error('Estructura de personaje inválida'))
          }
        } catch (error) {
          reject(error)
        }
      }
      reader.onerror = () => reject(new Error('Error al leer el archivo'))
      reader.readAsText(archivo)
    })
  },

  validarEstructuraPersonaje(personaje) {
    // Validar estructura básica
    const estructuraRequerida = [
      'ego',
      'morfo',
      'avatar',
      'historia',
      'personaje'
    ]

    return estructuraRequerida.every(seccion => 
      personaje[seccion] && typeof personaje[seccion] === 'object'
    )
  }
} 