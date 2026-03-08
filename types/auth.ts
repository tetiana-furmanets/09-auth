// types/auth.ts
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
}

export interface UpdateUserData {
  username: string;
}