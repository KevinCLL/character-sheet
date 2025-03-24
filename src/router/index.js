import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/ego',
      name: 'ego',
      component: () => import('../views/EditorEgoView.vue')
    },
    {
      path: '/morfo',
      name: 'morfo',
      component: () => import('../views/GestorMorfosView.vue')
    },
    {
      path: '/avatar',
      name: 'avatar',
      component: () => import('../views/EditorAvatarView.vue')
    },
    {
      path: '/historia',
      name: 'historia',
      component: () => import('../views/EditorHistoriaView.vue')
    },
    {
      path: '/resumen',
      name: 'resumen',
      component: () => import('../views/ResumenPersonajeView.vue')
    },
    {
      path: '/configuracion',
      name: 'configuracion',
      component: () => import('../views/ConfiguracionView.vue')
    }
  ]
})

export default router 