<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <loading-overlay v-model="loggingIn" title="Logging in..." />
    <v-sheet width="400" class="mx-auto pa-6" elevation="4" rounded>
      <v-card-title>
        <brand-logo />
      </v-card-title>
      <v-form fast-fail @submit.prevent="login">
        <v-text-field
          v-model="form.email"
          label="User Name"
          variant="outlined"
        />
        <v-text-field
          v-model="form.password"
          :rules="[validation.required]"
          label="password"
          variant="outlined"
          type="password"
        />
        <div class="text-right">
          <v-btn
            size="small"
            variant="text"
            class="text-none mb-2"
            color="warning"
            :disabled="loggingIn"
            @click.prevent="gotoForgotPassword"
          >
            Forgot password?
          </v-btn>
        </div>
        <v-btn
          type="submit"
          block
          color="primary"
          class="mt-2 login-btn"
          :disabled="loggingIn"
        >
          Sign in
        </v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>
<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useSnackbar } from 'vuetify-use-dialog';
import { useAuthStore } from '~~/store/auth';
import { LoginInput, AccountInfo } from '~~/types';

definePageMeta({
  layout: 'login',
  middleware: 'auth'
});

const form = ref<LoginInput>({
  email: '',
  password: ''
});

const validation = {
  required: (value: String) => !!value || 'Field is required'
};

const showSnackbar = useSnackbar();
const loggingIn = ref<boolean>(false);

const router = useRouter();
const { $api } = useNuxtApp();
const { setAuthUser } = useAuthStore();

function gotoForgotPassword (): void {
  // To-do 
}

async function login (): Promise<void> {
  try {
    const credentials: LoginInput = {
      email: form.value.email,
      password: form.value.password
    };
    loggingIn.value = true;
    await useAuthStore().login(credentials);
    await nextTick();
    const user: AccountInfo = await $api.auth.me();
    // const user: AccountInfo = await reTryCatch(async () => await $api.auth.me(), 3, 1000);
    setAuthUser(user);
    router.push({ path: '/test' });
    // allow user access into the app
  } catch (error: any) {
    loggingIn.value = false;
    // eslint-disable-next-line no-console
    console.error('Login error: ', error);
    const errorMessage = error?.data?.message;
    showSnackbar({ text: `Login Failed! ${errorMessage || ''}`, theme: 'error' });
  }
}

// async function reTryCatch (callback: Function, times = 1, delay = 0): Promise<any> {
//   try {
//     return await callback();
//   } catch (error) {
//     if (times > 0) {
//       await new Promise(resolve => setTimeout(resolve, delay));
//       return await reTryCatch(callback, times - 1);
//     } else {
//       throw error;
//     }
//   }
// }

</script>

<style>
 .login-btn {
  color: white;
 }
</style>
