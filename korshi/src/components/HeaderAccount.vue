<template>
  <div v-if="!isLoggedIn" class="flex gap-5">
    <router-link to="/sign-in">
      <a-button size="large" class="border-blue-400 text-blue-400">Sign in</a-button>
    </router-link>
    <router-link to="/sign-up">
      <a-button size="large" type="primary">Sign up</a-button>
    </router-link>
  </div>
  <div v-else class="flex items-center gap-5">
    <ul class="flex items-center gap-5">
      <li v-for="item in items" :key="item.to">
        <router-link
          :to="item.to"
          class="inline-block p-3 rounded-lg bg-blue-50 text-blue-600"
          exact-active-class="bg-blue-600 text-white"
        >
          <component :is="item.icon" style="font-size: 1.5rem" />
        </router-link>
      </li>
      <li>
        <a-button size="large" class="border-blue-400 text-blue-400" @click="signout">
          Sign out
        </a-button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/useAuthStore.js';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { UserOutlined, HeartOutlined, MessageOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();

const router = useRouter();

const { isLoggedIn } = storeToRefs(authStore);

const items = computed(() => [
  { icon: HeartOutlined, to: '/favorites' },
  { icon: MessageOutlined, to: '/chats' },
  { icon: UserOutlined, to: '/profile' },
]);

function signout() {
  authStore.signout();
  router.push('/sign-in');
  message.success('You have logged out from the account');
}
</script>

<style lang="scss" scoped></style>
