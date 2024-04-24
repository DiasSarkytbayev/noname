<template>
  <li class="cursor-pointer" @click="showModal">
    <img src="@/assets/img/icons/slider.svg" alt="slider" class="w-[40px]" />
  </li>
  <Teleport to="body">
    <a-modal v-model:open="open" title="Additional filters" @ok="handleOk">
      <div class="mt-6 mb-3">
        Price {{ formatCurrency(filters.price[0]) }} - {{ formatCurrency(filters.price[1]) }}
      </div>
      <a-slider v-model:value="filters.price" range :min="0" :max="9999999" />
      <div class="mt-6 mb-3">Number of rooms</div>
      <a-slider v-model:value="filters.numOfRooms" range :marks="marks" :min="1" :max="5" />
    </a-modal>
  </Teleport>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useCatalogStore } from '@/stores/useCatalogStore.js';
import { storeToRefs } from 'pinia';
import { formatCurrency } from '../utils/utils.js';

const catalogStore = useCatalogStore();
const { filters } = storeToRefs(catalogStore);

const open = ref(false);

const showModal = () => {
  open.value = true;
};

const handleOk = () => {
  open.value = false;
};

const marks = computed(() => ({ 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 }));
</script>

<style lang="scss" scoped></style>
