import { IApiResponse } from "@/types/api";
import { axiosInstance, getHeader } from "../instance";
import { ICompany } from "@/types/company";

/**
 * Fetches all the companies
 *
 * @returns {Promise<AxiosResponse<IApiResponse<ICompany[]>>>}
 */
export const fetchAllCompanies = () => axiosInstance.get<IApiResponse<ICompany[]>>("/company", getHeader());
