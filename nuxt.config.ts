// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    public: {
      apiPath: '',
      apiBaseUrlProxy: ''
    }
  },
  app: {
    head: {
      title: 'Nuxt3 TST Starter'
    }
  },
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'],
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  build: {
    transpile: ['vuetify']
  },
  vite: {
    define: {
      'process.env.DEBUG': false
    }
  },
  nitro: {
    devProxy: {
      '/api/v1': {
        target:
          process.env.NUXT_PUBLIC_API_BASE_URL_PROXY
            ? `${process.env.NUXT_PUBLIC_API_BASE_URL_PROXY}${process.env.NUXT_PUBLIC_API_PATH}`
            : 'https://api.tstgames.in/api/v1',
        changeOrigin: true,
        prependPath: true,
        secure: false
      }
    }
  }
});
