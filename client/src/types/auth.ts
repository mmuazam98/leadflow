import { IUser } from "./user";

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest extends ILoginRequest {
  name: string;
}

export interface ILoginResponse {
  token: string;
  user: IUser;
}
