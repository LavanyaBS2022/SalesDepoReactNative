import axios from 'axios';
import Constants from 'expo-constants';

const apiUrl = Constants.manifest.extra.apiUrl;
const apiToken = Constants.manifest.extra.apiToken;

const apiClient = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiToken}`,
  },
});

export const loginUser = async (code, password) => {
  try {
    const response = await apiClient.post('/login', {
      code,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchListData = async (pFromDate, pToDate) => {
  try {
    const response = await apiClient.get('/taxInvoice/dayBook', {
      params: {
        pFromDate,
        pToDate,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchItemDetails = async (gpNumber) => {
  const url = `/taxInvoice/taxInvoicePrint?gp_number=${gpNumber}`;
  console.log('Request URL:', url);
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching item details:', error);
    throw error;
  }
};
