<template>
  <div class="container py-24">
    <h4 class="text-3xl font-bold mb-8 my-14">My favorites</h4>
    <div class="grid grid-cols-12 gap-8">
      <div v-for="product in favourites" :key="product.id" class="col-span-4">
        <a-card hoverable>
          <template #cover>
            <img :alt="product.title" :src="product.image" />
          </template>
          <template #actions>
            <info-circle-outlined key="info" style="font-size: 1.5em" />
            <heart-filled key="heart" style="font-size: 1.5rem" class="text-red-500" />
          </template>
          <a-card-meta :title="product.title">
            <template #description>
              <span class="text-lg">{{ formatCurrency(product.price) }}</span>
            </template>
          </a-card-meta>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCatalogStore } from '@/stores/useCatalogStore.js';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { formatCurrency } from '@/utils/utils.js';
import { InfoCircleOutlined, HeartFilled } from '@ant-design/icons-vue';

const catalogStore = useCatalogStore();
const { products } = storeToRefs(catalogStore);

catalogStore.loadProducts();

const favourites = computed(() => products.value.slice(0, 4));
</script>

<style lang="scss" scoped></style>
