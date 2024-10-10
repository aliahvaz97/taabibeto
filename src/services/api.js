// src/services/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // آدرس بک‌اند

// درخواست رزرو
export const reserveService = async (reservationData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/reservations`, reservationData);
    return response.data;
  } catch (error) {
    console.error('Error during reservation:', error);
    throw error;
  }
};

// درخواست انتخاب پرستار
export const selectNurseService = async (nurseId) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/select-nurse`, { nurseId });
    return response.data;
  } catch (error) {
    console.error('Error during nurse selection:', error);
    throw error;
  }
};
