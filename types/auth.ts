// types/auth.ts
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name?: string;     
  email: string;
  password: string;
}

export interface UpdateUserData {
  username: string;
  name?: string;     
  email?: string;
  password?: string;
}