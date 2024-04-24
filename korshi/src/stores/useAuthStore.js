import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const userData = ref({});
    const token = ref(null);

    const isLoggedIn = computed(() => token.value != null);

    async function signIn() {
      token.value = 'blabla';
    }

    async function signUp() {}

    async function signout() {
      token.value = null;
    }

    return {
      token,
      userData,
      isLoggedIn,
      signIn,
      signUp,
      signout,
    };
  },
  {
    persist: {
      paths: ['token'],
    },
  }
);
