<script setup lang="ts">
// import the useTheme composable
import { useTheme, useDisplay } from 'vuetify';
const theme = useTheme();
const { name } = useDisplay();
// change the theme function
const changeTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
};
// navigation drawer props
const navBarProps = reactive({
  expand: true,
  expandOnHover: true,
  rail: false
});
// create navigation drawer toggle function
const toggleNavBar = () => {
  if (name.value === 'xs' || name.value === 'sm' || name.value === 'md') {
    navBarProps.expandOnHover = false;
    navBarProps.rail = false;
    navBarProps.expand = !navBarProps.expand;
  } else {
    navBarProps.expandOnHover = true;
    navBarProps.rail = !navBarProps.rail;
  }
};
</script>
<template>
  <div>
    <v-card>
      <v-app>
        <nav-bar
          v-model="navBarProps.expand"
          :expand-on-hover="navBarProps.expandOnHover"
          :rail="navBarProps.rail"
          permanent
        />

        <v-app-bar :border="false" elevation="0" color="white">
          <template #prepend>
            <v-app-bar-nav-icon @click.stop="toggleNavBar" />
          </template>
          <template #append>
            <v-btn icon="mdi-theme-light-dark" @click="changeTheme" />
          </template>
        </v-app-bar>

        <v-main>
          <div class="pa-4">
            <slot />
          </div>
        </v-main>
      </v-app>
    </v-card>
  </div>
</template>

<style>
.v-main {
  background-color: #f2f2f2 !important;
}
</style>
