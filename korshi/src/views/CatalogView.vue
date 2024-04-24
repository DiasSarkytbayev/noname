<template>
  <div class="container py-20">
    <catalog-filter />
    <div class="grid grid-cols-12 gap-8 pt-16">
      <router-link
        v-for="(product, idx) in filteredProducts"
        :key="idx"
        :to="{ name: 'catalog.product', params: { id: product.id } }"
        class="col-span-3"
      >
        <a-card hoverable>
          <template #cover>
            <img :alt="product.title" :src="product.image" />
          </template>
          <template #actions>
            <shopping-cart-outlined key="shopping" style="font-size: 1.5em" />
            <info-circle-outlined key="info" style="font-size: 1.5em" />
            <heart-outlined key="heart" style="font-size: 1.5rem" />
          </template>
          <a-card-meta :title="product.title">
            <template #description>
              <span class="text-lg">{{ formatCurrency(product.price) }}</span>
            </template>
          </a-card-meta>
        </a-card>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ShoppingCartOutlined, InfoCircleOutlined, HeartOutlined } from '@ant-design/icons-vue';
import CatalogFilter from '@/components/CatalogFilter.vue';
import { useCatalogStore } from '@/stores/useCatalogStore.js';
import { storeToRefs } from 'pinia';
import { formatCurrency } from '../utils/utils.js';

const catalogStore = useCatalogStore();
const { filteredProducts } = storeToRefs(catalogStore);

catalogStore.loadProducts();
</script>

<style lang="scss" scoped></style>
