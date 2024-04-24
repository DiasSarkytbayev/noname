<template>
  <form @submit.prevent="onSubmit">
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-4">
        <a-input v-model:value="form.title" size="large" placeholder="Address" />
      </div>
      <div class="col-span-4">
        <a-input v-model:value="form.city" size="large" placeholder="City" />
      </div>
      <div class="col-span-4">
        <a-input-number
          v-model:value="form.price"
          size="large"
          placeholder="Price"
          class="w-full"
        />
      </div>
      <div class="col-span-6">
        <a-textarea
          v-model:value="form.description"
          show-count
          :maxlength="100"
          placeholder="Description"
          size="large"
        />
      </div>
      <div class="col-span-6">
        <a-textarea
          v-model:value="form.conditions"
          show-count
          :maxlength="100"
          placeholder="Conditions"
          size="large"
        />
      </div>
      <div class="col-span-12 flex justify-end gap-5">
        <a-button size="large" @click="close">Close form</a-button>
        <purchase-ad-modal />
        <a-button type="primary" html-type="submit" size="large">
          {{ props.product != null ? 'Save changes' : 'Publish my ad' }}
        </a-button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import PurchaseAdModal from '@/components/PurchaseAdModal.vue';
import { message } from 'ant-design-vue';

const emit = defineEmits(['close', 'create', 'update']);

const props = defineProps({
  product: {
    type: Object,
    default: null,
  },
});

const form = ref({
  city: '',
  title: '',
  price: null,
  description: '',
  conditions: '',
});

function close() {
  emit('close');
}

function onSubmit() {
  if (props.product == null) {
    emit('create', { ...form.value, id: new Date() });
    message.success('You have successfully published a new ad!');
  } else {
    emit('update', form.value);
    message.success('You have successfully edited the ad!');
  }
}

onMounted(() => {
  if (props.product != null) {
    form.value = { ...props.product };
  }
});
</script>

<style lang="scss" scoped></style>
