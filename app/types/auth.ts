export enum USER_ROLE {
  ADMIN = "admin",
  USER = "user",
}

export type User = {
  id: number;
  name: string;
  email: string;
  role: USER_ROLE;
  created_at?: string;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  role: USER_ROLE;
};

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterAPIResponse = {
  data: User;
  succeeded: true;
};

export type LoginAPIResponse = {
  data: {
    user: User;
  };
  succeeded: true;
};

export type GetProfileAPIResponse = {
  data: { user: User };
  succeeded: boolean;
};

export type LogoutAPIResponse = {
  message: string;
  succeeded: boolean;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  role: USER_ROLE;
};
