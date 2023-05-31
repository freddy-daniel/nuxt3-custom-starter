import { useAuthStore } from '~~/store/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const pathLogin = '/login';
  const pathLanding = '/home';
  const pathRoot = '/';
  // skip because already checked in root
  if (from.path === pathRoot && to.path === pathLogin) {
    return;
  }
  const authStore = useAuthStore();
  const nuxtApp = useNuxtApp();
  if (!authStore.authUser) {
    try {
      const profile = await nuxtApp.$api.auth.me();
      authStore._authUser = profile;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Failed set profile');
    }
  }
  if (!authStore.authUser && to.path !== pathLogin) {
    return navigateTo(pathLogin);
  }
  if (authStore.authUser && [pathRoot, pathLogin].includes(to.path)) {
    return navigateTo(pathLanding);
  }
});
