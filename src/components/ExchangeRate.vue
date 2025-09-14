<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useExchangeStore } from '../stores/exchangeStore';
import { storeToRefs } from 'pinia';
import CurrencyTextfield from './CurrencyTextfield.vue';
const exchangeStore = useExchangeStore();
const { exchangeRateBuy, exchangeRateSell } = storeToRefs(exchangeStore);

const buyRateTypeSelected = ref<boolean>(true);
const currentRate = ref<number>((buyRateTypeSelected.value ? exchangeRateBuy.value : exchangeRateSell.value) ?? 1);
const firstAmount = ref<string>("");
const secondAmount = ref<string>("");

const handleRateTypeSelected = (buySelected: boolean) => {
  buyRateTypeSelected.value = buySelected;
  const newRate = buySelected ? exchangeRateBuy.value : exchangeRateSell.value;
  currentRate.value = newRate;
  secondAmount.value = buyRateTypeSelected.value ?
    (Number(firstAmount.value) * newRate).toFixed(2) :
    (Number(firstAmount.value) / newRate).toFixed(2);
}

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
  // Stop listening from Firestore current connection
  exchangeStore.stopRatesListening();
});

watch(exchangeRateBuy, (newVal) => {
  currentRate.value = buyRateTypeSelected.value ? newVal : currentRate.value
})

watch(exchangeRateSell, (newVal) => {
  currentRate.value = !buyRateTypeSelected.value ? newVal : currentRate.value
})

const firstAmountUpdated = (val: string) => {
  firstAmount.value = val;
  secondAmount.value = buyRateTypeSelected.value ? 
    (Number(val) * currentRate.value).toFixed(2) :
    (Number(val) / currentRate.value).toFixed(2);
}

const secondAmountUpdated = (val: string) => {
  secondAmount.value = val;
  firstAmount.value = buyRateTypeSelected.value ? 
    (Number(val) / currentRate.value).toFixed(2) :
    (Number(val) * currentRate.value).toFixed(2);
}

</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex h-[80px] px-10">
      <div class="flex w-1/2 items-end justify-center">
        <button
          :class="['btn-exchange', { 'border-primary-100 border-b-1': buyRateTypeSelected }]"
          @click="handleRateTypeSelected(true)"
        >
          <p :class="[buyRateTypeSelected ? 'text-primary-100' : 'text-gray-500', 'text-sm']">Dólar compra</p>
          <p :class="[buyRateTypeSelected ? 'text-primary-100' : 'text-gray-500', 'font-bold text-sm']">{{ exchangeRateBuy.toFixed(4) }}</p>
        </button>
      </div>
      <div class="flex w-1/2 items-end justify-center">
        <button
          :class="['btn-exchange', { 'border-primary-100 border-b-1': !buyRateTypeSelected }]"
          @click="handleRateTypeSelected(false)"
        >
          <p :class="[!buyRateTypeSelected ? 'text-primary-100' : 'text-gray-500', 'text-sm']">Dólar venta</p>
          <p :class="[!buyRateTypeSelected ? 'text-primary-100' : 'text-gray-500', 'font-bold text-sm']">{{ exchangeRateSell.toFixed(4) }}</p>
        </button>
      </div>
    </div>
    <div class="h-[1px] bg-gray-300"></div>
    <div class="h-full px-15 py-10">
      <div class="flex gap-5 flex-col">
        <div class="flex gap-5 flex-col relative">
          <CurrencyTextfield
            :side-label="buyRateTypeSelected ? 'Dólares' : 'Soles'"
            :label="'Envías'"
            :symbol="buyRateTypeSelected ? '$' : 'S/'"
            :currencyValue="firstAmount"
            @update:currencyValue="firstAmountUpdated" />
          <div
            class="absolute self-center top-[35%] floating-icon-button"
            @click="handleRateTypeSelected(!buyRateTypeSelected)"
          >
            <i class="pi pi-sync" style="font-size: 1.1rem;"></i>
          </div>
          <CurrencyTextfield
            :side-label="buyRateTypeSelected ? 'Soles' : 'Dólares'"
            :label="'Recibes'"
            :symbol="buyRateTypeSelected ? 'S/' : '$'"
            :currencyValue="secondAmount"
            @update:currencyValue="secondAmountUpdated" />
        </div>
        <button class="w-full btn-primary" @click="runOperations()">
          Iniciar operación
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
