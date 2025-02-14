import { IApiResponse } from "@/types/api";
import { axiosInstance, getHeader } from "../instance";
import { ILead } from "@/types/lead";

/**
 * Fetches all the leads
 *
 * @param {Object} params - The parameters for fetching leads
 * @param {string} params.sortBy - The field to sort by
 * @param {string} params.order - The order of sorting (asc/desc)
 * @param {number} params.limit - The number of leads to fetch
 * @param {number} params.offset - The offset for pagination
 * @param {string} params.query - The query (name, company, email)
 * @returns {Promise<AxiosResponse<IApiResponse<ILead[]>>>}
 */
export const fetchLeads = ({
  sortBy,
  order,
  limit = 10,
  offset = 0,
  query,
}: Partial<{ sortBy: string; order: string; limit: number; offset: number; query: string }>) => {
  const paramsObj: Record<string, string> = {};

  if (sortBy) paramsObj.sortBy = sortBy;
  if (order) paramsObj.order = order;
  if (limit) paramsObj.limit = limit.toString();
  if (offset) paramsObj.offset = offset.toString();
  if (query) paramsObj.query = query;

  const params = new URLSearchParams(paramsObj).toString();

  return axiosInstance.get<IApiResponse<ILead[]>>(`/leads?${params}`, getHeader());
};

/**
 * Deletes a lead by its ID
 *
 * @param {number} leadId - The ID of the lead to delete
 * @returns {Promise<AxiosResponse<any>>} - A promise that resolves to the response of the delete operation
 */
export const deleteLeadById = (leadId: number) => axiosInstance.delete(`/leads/${leadId}`, getHeader());

/**
 * Deletes multiple leads by their IDs
 *
 * @param {number[]} leadIds - An array of lead IDs to delete
 * @returns {Promise<AxiosResponse<any>>} - A promise that resolves to the response of the bulk delete operation
 */
export const bulkDeleteLeads = (leadIds: number[]) =>
  axiosInstance.delete(`/leads/bulk`, {
    data: { ids: leadIds },
    ...getHeader(),
  });

/**
 * Creates a new lead by sending a POST request to the `/leads` endpoint.
 *
 * @param {ILead} lead - The lead object to be created.
 * @returns {Promise<AxiosResponse<IApiResponse<ILead>>>} - A promise that resolves to the API response containing the created lead.
 */
export const createNewLead = (lead: ILead) => axiosInstance.post<IApiResponse<ILead>>(`/leads`, lead, getHeader());

/**
 * Update a lead by its ID
 *
 * @param {number} leadId - The ID of the lead to update
 * @returns {Promise<AxiosResponse<IApiResponse<ILead>>>} - A promise that resolves to the response of the update operation
 */
export const updateLeadById = (lead: ILead) =>
  axiosInstance.put<IApiResponse<ILead>>(`/leads/${lead.id!}`, lead, getHeader());

/**
 * Export all leads as csv
 *
 */
export const exportAllLeads = () =>
  axiosInstance.get(`/leads/export`, {
    responseType: "blob",
    ...getHeader(),
  });
