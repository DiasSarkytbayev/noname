<template>
  <div class="container py-24">
    <div class="flex justify-between items-center mb-10">
      <router-link to="/catalog">
        <a-button class="flex justify-center items-center" type="text" size="large">
          <template #icon>
            <arrow-left-outlined />
          </template>
          Каталог
        </a-button>
      </router-link>
      <a-button class="border-red-400 text-red-400 flex justify-center items-center" size="large">
        <template #icon>
          <heart-filled />
        </template>
      </a-button>
    </div>
    <div class="grid grid-cols-12 grid-rows-2 gap-5 max-h-[600px]">
      <div class="col-span-4 row-span-2">
        <img src="@/assets/img/apartment.png" alt="apartment image" class="w-full h-full" />
      </div>
      <div class="col-span-4">
        <img src="@/assets/img/apartment.png" alt="apartment image" class="w-full h-full" />
      </div>
      <div class="col-span-4">
        <img src="@/assets/img/apartment.png" alt="apartment image" class="w-full h-full" />
      </div>
      <div class="col-span-8 row-span-1">
        <img src="@/assets/img/apartment.png" alt="apartment image" class="w-full h-full" />
      </div>
    </div>
    <h2 class="text-3xl font-bold mt-16 mb-4">{{ currentProduct.title }}</h2>
    <h3 class="text-2xl font-semibold my-4">{{ formatCurrency(currentProduct.price) }}</h3>
    <p class="text-lg text-gray-400">{{ currentProduct.description }}</p>
    <div class="h-[300px]"><map-component /></div>
    <h4 class="text-xl font-bold mb-8 my-14">Similar to your preferences</h4>
    <div class="grid grid-cols-12 gap-8">
      <router-link
        v-for="product in similarProducts"
        :key="product.id"
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
import { useCatalogStore } from '@/stores/useCatalogStore.js';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { formatCurrency } from '@/utils/utils.js';
import {
  HeartOutlined,
  InfoCircleOutlined,
  ShoppingCartOutlined,
  ArrowLeftOutlined,
  HeartFilled,
} from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';
import MapComponent from '@/components/MapComponent.vue';

const route = useRoute();

const catalogStore = useCatalogStore();
const { products } = storeToRefs(catalogStore);

catalogStore.loadProducts();

const similarProducts = computed(() => products.value.slice(0, 4));

const currentProduct = ref({});

onMounted(() => {
  currentProduct.value = products.value.find((p) => p.id.toString() === route.params.id);
});
</script>

<style lang="scss" scoped></style>
