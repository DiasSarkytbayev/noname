<template>
  <div class="flex items-center justify-between w-full">
    <ul class="flex items-center gap-8 mb-0">
      <catalog-filter-modal />
      <li
        v-for="landType in landTypes"
        :key="landType.value"
        class="cursor-pointer"
        :class="{ 'font-bold': selectedLangTypes.includes(landType.value) }"
        @click="onClickFilter(landType)"
      >
        <img :src="landType.icon" alt="slider" class="w-[40px] mx-auto" />
        <div class="mt-2 capitalize">{{ landType.value }}</div>
      </li>
    </ul>
    <div class="text text-gray-400">
      {{ filtersApplied ? 'Вашим фильтрам соответствуют' : 'Всего' }}
      <b>{{ filteredProducts.length }}</b> товаров
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCatalogStore } from '@/stores/useCatalogStore.js';
import { storeToRefs } from 'pinia';
import roomIcon from '@/assets/img/icons/room.svg';
import homeIcon from '@/assets/img/icons/home.svg';
import keyIcon from '@/assets/img/icons/key.svg';
import CatalogFilterModal from '@/components/CatalogFilterModal.vue';

const catalogStore = useCatalogStore();
const { selectedLangTypes, products, filteredProducts } = storeToRefs(catalogStore);

const landTypes = computed(() => [
  { value: 'room', icon: roomIcon },
  { value: 'house', icon: homeIcon },
  { value: 'apartment', icon: keyIcon },
]);

function onClickFilter(landType) {
  if (selectedLangTypes.value.includes(landType.value)) {
    selectedLangTypes.value = selectedLangTypes.value.filter((t) => t !== landType.value);
  } else {
    selectedLangTypes.value.push(landType.value);
  }
}

const filtersApplied = computed(() => filteredProducts.value.length !== products.value.length);
</script>

<style lang="scss" scoped></style>
