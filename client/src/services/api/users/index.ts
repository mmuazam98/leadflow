import { ILoginRequest, ILoginResponse, IRegisterRequest } from "@/types/auth";
import { axiosInstance } from "../instance";
import { IApiResponse } from "@/types/api";

/**
 * Logs in a user
 *
 * @param {ILoginRequest} body - The request body containing login credentials.
 * @returns {Promise<AxiosResponse<IApiResponse<ILoginResponse>>>} - The response from the server.
 */
export const loginUser = (body: ILoginRequest) => axiosInstance.post<IApiResponse<ILoginResponse>>("/auth/login", body);

/**
 * Registers a user
 *
 * @param {IRegisterRequest} body - The request body containing the required info.
 * @returns {Promise<AxiosResponse<IApiResponse<ILoginResponse>>>} - The response from the server.
 */
export const registerUser = (body: IRegisterRequest) =>
  axiosInstance.post<IApiResponse<ILoginResponse>>("/auth/register", body);
