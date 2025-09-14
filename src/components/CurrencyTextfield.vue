<script setup lang="ts">

const props = defineProps<{ sideLabel: string, label: string, symbol: string, currencyValue: string }>();

const handleKeyPress = (event: KeyboardEvent) => {
  const target = event.target as HTMLInputElement;
  const key = event.key;
  const currentValue = target.value;
  if (!/\d|\./.test(key)) {
    event.preventDefault();
    return;
  }
  const selectionStart = target.selectionStart ?? currentValue.length;
  const selectionEnd = target.selectionEnd ?? currentValue.length;
  const newValue = currentValue.slice(0, selectionStart) + key + currentValue.slice(selectionEnd);
  if (!/^\d+(\.\d{0,2})?$/.test(newValue)) {
    event.preventDefault();
  }
}

</script>
<template>
  <div class="flex w-full h-[50px] justify-content items-center m-auto border-1 rounded-md border-primary-100">
    <div class="flex h-full w-1/3 bg-gray-100 rounded-l-md items-center">
      <div class="text-primary-100 px-4">
        {{ props.sideLabel }}
      </div>
    </div>
    <div class="h-full w-2/3 gap-1">
      <p class="h-1/3 mb-0 text-end pt-0.5 px-3 text-sm items-end text-gray-500">
        {{ props.label }}
      </p>
      <div class="flex h-2/3">
        <div class="flex items-center px-3 text-gray-800 font-semibold">{{ props.symbol }}</div>
        <input 
          class="w-full outline-none pr-3 text-end text-md text-gray-800 font-semibold"
          type="text"
          autocomplete="off"
          :value="props.currencyValue"
          @keypress="handleKeyPress"
          @input="$emit('update:currencyValue', ($event.target as HTMLInputElement).value)"
          @paste.prevent
          placeholder="0.00"
        >
        </input>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>