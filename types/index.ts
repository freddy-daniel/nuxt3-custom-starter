export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  multiFactorAuth: boolean;
}
// correct this interface based on project
export interface AccountInfo {
  [key: string]: any
}

export interface AuthStoreState {
  _authUser: AccountInfo | null;
}
