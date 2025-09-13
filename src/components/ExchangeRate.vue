<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useExchangeStore } from '../stores/exchangeStore';
import { storeToRefs } from 'pinia';
const exchangeStore = useExchangeStore();
const { exchangeRateBuy, exchangeRateSell } = storeToRefs(exchangeStore);

const buyRateTypeSelected = ref<boolean>(true);

const handleRateTypeSelected = (buySelected: boolean) => buyRateTypeSelected.value = buySelected;
const runOperations = () => {
  console.log('Run Operations')
}

onMounted(async() => {
  // Get exchange rates for the first time
  await exchangeStore.getCurrentRates();
  // Sync Firestore database
  exchangeStore.listenRates();
});

onUnmounted(() => {
  // Stop 
  exchangeStore.stopRatesListening();
});

</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex h-[80px] px-10">
      <div class="flex w-1/2 items-end justify-center">
        <button :class="{ 'border-[#4e2db9] border-b-1': buyRateTypeSelected }" class="w-[100px] text-center cursor-pointer" @click="handleRateTypeSelected(true)">
          <p :class="[buyRateTypeSelected ? 'text-[#4e2db9]' : 'text-gray-500']">Dólar compra</p>
          <p :class="[buyRateTypeSelected ? 'text-[#4e2db9]' : 'text-gray-500']" class="font-bold">{{ exchangeRateBuy.toFixed(4) }}</p>
        </button>
      </div>
      <div class="flex w-1/2 items-end justify-center">
        <button :class="{ 'border-[#4e2db9] border-b-1': !buyRateTypeSelected }" class="w-[100px] text-center cursor-pointer" @click="handleRateTypeSelected(false)">
          <p :class="[!buyRateTypeSelected ? 'text-[#4e2db9]' : 'text-gray-500']">Dólar venta</p>
          <p :class="[!buyRateTypeSelected ? 'text-[#4e2db9]' : 'text-gray-500']" class="font-bold">{{ exchangeRateSell.toFixed(4) }}</p>
        </button>
      </div>
    </div>
    <div class="h-[1px] bg-gray-300"></div>
    <div class="h-full p-10">
      <div class="flex">
        <button class="w-full text-center bg-[#4e2db9] text-white rounded-md h-[40px]" @click="runOperations()">
          Iniciar operación
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
