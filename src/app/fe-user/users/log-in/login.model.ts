export interface LoginParam{
  userId: number;
  userName: string;
  email: string;
}

export interface LoginModel {
  email: string;
  password: string;
}
export interface RegisterModel{
  name: string;
  email: string;
  password: string;
  level: string;
}
