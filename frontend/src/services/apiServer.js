import axios from "axios";
import { auth } from '@/app/auth';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${process.env.API_BASE_URL}/products`);
    return { ok: true, data: response.data };
  } catch (err) {
    console.log('can not fetch:', err.message);
    return { ok: false, data: [] };
  }
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