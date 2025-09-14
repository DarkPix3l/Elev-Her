import axios from 'axios';
import { getSession } from 'next-auth/react';
import { auth } from '@/app/auth';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH}/products`);
    return { ok: true, data: response.data };
  } catch (err) {
    console.log('Backend not available:', err.message);
    return { ok: false, data: [] };
  }
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
  if (!userId) throw new Error('User ID is required');
  if (!file) throw new Error('File is required');

  const formData = new FormData();
  formData.append('avatar', file);

  const res = await axiosInstance.patch(`/users/${userId}/avatar`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const getUserData = async () => {
  const session = await auth();

  if (!session?.accessToken || !session.user?.id) {
    throw new Error('Not authenticated');
  }
  try {
    const res = await axios.get(`${process.env.API_BASE_URL}/users/${session.user.id}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
};
