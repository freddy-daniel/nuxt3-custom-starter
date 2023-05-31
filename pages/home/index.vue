<template>
  <div class="d-flex align-center justify-center" style="height: 80vh">
    <v-card
      width="400"
      class="mx-auto"
      :title="`Hello, ${user.firstName}`"
    />
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { useAuthStore } from '~~/store/auth';
definePageMeta({
  layout: 'lite'
  // middleware: 'auth' // middleware to validate auth status
});
const authStore = useAuthStore();

const user = computed(() => {
  return authStore.authUser || {};
});
</script>
