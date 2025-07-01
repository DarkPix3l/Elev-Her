import axios from 'axios';

export const fetchProducts = async () => {
  const response = await axios.get('http://localhost:5000/api/v1/products');
  return response.data;
};
