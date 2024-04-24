<template>
  <section class="py-24">
    <div class="container">
      <div class="grid grid-cols-12 gap-5">
        <div class="col-span-3">
          <file-upload />
        </div>
        <div class="col-span-9">
          <div class="grid gap-5">
            <div class="col-span-6">
              <a-input v-model="profile.firstname" size="large" placeholder="First name" />
            </div>
            <div class="col-span-6">
              <a-input v-model="profile.lastname" size="large" placeholder="Last name" />
            </div>
            <div class="col-span-12">
              <a-input
                v-model="profile.phone"
                v-maska
                size="large"
                placeholder="Phone number"
                type="tel"
                data-maska="+7-7##-###-##-##"
              />
            </div>
            <div class="col-span-12">
              <a-input
                v-model="profile.email"
                size="large"
                placeholder="Email address"
                type="email"
              />
            </div>
            <div class="col-span-12">
              <a-select v-model:value="profile.role" size="large" placeholder="Role" class="w-full">
                <a-select-option value="Landlord">Landlord</a-select-option>
                <a-select-option value="Buyer">Buyer</a-select-option>
                <a-select-option value="Tenant">Tenant</a-select-option>
              </a-select>
            </div>
            <div class="col-span-12">
              <a-textarea
                v-model:value="profile.about"
                show-count
                :maxlength="100"
                placeholder="About me"
                size="large"
              />
            </div>
            <div class="col-span-12">
              <a-button type="primary" size="large">Save changes</a-button>
            </div>
          </div>
        </div>
      </div>
      <password-change-form class="my-12 max-w-[600px]" />
      <div class="flex items-center mb-8 my-14">
        <h4 class="text-3xl font-bold mb-0">My ads</h4>
        <a-button class="ml-4" @click="isProductFormShown = true">Create new ad</a-button>
      </div>
      <div v-if="!isProductFormShown" class="grid grid-cols-12 gap-8">
        <div v-for="product in myAds" :key="product.id" class="col-span-3">
          <a-card hoverable>
            <template #cover>
              <img :alt="product.title" :src="product.image" />
            </template>
            <template #actions>
              <a-button size="large" @click.prevent="showEditForm(product)">
                <template #icon>
                  <edit-outlined />
                </template>
              </a-button>
              <a-button danger size="large" @click.prevent="deleteAd(product)">
                <template #icon>
                  <delete-outlined />
                </template>
              </a-button>
            </template>
            <a-card-meta :title="product.title">
              <template #description>
                <span class="text-lg">{{ formatCurrency(product.price) }}</span>
              </template>
            </a-card-meta>
          </a-card>
        </div>
      </div>
      <product-form
        v-else
        :product="editProduct"
        class="max-w-[700px]"
        @close="closeProductForm"
        @create="onProductCreate"
        @update="onProductUpdate"
      />
    </div>
  </section>
</template>

<script setup>
import { vMaska } from 'maska';
import { createVNode, onMounted, ref } from 'vue';
import FileUpload from '@/components/FileUpload.vue';
import { formatCurrency } from '@/utils/utils.js';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { useCatalogStore } from '@/stores/useCatalogStore.js';
import { computed } from 'vue';
import { Modal } from 'ant-design-vue';
import ProductForm from '@/components/ProductForm.vue';
import PasswordChangeForm from '@/components/PasswordChangeForm.vue';

const profile = ref({
  firstname: '',
  lastname: '',
  email: '',
  role: '',
  about: '',
  username: '',
  phone: '',
});

const catalogStore = useCatalogStore();
const products = ref([]);

onMounted(async () => {
  products.value = await catalogStore.loadProducts();
  products.value = products.value.slice(0, 3);
});

const myAds = computed(() => products.value.slice(0, 4));

const editProduct = ref(null);
const isProductFormShown = ref(false);

function showEditForm(product) {
  editProduct.value = product;
  isProductFormShown.value = true;
}

function closeProductForm() {
  editProduct.value = null;
  isProductFormShown.value = false;
}

function onProductCreate(newProduct) {
  products.value.push(newProduct);
  closeProductForm();
}

function onProductUpdate(product) {
  const idx = products.value.findIndex((p) => p.id === editProduct.value.id);
  products.value[idx] = { ...products.value[idx], ...product };
  closeProductForm();
}

function deleteAd(product) {
  Modal.confirm({
    title: 'Are you sure delete this ad?',
    icon: createVNode(ExclamationCircleOutlined),
    content: 'This action cannot be undone',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      products.value = products.value.filter((p) => p.id !== product.id);
    },
  });
}
</script>

<style lang="scss" scoped></style>
