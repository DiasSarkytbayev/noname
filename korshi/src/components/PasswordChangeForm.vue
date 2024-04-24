<template>
  <div>
    <h4 class="text-3xl font-bold mb-5">Change password</h4>
    <div class="flex flex-col gap-5">
      <a-input-password v-model="data.oldPassword" size="large" placeholder="Old password" />
      <a-input-password v-model="data.newPassword" size="large" placeholder="New password" />
      <a-input-password
        v-model="data.confirmPassword"
        size="large"
        placeholder="Confirm password"
      />
    </div>
    <a-button class="mt-8" size="large" type="primary" @click="changePassword"
      >Change password</a-button
    >
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';

const data = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});

function changePassword() {
  message.success('Your password has been changed!');
}
</script>

<style lang="scss" scoped></style>
