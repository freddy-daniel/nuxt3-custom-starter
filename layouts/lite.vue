<template>
  <div>
    <v-card>
      <v-app>
        <v-app-bar :border="false" elevation="0" color="transparent">
          <template #append>
            <profile-menu />
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
