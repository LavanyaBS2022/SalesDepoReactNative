import axios from 'axios';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6eyJpZCI6MjM1OTA0LCJuYW1lIjoiVTIwIiwiY29fY29kZSI6IjIwIiwiZW1haWwiOm51bGwsInBhc3N3b3JkIjoiOTY5ODAgICAgICIsImNvbXBhbnlfbmFtZSI6IkJhbmdhbG9yZSBTYWxlcyBEZXBvdCIsImNvbXBhbnlfYWRkcmVzcyI6IktNRiBDb21wbGV4LCBEciBNIEggTWFyaWdvd2RhIFJhb2QifSwiaWF0IjoxNzIwMDc0NzgwLCJleHAiOjE3MjAxNjExODB9.VtLST9SbOdIZwYUEuVxIPaN5qqO2GCdhKAhxNTopoBI'; 
const apiClient = axios.create({
  baseURL: 'http://202.21.34.147:49152/erp_sales_cirayo/api/v1/', 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `${token}`,
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

  // export const fetchItemDetails = async (gpNumber) => {
  //   const response = await apiClient.get(`/taxInvoice/taxInvoicePrint?gp_number=${gpNumber}`);
  //   return response.data;
  // };
  
  export const fetchItemDetails = async (gpNumber) => {
    const url = `/taxInvoice/taxInvoicePrint?gp_number=${gpNumber}`;
    console.log('Request URL:', url); 
    const response = await apiClient.get(url);
    return response.data;
  };
  
