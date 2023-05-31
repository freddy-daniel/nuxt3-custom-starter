import HttpFactory from '~/repository/factory';
import { LoginInput, AccountInfo } from '~~/types';

class AuthModule extends HttpFactory {
  private resource = '/auth';

  async login (credentials: LoginInput): Promise<null> {
    return await this.call<null>('POST', `${this.resource}/login`, credentials);
  }

  async logout (): Promise<null> {
    return await this.call<null>('POST',`${this.resource}/logout`);
  }

  async me (): Promise<AccountInfo> {
    return await this.call<AccountInfo>('GET', `${this.resource}/me`);
  }
}

export default AuthModule;
