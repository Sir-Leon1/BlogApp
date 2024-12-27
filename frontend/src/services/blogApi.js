import apiClient from "./api.js";

export const specificBlog = async (id) => {
    try {
        const response = await apiClient.get(`/blogs/:${id}`);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const blogList = async () => {
    try {
        const response = await apiClient.get('/blogs');
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const specificBlogList = async (user_id) => {
    try {
        const response = await apiClient.get(`/blogs/users/${user_id}`);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const createBlog = async ( data ) => {
    try {
        const response = await apiClient.post('/blogs',
            { data }
        )
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const updateBlog = async ( data ) => {
    try {
        const response = await apiClient.put(`/blogs/:${id}`,
            {data}
        );
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const deleteBlog = async ( id ) => {
    try {
        const response = await apiClient.delete(`/blogs/:${id}`);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const readingList = async (id) => {
    try {
        const response = await apiClient.get(`/blogs/history/${id}`);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const featuredPost = async () => {
    try {
        const response = await apiClient.get('/blogs/featured');
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}
