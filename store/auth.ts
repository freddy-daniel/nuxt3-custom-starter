import { defineStore } from 'pinia';
import {
  LoginInput,
  AccountInfo,
  AuthStoreState,
  LoginResponse
} from '~~/types';

export const useAuthStore = defineStore('auth-store', {
  state: () : AuthStoreState => {
    return {
      _authUser: null
    };
  },

  actions: {
    async login (credentials: LoginInput) {
      const { $api } = useNuxtApp();
      const loginResponse: LoginResponse | any = await $api.auth.login(<LoginInput>{
        ...credentials
      });
      return loginResponse;
    },

    setAuthUser (value: AccountInfo) {
      this._authUser = value;
    }
  },

  getters: {
    authUser: (state): AccountInfo | null => state._authUser
  }

});
