# Character Sheet

Una aplicación web para gestionar hojas de personaje de juegos de rol, construida con Vue 3 y Tailwind CSS.

## Características

- Gestión de personajes con múltiples morfos
- Sistema de atributos y habilidades
- Gestión de inventario
- Historial de eventos
- Guardado automático en localStorage
- Exportación/importación de personajes

## Requisitos

- Node.js >= 16.0.0
- npm >= 7.0.0

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/character-sheet.git
cd character-sheet
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador y visita `http://localhost:3000`

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Previsualiza la aplicación construida
- `npm run lint`: Ejecuta el linter
- `npm run format`: Formatea el código con Prettier
- `npm run prepare`: Configura los hooks de git

## Estructura del Proyecto

```
character-sheet/
├── src/
│   ├── assets/        # Recursos estáticos
│   ├── components/    # Componentes Vue
│   ├── store/         # Estado global (Vuex)
│   ├── App.vue        # Componente principal
│   └── main.js        # Punto de entrada
├── public/            # Archivos públicos
├── index.html         # Plantilla HTML
├── vite.config.js     # Configuración de Vite
└── package.json       # Dependencias y scripts
```

## Tecnologías Utilizadas

- Vue 3
- Vuex 4
- Tailwind CSS
- Vite
- ESLint
- Prettier

## Contribuir

1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
