import apiClient from "./api.js";

export const commentList = async (blog_id) => {
    try {
        const response = await apiClient.get(`/comments/blog/${blog_id}`);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const createComment = async (data) => {
    try {
        const response = await apiClient.post('/comments',
            { data }
        )
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const updateComment = async (data) => {
    try {
        const response = await apiClient.put(`/comments/:${data.id}`,
            { data }
        );
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const deleteComment = async (id) => {
    try {
        const response = await apiClient.delete(`/comments/:${id}`);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

