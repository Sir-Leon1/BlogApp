import apiClient from "./api.js";

export const user = async (id) => {
    try {
        const response = await apiClient.get(`/u/users/${id}`,
            );
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const profileUpdate = async ( data, userId ) => {
    try {
        const response = await apiClient.put(`/u/users/profile/${userId}`,
            data, {
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }
            );
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const getreadingHistory = async (id) => {
    try {
        const response = await apiClient.get(`/u/users/history/${id}`);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const addHistory = async (data) => {
    try {
        const response = await apiClient.post('/u/users/history',
            { data }
        )
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const deleteHistory = async (id) => {
    try {
        const response = await apiClient.delete(`/u/users/history/${id}`);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const deleteAccount = async (id) => {
    try {
        const response = await apiClient.delete(`/u/users/:${id}`);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}