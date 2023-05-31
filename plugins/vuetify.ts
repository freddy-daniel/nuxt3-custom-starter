import { createVuetify, ThemeDefinition } from 'vuetify';
import * as components from 'vuetify/components';
// import * as labs from 'vuetify/labs/components'; // use on demand
import * as directives from 'vuetify/directives';
import VuetifyUseDialog from 'vuetify-use-dialog';

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      ...components
      // ...labs
    },
    directives
  });

  nuxtApp.vueApp.use(vuetify);
  nuxtApp.vueApp.use(VuetifyUseDialog);
});
