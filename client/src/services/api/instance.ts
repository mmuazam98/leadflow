import config from "@/config";
import axios from "axios";

export const getHeader = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
};

export const axiosInstance = axios.create({
  baseURL: config.api_endpoint + "/api/v1",
});
