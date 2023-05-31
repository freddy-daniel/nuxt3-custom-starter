import AuthModule from '~~/repository/modules/auth';
import { $fetch, FetchOptions } from 'ofetch';

import { defineNuxtPlugin } from '#app';

/** ApiInstance interface provides us with good typing */
interface ApiInstance {
  auth: AuthModule
}

export default defineNuxtPlugin(() => {
  const nuxtApp = useNuxtApp();
  let url = 'http://localhost:6001';
  if (process.server) {
    const req = nuxtApp.ssrContext?.event.node.req;
    let scheme = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    if (req?.headers['x-forwarded-proto'] === 'https' || req?.headers['x-forwarded-proto'] === 'http') {
      scheme = req.headers['x-forwarded-proto'];
    }
    url = `${scheme}://${req?.headers.host}`;
  } else {
    url = `${window.location.protocol}//${window.location.host}`;
  }

  const headers = useRequestHeaders(['cookie']);
  const appConfig = useRuntimeConfig();
  const apiPath = appConfig.public.apiPath || '/api/v1';
  const fetchOptions: FetchOptions = {
    baseURL: `${url}${apiPath}`,
    onRequest: ({ options }) => {
      options.headers = {
        ...options.headers,
        ...headers
      };
    }
  };

  /** create a new instance of $fetcher with custom option */
  const apiFetcher = $fetch.create(fetchOptions);

  /** an object containing all repositories we need to expose */
  const modules: ApiInstance = {
    auth: new AuthModule(apiFetcher)
  };

  return {
    provide: {
      api: modules
    }
  };
});
