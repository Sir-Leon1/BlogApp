import apiClient from "./api.js";

export const user = async (id) => {
    try {
        const response = await apiClient.get(`/users/:${id}`,
            );
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const profileUpdate = async ( data ) => {
    try {
        const response = await apiClient.put(`/users/profile/:${data.id}`,
            { data }
            );
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const readingHistory = async (id) => {
    try {
        const response = await apiClient.get(`/users/history/${id}`);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const deleteHistory = async (id) => {
    try {
        const response = await apiClient.delete(`/users/history/${id}`);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const deleteAccount = async (id) => {
    try {
        const response = await apiClient.delete(`/users/:${id}`);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}