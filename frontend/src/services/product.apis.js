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

export const updateAvatar = async (userId, file) => {
  if (!userId) throw new Error("User ID is required");
  if (!file) throw new Error("File is required");

  const formData = new FormData();
  formData.append("avatar", file);

  const res = await axiosInstance.patch(`/users/${userId}/avatar`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
  };