import apiClient from "./api.js";

export const loginApi = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login',
      { email, password }
      );
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
}

export const registerApi = async (username, email, password) => {
  try {
    const response = await apiClient.post('/auth/register',
      { username, email, password });
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
}

export const logout = async  () => {
  try {
    const response = await apiClient.post('/auth/logout',
        {});
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
}

export const passwordReset = async (email) => {
    try {
        const response = await apiClient.post('/auth/password-reset',
        { email });
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}


