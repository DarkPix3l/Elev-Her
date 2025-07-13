import axios from "axios";
import { getSession } from "next-auth/react";


export const fetchProducts = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH}/products`);
  return response.data;
};

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEXTAUTH,
});

axiosInstance.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});
