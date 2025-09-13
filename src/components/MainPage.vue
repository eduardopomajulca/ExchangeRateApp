<script setup lang="ts">
import ExchangeRate from './ExchangeRate.vue';
</script>

<template>
  <div class="flex min-h-screen sm:place-items-center justify-center">
    <div class="flex w-full sm:w-4/6 flex-col sm:flex-row gap-10 items-center">
      <div class="w-full sm:w-1/2 pt-5 px-20 sm:p-0 justify-center">
        <div class="text-center sm:text-left">
          <h1 class="text-white font-bold text-4xl sm:text-5xl">El mejor</h1>
          <h1 class="text-white font-bold text-4xl sm:text-5xl">tipo de cambio</h1>
          <h2 class="text-white text-xl sm:text-2xl">para cambiar dólares y soles online en Perú</h2>
        </div>
      </div>
      <div class="w-full flex sm:w-1/2 justify-center h-[350px]">
        <div class="w-full sm:w-[25rem] bg-white sm:rounded-lg shadow-xl">
          <ExchangeRate />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
