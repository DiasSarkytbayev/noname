<template>
  <div class="container pb-5 relative h-full">
    <div
      class="bg-white rounded-xl p-14 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-2 max-w-[600px] w-full mx-5"
    >
      <form class="grid-cols-12 grid gap-5" @submit.prevent="submit">
        <div class="col-span-6">
          <a-input v-model="data.fullname" size="large" placeholder="Full name" />
        </div>
        <div class="col-span-6">
          <a-input
            v-model="data.phone"
            v-maska
            size="large"
            placeholder="Phone number"
            type="tel"
            data-maska="+7-7##-###-##-##"
          />
        </div>
        <div class="col-span-6">
          <a-input v-model="data.city" size="large" placeholder="City" />
        </div>
        <div class="col-span-6">
          <a-input v-model="data.email" size="large" placeholder="Email address" type="email" />
        </div>
        <div class="col-span-6">
          <a-input-password v-model="data.password" size="large" placeholder="Password" />
        </div>
        <div class="col-span-6">
          <a-select
            v-model:value="data.gender"
            size="large"
            placeholder="Your gender"
            class="w-full"
          >
            <a-select-option value="Male">Male</a-select-option>
            <a-select-option value="Female">Female</a-select-option>
            <a-select-option value="Prefer not to say">Prefer not to say</a-select-option>
          </a-select>
        </div>
        <div class="col-span-12">
          <a-button
            type="primary"
            class="w-full"
            html-type="submit"
            size="large"
            :loading="pending"
          >
            Sign up
          </a-button>
        </div>
      </form>
    </div>
    <div class="absolute bottom-[10%] left-[50%] translate-x-[-50%]">
      Already have an account? <router-link to="/sign-in" class="font-bold">Sign in</router-link>
    </div>
  </div>
</template>

<script setup>
import { vMaska } from 'maska';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore.js';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const data = ref({
  fullname: '',
  phone: '',
  city: '',
  email: '',
  password: '',
  gender: '',
});

const pending = ref(false);

async function submit() {
  try {
    pending.value = true;
    await useAuthStore().signUp();
    message.success('You have been registered successfully!');
    await router.push('/sign-in');
  } catch (e) {
  } finally {
    pending.value = false;
  }
}
</script>

<style lang="scss" scoped></style>
