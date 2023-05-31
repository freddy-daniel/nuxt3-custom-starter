<template>
  <v-navigation-drawer
    :value="attrs.expand"
    v-bind="attrs"
  >
    <img src="~/assets/images/logo.svg" class="pa-5" alt="Discover Nuxt 3">

    <v-divider />

    <v-list density="compact" nav>
      <v-list-item
        v-for="(route, index) in routes"
        :key="index"
        :prepend-icon="route.icon"
        :title="route.name"
        :value="route.to"
        :to="route.to"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();

const routes = [
  {
    name: 'Users',
    to: 'users',
    icon: 'mdi-account-multiple'
  },
  {
    name: 'Test',
    to: 'test',
    icon: 'mdi-account'
  }
];
</script>
