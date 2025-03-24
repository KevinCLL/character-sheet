<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <nav class="bg-white dark:bg-gray-800 shadow-lg">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <router-link to="/" class="text-xl font-bold text-gray-800 dark:text-white">
                Ficha Multiversal
              </router-link>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link
                v-for="item in menuItems"
                :key="item.path"
                :to="item.path"
                class="inline-flex items-center px-1 pt-1 border-b-2"
                :class="[
                  route.path === item.path
                    ? 'border-indigo-500 text-gray-900 dark:text-white'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300'
                ]"
              >
                {{ item.name }}
              </router-link>
            </div>
          </div>
          <div class="flex items-center">
            <button
              @click="toggleDarkMode"
              class="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <span class="sr-only">Cambiar modo oscuro</span>
              <svg
                v-if="!isDarkMode"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
              <svg
                v-else
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

const menuItems = [
  { name: 'Inicio', path: '/' },
  { name: 'EGO', path: '/ego' },
  { name: 'MORFO', path: '/morfo' },
  { name: 'AVATAR', path: '/avatar' },
  { name: 'Historia', path: '/historia' },
  { name: 'Resumen', path: '/resumen' },
  { name: 'Configuración', path: '/configuracion' }
]

const isDarkMode = computed(() => store.state.modoOscuro)

const toggleDarkMode = () => {
  store.commit('TOGGLE_MODO_OSCURO')
  document.documentElement.classList.toggle('dark')
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>