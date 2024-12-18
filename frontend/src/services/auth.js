import axios from 'axios';
const API_URL = 'http://localhost:5000/api/auth/';

export const loginApi = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}login`,
      { email, password },
      { headers: { 'Content-Type': 'application/json' } });
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
}

export const registerApi = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}register`,
      { username, email, password },
      { headers: { 'Content-Type': 'application/json' } });
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
}


