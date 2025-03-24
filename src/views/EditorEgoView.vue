<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Editor de EGO</h2>
    
    <!-- Atributos -->
    <section class="mb-12">
      <Atributos />
    </section>

    <!-- Habilidades -->
    <section class="mb-12">
      <div class="space-y-8">
        <GrupoHabilidades tipo="mentales" />
        <GrupoHabilidades tipo="sociales" />
        <GrupoHabilidades tipo="fisicas" />
      </div>
    </section>

    <!-- Características Duales -->
    <section class="mb-12">
      <CaracteristicasDuales />
    </section>
  </div>
</template>

<script>
export default {
  name: 'EditorEgoView'
}
</script>

<script setup>
import Atributos from '@/components/ego/Atributos.vue'
import GrupoHabilidades from '@/components/ego/GrupoHabilidades.vue'
import CaracteristicasDuales from '@/components/ego/CaracteristicasDuales.vue'
</script> 