<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn icon="mdi-account" v-bind="props" />
    </template>

    <v-list>
      <v-list-item>
        <v-list-item-title>Account settings</v-list-item-title>
      </v-list-item>
      <v-list-item @click="logout">
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>

const { $api } = useNuxtApp();
async function logout () {
  await $api.auth.logout();
  // clear profile
  return navigateTo('/', { external: true });
}
</script>
