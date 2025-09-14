<script setup lang="ts">
import ExchangeRate from './ExchangeRate.vue';
</script>

<template>
  <div class="flex min-w-[20rem] min-h-screen sm:place-items-center justify-center">
    <div class="flex w-full sm:w-4/6 flex-col sm:flex-row gap-15 items-center">
      <div class="w-full sm:w-1/2 pt-5 px-20 sm:p-0 justify-center">
        <div class="text-center sm:text-left">
          <h1 class="h1-white">El mejor</h1>
          <h1 class="h1-white">tipo de cambio</h1>
          <h2 class="h2-white">para cambiar dólares y soles online en Perú</h2>
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
