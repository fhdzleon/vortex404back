export interface CreateUserInput {
  email: string;
  username: string;
  city: string;
  birthday: Date;
  passwordHash: string;
  avatar?: string;
}

export interface RegisterInput {
  email: string;
  username: string;
  city: string;
  birthday: string;
  password: string;
  avatar?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
